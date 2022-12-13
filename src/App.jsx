import React from "react";
import { ThemeProvider } from "@emotion/react";
import "./App.css";
import getUserPrefferedTheme, {
  ResolveThemeToUse,
} from "./components/user_interface/general/ThemeSelector";
import CssBaseline from "@mui/material/CssBaseline";
import Hangman from "./components/hangman_game/Hangman";
import OnScreenKeyboard from "./components/user_interface/hangman_game/OnScreenKeyboard";
import HangmanImage from "./components/user_interface/hangman_game/HangmanImage";
import Word from "./components/user_interface/hangman_game/Word";
import { useState } from "react";
import RandomWordGenerator from "./components/data_fetch/RandomWordGenerator";
import FetchDefinition from "./components/data_fetch/FetchDefinition";
import ThemeSelector from "./components/user_interface/general/ThemeSelector";
import { themes } from "./components/user_interface/themes";

function App() {
  const [theme, setTheme] = React.useState(ResolveThemeToUse());
  const handleChange = (event) => {
    if (theme === themes.light) {
      setTheme(themes.dark);
    } else {
      setTheme(themes.light);
    }

    console.debug(event);
  };
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <header>
          <p>Hangman Game App</p>
          <ThemeSelector themeToggleCallback={handleChange} />
        </header>
        <main>
          <div className="HangmanGame">
            <Word />
            <HangmanImage />
            <div className="keyboard-div">
              <OnScreenKeyboard />
            </div>
          </div>
        </main>
      </ThemeProvider>
    </div>
  );
}

export default App;
