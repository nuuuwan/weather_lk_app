import { Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

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
      return b.latLng.lat - a.latLng.lat;
    });
  const n = dataset.length;

  return (
    <Box>
      <BarChart
        dataset={dataset}
        series={[
          {  dataKey: "tempMin", stack: "tempMin", color: "white" },
          {  dataKey: "tempSpan", stack: "tempMin", color: "red" },
        ]}
        height={n * 24}
        yAxis={[{ dataKey: "place", scaleType: "band" }]}
        xAxis={[{ label: "Temperature (C)" }]}
        barLabel={(item, context) => {
          if (item.seriesId === 'auto-generated-id-1') {
            const datum = dataset[item.dataIndex];
            return `${datum.tempMin}-${datum.tempMax}°C`;
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
