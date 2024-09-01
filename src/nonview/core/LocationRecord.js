import { WWW } from "../../nonview/base";

export default class LocationRecord {
  static URL_BASE =
    "https://raw.githubusercontent.com/nuuuwan/weather_lk/data/data_by_place";
  constructor(i, location, latLng, date, rain, tempMin, tempMax) {
    this.i = i;
    this.location = location;
    this.latLng = latLng;
    this.date = date;
    this.rain = rain;
    this.tempMin = tempMin;
    this.tempMax = tempMax;
  }

  get tempMid() {
    return (this.tempMin + this.tempMax) / 2;
  }

  get tempSpan() {
    return this.tempMax - this.tempMin;
  }

  static async listForLocation(location, latLng) {
    const latLngStr = `${latLng.lng.toFixed(2)}E-${latLng.lat.toFixed(2)}N`;

    const url = `${LocationRecord.URL_BASE}/${latLngStr}-${location}.json`;

    const rawDList = await WWW.json(url);

    const recordList = rawDList
      .map(function (d, i) {
        return new LocationRecord(
          i,
          location,
          latLng,
          d.date,
          d.rain,
          d.min_temp,
          d.max_temp
        );
      })
      .sort(function (a, b) {
        return a.date.localeCompare(b.date);
      });

    return recordList;
  }
}
