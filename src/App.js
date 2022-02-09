import * as React from "react";
import './App.css';
import { ThemeProvider, Button } from "@mui/material";
import customTheme from "./Theme/Theme"
import Navbar from './models/Navbar/Navbar';
import Footer from './models/Footer/Footer';
import TokenForm from "./models/TokenForm/TokenForm";
import TokensTable from "./components/TokensTable/TokensTable";


function App() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    setOpen(true);
  }
  return (
    <>
      <ThemeProvider theme={customTheme}>
        <Navbar />
        <TokenForm />
        {/* <Button variant="contained" onclick={handleOpen}>Mostrar tabla</Button> */}
        <TokensTable />
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
