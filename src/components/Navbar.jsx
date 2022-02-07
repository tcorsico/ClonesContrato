import * as React from 'react';
import { ethers } from "ethers";
import { mitoken_address, factory_address, mitoken_abi, factory_abi } from '../contract/contract';
import Button from "@mui/material/Button";

const Navbar = ({ acc, check }) => {
    const connectWallet = async () => {
        try {
            const { ethereum } = window;
            if (!ethereum) {
                console.log("no hay metamask instalado");
                return;
            }
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            console.log("Connected", accounts[0]);
            check();

        } catch (error) {
            console.error(error);
        }
    }

    return <nav id="navbar">
        <div className="nav-bar">
            <h1>ActionFintech</h1>
            {acc === "" ? <Button variant="contained" sx={{ backgroundColor: '#663DBD' }} onClick={connectWallet}>Conectar Wallet</Button> : <h4>La cuenta conectada es {acc.slice(0, 5)}...{acc.slice(37)}</h4>}
        </div>
    </nav>;
};

export default Navbar;