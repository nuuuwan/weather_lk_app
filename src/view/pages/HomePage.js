import { Component } from "react";
import {
  Box,
  CircularProgress,

  Stack,
  Typography,
} from "@mui/material";
import { WeatherRecord } from "../../nonview/core";
import WeatherRecordView from "../molecules/WeatherRecordView";
import DayRainChart from "../molecules/DayRainChart";
import { DayTempChart } from "../molecules";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { date: undefined, weatherRecordList: undefined };
  }

  async componentDidMount() {
    const dateList = await WeatherRecord.getDateList();
    const date = dateList[0];
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

        <DayTempChart date={date} weatherRecordList={weatherRecordList} />
        <DayRainChart date={date} weatherRecordList={weatherRecordList} />
        {weatherRecordList.map(function (weatherRecord, i) {
          return <WeatherRecordView key={i} weatherRecord={weatherRecord} />;
        })}
      </Box>
    );
  }

  render() {
    return (
      <Box sx={{m:2, p:2}}>
        <Typography variant="h6">Weather in Sri Lanka</Typography>
        {this.renderWithData()}
      </Box>
    );
  }
}
