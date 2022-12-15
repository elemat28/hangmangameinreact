/* eslint-disable no-unused-vars */
import React from "react";
import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";

import Hangman from "./components/hangman_game/Hangman";
import OnScreenKeyboard from "./components/user_interface/hangman_game/OnScreenKeyboard";
import HangmanImage from "./components/user_interface/hangman_game/HangmanImage";
import Word from "./components/user_interface/hangman_game/Word";
import RandomWordGenerator from "./components/data_fetch/RandomWordGenerator";
import FetchDefinition from "./components/data_fetch/FetchDefinition";
import ThemeSelector from "./components/user_interface/general/ThemeSelector";
import { ResolveThemeToUse } from "./components/user_interface/general/ThemeSelector";
import { themes } from "./components/user_interface/themes";

function App() {
  const [theme, setTheme] = React.useState(ResolveThemeToUse());

  //toDo: generate word from API
  let debugWord = "Test";
  console.debug(`Word of the game: ${debugWord}`);

  const [hangmanInstance, setHangmanInstance] = React.useState(
    new Hangman(debugWord)
  );
  const [gameState, setGameState] = React.useState(
    hangmanInstance.GetCurrentGameState()
  );

  const [disabledKeyboardButtons, setDisabledKeyboardButtons] = React.useState(
    []
  );

  const handleThemeChange = (event) => {
    if (theme === themes.light) {
      setTheme(themes.dark);
    } else {
      setTheme(themes.light);
    }
  };

  const handleButton = (event, character) => {
    console.debug(character);
    hangmanInstance.MakeAGuess(character);
    console.debug(hangmanInstance.GetCurrentGameState());
    setGameState(hangmanInstance.GetCurrentGameState());
    setDisabledKeyboardButtons([character].concat(disabledKeyboardButtons));
    console.log(event);
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <header>
          <p>Hangman Game App</p>
          <ThemeSelector themeToggleCallback={handleThemeChange} />
        </header>
        <main>
          <div className="HangmanGame">
            <Word arrayOfCharacters={gameState.currentWord} />
            <HangmanImage NumberOfLinesToDraw={gameState.incorrectGueeses} />
            <div className="keyboard-div">
              <OnScreenKeyboard
                buttonUseFunction={handleButton}
                disabledButtonsArr={disabledKeyboardButtons}
              />
            </div>
          </div>
        </main>
      </ThemeProvider>
    </div>
  );
}

export default App;
