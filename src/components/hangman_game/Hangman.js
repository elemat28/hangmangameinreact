
export default class Hangman {
    static initialGameState = {
        hasFinished: false
        , hasWon: false
        , currentWord: []
        , guessLimit: 10
        , incorrectGueeses: 0
        , correctLetters: []
        , incorrectLetters: []
        , allGuessedLetters: []
    }
    constructor(wordToGuess) {
        if (typeof (wordToGuess) != "string") {
            throw new Error("Text argument required");
        }
        this.word = wordToGuess;
        this.wrongGuessLimit = 10;
        this.correctGuesses = [];
        this.incorrectGuesses = [];
        this.hasFinished = false;
        this.hasWon = false;

    }

    #IsCharInWord(character) {
        return (
            this.word.toLowerCase().includes(character.toLowerCase())
        );
    }

    GetTotalNumOfGuesses() {
        return (
            this.correctGuesses.length + this.incorrectGuesses.length
        )
    }

    GetWrongGuessLimit() {
        return (
            this.wrongGuessLimit
        )
    }

    SetWrongGuessLimit(newLimit) {
        if (this.GetTotalNumOfGuesses() > 0) {
            throw new Error("Can't change game settings after the game starts!");
        }
        if (!Number.isInteger(newLimit)) {
            throw new Error("Only integers are accepted");
        }
        if (newLimit < 1) {
            throw new Error("User has to have at least 1 chance!");
        }
        this.wrongGuessLimit = newLimit;
    }

    GetNumOfIncorrectGuesses() {
        return (
            this.incorrectGuesses.length
        )
    }

    GetArrOfCorrectLetters() {
        return (
            this.correctGuesses
        )
    }

    GetArrOfIncorrectLetters() {
        return (
            this.incorrectGuesses
        )
    }

    GetArrOfAllGuessedLetters() {
        let allGuesses = this.incorrectGuesses.concat(this.correctGuesses).sort();
        return (
            allGuesses
        )
    }

    GetCurrentWord() {
        let stateOfWord = [];

        for (let index = 0; index < this.word.length; index++) {
            if (this.correctGuesses.includes((this.word.toLowerCase())[index])) {
                stateOfWord.push(this.word[index]);
            } else {
                stateOfWord.push("_");
            }

        }
        return (
            stateOfWord
        );
    }

    #UpdateState() {
        if (this.incorrectGuesses.length >= this.wrongGuessLimit) {
            this.hasFinished = true;
            return;
        }
        if (this.GetCurrentWord().indexOf("_") === -1) {
            this.hasWon = true;
            this.hasFinished = true;
        }
    }

    GetCurrentGameState() {
        let gameState = {
            hasFinished: this.hasFinished
            , hasWon: this.hasWon
            , currentWord: this.GetCurrentWord()
            , guessLimit: this.GetWrongGuessLimit()
            , incorrectGueeses: this.GetNumOfIncorrectGuesses()
            , correctLetters: this.GetArrOfCorrectLetters()
            , incorrectLetters: this.GetArrOfIncorrectLetters()
            , allGuessedLetters: this.GetArrOfAllGuessedLetters()
        }
        return (
            gameState
        );
    }

    MakeAGuess(letterToCheck) {
        let character = letterToCheck.toLowerCase();
        //Don't do anything if character has already been guessed
        if (this.GetArrOfAllGuessedLetters().includes(character)) {
            return;
        }

        if (this.hasFinished) {
            return;
        }

        if (this.#IsCharInWord(character)) {
            this.correctGuesses.push(character.toLowerCase());
            this.correctGuesses.sort();
        }
        else {
            this.incorrectGuesses.push(character.toLowerCase());
            this.incorrectGuesses.sort();
        }

        this.#UpdateState();
    }


}
