import { Margin, Scale } from "@mui/icons-material";
import React, { createElement, useRef } from "react";
import "./HangmanImage.css";

function HangmanImage({ NumberOfLinesToDraw, heightPx }) {
  let heightRef = useRef(heightPx);
  let widthRef = useRef(heightPx * (2 / 3));
  const canvasID = "hangmanCanvas";
  let width = widthRef.current;
  let height = heightRef.current;
  React.useEffect(() => {
    let paper = document.getElementById("hangman-paper");
    if (NumberOfLinesToDraw === 0) {
      let freshCanvas = document.createElement("canvas");
      freshCanvas.id = canvasID;
      freshCanvas.height = 600;
      freshCanvas.width = 400;

      if (paper.firstChild.id === canvasID) {
        paper.firstChild.replaceWith(freshCanvas);
      } else {
        paper.append(freshCanvas);
      }
    }
    let c = document.getElementById("hangmanCanvas");
    console.log(c);

    var ctx = c.getContext("2d");
    ctx.beginPath();
    //STAND, LEFT -> right
    if (NumberOfLinesToDraw === 1) {
      ctx.moveTo(200, 550);
      ctx.lineTo(400, 550);
      ctx.stroke();
    }
    //pole
    if (NumberOfLinesToDraw === 2) {
      ctx.moveTo(300, 550);
      ctx.lineTo(300, 50);
      ctx.stroke();
    }
    //overhead
    if (NumberOfLinesToDraw === 3) {
      ctx.moveTo(300, 50);
      ctx.lineTo(150, 50);
      ctx.stroke();
    }
    //attachment point
    if (NumberOfLinesToDraw === 4) {
      ctx.moveTo(150, 50);
      ctx.lineTo(150, 100);
      ctx.stroke();
    }
    //start drawing person
    //head
    if (NumberOfLinesToDraw === 5) {
      ctx.moveTo(150, 100);
      ctx.beginPath();

      ctx.arc(150, 150, 50, 0, 2 * Math.PI);
      ctx.stroke();
    }
    //torso
    if (NumberOfLinesToDraw === 6) {
      ctx.moveTo(150, 200);
      ctx.lineTo(150, 350);
      ctx.stroke();
    }
    //left leg
    if (NumberOfLinesToDraw === 7) {
      ctx.moveTo(150, 350);
      ctx.lineTo(100, 450);
      ctx.stroke();
    }
    //right leg
    if (NumberOfLinesToDraw === 8) {
      ctx.moveTo(150, 350);
      ctx.lineTo(200, 450);
      ctx.stroke();
    }
    //left hand
    if (NumberOfLinesToDraw === 9) {
      ctx.moveTo(150, 225);
      ctx.lineTo(110, 320);
      ctx.stroke();
    }
    //right hand
    if (NumberOfLinesToDraw === 10) {
      ctx.moveTo(150, 225);
      ctx.lineTo(190, 320);
      ctx.stroke();
    }
  }, [NumberOfLinesToDraw, height, width]);

  return (
    <canvas id="hangmanCanvas" width={`${width}px`} height={`${height}px`}>
      Your browser does not support the HTML canvas tag.
    </canvas>
  );
}

export default HangmanImage;
