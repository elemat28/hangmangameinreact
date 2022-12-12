import Hangman from "../hangman_game/Hangman";
import GameState_Test from "./expected/game_state/Test.json";

let gameInstance;

function CreateHangmanWithoutArgument(){
    return new Hangman();
}

test("Throw Error when instantiating without argument", () => {
    expect(CreateHangmanWithoutArgument).toThrowError("Text argument required");
})

test("Object create successfully when give a word as argument", () => {
    gameInstance = new Hangman("Test");
    expect(gameInstance instanceof Hangman).toBe(true);
})

test("Correct intial state when called with argument 'Test'", () => {
    gameInstance = new Hangman("Test");
    expect(gameInstance.GetCurrentGameState()).toEqual(GameState_Test[0]);
})

test("Correct state after guessing correctly, 'T'", () => {
    gameInstance.MakeAGuess('T');
    expect(gameInstance.GetCurrentGameState()).toEqual(GameState_Test[1]);
})

test.todo("Correct state after guessing incorrectly, 'A'");
test.todo("Correct state when won");
test.todo("Correct status when lost");
test.todo("Ignore repeated guess");
test.todo("Do not allow to continue playing after the game has been  won");
test.todo("Do not allow to continue playing after the game has been lost");
test.todo("Upper case letters accepted");
test.todo("Lower case letters accepted");
test.todo("Upper case letters working");
test.todo("Lower case letters working");
test.todo("Throw error when numbers are used");
test.todo("Throw error when special characters used");
test.todo("Change number of guesses before the game starts");
test.todo("Try to change number of guesses after the game starts");
test.todo("Change number of tries before games start and lose after correct number of tries");


