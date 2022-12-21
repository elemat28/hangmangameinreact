import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Paper } from "@mui/material";
import "./RatingComponent.css";
export default function RatingComponent({ name, avatarSrc, ratingValue }) {
  return (
    <Paper className="rating-comp">
      <div className="user-details">
        <Avatar alt={String(name)} src={avatarSrc} />
        <p>{name}</p>
      </div>
      <Rating name="read-only" value={ratingValue} readOnly />
    </Paper>
  );
}
