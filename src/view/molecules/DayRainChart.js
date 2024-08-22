import { Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

export default function DayRainChart({ date, weatherRecordList }) {
  const dataset = weatherRecordList
    .filter(function (weatherRecord) {
      return weatherRecord.rain !== null;
    })
    .sort(function (a, b) {
      return b.rain - a.rain;
    });
  const n = dataset.length;
  return (
    <Box>
      <BarChart
        dataset={dataset}
        series={[{ dataKey: "rain", color: "#0088ff88" }]}
        yAxis={[{ dataKey: "place", scaleType: "band" }]}
        xAxis={[{ label: "Rainfall (mm)" }]}
        barLabel={(item) => {
          if (item.value < 5) {
            return "";
          }
          return item.value;
        }}
        layout="horizontal"
        height={24 * n}
        margin={{ left: 120 }}
        grid={{ vertical: true }}
      />
    </Box>
  );
}
