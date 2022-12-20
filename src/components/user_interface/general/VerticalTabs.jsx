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
import Paper from "@mui/material/Paper";
import SettingsPageBaseComponent from "../../SettingsPageBaseComponent";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
    key: index,
  };
}
export const baseSettings_Types = {
  toggle: 0,
  list: 1,
  range: 2,
  pickMultiple: 3,
};

export default function VerticalTabs(props) {
  console.log(props);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        background: theme.palette.secondary,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        {props.map((element, index) => {
          return <Tab label={element.tabTitle} {...a11yProps(index)} />;
        })}
        ;
      </Tabs>
      {props.map((element, index) => {
        return (
          <TabPanel value={value} index={index} key={index}>
            {console.log(element.pageProps)}
            {SettingsPageBaseComponent(
              element.pageProps.pageHeader,
              element.pageProps.settingHandler,
              {
                settingType: element.pageProps.settingType,
                values: element.pageProps.values,
              }
            )}
          </TabPanel>
        );
      })}
    </Box>
  );
}