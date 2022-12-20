import React from "react";
import Button from "@mui/material/Button";
import "./OnScreenKeyboard.css";
import { Box, useTheme } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
function OnScreenKeyboard({
  spaceButton,
  buttonUseFunction,
  disabledButtonsArr,
}) {
  const theme = useTheme();
  const keysByRow = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ];

  function MUIkeyboardButton({ character, onClick, key }) {
    return (
      <Button
        sx={{ fontSize: "5vw" }}
        variant="contained"
        id={`osk_button_${character}`}
        disabled={disabledButtonsArr.includes(character)}
        onClick={(event) => {
          onClick(event, character);
          console.debug(disabledButtonsArr);
        }}
        key={key ? key : null}
        size="small"
        style={{ minWidth: "max-content", flexGrow: 1 }}
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
