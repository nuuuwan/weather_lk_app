import {  Typography, Stack } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts";
export default function CustomGuage({value, valueMax, label,subLabel, color}){
    return (
     <Stack spacing={0} direction="column" alignItems="center" textAlign="center" sx={{width: 100}} >
  
       <Gauge
    value={value }
    valueMax={valueMax}
    text={function({value, valueMax}) {
      return (value/ valueMax).toLocaleString(undefined, {style: 'percent', maximumFractionDigits: 0});
    }}
  
    height={96}
  cornerRadius="50%"
  sx={(theme) => ({
    [`& .${gaugeClasses.valueText}`]: {
      fontSize: 24,
    },
    [`& .${gaugeClasses.valueArc}`]: {
      fill: color,
    },
    [`& .${gaugeClasses.referenceArc}`]: {
      fill: theme.palette.text.disabled,
    },
  })}
  />     <Typography variant="caption" color={color}>{subLabel}</Typography>
  <Typography variant="h6" color={color}>{label}</Typography>
      </Stack>
    )
  }