import { WWW } from "../../nonview/base";

export default class WeatherRecord {
  static URL_BASE =
  "https://raw.githubusercontent.com/nuuuwan/weather_lk/data";

  constructor(place, latLng, date, tempMinMax, rain) {
    this.place = place;
    this.latLng = latLng;
    this.date = date;
    this.tempMinMax = tempMinMax;
    this.rain = rain;
  }


  // Loaders
  static async getDateList() {
    const dateList =  await WWW.json(WeatherRecord.URL_BASE + '/date_list.json');
    return dateList.sort().reverse();
  }

  static async listForDate(date) {

    const url = WeatherRecord.URL_BASE + `/json_parsed/${date}.json`;

    const rawData = await WWW.json(url);

    return rawData["weather_list"].map(function (d) {
      return new WeatherRecord(
        d["place"],
        {lat: d["lat"], lng: d["lng"]},
        date,
        {min: d["min_temp"], max: d["max_temp"]},
        d["rain"]
      );
    });
  }
}
