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
  console.debug(index);
  return (
    <Card
      sx={{
        boxSizing: "border-box",
        minWidth: { xs: "90vw", sm: "40vw", md: "30vw", lg: "15vw" },
        width: { xs: "90vw", sm: "50vw", md: "33vw", lg: "25vw" },
        maxWidth: { xs: "90vw", sm: "70vw", md: "35vw", lg: "25vw" },
        display: "flex",
      }}
      key={index}
      style={{
        dixsplay: "flex",
        flexDirection: "column",

        minHeight: "min-content",
      }}
    >
      <CardContent
        key="content"
        sx={{
          boxSizing: "border-box",
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
          key="0"
        ></Typography>
        <Typography
          key="1"
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
        <Typography key="2" sx={{ mb: 1.5 }} color="text.secondary">
          {partOfSpeech}
        </Typography>
        <div style={{ maxWidth: "100%", display: "flex" }}>
          <Typography
            key="3"
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
      <CardActions key="actions">
        <Typography variant="body2" sx={{ display: "block" }}>
          {source}
        </Typography>
      </CardActions>
    </Card>
  );
}

export default WordDefinitionCard;
