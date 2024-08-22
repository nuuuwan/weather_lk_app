import { Component } from "react";
import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { WeatherRecord } from "../../nonview/core";

import DayRainChart from "../molecules/DayRainChart";
import { CustomDatePicker, DayTempChart } from "../molecules";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateList: undefined,
      date: undefined,
      weatherRecordList: undefined,
    };
  }

  async componentDidMount() {
    const dateList = await WeatherRecord.getDateList();
    const date = dateList[dateList.length - 1];
    const weatherRecordList = await WeatherRecord.listForDate(date);
    this.setState({ dateList, date, weatherRecordList });
  }

  async setDate(date) {
    const weatherRecordList = await WeatherRecord.listForDate(date);
    this.setState({ date, weatherRecordList });
  }

  renderWithData() {
    const { date, weatherRecordList } = this.state;
    if (!weatherRecordList) {
      return (
        <Stack direction="row" gap={1} alignItems="center">
          <CircularProgress />
          <Typography variant="body2">Loading...</Typography>
        </Stack>
      );
    }
    return (
      <Box>
        <Typography variant="h3">{date}</Typography>
        <CustomDatePicker
          dateList={this.state.dateList}
          currentDate={date}
          setDate={this.setDate.bind(this)}
        />

        <Grid container>
          <Grid item xs={12} md={6}>
            <DayTempChart weatherRecordList={weatherRecordList} />
          </Grid>
          <Grid item xs={12} md={6}>
            <DayRainChart
              weatherRecordList={weatherRecordList}
              showImportantOnly={true}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DayRainChart
              weatherRecordList={weatherRecordList}
              showImportantOnly={false}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }

  render() {
    return (
      <Box sx={{ m: 2, p: 2 }}>
        <Typography variant="h6">Weather</Typography>
        {this.renderWithData()}
      </Box>
    );
  }
}
