import * as React from "react";
import './App.css';
import { Divider } from "@mui/material";
import Navbar from './models/Navbar/Navbar';
import Footer from './models/Footer/Footer';
import TokenForm from "./models/TokenForm/TokenForm";
import TokensCreated from "./models/TokensCreated/TokensCreated";
import MyTokens from "./models/MyTokens/MyTokens";


function App() {

  return (
    <>
      <Navbar />
      <TokenForm />
      <Divider sx={{ margin: '2rem 0', width: '100%', height: '1px' }} />
      <TokensCreated />
      <Divider sx={{ margin: '2rem 0', width: '100%', height: '1px' }} />
      <MyTokens />
      <Footer />
    </>

  );
}

export default App;
