import { Component } from "react";
import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { WeatherRecord } from "../../nonview/core";

import DayRainChart from "../molecules/DayRainChart";
import { CustomDatePicker, DayTempChart } from "../molecules";
import { URLContext } from "../../nonview/base";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    const {date} = URLContext.get();
    this.state = {
      dateList: undefined,
      date,
      weatherRecordList: undefined,
    };
  }

  setStateAndContext(newState) {
    this.setState(newState);
    const {date} = Object.assign({}, this.state, newState);
    URLContext.set({date});
  }

  async componentDidMount() {
    let {date} = this.state;
    const dateList = await WeatherRecord.getDateList();
    
    if (dateList.indexOf(date) === -1) {
      date = dateList[dateList.length - 1];
    }
    const weatherRecordList = await WeatherRecord.listForDate(date);
    this.setStateAndContext({ dateList, date, weatherRecordList });
  }

  async setDate(date) {
    const weatherRecordList = await WeatherRecord.listForDate(date);
    this.setStateAndContext({ date, weatherRecordList });
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
    const refresh = function () {
      localStorage.clear();
      window.location.reload();
    };
    return (
      <Box sx={{ m: 2, p: 2 }}>
        <Typography variant="h6" onClick={refresh} sx={{ cursor: "pointer" }}>
          Weather
        </Typography>
        {this.renderWithData()}
      </Box>
    );
  }
}
