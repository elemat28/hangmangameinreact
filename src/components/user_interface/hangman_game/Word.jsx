import React from "react";
import "./Word.css";
import { useTheme } from "@mui/material";
import { useEffect } from "react";
function Word({ arrayOfCharacters }) {
  const sizingThreshold = 10;
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
  let fontSizeCoefficient;
  if (arrayOfCharacters.length < sizingThreshold) {
    fontSizeCoefficient = sizingThreshold;
  } else {
    fontSizeCoefficient = arrayOfCharacters.length;
  }

  return <>{arrayOfCharacters.map(letterWrapper)}</>;
}

export default Word;
