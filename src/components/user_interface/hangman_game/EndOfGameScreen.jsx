import React from "react";
import "./Word.css";
import { List, ListItem, Typography, useTheme } from "@mui/material";
import { styled, Stack } from "@mui/system";
import { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import WordDefinitionCard from "./WordDefinitionCard";
import { display, flexbox, margin } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
function EndOfGameScreen({ outcome, wordData, wordType, newGameFunction }) {
  const theme = useTheme();
  const isMobileRef = useRef(useMediaQuery(theme.breakpoints.down("md")));
  function createSecondaryDefinitionsBox(word, secondaryDefinitions) {
    return (
      <Container
        disableGutters={true}
        sx={{
          marginTop: "5%",
          display: "flex",
          flexDirection: "column",
          overflow: "scroll",
          flexGrow: 1,
        }}
      >
        <h4 key={"description"}>Other definitions</h4>
        <Box
          key="box"
          sx={{
            padding: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxSizing: "border-box",
            flexGrow: 1,
          }}
        >
          <div
            style={{ maxWidth: "100%", width: "fit-content", padding: "2%" }}
          >
            <Stack
              key={"stackOfSecondary"}
              spacing={{ xs: 1, sm: 2, md: 2 }}
              direction={{ xs: "column", sm: "row" }}
              sx={{
                boxSizing: "border-box",
                width: { xs: "100%", md: "auto" },
                maxWidth: "100%",
                alignSelf: "start",

                justifyContent: "flex-start",
                alignContent: "stretch",
                alignItems: "stretch",
                overflow: "scroll",
              }}
            >
              {secondaryDefinitions.map((definition, index) => {
                return (
                  //main definition is indexed at 0 and we want to have the devider /after/ the first element of secondary definitions, therefore we start from index = 2

                  <WordDefinitionCard
                    key={`Secondary_${index}`}
                    word={word}
                    partOfSpeech={definition.partOfSpeech}
                    definition={definition.definition.definition}
                    source={"Secondary"}
                    index={`Secondary_${index}`}
                  />
                );
              })}
            </Stack>
          </div>
        </Box>
      </Container>
    );
  }
  function displayDefinitionCards(wordData, wordType = null) {
    let primaryDefinition = null;
    const secondaryDefinitions = [];

    wordData.meanings.forEach((meaning) => {
      if (wordType != null && wordType != meaning.partOfSpeech) {
        return null;
      }
      meaning.definitions.forEach((definition) => {
        let definitionObject = {
          definition: definition,
          partOfSpeech: meaning.partOfSpeech,
        };
        if (primaryDefinition != null) {
          secondaryDefinitions.push(definitionObject);
        } else {
          primaryDefinition = definitionObject;
        }
      });
    });

    console.log(`Word Data in DisplayDefinitionCard:${wordData}`);
    console.log(wordData);
    console.log(primaryDefinition);

    try {
      return (
        <React.Fragment>
          <Box
            sx={{
              padding: 0,
              width: "100%",
              justifyContent: "center",
              display: "flex",
            }}
            id="dupa"
          >
            <WordDefinitionCard
              word={wordData.word}
              partOfSpeech={primaryDefinition.partOfSpeech}
              definition={primaryDefinition.definition.definition}
              source={wordData.sourceUrls[0]}
            />
          </Box>
          <Container
            disableGutters={true}
            sx={{
              padding: 0,
              display: "flex",
              flexGrow: 1,
              height: 0,
              alignItems: "stretch",
              flexDirection: "column",
              overflow: "scroll",
            }}
            id="secondary"
          >
            {secondaryDefinitions.length > 0
              ? createSecondaryDefinitionsBox(
                  wordData.word,
                  secondaryDefinitions
                )
              : null}
          </Container>
        </React.Fragment>
      );
    } catch {
      return null;
    }
  }

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
        </div>

        <Container
          disableGutters={true}
          sx={{
            display: "flex",
            flexGrow: 1,
            width: "100%",
            alignItems: "stretch",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              width: "100%",
              alignItems: "stretch",
              flexDirection: "column",
              marginBottom: "1.5%",
            }}
          >
            {wordData ? displayDefinitionCards(wordData[0], wordType) : null}
          </Box>
        </Container>
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
  const startButtonHandler = (event) => {
    newGameFunction(wordType);
  };
  return (
    <React.Fragment>
      <Container
        disableGutters={true}
        id="end-menu"
        sx={{
          padding: 0,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          marginTop: "2.5%",
          paddingBottom: "2.5%",
          order: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            padding: 0,
          }}
        >
          {outcome.hasWon ? userWonMessage() : userLostMessage()}
        </Box>

        <Button
          sx={{
            height: "10%",
          }}
          variant="contained"
          onClick={startButtonHandler}
        >
          <Typography variant="h2">new game</Typography>
        </Button>
      </Container>
    </React.Fragment>
  );
}

export default EndOfGameScreen;
