import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Masonry from "@mui/lab/Masonry";
import { Card } from "@mui/material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import SimpleAccordion from "../SimpleAccordion.jsx";

const heights = [150, 30, 90, 70, 90, 100, 150, 30, 50, 80];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function CreateRecordDisplayingCard(record, index) {
  console.log(record);
  if (record.hangmanState.hasWon) {
    return (
      <Card
        key={index}
        style={{
          background: "rgb(17,101,0)",
          background:
            "linear-gradient(157deg, rgba(17,101,0,1) 3%, rgba(0,0,0,0.8655171541272759) 14%, rgba(0,0,0,1) 47%, rgba(0,0,0,0.9280754538143382) 93%, rgba(0,0,0,1) 100%)",
        }}
        variant="outlined"
      >
        <h5
          key={`record_${record.timestamp}_header`}
          style={{ textTransform: "capitalize" }}
        >
          {record.word}
        </h5>
        <p key={`record_${record.timestamp}_category`}>{record.wordCategory}</p>
        <p key={`record_${record.timestamp}result`}>
          {record.hangmanState.correctLetters.length}/
          {record.hangmanState.currentWord.length}
        </p>
      </Card>
    );
  } else {
    return (
      <Card
        key={`record_${record.timestamp}_card`}
        style={{
          background: "rgb(145,0,0)",
          background:
            " linear-gradient(157deg, rgba(145,0,0,1) 3%, rgba(24,0,3,0.8655171541272759) 14%, rgba(0,0,0,1) 47%, rgba(0,0,0,0.9280754538143382) 93%, rgba(0,0,0,1) 100%)",
        }}
        variant="outlined"
      >
        <h5
          key={`record_${record.timestamp}_header`}
          style={{ textTransform: "capitalize" }}
        >
          {record.word}
        </h5>
        <p key={`record_${record.timestamp}_category`}>{record.wordCategory}</p>
        <p key={`record_${record.timestamp}result`}>
          {record.hangmanState.correctLetters.length}/
          {record.hangmanState.currentWord.length}
        </p>
      </Card>
    );
  }
}

export default function ResponsiveColumns(stateObj = null) {
  const objOfState = stateObj;
  if (objOfState == null) {
    return (
      <Box sx={{ width: "80%", minHeight: 253 }}>
        <Masonry columns={{ xs: 3, sm: 4 }} spacing={2}>
          {heights.map((height, index) => (
            <Item key={index} sx={{ height }}>
              {index + 1}
            </Item>
          ))}
        </Masonry>
      </Box>
    );
  } else {
    console.log(objOfState);
    return (
      <Box sx={{ width: "80%", minHeight: 253 }}>
        <Masonry spacing={2} sx={{ alignContent: "center" }}>
          {objOfState.map((day, index) => (
            <div key={index}>
              <h5>{new Date(day[0]).toISOString().slice(0, 10)}</h5>
              {day[1].map((record, secondaryIndex) =>
                CreateRecordDisplayingCard(record, secondaryIndex)
              )}
            </div>
          ))}
        </Masonry>
      </Box>
    );
  }
}
