import { Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { MathX } from "../../nonview/base";

export default function DayTempChart({ date, weatherRecordList }) {
  const dataset = weatherRecordList
    .filter(function (weatherRecord) {
      return (
        weatherRecord.tempMin !== null &&
        weatherRecord.tempMax !== null &&
        weatherRecord.rain !== null
      );
    })
    .sort(function (a, b) {
      return b.tempMax - a.tempMax;
    });
  const n = dataset.length;

  const min = Math.floor(MathX.min(dataset.map((x) => x.tempMin)));
  const max = Math.ceil(MathX.max(dataset.map((x) => x.tempMax)));

  return (
    <Box>
      <BarChart
        dataset={dataset}
        series={[
          { dataKey: "tempMin", stack: "tempMin", color: "white" },
          { dataKey: "tempSpan", stack: "tempMin", color: "red" },
        ]}
        height={n * 24}
        yAxis={[{ dataKey: "place", scaleType: "band" }]}
        xAxis={[{ label: "Temperature (°C)", min, max }]}
        barLabel={(item) => {
          if (item.seriesId === "auto-generated-id-1") {
            const datum = dataset[item.dataIndex];
            return datum.tempRangeFormatted;
          }
          return "";
        }}
        grid={{ vertical: true }}
        layout="horizontal"
        margin={{ left: 120 }}
      />
    </Box>
  );
}
