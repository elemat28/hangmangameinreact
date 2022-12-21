import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export const baseSettings_Types = {
  toggle: 0,
  list: 1,
  range: 2,
  pickMultiple: 3,
};

export default function SettingsPageBaseComponent(
  pageTitle,
  settingHandler,
  { settingType, values }
) {
  const theme = useTheme();
  const [stateObj, setState] = React.useState(settingHandler.getOrSet());

  const handleChange = (event) => {
    if (event.target.value !== stateObj) {
      settingHandler.asyncUpdate(event.target.value);
      setState(event.target.value);
    }
    console.log(event.target.value);
  };
  function toggle(values) {
    console.log("Toggle called");
  }

  function list(values) {
    console.log("List called");
    return (
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={stateObj}
          onChange={handleChange}
        >
          {values.map((value, index) => {
            return (
              <FormControlLabel
                value={value}
                control={<Radio />}
                label={value}
                key={index}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    );
  }

  function range(values) {
    console.log("Range called");
    return (
      <Box>
        <Stack
          spacing={2}
          direction="row"
          sx={{ mb: 1 }}
          alignItems="center"
        ></Stack>
        <Slider
          value={Number(stateObj)}
          marks={true}
          min={values[0]}
          max={values[1]}
          step={values[2]}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-label="Disabled slider"
        />
        <MuiInput
          value={stateObj}
          size="small"
          onChange={handleChange}
          //onBlur={handleBlur}
          inputProps={{
            min: values[0],
            max: values[1],
            step: values[2],
            type: "number",
            "aria-labelledby": "input-slider",
          }}
        />
      </Box>
    );
  }

  function pick(values) {
    console.log("pick called");
  }
  console.log(settingType);
  return (
    <Box
      sx={{
        height: { xs: "95%" },
        width: { xs: "95%", sm: "95%", md: "max-content" },
      }}
    >
      <Typography variant="h6">{pageTitle}</Typography>
      {settingType === baseSettings_Types.toggle ? toggle(values) : null}
      {settingType === baseSettings_Types.list ? list(values) : null}
      {settingType === baseSettings_Types.range ? range(values) : null}
    </Box>
  );
}
