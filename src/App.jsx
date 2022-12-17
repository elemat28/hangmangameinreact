/* eslint-disable no-unused-vars */
import React from "react";
import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import MobileAppBar from "./components/user_interface/general/MobileAppBar";
import Hangman from "./components/hangman_game/Hangman";
import OnScreenKeyboard from "./components/user_interface/hangman_game/OnScreenKeyboard";
import HangmanImage from "./components/user_interface/hangman_game/HangmanImage";
import Word from "./components/user_interface/hangman_game/Word";
import RandomWordGenerator from "./components/data_fetch/RandomWordGenerator";
import FetchDefinition from "./components/data_fetch/FetchDefinition";
import ThemeSelector from "./components/user_interface/general/ThemeSelector";
import { ResolveThemeToUse } from "./components/user_interface/general/ThemeSelector";
import { themes } from "./components/user_interface/themes";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useLayoutEffect, useRef, useState } from "react";
import { type } from "@testing-library/user-event/dist/type";
function App() {
  const headerRef = useRef(null);
  const [theme, setTheme] = React.useState(ResolveThemeToUse());
  const [heightOfHeader, setHeightOfHeader] = useState(0);
  const [width, setWidth] = useState(0);
  const [wordOfTheGame, setWordOfTheGame] = React.useState(null);
  const [hangmanInstance, setHangmanInstance] = React.useState(null);
  const [gameState, setGameState] = React.useState(Hangman.initialGameState);
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

  async function fetchWordWithDefinition(wordType = null) {
    let wordFetched;
    let definitions = null;
    while (definitions == null) {
      wordFetched = await RandomWordGenerator(wordType);
      definitions = await FetchDefinition(wordFetched).then(
        (arrayOfDefinitions) => {
          return arrayOfDefinitions;
        },
        () => {
          return null;
        }
      );
      if (definitions != null) {
        return definitions;
      }
    }
  }

  async function getWordAndCreateGame(wordType = null) {
    let wordData = await fetchWordWithDefinition(wordType);
    setWordOfTheGame(wordData);
    let newGame = new Hangman(wordData[0].word);
    setHangmanInstance(newGame);
    console.log(wordData[0].word);
    setGameState(newGame.GetCurrentGameState());
    setDisabledKeyboardButtons([]);
  }

  const keyPressCallback = (event, character) => {
    hangmanInstance.MakeAGuess(character);
    console.debug(hangmanInstance.GetCurrentGameState());
    setGameState(hangmanInstance.GetCurrentGameState());
    setDisabledKeyboardButtons([character].concat(disabledKeyboardButtons));
  };

  useLayoutEffect(() => {
    setHeightOfHeader(headerRef.current.clientHeight);
    setWidth(headerRef.current.clientWidth);
  }, []);

  useEffect(() => {
    if (wordOfTheGame == null) {
      getWordAndCreateGame("noun");
    }
  }, []);
  return (
    <div
      className="App"
      style={{
        width: window.innerWidth,
        height: window.innerHeight - heightOfHeader,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <header ref={headerRef}>
          <MobileAppBar
            title="Hangman Game"
            themeSelector={
              <ThemeSelector themeToggleCallback={handleThemeChange} />
            }
          ></MobileAppBar>
        </header>
        <main>
          <div className="HangmanGame">
            <Word arrayOfCharacters={gameState.currentWord} />
            <HangmanImage
              NumberOfLinesToDraw={gameState.incorrectGueeses}
              heightPx={window.innerHeight * 0.4}
            />
            <div className="keyboard-div">
              <OnScreenKeyboard
                buttonUseFunction={keyPressCallback}
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
