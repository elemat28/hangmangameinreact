import React from "react";
import Button from "@mui/material/Button";
import "./OnScreenKeyboard.css";
function OnScreenKeyboard() {
  return (
    <div className="on-screen-keyboard">
      <div className="keyboard-row">
        <Button variant="contained">Q</Button>
        <Button variant="contained">W</Button>
        <Button variant="contained">E</Button>
        <Button variant="contained">R</Button>
        <Button variant="contained">T</Button>
        <Button variant="contained">Y</Button>
        <Button variant="contained">U</Button>
        <Button variant="contained">I</Button>
        <Button variant="contained">O</Button>
        <Button variant="contained">P</Button>
      </div>
      <div className="keyboard-row">
        <Button variant="contained">A</Button>
        <Button variant="contained">S</Button>
        <Button variant="contained">F</Button>
        <Button variant="contained">G</Button>
        <Button variant="contained">H</Button>
        <Button variant="contained">J</Button>
        <Button variant="contained">K</Button>
        <Button variant="contained">L</Button>
      </div>
      <div className="keyboard-row">
        <Button variant="contained">Z</Button>
        <Button variant="contained">X</Button>
        <Button variant="contained">C</Button>
        <Button variant="contained">V</Button>
        <Button variant="contained">B</Button>
        <Button variant="contained">N</Button>
        <Button variant="contained">M</Button>
      </div>
      <div className="keyboard-row keyboard-space">
        <Button variant="contained"></Button>
      </div>
    </div>
  );
}

export default OnScreenKeyboard;
