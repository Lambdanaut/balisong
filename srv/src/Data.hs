module Data(
) where

import qualified Config
import Database.Persist.MongoDB

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
