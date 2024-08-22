import { Component } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { WeatherRecord } from "../../nonview/core";
import WeatherRecordView from "../molecules/WeatherRecordView";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { date: "2024-08-21", weatherRecordList: undefined };
  }

  async componentDidMount() {
    const { date } = this.state;
    const weatherRecordList = await WeatherRecord.listForDate(date);
    this.setState({ weatherRecordList });
  }

  renderWithData() {
    const { weatherRecordList } = this.state;
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
        {weatherRecordList.map(function (weatherRecord, i) {
          return <WeatherRecordView key={i} weatherRecord={weatherRecord} />;
        })}
      </Box>
    );
  }

  render() {
    const { date } = this.state;
    return (
      <Container>
        <Typography variant="h3">{date}</Typography>
        {this.renderWithData()}
      </Container>
    );
  }
}
