import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { themes } from "../themes";
import SettingsBrightnessTwoToneIcon from "@mui/icons-material/SettingsBrightnessTwoTone";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

function ThemeSelector({ themeToggleCallback, fontSize }) {
  const theme = useTheme();
  const [checked, setChecked] = React.useState(theme.mode == "light");
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Checkbox
      checked={theme.mode == "light"}
      inputProps={{ "aria-label": "controlled" }}
      icon={
        <SettingsBrightnessTwoToneIcon sx={{ fontSize: `${fontSize}rem` }} />
      }
      checkedIcon={
        <SettingsBrightnessOutlinedIcon sx={{ fontSize: `${fontSize}rem` }} />
      }
      id="theme_toggler"
      onChange={(event) => {
        themeToggleCallback(event);
      }}
    />
  );
}

export function ResolveThemeToUse() {
  //todo: check is any value stored for preference
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  if (prefersDarkMode) {
    return themes.dark;
  } else {
    return themes.light;
  }
}
ThemeSelector.defaultProps = {
  fontSize: 3,
};
export default ThemeSelector;
