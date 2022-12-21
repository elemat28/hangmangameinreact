import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { themes } from "../themes";
import SettingsBrightnessTwoToneIcon from "@mui/icons-material/SettingsBrightnessTwoTone";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import SettingsHandler from "../../../scripts/settingsHandler";
export const themeHandler = new SettingsHandler(
  SettingsHandler.storageType.localStorage,
  "palette_mode"
);
function ThemeSelector({ themeToggleCallback, fontSize }) {
  const theme = useTheme();
  const [checked, setChecked] = React.useState(theme.mode === "light");
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Checkbox
      checked={theme.mode === "light"}
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
  let returnValue = null;

  if (themeHandler.isPresent()) {
    if (themeHandler.get() === "dark") {
      returnValue = themes.dark;
    } else if (themeHandler.get() === "light") {
      returnValue = themes.light;
    }
  }

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  if (returnValue == null) {
    if (prefersDarkMode) {
      themeHandler.set("dark");
      returnValue = themes.dark;
    } else {
      themeHandler.set("light");
      returnValue = themes.light;
    }
  }
  return returnValue;
}
ThemeSelector.defaultProps = {
  fontSize: 3,
};
export default ThemeSelector;
