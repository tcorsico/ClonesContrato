import './App.css';
import Formularios from './components/Formularios';

import * as React from "react";
import Navbar from './components/Navbar';
import Footer from './layout/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Formularios />
      <Footer />
    </>
  );
}

export default App;
