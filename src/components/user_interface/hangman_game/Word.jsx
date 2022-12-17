import React from "react";
import "./Word.css";
import { useTheme } from "@mui/material";
import { useEffect } from "react";
function Word({ arrayOfCharacters }) {
  function letterWrapper(character, index) {
    return (
      <div
        className="character-slot"
        key={index}
        style={{ fontSize: `${90 / fontSizeCoefficient}vw` }}
      >
        {character}
      </div>
    );
  }
  let fontSizeCoefficient = arrayOfCharacters.length;
  let fontSize = 90 / fontSizeCoefficient;
  return (
    <div className="hangman-word">{arrayOfCharacters.map(letterWrapper)}</div>
  );
}

export default Word;
