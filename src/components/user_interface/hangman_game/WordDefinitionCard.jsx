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
      id={`${word}_${index}`}
      key={index}
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "2%",
        marginBottom: "5%",
      }}
      sx={{ width: { xs: "90%", sm: "75%", md: "25%" } }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "start",
          flexGrow: 1,
        }}
      >
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
        ></Typography>
        <Typography variant="h5" component="div">
          {word}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {partOfSpeech}
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "start" }}>
          {definition}
        </Typography>
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
