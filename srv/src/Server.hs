module Server(
    runServer
) where

import Control.Concurrent (MVar, newMVar, modifyMVar_, modifyMVar, readMVar)
import qualified Data.Aeson as JSON
import Control.Monad (forever)
import Control.Monad.IO.Class (liftIO)
import qualified Data.ByteString.Char8 as BSstrict
import qualified Data.ByteString.Lazy as BSlazy
import qualified Network.WebSockets as WS
import qualified Network.WebSockets.Snap as WSSnap

import qualified BackendData
import qualified Config
import qualified Data


talk :: WS.Connection -> MVar [Int] -> IO ()
talk conn state = forever $ do
    -- Wait on new websocket messages
    msg <- WS.receiveData conn :: IO BSlazy.ByteString
    case JSON.decode msg :: Maybe Data.NetMessage of
        Nothing -> do
            liftIO $ putStr "Couldn't decode message: "
            liftIO $ print msg
        Just decodedMsg -> case decodedMsg of
            Data.NetDebug msg -> 
                liftIO $ print msg
            Data.NetChat msg -> 
                liftIO $ print msg
            Data.NetMove -> 
                liftIO $ print "Move Message!"

    let ourMsg = JSON.encode $ Data.NetDebug "Testing one two three"
    WS.sendTextData conn ourMsg


application :: MVar [Int] -> WS.ServerApp
application state pending = do
    conn <- WS.acceptRequest pending
    WS.forkPingThread conn 30
    liftIO $ print "Connection!"
    msg <- WS.receive conn
    liftIO $ print msg
    let connMsg = JSON.encode $ Data.NetConn
    WS.sendTextData conn connMsg
    talk conn state


runServer :: IO ()
runServer = do
    state <- newMVar []
    print "Server started"
    WS.runServer Config.serverHost Config.serverPort $ application state
