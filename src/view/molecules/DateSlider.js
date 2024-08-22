import {  Slider, Typography , Box} from "@mui/material";
import React from "react";

export default function DateSlider({dateList, currentDate, setDate}) {
    const valueInit = dateList.indexOf(currentDate);
    const [value, setValue] = React.useState(valueInit);
    return (
      <Box> 
          <Slider
            value={value}
            onChange={(event, value) => setValue(value)}
            onChangeCommitted={(event, value) => setDate(dateList[value])}
            min={0}
            max={dateList.length - 1}
            step={1}
          />
          {(value !== valueInit ) ? (          <Typography variant="caption">{dateList[value]}</Typography>) : null}

      </Box>
    );
}