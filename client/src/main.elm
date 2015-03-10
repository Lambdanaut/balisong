import Graphics.Element (..)
import Keyboard
import Mouse
import Signal
import Signal (Signal, (<~), (~))
import Text
import Time
import WebSocket
import Window

{-- Part 1: Model the user input ----------------------------------------------

What information do you need to represent all relevant user input?

Task: Redefine `UserInput` to include all of the information you need.
    Redefine `userInput` to be a signal that correctly models the user
    input as described by `UserInput`.

------------------------------------------------------------------------------}

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
  , networkIn : String
  }



{-- Part 2: Model the game ----------------------------------------------------

What information do you need to represent the entire game?

Tasks: Redefine `GameState` to represent your particular game.
       Redefine `defaultGame` to represent your initial game state.

For example, if you want to represent many objects that just have a position,
your GameState might just be a list of coordinates and your default game might
be an empty list (no objects at the start):

    type GameState = { objects : [(Float,Float)] }
    defaultGame = { objects = [] }

------------------------------------------------------------------------------}

type alias Placeable a = 
  { a |
    id   : String
  , x    : Float 
  , y    : Float
  , z    : Float
  }

type alias Player = Placeable
  { name : String
  }

type alias Tile = Placeable {}

type alias LoadedResource = {}

type alias GameState =
  { map     : List Tile
  , players : List Player
  , loaded  : {} -- Dictionary of {resource id: loaded data}
  , netmsg : String
  }

defaultGame : GameState
defaultGame = 
  { map     = []
  , players = []
  , loaded  = {}
  , netmsg = ""
  }



{-- Part 3: Update the game ---------------------------------------------------

How does the game step from one state to another based on user input?

Task: redefine `stepGame` to use the UserInput and GameState
      you defined in parts 1 and 2. Maybe use some helper functions
      to break up the work, stepping smaller parts of the game.

------------------------------------------------------------------------------}

stepGame : Input -> GameState -> GameState
stepGame {timeDelta, userInput, networkIn} gameState = {gameState | netmsg <- networkIn}



{-- Part 4: Display the game --------------------------------------------------

How should the GameState be displayed to the user?

Task: redefine `display` to use the GameState you defined in part 2.

------------------------------------------------------------------------------}

render : GameState -> Element
render gameState = Text.asText gameState.netmsg



{-- That's all folks! ---------------------------------------------------------

The following code puts it all together and shows it on screen.

------------------------------------------------------------------------------}

delta : Signal Float
delta = Time.fps 30


networkOut : Signal String
networkOut = toString <~ Mouse.position


networkIn : Signal String
networkIn = WebSocket.connect "ws://localhost:8080" networkOut


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
main = render <~ gameState
