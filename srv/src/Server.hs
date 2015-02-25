module Server(
    runServer
) where

import Control.Concurrent (MVar, newMVar, modifyMVar_, modifyMVar, readMVar)
import Control.Monad (forever)
import Control.Monad.IO.Class (liftIO)
import qualified Data.Text as T
import qualified Network.WebSockets as WS
import qualified Network.WebSockets.Snap as WSSnap

import qualified Config
import qualified Data


application :: MVar [Int] -> WS.ServerApp
application state pending = do
    conn <- WS.acceptRequest pending
    liftIO $ print "Connection!"
    msg <- WS.receive conn
    liftIO $ print msg
    WS.send conn msg
    WS.forkPingThread conn 30

runServer :: IO ()
runServer = do
    state <- newMVar []
    print "a"
    WS.runServer Config.serverHost Config.serverPort $ application state
