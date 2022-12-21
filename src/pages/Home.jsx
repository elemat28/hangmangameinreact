import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

import "./Home.css";
export function Home() {
  const theme = useTheme();

  return (
    <div className="home">
      <h1>Home</h1>
    </div>
  );
}
