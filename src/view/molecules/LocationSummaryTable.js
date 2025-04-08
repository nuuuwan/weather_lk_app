import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@mui/material';
import { MathX, Format } from '../../nonview/base';

function getSummary(dataset) {
  const monthToDatasetList = dataset.reduce(function (
    monthToDatasetList,
    datasetItem,
  ) {
    const month = datasetItem.date.substring(0, 7);
    if (!monthToDatasetList[month]) {
      monthToDatasetList[month] = [];
    }

    const { rain, tempMin, tempMax } = datasetItem;
    monthToDatasetList[month].push({
      rain,
      tempMin,
      tempMax,
    });
    return monthToDatasetList;
  }, {});

  const summary = Object.entries(monthToDatasetList)
    .map(function ([month, datasetList]) {
      const nDays = datasetList.length;
      const rainList = datasetList.map((d) => d.rain);
      const tempMinList = datasetList.map((d) => d.tempMin);
      const tempMaxList = datasetList.map((d) => d.tempMax);

      const meanRain = MathX.sum(rainList) / nDays;
      const meanTempMin = MathX.sum(tempMinList) / nDays;
      const meanTempMax = MathX.sum(tempMaxList) / nDays;
      const meanTemp = (meanTempMin + meanTempMax) / 2;

      const nDays1mm = datasetList.filter((d) => d.rain > 1).length;
      const nDays25mm = datasetList.filter((d) => d.rain > 25).length;

      const nDays24C = datasetList.filter((d) => d.tempMin < 24).length;
      const nDays28C = datasetList.filter((d) => d.tempMax > 28).length;
      const nDays32C = datasetList.filter((d) => d.tempMax > 32).length;

      return {
        month,
        nDays,
        meanRain,
        meanTempMin,
        meanTempMax,
        meanTemp,
        nDays1mm,
        nDays25mm,
        nDays24C,
        nDays28C,
        nDays32C,
      };
    })
    .sort((a, b) => {
      return b.month.localeCompare(a.month);
    });
  return summary;
}

export default function LocationSummaryTable({ dataset }) {
  const summary = getSummary(dataset);

  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Month</TableCell>
              <TableCell>Days with Data</TableCell>
              <TableCell>Avg. Rain (mm)</TableCell>
              <TableCell>Avg. Temp (°C)</TableCell>
              <TableCell>Avg. Min Temp (°C)</TableCell>
              <TableCell>Avg. Max Temp (°C)</TableCell>
              <TableCell>Days with Rain&gt;1mm</TableCell>
              <TableCell>Days with Rain&gt;25mm</TableCell>
              <TableCell>Days with Min Temp&lt;24°C</TableCell>
              <TableCell>Days with Max Temp&gt;28°C</TableCell>
              <TableCell>Days with Max Temp&gt;32°C</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {summary.map(function (summaryItem) {
              const {
                month,
                nDays,
                meanRain,
                meanTempMin,
                meanTempMax,
                meanTemp,
                nDays1mm,
                nDays25mm,
                nDays24C,
                nDays28C,
                nDays32C,
              } = summaryItem;
              return (
                <TableRow key={month}>
                  <TableCell>{month}</TableCell>
                  <TableCell>{nDays}</TableCell>
                  <TableCell>{meanRain.toFixed(1)}</TableCell>
                  <TableCell>{meanTemp.toFixed(1)}</TableCell>
                  <TableCell>{meanTempMin.toFixed(1)}</TableCell>
                  <TableCell>{meanTempMax.toFixed(1)}</TableCell>
                  <TableCell>{Format.percent(nDays1mm, nDays)}</TableCell>
                  <TableCell>{Format.percent(nDays25mm, nDays)}</TableCell>
                  <TableCell>{Format.percent(nDays24C, nDays)}</TableCell>
                  <TableCell>{Format.percent(nDays28C, nDays)}</TableCell>
                  <TableCell>{Format.percent(nDays32C, nDays)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
