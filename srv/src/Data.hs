{-# LANGUAGE DeriveGeneric #-}

module Data(
    Game
,   Map
,   Block
,   NetInMessage (..)
) where

import qualified Config
import qualified Data.Aeson as JSON
import Data.List.Split(splitOn)
import Database.Persist.MongoDB
import GHC.Generics


{- Network Data -}
data NetInMessage
    = DebugMsg String
    | Chat String
    | Move
    deriving (Show, Ord, Eq, Generic)
instance JSON.FromJSON NetInMessage
instance JSON.ToJSON NetInMessage

{- Game Entity Data -}
data Game = Game {
    game__id   :: ObjectId
,   game__maps :: [Map]
} deriving (Show)

data Map = Map {
    map__id     :: ObjectId
,   map__title  :: String
,   map__blocks :: [Block]
} deriving (Show)

data Block = Block {
    block__id :: ObjectId
,   block__x  :: Int
,   block__y  :: Int
,   block__z  :: Int
} deriving (Show)


-- For testing
main :: IO ()
main = do
    putStrLn $ show $ JSON.encode $ DebugMsg "Testing one two three"
