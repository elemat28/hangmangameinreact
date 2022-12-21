import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import VerticalTabs from "../general/VerticalTabs";
import { baseSettingsPage } from "../general/VerticalTabs";
import { baseSettings_Types } from "../general/VerticalTabs";
import { minimumLenghtOfWordSetting } from "../../../pages/Hangman";
import { wordTypeSetting } from "../../../pages/Hangman";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

export function HangmanSettings(closeFunction) {
  const theme = useTheme();
  let wordTypeMenu = {
    tabTitle: "Word Types",
    pageProps: {
      pageHeader: "Mark which categories you would like to play",
      settingHandler: wordTypeSetting,
      settingType: baseSettings_Types.list,
      values: ["noun", "verb", "adverb", "adjective"],
    },
  };
  let lenghtOfWordMenu = {
    tabTitle: "Word Lenght",
    pageProps: {
      pageHeader: "Select the minimum ammount of letters in the gameword",
      settingHandler: minimumLenghtOfWordSetting,
      settingType: baseSettings_Types.range,
      values: [3, 8, 1],
    },
  };
  return (
    <>
      {VerticalTabs([wordTypeMenu, lenghtOfWordMenu], {
        callbackFunction: closeFunction,
        icon: ClearOutlinedIcon,
      })}
    </>
  );
}
