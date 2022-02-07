import * as React from 'react';
import { ethers } from "ethers";
import { mitoken_address, factory_address, mitoken_abi, factory_abi } from '../contract/contract';

const Navbar = () => {
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
            console.log(error);
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

    React.useEffect(() => {
        checkIfWalletIsConnected();
    }, [])

    return <header>
        {currentAccount === "" ? <button onClick={connectWallet}>Conectar Wallet</button> : <h2>La cuenta conectada es {currentAccount}</h2>}
    </header>;
};

export default Navbar;

