import { Select, MenuItem, Typography } from "@mui/material";

const STYLE = {
  border: "none",
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiSelect-select": {
    margin: 0,
    padding: 0,
  },
};

export default function LocationSelector({
  locationList,
  selectedLocation,
  setLocation,
}) {
  return (
    <Select
      sx={STYLE}
      value={selectedLocation}
      onChange={(e) => setLocation(e.target.value)}
      renderValue={function (location) {
        return <Typography variant="h3"> {location}</Typography>;
      }}
    >
      {locationList.map(function (location) {
        return (
          <MenuItem key={location} value={location}>
            {location}
          </MenuItem>
        );
      })}
    </Select>
  );
}
