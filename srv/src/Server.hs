{-# LANGUAGE OverloadedStrings #-}

module Server(
    runServer
) where

import Web.SocketIO

import qualified Config (port)
import qualified Data

runServer :: IO ()
runServer = serverConfig Config.port defaultConfig $ do

    -- ping pong
    on "ping" $ emit "pong" []

    -- msg :: CallbackM [Text]
    on "echo" $ msg >>= emit "pong"
