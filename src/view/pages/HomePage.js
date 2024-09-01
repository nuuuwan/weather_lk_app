import { Component } from "react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";

import { URLContext } from "../../nonview/base";
import { WeatherRecord, LocationRecord } from "../../nonview/core";
import { VERSION } from "../../nonview/constants";

import { LocationView, CountryView, LocationSelector } from "../molecules";

export default class HomePage extends Component {
  static LOCATION_ISLANDWIDE = 'Islandwide';

  constructor(props) {
    super(props);
    const { date, location } = URLContext.get();
    this.state = {
      dateList: undefined,
      date,
      location,
      weatherRecordList: undefined,
    };
  }

  setStateAndContext(newState) {
    this.setState(newState);
    const { date, location } = Object.assign({}, this.state, newState);
    URLContext.set({ date, location });
  }

  async getLocationRecord(weatherRecordList, location) {
    const locationWeatherRecord = weatherRecordList.find(
      (d) => d.place === location
    );
    const latLng = locationWeatherRecord.latLng;

    return await LocationRecord.listForLocation(location, latLng);
  }

  async componentDidMount() {
    let { date, location } = this.state;
    location = location || HomePage.LOCATION_ISLANDWIDE;
    
    const dateList = await WeatherRecord.getDateList();

    if (dateList.indexOf(date) === -1) {
      date = dateList[dateList.length - 1];
    }
    const weatherRecordList = await WeatherRecord.listForDate(date);
    const locationList = [HomePage.LOCATION_ISLANDWIDE].concat(weatherRecordList
      .filter((d) => d.tempMin > 0)
      .map((d) => d.place)
      .sort());

    let locationRecord;
    if (location !== HomePage.LOCATION_ISLANDWIDE) {
      locationRecord = await this.getLocationRecord(
        weatherRecordList,
        location
      );
    }

    this.setStateAndContext({
      dateList,
      date,
      weatherRecordList,
      location,
      locationRecord,
      locationList,
    });
  }

  async setDate(date) {
    const weatherRecordList = await WeatherRecord.listForDate(date);
    this.setStateAndContext({ date, weatherRecordList });
  }

  async setLocation(location) {
    if (location === HomePage.LOCATION_ISLANDWIDE) {
      return this.setStateAndContext({ location, locationRecord: undefined });
    }

    let { locationRecord, weatherRecordList } = this.state;
    locationRecord = await this.getLocationRecord(weatherRecordList, location);
    this.setStateAndContext({ location, locationRecord });
  }

  renderWithData() {
    const { location, locationList } = this.state;

    if (!locationList) {
      return this.renderLoading();
    }


    return (
      <Box>

        <LocationSelector
          locationList={locationList}
          selectedLocation={location}
          setLocation={this.setLocation.bind(this)}
        />
        {(location !== HomePage.LOCATION_ISLANDWIDE) ? this.renderLocationView() : this.renderCountryView()}
      </Box>
    )

  }

  renderLoading() {
    return (
      <Stack direction="row" gap={1} alignItems="center">
        <CircularProgress />
      </Stack>
    );
  }

  renderLocationView() {
    const { location, locationRecord,  } = this.state;

    return (
      <LocationView
        location={location}
        locationRecord={locationRecord}
      />
    );
  }

  renderCountryView() {
    const { date } = this.state;

    return (
      <CountryView
        date={date}
        {...this.state}
        setDate={this.setDate.bind(this)}
        setLocation={this.setLocation.bind(this)}
      />
    );
  }

  render() {
    const refresh = function () {
      localStorage.clear();
      window.location.reload();
    };
    return (
      <Box sx={{ m: 2 }}>
        <Typography
          variant="caption"
          sx={{ cursor: "pointer", opacity: 0.2 }}
          onClick={refresh}
        >
          v{VERSION.DATETIME_STR}
        </Typography>
        {this.renderWithData()}
      </Box>
    );
  }
}
