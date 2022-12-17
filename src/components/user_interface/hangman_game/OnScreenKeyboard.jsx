import React from "react";
import Button from "@mui/material/Button";
import "./OnScreenKeyboard.css";
import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
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

  function MUIkeyboardButton({ character, onClick, key }) {
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
        size="small"
        style={{ minWidth: 0, width: "100%" }}
      >
        {character}
      </Button>
    );
  }

  function addMUIRow(keysInRow) {
    let row = [];

    keysInRow.forEach((element) => {
      row.push(
        MUIkeyboardButton({
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
      <div className="keyboard-row">{addMUIRow(keysByRow[0])}</div>
      <div className="keyboard-row">{addMUIRow(keysByRow[1])}</div>
      <div className="keyboard-row">{addMUIRow(keysByRow[2])}</div>
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
