import { Box, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { MathX } from "../../nonview/base";
import { LocationSelector } from "../../view/molecules";
export default function LocationView({
  location,
  locationList,
  setLocation,
  locationRecord,
}) {
  const n = locationRecord.length;
  const firstRecord = locationRecord[0];
  const lastRecord = locationRecord[n - 1];
  const blurb = `${n} Records (${firstRecord.date} to ${lastRecord.date})`;

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
      <Box>
        <LocationSelector
          locationList={locationList}
          selectedLocation={location}
          setLocation={setLocation}
        />
      </Box>
      <Typography variant="caption">{blurb}</Typography>
      <Typography variant="h5">Last {N_DISPLAY} Days</Typography>


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
