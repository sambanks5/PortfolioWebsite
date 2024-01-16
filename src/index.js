import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FBFCFF',
    },
    secondary: {
      main: '#fbe180',
    },
    background: {
      default: '#fbe180',
      paper: '#1C6E8C',
    },
    info: {
      main: '#A24936',
    },
  },
  typography: {
    fontfamily: 'Montserrat, sans-serif',

    h1: {
      fontSize: 32,

    },
    h2: {
      fontSize: 24,

    },
    h3: {
      fontSize: 18.72,
    },
    h4: {
      fontSize: 16,
    },
    h5: {
      fontSize: 13.28,
    },
    h6: {
      fontSize: 10.72,
    },
    // other typography styles...
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
          },
          '& input[type=number]': {
            '-moz-appearance': 'textfield',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 15, // Set the border radius to your desired value
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 15, // Set the border radius to your desired value
          letterSpacing: '1px', // Add your desired letter spacing here

        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 15, // Set the border radius to your desired value
          
        },
      },
    },
  },

});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
