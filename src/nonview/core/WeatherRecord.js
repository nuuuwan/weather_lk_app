import { WWW } from "../../nonview/base";

export default class WeatherRecord {
  constructor(place, latLng, date, tempMinMax, rain) {
    this.place = place;
    this.latLng = latLng;
    this.date = date;
    this.tempMinMax = tempMinMax;
    this.rain = rain;
  }

  static async listForDate(date) {
    const URL_BASE =
      "https://raw.githubusercontent.com/nuuuwan/weather_lk/data/json_parsed/";
    const url = URL_BASE + `${date}.json`;

    const rawData = await WWW.json(url);

    return rawData["weather_list"].map(function (d) {
      return new WeatherRecord(
        d["place"],
        [d["lat"], d["lng"]],
        date,
        [d["min_temp"], d["max_temp"]],
        d["rain"]
      );
    });
  }
}
