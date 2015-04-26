module Input where

import Graphics.Input.Field as Field
import Json.Decode ((:=), Decoder, decodeString, object1, oneOf, string, andThen, succeed, fail)
import Keyboard
import Mouse
import Signal
import Signal (Signal, (<~), (~))
import Time
import WebSocket

type UIAction 
  = UIChatAction Field.Content
  | UIChatOutAction String

type NetMessage
  = NetDebug String
  | NetConn
  | NetChat String
  | NetMove
  | NetLoadResource (List String)

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


{- Chat -}
chatChannel : Signal.Channel Field.Content
chatChannel = Signal.channel Field.noContent


chatOut : Signal UIAction
chatOut = Signal.sampleOn (Keyboard.enter) ((\field -> UIChatOutAction (field.string)) <~ Signal.subscribe chatChannel)


{- Network -}
netMessageDecoder : Decoder NetMessage
netMessageDecoder = ("tag" := string) `andThen` \tag -> 
  case tag of
    "NetDebug" -> object1 NetDebug ("contents" := string)
    "NetConn"  -> succeed NetConn
    "NetChat"  -> object1 NetChat ("contents" := string)
    "NetMove"  -> succeed NetMove
    _          -> fail (tag ++ " is not a valid tag")


parseNetMessage : String -> NetMessage
parseNetMessage jsonText = case decodeString netMessageDecoder jsonText of
  Ok decoded -> decoded
  Err err    -> NetDebug <| "Failure to parseNetMessage: " ++ err


networkOut : Signal String
networkOut = (\ x -> toString x) <~ Mouse.position


networkIn : Signal NetMessage
networkIn = parseNetMessage <~ WebSocket.connect "ws://localhost:8080" networkOut


{- Main Signals -}
delta : Signal Float
delta = Time.fps 30


uiaction : Signal UIAction
uiaction = Signal.mergeMany 
  [ chatOut
  , UIChatAction <~ Signal.subscribe chatChannel
  ]


userInput : Signal UserInput
userInput =
  UserInput
  <~ uiaction
  ~  Keyboard.space
  ~  Keyboard.wasd
  ~  Keyboard.enter


input : Signal Input
input = Input <~ delta ~ userInput ~ networkIn
