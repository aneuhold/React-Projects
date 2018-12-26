import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import './App.css';
import Album from './Album';

const theme = createMuiTheme({
  palette: {
    primary: orange,
    secondary: orange,
  },
});

const App = () => (
  <MuiThemeProvider theme={theme} className="app">
    <CssBaseline />
    <Album />
  </MuiThemeProvider>
);

export default App;
