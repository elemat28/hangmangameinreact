import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { faker } from "@faker-js/faker";

import "./Home.css";
import { Button } from "@mui/material";
import RatingComponent from "../components/RatingComponent";
export function Home() {
  const theme = useTheme();
  function generateReviewData() {
    return {
      name: faker.internet.userName(),
      avatarSrc: faker.image.avatar(),
      ratingValue: faker.datatype.number({ min: 3.5, max: 5 }),
    };
  }
  let generatedRatingValues = [
    generateReviewData(),
    generateReviewData(),
    generateReviewData(),
    generateReviewData(),
    generateReviewData(),
  ];
  return (
    <div className="home">
      <Typography style={{ marginBottom: "2%" }} variant="h1">
        Welcome
      </Typography>

      <div className="welcome-message">
        <Typography variant="h5">
          Have{" "}
          <span style={{ fontStyle: "italic", fontWeight: "bold" }}>You</span>{" "}
          thought to yourself recently
        </Typography>{" "}
        <Typography style={{ margin: "1.5%" }} variant="h5">
          "Man, there just isn't enough Hangman Game clones out there"?
        </Typography>
        <Typography variant="body1">Great! Me neither!</Typography>
        <Typography variant="body2">
          And that's exactly why I made this one.
        </Typography>
      </div>
      <div
        style={{
          margin: " 5% 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <Typography>
          So go ahead, press the button and get overwhelmed with a game that
        </Typography>
        <Typography component="div">
          plays<Typography> EXACTLY </Typography>as You would expect
        </Typography>
        <Button
          sx={{ width: "50%", padding: "1em", margin: "2%" }}
          variant="contained"
          href="/hangman/play"
        >
          <Typography variant="h3"> PLAY THE GAME </Typography>
        </Button>
      </div>
      <div>
        <Typography>Not convinced?</Typography>
        <Typography>
          Then check out those fake ratings I CERTAINLY didn't make up
        </Typography>
        <div className="not-fake-ratings">
          {generatedRatingValues.map((value, index) => (
            <RatingComponent
              name={value.name}
              avatarSrc={value.avatarSrc}
              ratingValue={value.ratingValue}
              key={`${value.name}_${index}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
