{-# LANGUAGE EmptyDataDecls             #-}
{-# LANGUAGE FlexibleContexts           #-}
{-# LANGUAGE GADTs                      #-}
{-# LANGUAGE GeneralizedNewtypeDeriving #-}
{-# LANGUAGE MultiParamTypeClasses      #-}
{-# LANGUAGE OverloadedStrings          #-}
{-# LANGUAGE QuasiQuotes                #-}
{-# LANGUAGE TemplateHaskell            #-}
{-# LANGUAGE TypeFamilies               #-}
module Data(
    User
,   Ui
,   Game
)where

import Control.Monad.IO.Class (liftIO)

import Database.Persist
import Database.Persist.TH
import Language.Haskell.TH.Syntax
import Database.Persist.MongoDB
import Data.Time

import qualified Config

-- Data Models
let mongoSettings = (mkPersistSettings (ConT ''MongoContext)) {mpsGeneric = False}
    in share [mkPersist mongoSettings] [persistLowerCase|

User
    username    String
    password    String
    email       String
    deriving (Show)
Ui
    title       String
    authorId    UserId
    description String
    deriving (Show)
Game
    title       String
    authorId    UserId
    version     String
    description String
    ui          UiId
    deriving (Show)

|]

main :: IO ()
main = (withMongoDBConn Config.mongoCollection Config.mongoHost
        Config.mongoPort Config.mongoAuth Config.mongoNominalDiffTime) $ \pool -> do
    runMongoDBPool master (do
        lambdanautId <- insert $ User "Lambdanaut" "my_password" "proetlb@gmail.com"
        uiId <- insert $ Ui "Classic" lambdanautId "A classic UI"
        gameId <- insert $ Game "Balisong" lambdanautId "0.0.1" "An awesome game" uiId

        lambdanaut <- get lambdanautId
        liftIO $ print (lambdanaut :: Maybe User)

        ) pool
