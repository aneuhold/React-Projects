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
  typography: {
    useNextVariants: true,
  },
});

const App = () => (
  <div className="app">
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Album />
    </MuiThemeProvider>
  </div>
);

export default App;
