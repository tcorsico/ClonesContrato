import * as React from 'react';
import "./Navbar.css";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import GetToken from "../../components/GetToken/GetToken";

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
    return (
        <AppBar position="static" sx={{ marginBottom: '1rem', backgroundColor: 'white', color: '#663dbd' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', margin: '0 5%' }}>
                <Typography variant="h5" component="h1" sx={{ flexGrow: 1, maxWidth: '200px' }}>
                    ActionFintech
                </Typography>
                <div>
                    {currentAccount === ""
                        ? <Button variant="contained" onClick={connectWallet}>Conectar Wallet</Button>
                        : <><GetToken /><Button variant="outlined" startIcon={<AccountCircle />}>
                            {currentAccount.slice(0, 5)}...{currentAccount.slice(37)}
                        </Button></>
                    }</div>
            </Toolbar>
        </AppBar >
    )
};

export default Navbar;
