import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { themes } from "../themes";
import SettingsBrightnessTwoToneIcon from "@mui/icons-material/SettingsBrightnessTwoTone";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import AbcIcon from "@mui/icons-material/Abc";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function ThemeSelector({ themeToggleCallback }) {
  const theme = useTheme();
  const [checked, setChecked] = React.useState(theme.mode === "light");
  return (
    <div>
      <FormControlLabel
        checked={checked}
        control={
          <Checkbox
            inputProps={{ "aria-label": "controlled" }}
            icon={<SettingsBrightnessTwoToneIcon sx={{ fontSize: "10rem" }} />}
            checkedIcon={
              <SettingsBrightnessOutlinedIcon sx={{ fontSize: "10rem" }} />
            }
            id="theme_toggler"
          />
        }
        onChange={(event) => {
          themeToggleCallback(event);
          setChecked(event.target.checked);
        }}
        label="Toggle dark mode"
        labelPlacement="bottom"
      />
    </div>
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

export default ThemeSelector;
