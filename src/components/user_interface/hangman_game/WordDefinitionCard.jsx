import React from "react";
import "./Word.css";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
function WordDefinitionCard({ word, partOfSpeech, definition, source, index }) {
  const theme = useTheme();
  const isMobileRef = useRef(useMediaQuery(theme.breakpoints.down("md")));

  return (
    <Card
      flexItem
      sx={{
        minWidth: { sx: "90vw", sm: "40vw", md: "30vw", lg: "15vw" },
        maxWidth: { sx: "90vw", sm: "50vw", md: "35vw", lg: "25vw" },
        boxSizing: "border-box",
      }}
      id={`${word}_${index}`}
      key={index}
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "1%",
        marginBottom: "2%",
        flexGrow: 1,
        minHeight: "min-content",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "start",
          flexGrow: 1,
          width: "100%",
        }}
      >
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
        ></Typography>
        <Typography
          variant="h5"
          component="div"
          sx={{
            boxSizing: "border-box",
            minWidth: "max-content",
            paddingRight: "50%",
          }}
        >
          {word}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {partOfSpeech}
        </Typography>
        <div style={{ maxWidth: "100%", display: "flex" }}>
          <Typography
            variant="body1"
            sx={{
              textAlign: "start",
              width: "min-content",
              flexGrow: 1,
            }}
          >
            {definition}
          </Typography>
        </div>
      </CardContent>
      <CardActions>
        <Typography variant="body2" sx={{ display: "block" }}>
          {source}
        </Typography>
      </CardActions>
    </Card>
  );
}

export default WordDefinitionCard;
