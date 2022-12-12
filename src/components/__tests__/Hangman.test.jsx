import Hangman from "../hangman_game/Hangman";
import GameState_word_test from "./expected/game_state/word_Test.json";


function CreateHangmanWithoutArgument(){
    return new Hangman();
}
describe("Constructor Behaviour", () => {
    it("Throws Error when instantiating without argument", () => {
        expect(CreateHangmanWithoutArgument).toThrowError("Text argument required");
    })
    it("Creates successfully when given a word as argument", () => {
        let gameInstance = new Hangman("Lorem");
        expect(gameInstance instanceof Hangman).toBe(true);
    })

    it("Has correct intial state when called with argument 'Test'", () => {
        let gameInstance = new Hangman("Test");
        expect(gameInstance.GetCurrentGameState()).toEqual(GameState_word_test[0]);
    })

    it.todo("Throws error when constructing with invalid string");
    it.todo("Throws error when constructing with non-string");
})

describe("User input handling", () => {

    const word = "Test";

    describe('Correct inputs', () => {
        let lowerCaseInputResult;
        let upperCaseInputResult;
        it("Accepts lower-case guesses", () => {
            let gameInstance = new Hangman(word);
            gameInstance.MakeAGuess("e");
            lowerCaseInputResult = gameInstance.GetCurrentGameState();
            expect(lowerCaseInputResult).toEqual(GameState_word_test[1]);
        })
        it("Accepts upper-case guesses", () => {
            let gameInstance = new Hangman(word);
            gameInstance.MakeAGuess("E");
            upperCaseInputResult = gameInstance.GetCurrentGameState();
            expect(upperCaseInputResult).toEqual(GameState_word_test[1]);
        })
        
        it("Has the same state after lower or upper case correct input", () => {
            expect(lowerCaseInputResult).toEqual(upperCaseInputResult);
        })
        it("Correctly handles letter appearing multiple times(word:Test)", () => {
            let gameInstance = new Hangman(word);
            gameInstance.MakeAGuess("t");
            expect(gameInstance.GetCurrentGameState()).toEqual(GameState_word_test[2]);
        })

    })
    describe('Incorrect inputs', () => {
        let lowerCaseInputResult;
        let upperCaseInputResult;
        it("Accepts lower-case guesses", () => {
            let gameInstance = new Hangman(word);
            gameInstance.MakeAGuess("a");
            lowerCaseInputResult = gameInstance.GetCurrentGameState();
            expect(lowerCaseInputResult).toEqual(GameState_word_test[3]);
        })
        it("Accepts upper-case guesses", () => {
            let gameInstance = new Hangman(word);
            gameInstance.MakeAGuess("A");
            upperCaseInputResult = gameInstance.GetCurrentGameState();
            expect(upperCaseInputResult).toEqual(GameState_word_test[3]);
        })
        
        it("Has the same state after lower or upper case incorrect input", () => {
            expect(lowerCaseInputResult).toEqual(upperCaseInputResult);
        })
        it.todo("Throw error when numbers are used");
        it.todo("Throw error when special characters used");
    })
})

it.todo("Correct state when won");
it.todo("Correct status when lost");
it.todo("Ignore repeated guess");
it.todo("Do not allow to continue playing after the game has been  won");
it.todo("Do not allow to continue playing after the game has been lost");
it.todo("Change number of guesses before the game starts");
it.todo("Try to change number of guesses after the game starts");
it.todo("Change number of tries before games start and lose after correct number of tries");


