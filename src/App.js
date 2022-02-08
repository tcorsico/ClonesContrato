import * as React from "react";
import './App.css';
import { ThemeProvider } from "@mui/material";
import customTheme from "./Theme/Theme"
import Navbar from './models/Navbar/Navbar';
import Footer from './models/Footer/Footer';
import TokenForm from "./models/TokenForm/TokenForm";


function App() {
  return (
    <>
      <ThemeProvider theme={customTheme}>
        <Navbar />
        <TokenForm />
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
