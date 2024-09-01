import { Box, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { MathX } from "../../nonview/base";
export default function LocationView({ location, locationRecord }) {
  const n = locationRecord.length;
  const firstRecord = locationRecord[0];
  const lastRecord = locationRecord[n - 1];
  const blurb = `${n} Records (${firstRecord.date} to ${lastRecord.date})`;

  const dataset = locationRecord
    .filter(function (d) {
      return d.tempMin !== null && d.tempMin > 0;
    })
    .slice(-90);

  const Q = 5;
  const min = Math.floor(MathX.min(dataset.map((x) => x.tempMin)) / Q) * Q;
  const max = Math.ceil(MathX.max(dataset.map((x) => x.tempMax)) / Q) * Q;

  return (
    <Box>
      <Typography variant="h4">{location}</Typography>
      <Typography variant="caption">{blurb}</Typography>

      <BarChart
        dataset={dataset}
        series={[
          { dataKey: "tempMin", stack: "tempMin", color: "white" },
          { dataKey: "tempSpan", stack: "tempMin", color: "red" },
        ]}
        height={300}
        xAxis={[{ dataKey: "date", scaleType: "band" }]}
        yAxis={[{ label: "Temperature (°C)", min, max }]}
        barLabel={(item) => {
          if (item.seriesId === "auto-generated-id-1") {
            const datum = dataset[item.dataIndex];
            return datum.tempRangeFormatted;
          }
          return "";
        }}
        grid={{ vertical: true, horizontal: true }}
        layout="vertical"
        margin={{ left: 120 }}
      />

      <BarChart
        dataset={dataset}
        series={[{ dataKey: "rain", color: "#0088ff88" }]}
        height={300}
        xAxis={[{ dataKey: "date", scaleType: "band" }]}
        yAxis={[{ label: "Rainfall (mm)" }]}
        barLabel={(item) => {
          if (item.seriesId === "auto-generated-id-1") {
            const datum = dataset[item.dataIndex];
            return datum.tempRangeFormatted;
          }
          return "";
        }}
        grid={{ vertical: true, horizontal: true }}
        layout="vertical"
        margin={{ left: 120 }}
      />
    </Box>
  );
}
