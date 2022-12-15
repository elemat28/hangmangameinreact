import React from "react";

function HangmanImage({ NumberOfLinesToDraw = 0 }) {
  React.useEffect(() => {
    var c = document.getElementById("hangmanCanvas");
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
      ctx.lineTo(150, 50);
      ctx.stroke();
    }
    //attachment point
    if (NumberOfLinesToDraw === 4) {
      ctx.lineTo(150, 100);
      ctx.stroke();
    }
    //start drawing person
    //head
    if (NumberOfLinesToDraw === 5) {
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
  }, [NumberOfLinesToDraw]);

  return (
    <div>
      <canvas
        id="hangmanCanvas"
        width="400px"
        height="600px"
        style={{ border: "1px solid #d3d3d3" }}
      >
        Your browser does not support the HTML canvas tag.
      </canvas>
    </div>
  );
}

export default HangmanImage;
