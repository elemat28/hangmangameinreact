import React from "react";
import Button from "@mui/material/Button";
import "./OnScreenKeyboard.css";

function OnScreenKeyboard({
  spaceButton,
  buttonUseFunction,
  disabledButtonsArr,
}) {
  const keysByRow = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ];
  function keyboardButton({ character, onClick, key }) {
    return (
      <Button
        variant="contained"
        id={`osk_button_${character}`}
        disabled={disabledButtonsArr.includes(character)}
        onClick={(event) => {
          onClick(event, character);
          console.debug(disabledButtonsArr);
        }}
        key={key ? key : null}
      >
        {character}
      </Button>
    );
  }

  function addRow(keysInRow) {
    let row = [];

    keysInRow.forEach((element) => {
      row.push(
        keyboardButton({
          character: element,
          onClick: buttonUseFunction,
          key: keysInRow.indexOf(element),
        })
      );
    });

    return row;
  }
  return (
    <div className="on-screen-keyboard">
      <div className="keyboard-row">{addRow(keysByRow[0])}</div>
      <div className="keyboard-row">{addRow(keysByRow[1])}</div>
      <div className="keyboard-row">{addRow(keysByRow[2])}</div>
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
  disabledButtonsArr: [],
};

export default OnScreenKeyboard;
