import React from "react";
import Button from "@mui/material/Button";
import "./OnScreenKeyboard.css";

function OnScreenKeyboard({ spaceButton, buttonUseFunction }) {
  function keyboardButton(character, onClick, disabled = false) {
    return (
      <Button
        variant="contained"
        id={`osk_button_${character}`}
        disabled={disabled}
        onClick={(event) => onClick(event, character)}
      >
        {character}
      </Button>
    );
  }
  return (
    <div className="on-screen-keyboard">
      <div className="keyboard-row">
        {keyboardButton("q", buttonUseFunction)}
        {keyboardButton("w", buttonUseFunction)}
        {keyboardButton("e", buttonUseFunction)}
        {keyboardButton("r", buttonUseFunction)}
        {keyboardButton("t", buttonUseFunction)}
        {keyboardButton("y", buttonUseFunction)}
        {keyboardButton("u", buttonUseFunction)}
        {keyboardButton("i", buttonUseFunction)}
        {keyboardButton("o", buttonUseFunction)}
        {keyboardButton("p", buttonUseFunction)}
      </div>
      <div className="keyboard-row">
        {keyboardButton("a", buttonUseFunction)}
        {keyboardButton("s", buttonUseFunction)}
        {keyboardButton("d", buttonUseFunction)}
        {keyboardButton("f", buttonUseFunction)}
        {keyboardButton("g", buttonUseFunction)}
        {keyboardButton("h", buttonUseFunction)}
        {keyboardButton("j", buttonUseFunction)}
        {keyboardButton("k", buttonUseFunction)}
        {keyboardButton("l", buttonUseFunction)}
      </div>
      <div className="keyboard-row">
        {keyboardButton("z", buttonUseFunction)}
        {keyboardButton("x", buttonUseFunction)}
        {keyboardButton("c", buttonUseFunction)}
        {keyboardButton("v", buttonUseFunction)}
        {keyboardButton("b", buttonUseFunction)}
        {keyboardButton("n", buttonUseFunction)}
        {keyboardButton("m", buttonUseFunction)}
      </div>
      {spaceButton ? (
        <div className="keyboard-space">
          <Button variant="contained" title="space_button"></Button>
        </div>
      ) : null}
    </div>
  );
}
OnScreenKeyboard.defaultProps = {
  spaceButton: false,
};

export default OnScreenKeyboard;
