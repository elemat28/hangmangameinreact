import { createTheme } from "@mui/material";

export const themes = {
  dark: createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#640552",
      },
      secondary: {
        main: "#f50057",
      },
      background: {
        default: "#292626",
        paper: "#292626",
      },
    },
  }),
  light: createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#640552",
      },
      secondary: {
        main: "#f50057",
      },
    },
  }),
};
