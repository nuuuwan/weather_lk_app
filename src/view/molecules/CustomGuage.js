import { Typography, Stack } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts";
import { STYLE } from "../../nonview/constants";
export default function CustomGuage({
  value,
  valueMax,
  label,
  subLabel,
  color,
}) {
  return (
    <Stack
      spacing={0}
      direction="column"
      alignItems="center"
      textAlign="center"
      sx={{ width: 70 }}
    >
      <Gauge
        value={value}
        valueMax={valueMax}
        text={function ({ value, valueMax }) {
          return (value / valueMax).toLocaleString(undefined, {
            style: "percent",
            maximumFractionDigits: 0,
          });
        }}
        height={60}
        cornerRadius="60%"
        sx={(theme) => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: STYLE.FONT.SIZE,
            fontFamily: STYLE.FONT.FAMILY,
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: color,
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: "#eee",
          },
        })}
      />{" "}
      <Typography variant="caption" color={color} sx={{ fontSize: "80%" }}>
        {subLabel}
      </Typography>
      <Typography variant="body1" color={color}>
        {label}
      </Typography>
    </Stack>
  );
}
