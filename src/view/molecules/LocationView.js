import { Box, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { MathX } from "../../nonview/base";

export default function LocationView({

  locationRecord,
}) {
  const N_DISPLAY = 30;
  const dataset = locationRecord
    .filter(function (d) {
      return d.tempMin !== null && d.tempMin > 0;
    })
    .slice(-N_DISPLAY).reverse();

  const Q = 5;
  const min = Math.floor(MathX.min(dataset.map((x) => x.tempMin)) / Q) * Q;
  const max = Math.ceil(MathX.max(dataset.map((x) => x.tempMax)) / Q) * Q;

  const HEIGHT_PER_ITEM = 20;
  return (
    <Box>
  

      <Typography variant="h6">Last {N_DISPLAY} Days</Typography>


      <BarChart
        dataset={dataset}
        series={[{ dataKey: "rain", color: "#0088ff88" }]}
        height={N_DISPLAY * HEIGHT_PER_ITEM}
        yAxis={[{ dataKey: "date", scaleType: "band" }]}
        xAxis={[{ label: "Rainfall (mm)" }]}
        barLabel={(item) => {
          
            const datum = dataset[item.dataIndex];
            return datum.rainFormatted;
          
        }}
        grid={{ vertical: true, horizontal: true }}
        layout="horizontal"
        margin={{left: 120}}
      />


<BarChart
        dataset={dataset}
        series={[
          { dataKey: "tempMin", stack: "tempMin", color: "white" },
          { dataKey: "tempSpan", stack: "tempMin", color: "red" },
        ]}
        height={N_DISPLAY * HEIGHT_PER_ITEM}
        yAxis={[{ dataKey: "date", scaleType: "band" }]}
        xAxis={[{ label: "Temperature (°C)", min, max }]}
        barLabel={(item) => {
          
            const datum = dataset[item.dataIndex];
            return datum.tempRangeFormatted;
         
        }}
        grid={{ vertical: true, horizontal: true }}
        layout="horizontal"
        margin={{left: 120}}
      />
    </Box>
  );
}
