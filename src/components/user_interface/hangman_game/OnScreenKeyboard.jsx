import React from "react";
import Button from "@mui/material/Button";
function OnScreenKeyboard() {
  return (
    <div className="on-screen-keyboard">
      <div className="keyboard-row">
        <Button variant="contained">Q</Button>
        <Button variant="contained">W</Button>
        <Button variant="contained">E</Button>
      </div>
      <div className="keyboard-row">
        <Button variant="contained">A</Button>
        <Button variant="contained">S</Button>
        <Button variant="contained">D</Button>
      </div>
      <div className="keyboard-row">
        <Button variant="contained">Z</Button>
        <Button variant="contained">X</Button>
        <Button variant="contained">C</Button>
      </div>
    </div>
  );
}

export default OnScreenKeyboard;
