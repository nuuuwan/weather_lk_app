import { Box,  } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";



export default function LocationTempChart({dataset, height}) {




    return (
        <Box>
            <BarChart
        dataset={dataset}
        series={[{ dataKey: "rain", color: "#0088ff88" }]}
        height={height}
        yAxis={[{ dataKey: "date", scaleType: "band", valueFormatter: function(x) {
          return (new Date(x)).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",

          });
        } }]}
        xAxis={[{ label: "Rainfall (mm)" }]}
        barLabel={(item) => {
          
            const datum = dataset[item.dataIndex];
            return datum.rainFormatted;
          
        }}
        grid={{ vertical: true, horizontal: true }}
        layout="horizontal"
        margin={{left: 120}}
      />

        </Box>
    );
}