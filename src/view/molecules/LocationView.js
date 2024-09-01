import { Box, Grid, Stack, Typography } from "@mui/material";
import {
  LocationRainChart,
  LocationTempChart,
  CustomGuage,
} from "../../view/molecules";

export default function LocationView({ locationRecord }) {
  const N_DISPLAY = 30;
  const dataset = locationRecord
    .filter(function (d) {
      return (
        d.tempMin !== null &&
        d.tempMax !== null &&
        d.rain !== null &&
        d.tempMin > 0
      );
    })
    .slice(-N_DISPLAY)
    .reverse();

  const HEIGHT_PER_ITEM = 22;
  const height = N_DISPLAY * HEIGHT_PER_ITEM;

  const nDays1mm = dataset.filter((d) => d.rain > 1).length;
  const nDays25mm = dataset.filter((d) => d.rain > 25).length;

  const nDays24C = dataset.filter((d) => d.tempMin < 24).length;
  const nDays28C = dataset.filter((d) => d.tempMax > 28).length;
  const nDays32C = dataset.filter((d) => d.tempMax > 32).length;

  return (
    <Box>
      <Typography variant="h6">Last {N_DISPLAY} Days</Typography>

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

      <Grid container>
        <Grid item xs={12} md={6}>
          <LocationRainChart dataset={dataset} height={height} />
        </Grid>
        <Grid item xs={12} md={6}>
          <LocationTempChart dataset={dataset} height={height} />
        </Grid>
      </Grid>
    </Box>
  );
}
