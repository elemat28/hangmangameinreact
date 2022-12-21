import React from "react";
import { useState, useEffect, useRef } from "react";
import RandomWordGenerator from "../components/data_fetch/RandomWordGenerator";
import FetchDefinition from "../components/data_fetch/FetchDefinition";
import Hangman from "../components/hangman_game/Hangman";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Popover from "@mui/material/Popover";
import "./Hangman.css";
import EndOfGameScreen from "../components/user_interface/hangman_game/EndOfGameScreen";
import TuneIcon from "@mui/icons-material/Tune";
import Backdrop from "@mui/material/Backdrop";
import OnScreenKeyboard from "../components/user_interface/hangman_game/OnScreenKeyboard";
import HangmanImage from "../components/user_interface/hangman_game/HangmanImage";
import Word from "../components/user_interface/hangman_game/Word";
import SettingsHandler from "../scripts/settingsHandler";
import IconButton from "@mui/material/IconButton";
import { ButtonGroup, Typography, Button } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useTheme } from "@emotion/react";
import {
  wordTypeMenu,
  lenghtOfWordMenu,
} from "../components/user_interface/hangman_game/HangmanSettings";
import { StateHandler, RefHandler } from "../scripts/settingsHandler";
import VerticalTabs from "../components/user_interface/general/VerticalTabs";

export function HangmanPage() {
  const theme = useTheme();
  const wordTypeSetting = new SettingsHandler(
    SettingsHandler.storageType.localStorage,
    "typeOfWord",
    "noun"
  );
  const minimumLenghtOfWordSetting = new SettingsHandler(
    SettingsHandler.storageType.localStorage,
    "minWordLen",
    "6"
  );
  const gameHistorySetting = new SettingsHandler(
    SettingsHandler.storageType.localStorage,
    "gameHistory",
    [],
    true
  );
  const minimumLenghtOfWord = useRef(minimumLenghtOfWordSetting.getOrSet());
  const minimumLenghtOfWordHandler = new RefHandler(
    minimumLenghtOfWordSetting,
    minimumLenghtOfWord
  );
  const typeOfWord = useRef(wordTypeSetting.getOrSet());
  const typeOfWordHandler = new RefHandler(wordTypeSetting, typeOfWord);

  const gameHistory = useRef(gameHistorySetting.getOrSet());
  const gameHistoryHandler = new RefHandler(gameHistorySetting, gameHistory);

  const wordOfTheGame = useRef(null);
  const hangmanInstance = useRef(null);
  const currentGameTypeOfWordRef = useRef(null);
  const [gameState, setGameState] = React.useState(Hangman.initialGameState);
  const [gameSettingsOpen, setGameSettingsOpen] = React.useState(false);
  const [disabledKeyboardButtons, setDisabledKeyboardButtons] = React.useState(
    []
  );
  const gameDivRef = useRef();
  const UIContentRef = useRef();
  const hangmanImgRef = useRef();
  const settingsOverlayRef = useRef();
  const adaptiveUiRef = useRef();
  const settingsComponentRef = useRef();
  const [inMenu, setInMenu] = useState(false);
  const [endOfGameoverlayOpen, setEndOfGameoverlayOpen] = React.useState(false);
  const handleOpenEndOfGame = () => {
    gameDivRef.current.style.filter = "blur(10PX)";
    setEndOfGameoverlayOpen(true);
  };
  const handleEndOfGameClose = () => {
    gameDivRef.current.style.filter = "";
    setEndOfGameoverlayOpen(false);
    if (gameState.hasFinished) {
      getWordAndCreateGame();
    }
  };
  const handleEndOfGameToggle = () => {
    if (endOfGameoverlayOpen) {
      handleEndOfGameClose();
    } else {
      handleOpenEndOfGame();
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
    hangmanInstance.current = null;
    currentGameTypeOfWordRef.current = null;
    let wordData = await fetchWordWithDefinition(wordType);
    console.debug(wordType);
    wordOfTheGame.current = wordData;
    let newGame = new Hangman(wordData[0].word);
    hangmanInstance.current = newGame;
    console.log(wordData);
    setGameState(hangmanInstance.current.GetCurrentGameState());
    currentGameTypeOfWordRef.current = wordType;
    setDisabledKeyboardButtons([]);
    console.debug(gameState);
  }

  function recordResultToLocalHistory(word, wordCategory, hangmanState) {
    let newRecord = {
      word: word,
      wordCategory: wordCategory,
      timestamp: new Date().getTime(),
      hangmanState: hangmanState,
    };
    console.debug(newRecord);
    gameHistoryHandler.push(newRecord);
  }

  const keyPressCallback = (event, character) => {
    if (hangmanInstance.current == null) {
      return;
    }
    if (gameState.hasFinished) {
      return;
    }
    if (character.length > 1) {
      return;
    }
    character = character.toLowerCase();
    hangmanInstance.current.MakeAGuess(character);
    console.debug(hangmanInstance.current.GetCurrentGameState());
    setGameState(hangmanInstance.current.GetCurrentGameState());
    setDisabledKeyboardButtons([character].concat(disabledKeyboardButtons));
    if (hangmanInstance.current.GetCurrentGameState().hasFinished) {
      recordResultToLocalHistory(
        wordOfTheGame.current[0].word,
        currentGameTypeOfWordRef.current,
        hangmanInstance.current.GetCurrentGameState()
      );
      handleOpenEndOfGame();
    }
  };

  const keyboardPressCallback = (event) => {
    console.log(event);
    keyPressCallback(event, event.key);
  };

  function openGameSettingsCallback(event) {
    if (inMenu) {
      settingsOverlayRef.current.style.display = "none";
      adaptiveUiRef.current.style.display = "flex";
    } else {
      settingsOverlayRef.current.style.display = "flex";
      adaptiveUiRef.current.style.display = "none";
    }
    setInMenu(!inMenu);
  }

  useEffect(() => {
    console.log(UIContentRef.current.clientHeight);
    UIContentRef.current.firstChild.style.height =
      UIContentRef.current.clientHeight + "px";
    try {
      console.log(hangmanImgRef.current);
      UIContentRef.current.firstChild.firstChild.style.height =
        UIContentRef.current.clientHeight + "px";
      UIContentRef.current.firstChild.firstChild.style.width =
        (2 / 3) * UIContentRef.current.clientHeight + "px";
    } catch {}
    if (wordOfTheGame.current == null) {
      getWordAndCreateGame(typeOfWord.current);
    } else {
      console.log(`Clicked key: `);
      window.addEventListener("keydown", keyboardPressCallback);
    }
    return () => {
      window.removeEventListener("keydown", keyboardPressCallback);
    };
  }, [keyboardPressCallback]);
  console.log(wordTypeMenu(typeOfWordHandler.set));
  return (
    <>
      <div
        key={"gameref"}
        className="HangmanGame"
        ref={gameDivRef}
        style={{
          alignSelf: "center",
          height: "100%",
        }}
      >
        <div
          className="settings-overlay"
          ref={settingsOverlayRef}
          style={{ position: "relative" }}
        >
          <Backdrop
            id={"backdrop_gameSettings"}
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              position: "absolute",
              margin: "5%",
            }}
            open={true}
          >
            <Paper
              ref={settingsComponentRef}
              sx={{
                display: "flex",
                flexGrow: 1,
                height: "100%",
                flexDirection: "column",
              }}
            >
              {VerticalTabs({
                settingsPages: [
                  wordTypeMenu(typeOfWordHandler),
                  lenghtOfWordMenu(minimumLenghtOfWordHandler),
                ],
                callbackFunction: openGameSettingsCallback,
              })}
            </Paper>
          </Backdrop>
        </div>
        <div ref={adaptiveUiRef} className="adaptive-ui">
          <div className="adaptive-ui-header">
            <Paper
              className="hangman-word"
              elevation={3}
              onClick={handleEndOfGameToggle}
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
              <Paper sx={{ textTransform: "capitalize" }} elevation={2}>
                <Typography variant="h5"> Category </Typography>
                <Button
                  onClick={openGameSettingsCallback}
                  variant="contained"
                  endIcon={<TuneIcon />}
                >
                  <Typography variant="body1">
                    {currentGameTypeOfWordRef.current != null
                      ? currentGameTypeOfWordRef.current
                      : typeOfWord.current}
                  </Typography>
                </Button>
              </Paper>
            </div>
          </div>

          <div className="adaptive-ui-content" ref={UIContentRef}>
            <Paper id="hangman-paper" style={{ height: 0 }} elevation={2}>
              <HangmanImage
                NumberOfLinesToDraw={gameState.incorrectGueeses}
                heightPx={window.innerHeight * 0.4}
              />
            </Paper>
          </div>
        </div>
        <div
          style={{
            maxWidth: theme.breakpoints.values.lg,
            heigth: { xs: "50%", sm: "40%", md: "30%" },
          }}
          className="keyboard-div"
        >
          <OnScreenKeyboard
            buttonUseFunction={keyPressCallback}
            disabledButtonsArr={disabledKeyboardButtons}
          />
        </div>
      </div>
      <Backdrop
        key="gameOverBackdrop"
        sx={{
          background: "rgb(22,1,18)",
          background:
            "linear-gradient(0deg, rgba(22,1,18,0.9084677816439075) 3%, rgba(0,0,0,0.7011848684786415) 14%, rgba(3,0,3,0.27821550983674714) 47%, rgba(4,0,4,0.9280754538143382) 93%, rgba(19,1,16,1) 100%)",
        }}
        open={endOfGameoverlayOpen}
        onClick={handleEndOfGameClose}
      >
        <EndOfGameScreen
          key={`endgame_${wordOfTheGame.current}`}
          outcome={gameState}
          wordData={wordOfTheGame.current}
          wordType={
            currentGameTypeOfWordRef.current != null
              ? currentGameTypeOfWordRef.current
              : typeOfWord.current
          }
          newGameFunction={getWordAndCreateGame}
        />
      </Backdrop>
    </>
  );
}
