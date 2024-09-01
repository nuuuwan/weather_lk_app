
import { Box, Grid,  } from "@mui/material";

import { CustomDatePicker, DayTempChart, DayRainChart } from "../../view/molecules";

export default function CountryView({date, dateList, weatherRecordList, setDate,setLocation}) {
    return (
        <Box>
        <CustomDatePicker
          dateList={dateList}
          currentDate={date}
          setDate={setDate}
        />

        <Grid container>

        <Grid item xs={12} md={6}>
            <DayRainChart
              weatherRecordList={weatherRecordList}
              showImportantOnly={true}
              setLocation={setLocation}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DayTempChart weatherRecordList={weatherRecordList}   setLocation={setLocation}/> 
          </Grid>


          <Grid item xs={12} md={6}>
            <DayRainChart
              weatherRecordList={weatherRecordList}
              showImportantOnly={false}
              setLocation={setLocation}
            />
          </Grid>
        </Grid>
      </Box>
    );
}