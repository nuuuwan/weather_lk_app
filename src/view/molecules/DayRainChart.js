import { Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

function isImportant(weatherRecord) {
  return (
    weatherRecord.tempMin !== null &&
    weatherRecord.tempMax !== null &&
    weatherRecord.rain !== null
  );
}

function getDataset(weatherRecordList, showImportantOnly) {
  if (showImportantOnly) {
    return weatherRecordList.filter(isImportant);
  }

  return weatherRecordList.filter((x) => !isImportant(x));
}

export default function DayRainChart({ weatherRecordList, showImportantOnly ,setLocation}) {
  const dataset = getDataset(weatherRecordList, showImportantOnly).sort(
    function (a, b) {
      return b.rain - a.rain;
    }
  );

  const onAxisClick  = function(e, v) {
    const {axisValue} = v;
    setLocation(axisValue);
  }

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
        onAxisClick={onAxisClick }
      />
    </Box>
  );
}
