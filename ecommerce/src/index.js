import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css'
import theme from './home/theme'
import { ThemeProvider } from '@material-ui/styles';
ReactDOM.render(
  <ThemeProvider theme={theme}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ThemeProvider>,
  document.getElementById('root')
);

 