import React, { Component } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { HomePage } from "./view/pages";
import {STYLE} from "./nonview/constants";

const THEME = createTheme({

  typography: {
    fontFamily: STYLE.FONT.FAMILY,
    fontSize: STYLE.FONT.SIZE,
  },
});

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={THEME}>
        <HomePage />
      </ThemeProvider>
    );
  }
}
