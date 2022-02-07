import './App.css';
import Formularios from './components/Formularios';

import * as React from "react";
import Navbar from './components/Navbar';
import Footer from './layout/Footer';
import { mitoken_address, factory_address, mitoken_abi, factory_abi } from './contract/contract';
import { ethers } from "ethers";

function App() {
  const [currentAccount, setCurrentAccount] = React.useState("");
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        return;
      }
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.error(error);
    }
  }
  React.useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <>
      <Navbar acc={currentAccount} check={checkIfWalletIsConnected} />
      <Formularios />
      <Footer />
    </>
  );
}

export default App;
