import "./App.css";
import ThemeSelector from "./components/user_interface/general/ThemeSelector";

import Hangman from "./components/hangman_game/Hangman";
import OnScreenKeyboard from "./components/user_interface/hangman_game/OnScreenKeyboard";
import HangmanImage from "./components/user_interface/hangman_game/HangmanImage";
import Word from "./components/user_interface/hangman_game/Word";

import RandomWordGenerator from "./components/data_fetch/RandomWordGenerator";
import FetchDefinition from "./components/data_fetch/FetchDefinition";

function App() {
  return (
    <div className="App">
      <header>
        <p>Hangman Game App</p>
        <ThemeSelector />
      </header>
      <div className="HangmanGame">
        <Word />
        <HangmanImage />
        <div className="keyboard-div">
          <OnScreenKeyboard />
        </div>
      </div>
    </div>
  );
}

export default App;
