import { Box, Grid, Stack, Typography } from "@mui/material";
import {
  LocationRainChart,
  LocationTempChart,
  CustomGuage,
  LocationSummaryTable,
} from "../../view/molecules";

function GuageBar({ dataset, N_DISPLAY }) {
  const nDays1mm = dataset.filter((d) => d.rain > 1).length;
  const nDays25mm = dataset.filter((d) => d.rain > 25).length;

  const nDays24C = dataset.filter((d) => d.tempMin < 24).length;
  const nDays28C = dataset.filter((d) => d.tempMax > 28).length;
  const nDays32C = dataset.filter((d) => d.tempMax > 32).length;

  return (
    <Stack spacing={2} direction="row" alignItems="center">
      <CustomGuage
        value={nDays1mm}
        valueMax={N_DISPLAY}
        label=">1mm"
        color="#08f"
        subLabel="Rain"
      />
      <CustomGuage
        value={nDays25mm}
        valueMax={N_DISPLAY}
        label=">25mm"
        color="#04f"
        subLabel="Rain"
      />

      <CustomGuage
        value={nDays24C}
        valueMax={N_DISPLAY}
        label="<24°C"
        color="#080"
        subLabel="Min. Temp."
      />
      <CustomGuage
        value={nDays28C}
        valueMax={N_DISPLAY}
        label=">28°C"
        color="#c00"
        subLabel="Max. Temp."
      />
      <CustomGuage
        value={nDays32C}
        valueMax={N_DISPLAY}
        label=">32°C"
        color="#800"
        subLabel="Max. Temp."
      />
    </Stack>
  );
}

export default function LocationView({ locationRecord }) {
  const N_DISPLAY = 30;
  const datasetAll = locationRecord.filter(function (d) {
    return (
      d.tempMin !== null &&
      d.tempMax !== null &&
      d.rain !== null &&
      d.tempMin > 0
    );
  });
  const dataset = datasetAll.slice(0, N_DISPLAY).reverse();

  const HEIGHT_PER_ITEM = 22;
  const height = N_DISPLAY * HEIGHT_PER_ITEM;

  return (
    <Box>
      <Typography variant="h6">Last {N_DISPLAY} Days</Typography>

      <GuageBar dataset={dataset} N_DISPLAY={N_DISPLAY} />

      <Grid container>
        <Grid item xs={12} md={6}>
          <LocationRainChart dataset={dataset} height={height} />
        </Grid>
        <Grid item xs={12} md={6}>
          <LocationTempChart dataset={dataset} height={height} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ height: height }}>
            <LocationSummaryTable dataset={datasetAll} height={height} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
