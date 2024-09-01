import { Box, Grid, Typography } from "@mui/material";
import { LocationRainChart, LocationTempChart } from ".";



export default function LocationView({

  locationRecord,
}) {


  const N_DISPLAY = 30;
  const dataset = locationRecord
    .filter(function (d) {
      return d.tempMin !== null && d.tempMin > 0;
    })
    .slice(-N_DISPLAY).reverse();


  const HEIGHT_PER_ITEM = 20;
  const height = N_DISPLAY * HEIGHT_PER_ITEM;

  return (
    <Box>
  

      <Typography variant="h6">Last {N_DISPLAY} Days</Typography>

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
