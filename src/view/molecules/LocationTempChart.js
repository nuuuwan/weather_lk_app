import { Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { MathX } from "../../nonview/base";

export default function LocationTempChart({ dataset, height }) {
  const Q = 5;
  const min = Math.floor(MathX.min(dataset.map((x) => x.tempMin)) / Q) * Q;
  const max = Math.ceil(MathX.max(dataset.map((x) => x.tempMax)) / Q) * Q;

  return (
    <Box>
      <BarChart
        dataset={dataset}
        series={[
          { dataKey: "tempMin", stack: "tempMin", color: "white" },
          { dataKey: "tempSpan", stack: "tempMin", color: "red" },
        ]}
        height={height}
        yAxis={[
          {
            dataKey: "date",
            scaleType: "band",
            valueFormatter: function (x) {
              return new Date(x).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              });
            },
          },
        ]}
        xAxis={[{ label: "Temperature (°C)", min, max }]}
        barLabel={(item) => {
          const datum = dataset[item.dataIndex];
          return datum.tempRangeFormatted;
        }}
        grid={{ vertical: true, horizontal: true }}
        layout="horizontal"
        margin={{ left: 60 }}
      />
    </Box>
  );
}
