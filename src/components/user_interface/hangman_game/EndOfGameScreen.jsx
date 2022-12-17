import React from "react";
import "./Word.css";
import { useTheme } from "@mui/material";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import WordDefinitionCard from "./WordDefinitionCard";
function EndOfGameScreen({ outcome, wordData }) {
  console.log(outcome);
  console.log(wordData);
  const userLostMessage = () => {
    return (
      <>
        <div>
          <h3>You've Lost!</h3>
          <p>
            Letters found: {outcome.correctLetters.length}/
            {outcome.currentWord.length}.
          </p>
        </div>
        <div>
          <h4>The word You were looking for was:</h4>

          <p>{wordData ? `'${wordData[0].word}'` : null}</p>
        </div>
        <div>
          <h4>here is a list of definitions</h4>
          {wordData
            ? wordData.map((data, index) => {
                return <WordDefinitionCard wordData={data} index={index} />;
              })
            : null}
        </div>
      </>
    );
  };

  const userWonMessage = () => {
    return (
      <>
        <div>
          <h3>You've Won!</h3>
          <p>Great Job!</p>
        </div>
        <div>
          <h4>It took You:</h4>
          <p>Placeholder</p>
        </div>
      </>
    );
  };

  return (
    <React.Fragment>
      <Container sx={{ height: "100%", marginTop: "25%" }}>
        <Box>{outcome.hasWon ? userWonMessage() : userLostMessage()}</Box>
        <p>Tap anywhere to start a new game</p>
      </Container>
    </React.Fragment>
  );
}

export default EndOfGameScreen;
