/* eslint-disable no-unused-vars */
import React from "react";
import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import Header from "./components/user_interface/general/Header";
import ThemeSelector from "./components/user_interface/general/ThemeSelector";
import { ResolveThemeToUse } from "./components/user_interface/general/ThemeSelector";
import { themes } from "./components/user_interface/themes";
import { useEffect } from "react";
import { useLayoutEffect, useRef, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { HangmanPage } from "./pages/Hangman";
import SettingsHandler from "./scripts/settingsHandler";
import { themeHandler } from "./components/user_interface/general/ThemeSelector";
import { HangmanHistory } from "./pages/HangmanHistory";
function App() {
  const [theme, setTheme] = React.useState(ResolveThemeToUse());
  const headerRef = useRef(null);
  const gameDivRef = useRef(null);

  const handleThemeChange = (event) => {
    if (theme === themes.light) {
      themeHandler.set("dark");
      setTheme(themes.dark);
    } else {
      themeHandler.set("light");
      setTheme(themes.light);
    }
  };
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  React.useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }

    window.addEventListener("resize", handleResize);

    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    gameDivRef.current.style.filter = "blur(10PX)";
    setOpen(true);
  };
  const handleClose = () => {
    gameDivRef.current.style.filter = "";
    setOpen(false);
  };
  const handleToggle = () => {
    if (open) {
      handleClose();
    } else {
      handleOpen();
    }
  };

  return (
    <div className="App" style={{ height: dimensions.height }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <header ref={headerRef}>
          <Header
            title="Hangman Game"
            themeSelector={handleThemeChange}
          ></Header>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hangman/play" element={<HangmanPage />} />
            <Route path="/hangman/history" element={<HangmanHistory />} />
          </Routes>
        </main>
      </ThemeProvider>
    </div>
  );
}

export default App;
