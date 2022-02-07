import * as React from 'react';
import { mitoken_address, factory_address, mitoken_abi, factory_abi } from '../contract/contract';
import { ethers } from "ethers";

//instancia del contrato
// let provider = ethers.getDefaultProvider();

// await provider.send("eth_requestAccounts", []);




const Formularios = () => {

    const ethersFunction = async () => { 
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        let contract = new ethers.Contract(mitoken_address, mitoken_abi, provider.getSigners());

        const { ethereum } = window;
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        const account = accounts[0];
        console.log("mi address ", account)

        await contract.intialize(name, symbol, account, supply);
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    let contract = new ethers.Contract(mitoken_address, mitoken_abi, provider.getSigners());

    console.log("mi address ", provider.getAddress())

    const [name, setName] = React.useState("");
    const [symbol, setSymbol] = React.useState("");
    const [supply, setSupply] = React.useState(0);

    const createToken = (evt) => {
        evt.preventDefault();
        console.log(`El nombre es ${name}, el simbolo ${symbol} y el supply ${supply}`);
    }
    return (
        <form onSubmit={createToken}>
            <div>
                <label>Name</label>
                <input type="text" id="name" name="name" onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Symbol</label>
                <input type="text" id="symbol" name="symbol" onChange={(e) => setSymbol(e.target.value)} required />
            </div>
            <div>
                <label>Supply</label>
                <input type="number" id="supply" name="supply" onChange={(e) => setSupply(e.target.value)} required />
            </div>
            <button type="submit" onClick={() => ethersFunction()}>CREAR TOKEN</button>
        </form>
    );
};

export default Formularios
