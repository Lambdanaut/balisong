module Main where

import Automaton
import Automaton (Automaton)
import Color(grey)
import Graphics.Collage (collage, toForm)
import Graphics.Element (..)
import Graphics.Input.Field as Field
import Keyboard
import Signal
import Signal (Signal, (<~), (~))
import Text
import Time
import Window

import Network (NetMessage(..), networkIn)


type UIAction 
  = UIChatAction Field.Content

type alias UserInput = 
  { action : UIAction
  , space  : Bool
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

type alias Map = 
  { id    : String
  , name  : String 
  , tiles : List Tile
  }

type alias Placeable a = 
  { a
  | id   : String
  , x    : Float 
  , y    : Float
  , z    : Float
  }

type alias PlayerCharacter = Placeable
  { name : String
  }

type alias Tile = Placeable {}

type alias LoadedResource = {}

type alias Settings = {}

type alias UI a =
  { a  
  | chatInput : Field.Content
  }

type alias GameState = UI
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

  , chatInput = Field.noContent
  }


chatChannel : Signal.Channel UIAction
chatChannel = Signal.channel <| UIChatAction Field.noContent


stepGame : Input -> GameState -> GameState
stepGame {timeDelta, userInput, netIn} gameState =
  let net = case netIn of 
        NetDebug msg              -> msg
        NetConn                   -> "Connected!"
        NetChat msg               -> msg
        NetMove                   -> "Got a NetMove message! :)"
        NetLoadResource resources -> toString resources
        otherwise                 -> "nope"
      chatInput = case userInput.action of
        UIChatAction msg -> msg
  in 
    { gameState
    | debug <- net
    , chatInput <- chatInput
    }


renderChatInput : Field.Content -> Element
renderChatInput content = Field.field Field.defaultStyle (Signal.send chatChannel << UIChatAction) "Chat" content


render : (Int, Int) -> GameState -> Element
render (winH, winW) { map, settings, players, loaded, debug, chatInput} =
  color grey <|
  container winH winW middle <|
  collage winH winW
  [toForm <| Text.plainText debug
  --,toForm <| renderChatInput chatInput
  ] 


delta : Signal Float
delta = Time.fps 30


userInput : Signal UserInput
userInput =
  UserInput
  <~ Signal.subscribe chatChannel
  ~  Keyboard.space
  ~  Keyboard.wasd


input : Signal Input
input = Input <~ delta ~ userInput ~ networkIn


gameState : Signal GameState
gameState = Signal.foldp stepGame defaultGame input


main : Signal Element
main = render <~ Window.dimensions ~ gameState
