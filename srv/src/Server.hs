{-# LANGUAGE OverloadedStrings #-}

module Server(
    runServer
) where

import Web.SocketIO

import qualified Config
import qualified Data

runServer :: IO ()
runServer = serverConfig Config.serverPort defaultConfig $ do

    -- ping pong
    on "ping" $ emit "pong" []

    -- msg :: CallbackM [Text]
    on "echo" $ msg >>= emit "pong"
