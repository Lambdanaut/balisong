module Server(
    runServer
) where

import Control.Concurrent (MVar, newMVar, modifyMVar_, modifyMVar, readMVar)
import Control.Monad (forever)
import Control.Monad.IO.Class (liftIO)
import qualified Data.ByteString.Char8 as BS
import qualified Network.WebSockets as WS
import qualified Network.WebSockets.Snap as WSSnap

import qualified BackendData
import qualified Config
import qualified Data


talk :: WS.Connection -> MVar [Int] -> IO ()
talk conn state = forever $ do
    msg <- WS.receive conn
    liftIO $ print msg
    WS.send conn msg


application :: MVar [Int] -> WS.ServerApp
application state pending = do
    conn <- WS.acceptRequest pending
    WS.forkPingThread conn 30
    liftIO $ print "Connection!"
    msg <- WS.receive conn
    liftIO $ print msg
    WS.sendTextData conn $ BS.pack "This is a message from the server!"
    talk conn state


runServer :: IO ()
runServer = do
    state <- newMVar []
    print "Server started"
    WS.runServer Config.serverHost Config.serverPort $ application state
