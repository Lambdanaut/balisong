{-# LANGUAGE DeriveGeneric #-}

module Data(
    Game
,   Map
,   Block
,   NetMessage (..)
) where

import qualified Config
import qualified Data.Aeson as JSON
import Data.List.Split(splitOn)
import Database.Persist.MongoDB
import GHC.Generics


{- Network Data -}
data NetMessage
    = NetDebug String
    | NetChat String
    | NetMove
    deriving (Show, Ord, Eq, Generic)
instance JSON.FromJSON NetMessage
instance JSON.ToJSON NetMessage


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
    putStrLn $ show $ JSON.encode $ NetDebug "Testing one two three"
