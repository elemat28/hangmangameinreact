import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";
import { useState } from "react";

import { themes } from "../themes";
import SettingsBrightnessTwoToneIcon from "@mui/icons-material/SettingsBrightnessTwoTone";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
function ThemeSelector() {
  const label = { inputProps: { label: "Checkbox demo" } };
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(!checked);
    console.debug(event);
  };
  return (
    <div>
      <FormControlLabel
        value="top"
        control={
          <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
            {...label}
            icon={<SettingsBrightnessTwoToneIcon />}
            checkedIcon={<SettingsBrightnessTwoToneIcon />}
            id="theme_toggler"
          />
        }
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
