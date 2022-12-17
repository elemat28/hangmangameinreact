import { Margin, Scale } from "@mui/icons-material";
import React from "react";
import "./HangmanImage.css";

function HangmanImage({ NumberOfLinesToDraw, heightPx }) {
  let height = heightPx;
  let width = height * (2 / 3);
  React.useEffect(() => {
    var c = document.getElementById("hangmanCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    //STAND, LEFT -> right
    if (NumberOfLinesToDraw === 1) {
      ctx.moveTo(0.5 * width, height * (550 / 600));
      ctx.lineTo(width, height * (550 / 600));
      ctx.stroke();
    }
    //pole
    if (NumberOfLinesToDraw === 2) {
      ctx.moveTo(width * 0.75, height * (550 / 600));
      ctx.lineTo(width * 0.75, height * (50 / 600));
      ctx.stroke();
    }
    //overhead
    if (NumberOfLinesToDraw === 3) {
      ctx.moveTo(width * 0.75, height * (50 / 600));
      ctx.lineTo(width * (225 / 600), height * (50 / 600));
      ctx.stroke();
    }
    //attachment point
    if (NumberOfLinesToDraw === 4) {
      ctx.moveTo(width * (225 / 600), height * (50 / 600));
      ctx.lineTo(width * (225 / 600), height * (100 / 600));
      ctx.stroke();
    }
    //start drawing person
    //head
    if (NumberOfLinesToDraw === 5) {
      ctx.beginPath();

      ctx.arc(
        width * (225 / 600),
        height * (150 / 600),
        (1 / 12) * height,
        0,
        2 * Math.PI
      );
      ctx.stroke();
    }
    //torso
    if (NumberOfLinesToDraw === 6) {
      ctx.moveTo(width * (225 / 600), height * (150 / 600) + (1 / 12) * height);
      ctx.lineTo(width * (225 / 600), (height * 375) / 600);
      ctx.stroke();
    }
    //left leg
    if (NumberOfLinesToDraw === 7) {
      ctx.moveTo(width * (225 / 600), (height * 375) / 600);
      ctx.lineTo(width * (150 / 600), height * (450 / 600));
      ctx.stroke();
    }
    //right leg
    if (NumberOfLinesToDraw === 8) {
      ctx.moveTo(width * (225 / 600), (height * 375) / 600);
      ctx.lineTo(width * (300 / 600), height * (450 / 600));
      ctx.stroke();
    }
    //left hand
    if (NumberOfLinesToDraw === 9) {
      ctx.moveTo(width * (225 / 600), height * (180 / 600) + (1 / 12) * height);
      ctx.lineTo(width * (175 / 600), height * (325 / 600));
      ctx.stroke();
    }
    //right hand
    if (NumberOfLinesToDraw === 10) {
      ctx.moveTo(width * (225 / 600), height * (180 / 600) + (1 / 12) * height);
      ctx.lineTo(width * (275 / 600), height * (325 / 600));
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
