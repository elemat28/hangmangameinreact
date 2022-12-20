import React from "react";
import "./Word.css";
import { List, ListItem, useTheme } from "@mui/material";
import { styled, Stack } from "@mui/system";
import { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import WordDefinitionCard from "./WordDefinitionCard";
import { display, flexbox, margin } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import Divider from "@mui/material/Divider";
function EndOfGameScreen({ outcome, wordData, wordType }) {
  const theme = useTheme();
  const isMobileRef = useRef(useMediaQuery(theme.breakpoints.down("md")));
  function createSecondaryDefinitionsBox(word, secondaryDefinitions) {
    return (
      <Container
        sx={{
          marginTop: "5%",
          display: "flex",
          flexDirection: "column",
          overflow: "scroll",
          flexGrow: 1,
        }}
      >
        <h4>Other definitions</h4>
        <Box
          flexItem
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxSizing: "border-box",
            flexGrow: 1,
            overflow: "scroll",
          }}
        >
          <Stack
            flexItem
            divider={
              <Divider
                orientation={{ sx: "horizontal", sm: "vertical" }}
                flexItem
              />
            }
            direction={{ xs: "column", sm: "row" }}
            sx={{
              width: "100%",

              justifyContent: "flex-start",
              alignContent: "stretch",
              alignItems: "stretch",
              overflow: "visible",
            }}
          >
            {secondaryDefinitions.map((definition, index) => {
              return (
                //main definition is indexed at 0 and we want to have the devider /after/ the first element of secondary definitions, therefore we start from index = 2
                <React.Fragment>
                  <WordDefinitionCard
                    word={word}
                    partOfSpeech={definition.partOfSpeech}
                    definition={definition.definition.definition}
                    source={"Secondary"}
                    index={index + 1}
                  />
                </React.Fragment>
              );
            })}
          </Stack>
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
              width: "100%",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <WordDefinitionCard
              word={wordData.word}
              partOfSpeech={primaryDefinition.partOfSpeech}
              definition={primaryDefinition.definition.definition}
              source={wordData.sourceUrls[0]}
              index={0}
            />
          </Box>
          <Container
            sx={{
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

  return (
    <React.Fragment>
      <Container
        id="end-menu"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          marginTop: "5%",
          order: 1,
        }}
      >
        <Box
          flexItem
          sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
        >
          {outcome.hasWon ? userWonMessage() : userLostMessage()}
        </Box>
        <div
          style={{ height: "10%", background: "black", marginBottom: " 2.5%" }}
        >
          <p>Tap anywhere to start a new game</p>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default EndOfGameScreen;
