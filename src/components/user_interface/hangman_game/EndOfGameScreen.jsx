import React from "react";
import "./Word.css";
import { useTheme } from "@mui/material";
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
      <Container sx={{ marginTop: "5%" }}>
        <h4>Other definitions</h4>
        <Box
          id="secondary-definitions"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "stretch",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {secondaryDefinitions.map((definition, index) => {
            return (
              <React.Fragment>
                {index !== 0 ? (
                  <>
                    <Divider
                      sx={{
                        margin: "2%",
                        display: { xs: "block", md: "none" },
                      }}
                      flexItem
                    />
                    <Divider
                      sx={{
                        margin: "2%",
                        display: { xs: "none", md: "block" },
                      }}
                      orientation="vertical"
                      variant="middle"
                      flexItem
                    />
                  </>
                ) : null}
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
              flexItem
              word={wordData.word}
              partOfSpeech={primaryDefinition.partOfSpeech}
              definition={primaryDefinition.definition.definition}
              source={wordData.sourceUrls[0]}
              index={0}
            />
          </Box>
          <Container>
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

        <Container>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "stretch",
              flexDirection: "column",
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
      <Container sx={{ height: "100%", marginTop: "25%" }}>
        <Box>{outcome.hasWon ? userWonMessage() : userLostMessage()}</Box>
        <p>Tap anywhere to start a new game</p>
      </Container>
    </React.Fragment>
  );
}

export default EndOfGameScreen;
