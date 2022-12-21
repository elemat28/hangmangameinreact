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
import SettingsPageBaseComponent from "../../SettingsPageBaseComponent";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { IconButton } from "@mui/material";
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

export default function VerticalTabs({ settingsPages, callbackFunction }) {
  console.log(settingsPages);
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
        flexDirection: "column",
      }}
    >
      {callbackFunction != null ? (
        <IconButton
          width="20vw"
          label={"Exit"}
          key={99}
          onClick={callbackFunction}
          sx={{ position: "Absolute", left: 0, zIndex: 1220 }}
        >
          <ClearOutlinedIcon />
        </IconButton>
      ) : null}
      <Tabs
        orientation="horizontal"
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: "divider",
          justifyContent: "center",
        }}
      >
        {settingsPages != null
          ? settingsPages.map((element, index) => {
              return <Tab label={element.tabTitle} {...a11yProps(index)} />;
            })
          : null}
        {}
      </Tabs>
      {settingsPages != null
        ? settingsPages.map((element, index) => {
            return (
              <TabPanel
                style={{ alignSelf: "center" }}
                value={value}
                index={index}
                key={index}
              >
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
          })
        : null}
    </Box>
  );
}
