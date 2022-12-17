import React from "react";
import "./Word.css";
import { useTheme } from "@mui/material";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
function WordDefinitionCard({ wordData, index }) {
  console.log(wordData);

  return (
    <Card
      key={index}
      sx={{ minWidth: 275 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Game
        </Typography>
        <Typography variant="h5" component="div">
          {wordData.word}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {wordData.meanings[0].partOfSpeech}
        </Typography>
        <Typography variant="body1">
          {wordData.meanings[0].definitions[0].definition}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Typography variant="body2">{wordData.sourceUrls}</Typography>
      </CardActions>
    </Card>
  );
}

export default WordDefinitionCard;
