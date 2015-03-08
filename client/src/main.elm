import Graphics.Element (..)
import Keyboard
import Mouse
import Signal
import Signal (Signal, (<~))
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

type alias UserInput = {space : Bool, arrows : {x : Int, y : Int}}

type alias Input =
    { timeDelta : Float
    , userInput : UserInput
    , networkInput : String
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

type alias GameState = String

defaultGame : GameState
defaultGame = "LOADING"



{-- Part 3: Update the game ---------------------------------------------------

How does the game step from one state to another based on user input?

Task: redefine `stepGame` to use the UserInput and GameState
      you defined in parts 1 and 2. Maybe use some helper functions
      to break up the work, stepping smaller parts of the game.

------------------------------------------------------------------------------}

stepGame: Input -> GameState -> GameState
stepGame {timeDelta, userInput, networkInput} gameState = networkInput



{-- Part 4: Display the game --------------------------------------------------

How should the GameState be displayed to the user?

Task: redefine `display` to use the GameState you defined in part 2.

------------------------------------------------------------------------------}

display: GameState -> Element
display gameState = Text.asText gameState



{-- That's all folks! ---------------------------------------------------------

The following code puts it all together and shows it on screen.

------------------------------------------------------------------------------}

delta : Signal Float
delta = Time.fps 30


networkOutput : Signal String
networkOutput = toString <~ Mouse.position

-- Signal for reading messages from the network
networkInput : Signal String
networkInput = WebSocket.connect "ws://localhost:8080" networkOutput


userInput : Signal UserInput
userInput =
  Signal.map2 UserInput
    Keyboard.space
    Keyboard.wasd


input : Signal Input
input = Signal.sampleOn delta (Signal.map3 Input delta userInput networkInput)


gameState : Signal GameState
gameState = Signal.foldp stepGame defaultGame input


main : Signal Element
main = Signal.map display gameState
