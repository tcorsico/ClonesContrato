import * as React from 'react';
import { Button } from "@mui/material";

const Navbar = () => {
    // Variables
    const [currentAccount, setCurrentAccount] = React.useState("");
    // Funciones
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
    const connectWallet = async () => {
        try {
            const { ethereum } = window;
            if (!ethereum) {
                console.log("no hay metamask instalado");
                return;
            }
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            console.log("Connected", accounts[0]);
            checkIfWalletIsConnected();

        } catch (error) {
            console.error(error);
        }
    }
    // UseEffect
    React.useEffect(() => {
        checkIfWalletIsConnected();
    }, [])
    // Componente que se renderiza
    return <nav id="navbar">
        <div className="nav-bar">
            <h1>ActionFintech</h1>
            {currentAccount === "" ? <Button variant="contained" sx={{ backgroundColor: '#663DBD' }} onClick={connectWallet}>Conectar Wallet</Button> : <h4>La cuenta conectada es {currentAccount.slice(0, 5)}...{currentAccount.slice(37)}</h4>}
        </div>
    </nav>;
};

export default Navbar;