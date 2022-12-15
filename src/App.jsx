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
  const handleThemeChange = (event) => {
    if (theme === themes.light) {
      setTheme(themes.dark);
    } else {
      setTheme(themes.light);
    }
    console.debug(event);
  };

  const handleButton = (event, character) => {
    console.debug(character);
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
            <Word />
            <HangmanImage />
            <div className="keyboard-div">
              <OnScreenKeyboard buttonUseFunction={handleButton} />
            </div>
          </div>
        </main>
      </ThemeProvider>
    </div>
  );
}

export default App;
