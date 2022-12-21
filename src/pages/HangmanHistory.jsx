import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SettingsHandler from "../scripts/settingsHandler";
import { useTheme } from "@mui/material/styles";
import MasonryWithVariableHeightItems from "../components/user_interface/MasonryWithVariableHeightItems";
import "./HangmanHistory.css";
import SimpleAccordion from "../components/SimpleAccordion.jsx";
export function HangmanHistory() {
  const theme = useTheme();
  const gameHistorySetting = new SettingsHandler(
    SettingsHandler.storageType.localStorage,
    "gameHistory",
    [],
    true
  );
  let storedData = gameHistorySetting.getOrSet();
  let parsedData = [];
  if (storedData.length > 0) {
    let temp = [storedData[0].timestamp, storedData];
    parsedData[0] = temp;
  }

  console.log(storedData);
  let exampleRecord2 = [
    1671609994597,
    [
      {
        word: "propitiate",
        wordCategory: "verb",
        timestamp: 1671608994597,
        hangmanState: {
          hasFinished: true,
          hasWon: false,
          currentWord: ["p", "r", "o", "p", "i", "t", "i", "_", "t", "e"],
          guessLimit: 10,
          incorrectGueeses: 10,
          correctLetters: ["e", "i", "o", "p", "r", "t"],
          incorrectLetters: ["b", "h", "j", "k", "l", "m", "n", "q", "w", "y"],
          allGuessedLetters: [
            "b",
            "e",
            "h",
            "i",
            "j",
            "k",
            "l",
            "m",
            "n",
            "o",
            "p",
            "q",
            "r",
            "t",
            "w",
            "y",
          ],
        },
      },
      {
        word: "usher",
        wordCategory: "verb",
        timestamp: 1671609014916,
        hangmanState: {
          hasFinished: true,
          hasWon: false,
          currentWord: ["u", "_", "h", "_", "_"],
          guessLimit: 10,
          incorrectGueeses: 10,
          correctLetters: ["h", "u"],
          incorrectLetters: ["b", "i", "j", "k", "l", "m", "n", "p", "t", "y"],
          allGuessedLetters: [
            "b",
            "h",
            "i",
            "j",
            "k",
            "l",
            "m",
            "n",
            "p",
            "t",
            "u",
            "y",
          ],
        },
      },
      {
        word: "scuff",
        wordCategory: "verb",
        timestamp: 1671609051833,
        hangmanState: {
          hasFinished: true,
          hasWon: false,
          currentWord: ["_", "_", "u", "_", "_"],
          guessLimit: 10,
          incorrectGueeses: 10,
          correctLetters: ["u"],
          incorrectLetters: ["e", "i", "k", "l", "o", "p", "q", "r", "w", "y"],
          allGuessedLetters: [
            "e",
            "i",
            "k",
            "l",
            "o",
            "p",
            "q",
            "r",
            "u",
            "w",
            "y",
          ],
        },
      },
      {
        word: "towel",
        wordCategory: "verb",
        timestamp: 1671609433619,
        hangmanState: {
          hasFinished: true,
          hasWon: false,
          currentWord: ["_", "o", "_", "_", "l"],
          guessLimit: 10,
          incorrectGueeses: 10,
          correctLetters: ["l", "o"],
          incorrectLetters: ["b", "h", "i", "j", "k", "m", "n", "p", "u", "y"],
          allGuessedLetters: [
            "b",
            "h",
            "i",
            "j",
            "k",
            "l",
            "m",
            "n",
            "o",
            "p",
            "u",
            "y",
          ],
        },
      },
    ],
  ];
  let exampleRecord1 = [
    1671604969741,
    [
      {
        word: "attest",
        wordCategory: "verb",
        timestamp: 1671604969741,
        hangmanState: {
          hasFinished: true,
          hasWon: false,
          currentWord: ["_", "t", "t", "_", "_", "t"],
          guessLimit: 10,
          incorrectGueeses: 10,
          correctLetters: ["t"],
          incorrectLetters: ["d", "f", "g", "h", "j", "r", "v", "x", "y", "z"],
          allGuessedLetters: [
            "d",
            "f",
            "g",
            "h",
            "j",
            "r",
            "t",
            "v",
            "x",
            "y",
            "z",
          ],
        },
      },
      {
        word: "best",
        wordCategory: "verb",
        timestamp: 1671604989741,
        hangmanState: {
          hasFinished: true,
          hasWon: false,
          currentWord: ["_", "t", "t", "_", "_", "t"],
          guessLimit: 10,
          incorrectGueeses: 10,
          correctLetters: ["t"],
          incorrectLetters: ["d", "f", "g", "h", "j", "r", "v", "x", "y", "z"],
          allGuessedLetters: [
            "d",
            "f",
            "g",
            "h",
            "j",
            "r",
            "t",
            "v",
            "x",
            "y",
            "z",
          ],
        },
      },
    ],
  ];
  let [arratOfRecordsPerDay, setArrayOfRecords] = React.useState([
    exampleRecord1,
    exampleRecord2,
  ]);
  return (
    <div className="hangman-game-history">
      <h1>History</h1>
      <p>
        As your history of games develops and with it the feature set of this
        application, new insightful way of quantifying your performance will
        become available. But for now, it's just column per Date, enjoy!
      </p>
      {MasonryWithVariableHeightItems(parsedData)}
    </div>
  );
}
