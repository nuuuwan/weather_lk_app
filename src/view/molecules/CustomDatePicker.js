import { Slider, Typography, Box } from "@mui/material";
import React from "react";

export default function CustomDatePicker({ dateList, currentDate, setDate }) {
  const valueInit = dateList.indexOf(currentDate);
  const [value, setValue] = React.useState(valueInit);

  const date = new Date(dateList[value]);
  return (
    <Box>
      <Typography variant="h4">{date.toLocaleDateString(
        undefined,
        { year: "numeric", month: "short", day: "numeric" , weekday: "short", }
      )}</Typography>
      <Slider
        value={value}
        onChange={(event, value) => setValue(value)}
        onChangeCommitted={(event, value) => setDate(dateList[value])}
        min={0}
        max={dateList.length - 1}
        step={1}
      />
    </Box>
  );
}
