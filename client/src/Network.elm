module Network where


import Json.Decode ((:=), Decoder, decodeString, object1, oneOf, string, andThen, succeed, fail)
import Mouse
import Signal (Signal, (<~), (~))
import WebSocket

type NetMessage
  = NetDebug String
  | NetConn
  | NetChat String
  | NetMove
  | NetLoadResource (List String)


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
