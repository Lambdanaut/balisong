module Main where

import Automaton
import Automaton (Automaton)
import Color(grey)
import Graphics.Element (..)
import Graphics.Collage (collage, toForm)
import Keyboard
import Signal
import Signal (Signal, (<~), (~))
import Text
import Time
import Window

import Network (NetMessage(..), networkIn)


type alias UserInput = 
  { space  : Bool
  , arrows : 
    { x : Int
    , y : Int
    }
  }

type alias Input =
  { timeDelta : Float
  , userInput : UserInput
  , netIn : NetMessage
  }

type alias Placeable a = 
  { a |
    id   : String
  , x    : Float 
  , y    : Float
  , z    : Float
  }

type alias PlayerCharacter = Placeable
  { name : String
  }

type alias Tile = Placeable {}

type alias LoadedResource = {}

type alias Map = 
  { id    : String
  , name  : String 
  , tiles : List Tile
  }

type alias Settings = {}

type alias GameState =
  { map      : Map
  , settings : Settings
  , players  : List PlayerCharacter
  , loaded   : {} -- Dictionary of {resource id: loaded data}
  , debug    : String
  }


defaultGame : GameState
defaultGame = 
  { map      = Map "" "" []
  , settings = {}
  , players  = []
  , loaded   = {}
  , debug    = ""
  }




stepGame : Input -> GameState -> GameState
stepGame {timeDelta, userInput, netIn} gameState =
  let s = case netIn of 
    NetDebug msg              -> msg
    NetChat msg               -> msg
    NetMove                   -> "asdf"
    NetLoadResource resources -> toString resources
  in {gameState | debug <- s}


render : (Int, Int) -> GameState -> Element
render (winH, winW) { map, settings, players, loaded, debug} =
  color grey <|
  container winH winW middle <|
  collage winH winW
  [toForm <| Text.plainText debug] 


delta : Signal Float
delta = Time.fps 30


userInput : Signal UserInput
userInput =
  UserInput
  <~ Keyboard.space
  ~  Keyboard.wasd


input : Signal Input
input = Signal.sampleOn networkIn (Input <~ delta ~ userInput ~ networkIn)


gameState : Signal GameState
gameState = Signal.foldp stepGame defaultGame input


main : Signal Element
main = render <~ Window.dimensions ~ gameState
