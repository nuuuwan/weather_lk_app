import { BarChart } from '@mui/x-charts/BarChart';

export default function DayRainfallChart({date, weatherRecordList}) {
    const sortedWeatherRecordList = weatherRecordList.sort(
        function(a, b) {
          return a.latLng.lng - b.latLng.lng;
        }
    );
    const rainList = sortedWeatherRecordList.map(
        function(weatherRecord) {
          return weatherRecord.rain;
        }
    );

    const placeList = sortedWeatherRecordList.map(
        function(weatherRecord) {
          return weatherRecord.place;
        });
    return (
        <BarChart
        series={[{ data: rainList }]}
        height={290}
        xAxis={[{ data: placeList, scaleType: 'band' }]}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      />
    );
}