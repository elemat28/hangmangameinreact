import React from "react";
import { useState, useEffect } from "react";
import RandomWordGenerator from "../components/data_fetch/RandomWordGenerator";
import FetchDefinition from "../components/data_fetch/FetchDefinition";
import Hangman from "../components/hangman_game/Hangman";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Popover from "@mui/material/Popover";
import EndOfGameScreen from "../components/user_interface/hangman_game/EndOfGameScreen";

import Backdrop from "@mui/material/Backdrop";
import OnScreenKeyboard from "../components/user_interface/hangman_game/OnScreenKeyboard";
import HangmanImage from "../components/user_interface/hangman_game/HangmanImage";
import Word from "../components/user_interface/hangman_game/Word";
export function HangmanPage() {
  const [wordOfTheGame, setWordOfTheGame] = React.useState(null);
  const [hangmanInstance, setHangmanInstance] = React.useState(null);
  const [gameState, setGameState] = React.useState(Hangman.initialGameState);
  const [disabledKeyboardButtons, setDisabledKeyboardButtons] = React.useState(
    []
  );

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    //gameDivRef.current.style.filter = "blur(10PX)";
    setOpen(true);
  };
  const handleClose = () => {
    //gameDivRef.current.style.filter = "";
    setOpen(false);
  };
  const handleToggle = () => {
    if (open) {
      handleClose();
    } else {
      handleOpen();
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
    if (gameState.hasFinished) {
      return;
    }
    if (character.length > 1) {
      return;
    }
    character = character.toLowerCase();
    hangmanInstance.MakeAGuess(character);
    console.debug(hangmanInstance.GetCurrentGameState());
    setGameState(hangmanInstance.GetCurrentGameState());
    setDisabledKeyboardButtons([character].concat(disabledKeyboardButtons));
    if (hangmanInstance.GetCurrentGameState().hasFinished) {
      handleOpen();
    }
  };

  const keyboardPressCallback = (event) => {
    console.log(event);
    keyPressCallback(event, event.key);
  };

  useEffect(() => {
    if (wordOfTheGame == null) {
      getWordAndCreateGame("noun");
    } else {
      console.log(`Clicked key: `);
      window.addEventListener("keydown", keyboardPressCallback);
    }
    return () => {
      window.removeEventListener("keydown", keyboardPressCallback);
    };
  }, [keyboardPressCallback]);

  useEffect(() => {
    if (wordOfTheGame == null) {
      getWordAndCreateGame("noun");
    } else {
      console.log(`Clicked key: `);
      window.addEventListener("keydown", keyboardPressCallback);
    }
    return () => {
      window.removeEventListener("keydown", keyboardPressCallback);
    };
  }, [keyboardPressCallback]);
  return (
    <>
      <div className="HangmanGame" ref={null}>
        <div className="adaptive-ui">
          <div className="adaptive-ui-header">
            <Paper
              className="hangman-word"
              elevation={3}
              onClick={handleToggle}
            >
              {gameState.currentWord.length > 0 ? (
                <Word arrayOfCharacters={gameState.currentWord} />
              ) : (
                <Skeleton
                  sx={{ width: "100%", height: "3em" }}
                  animation="wave"
                  variant="rectangular"
                />
              )}
            </Paper>
            <div className="game-word-tip">
              <Paper elevation={2}>Category: Noun</Paper>
            </div>
          </div>

          <div className="adaptive-ui-content">
            <Paper id="hanganPaper" elevation={2}>
              <HangmanImage
                NumberOfLinesToDraw={gameState.incorrectGueeses}
                heightPx={window.innerHeight * 0.4}
              />
            </Paper>
          </div>
        </div>
        <div className="keyboard-div">
          <OnScreenKeyboard
            buttonUseFunction={keyPressCallback}
            disabledButtonsArr={disabledKeyboardButtons}
          />
        </div>
      </div>
      <Backdrop open={open} onClick={handleClose}>
        <EndOfGameScreen outcome={gameState} wordData={wordOfTheGame} />
      </Backdrop>
    </>
  );
}
