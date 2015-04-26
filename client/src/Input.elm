module Input where


import Graphics.Input.Field as Field

import Keyboard
import Network (NetMessage(..), networkIn)
import Signal
import Signal (Signal, (<~), (~))
import Time


type UIAction 
  = UIChatAction Field.Content

type alias UserInput = 
  { action : UIAction
  , space  : Bool
  , arrows : 
    { x : Int
    , y : Int
    }
  , enter  : Bool
  }

type alias Input =
  { timeDelta : Float
  , userInput : UserInput
  , netIn : NetMessage
  }


chatChannel : Signal.Channel UIAction
chatChannel = Signal.channel <| UIChatAction Field.noContent


delta : Signal Float
delta = Time.fps 30


userInput : Signal UserInput
userInput =
  UserInput
  <~ Signal.subscribe chatChannel
  ~  Keyboard.space
  ~  Keyboard.wasd
  ~  Keyboard.enter


input : Signal Input
input = Input <~ delta ~ userInput ~ networkIn
