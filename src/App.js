import * as React from "react";
import './App.css';
import { ThemeProvider, Button, Divider } from "@mui/material";
import customTheme from "./Theme/Theme"
import Navbar from './models/Navbar/Navbar';
import Footer from './models/Footer/Footer';
import TokenForm from "./models/TokenForm/TokenForm";
import TokensTable from "./components/TokensTable/TokensTable";


function App() {
  const [open, setOpen] = React.useState(false);
  return (
    <ThemeProvider theme={customTheme}>
      <Navbar />
      <TokenForm />
      <Divider sx={{ margin: '2rem 0', width: '100%', height: '1px' }} />
      <Button variant="contained" onClick={() => setOpen((prevState) => !prevState)}>{open ? "Esconder tabla" : "Mostrar tabla de Tokens creados"}</Button>
      {open && <TokensTable />}
      <Footer />
    </ThemeProvider>

  );
}

export default App;
