import { Box, Typography } from "@mui/material";

export default function WeatherRecordView({ weatherRecord }) {
  return (
    <Box>
      <Typography variant="h6">{weatherRecord.place}</Typography>
      <Typography variant="body1">
        {weatherRecord.tempMinMax.join(" - ")}C
      </Typography>
      <Typography variant="body2">{weatherRecord.rain}mm</Typography>
    </Box>
  );
}
