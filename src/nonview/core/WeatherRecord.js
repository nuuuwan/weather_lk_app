import { WWW } from "../../nonview/base";
import {NORMALIZED_PLACE_IDX} from "../../nonview/constants"
export default class WeatherRecord {
  static URL_BASE = "https://raw.githubusercontent.com/nuuuwan/weather_lk/data";

  constructor(place, latLng, date, tempMinMax, rain) {
    this.place = place;
    this.latLng = latLng;
    this.date = date;
    this.tempMinMax = tempMinMax;
    this.rain = rain;
  }

  // Properties

  get tempMin() {
    return this.tempMinMax.min;
  }

  get tempMax() {
    return this.tempMinMax.max;
  }

  get tempMid() {
    return (this.tempMin + this.tempMax) / 2;
  }

  get tempSpan() {
    return this.tempMax - this.tempMin;
  }

  get tempRangeFormatted() {
    const format = (x) => x.toFixed(1);
    return `${format(this.tempMin)} - ${format(this.tempMax)}`;
  }

  // Normalizers
  static normalizePlace(place) {
    return NORMALIZED_PLACE_IDX[place] || place;
  }

  static normalizeLatLng(place, latLng) {
    if (place === 'Katugastota') {
      return { lat: 7.34, lng: 80.62 };
    }
    if (place === "Mattala") {

      return { lat: 6.31, lng: 81.11 };
    }
    return latLng;
  }

  // Loaders
  static async getDateList() {
    const dateList = await WWW.json(WeatherRecord.URL_BASE + "/date_list.json");
    return dateList.sort();
  }

  static async listForDate(date) {
    const url = WeatherRecord.URL_BASE + `/json_parsed/${date}.json`;

    const rawData = await WWW.json(url);

    return rawData["weather_list"]
      .map(function (d) {
        
        const place = WeatherRecord.normalizePlace(d["place"]);
        const latLng = WeatherRecord.normalizeLatLng(place, { lat: d["lat"], lng: d["lng"] });

        return new WeatherRecord(
          place,
          latLng,
          date,
          { min: d["min_temp"], max: d["max_temp"] },
          d["rain"]
        );
      })
      .sort(function (a, b) {
        return a.latLng.lng - b.latLng.lng;
      });
  }
}
