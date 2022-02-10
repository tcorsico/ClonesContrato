import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from "@mui/material";
import customTheme from "./Theme/Theme"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from './context/UserContext';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <Router>
        <UserProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </UserProvider>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
