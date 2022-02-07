import * as React from 'react';
import { mitoken_address, factory_address, mitoken_abi, factory_abi } from '../contract/contract';
import { ethers } from "ethers";
import TextField from '@mui/material/TextField';

const Formularios = () => {
    const [name, setName] = React.useState("");
    const [symbol, setSymbol] = React.useState("");
    const [supply, setSupply] = React.useState(0);
    const [newContract, setNewContract] = React.useState("");

    const createNewToken = async (e) => {
        e.preventDefault();
        try {
            const { ethereum } = window;
            if (ethereum) {
                // Conecto al contrato
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                let contract = new ethers.Contract(factory_address, factory_abi, signer);
                // Ejecuto la funcion clonar
                await contract.clonar(name, symbol, supply);
            } else {
                console.log("No hay conexion a Metamask");
            }
        } catch (error) {
            console.error(error);
        }
    }

    const changeContract = async (e) => {
        e.preventDefault();
        try {
            const { ethereum } = window;
            if (ethereum) {
                // Conecto al contrato
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                let contract = new ethers.Contract(factory_address, factory_abi, signer);
                // Ejecuto la funcion clonar
                await contract.cambiarContratoAClonar(newContract);
            } else {
                console.log("No hay conexion a Metamask");
            }
        } catch (error) {
            console.error(error);
        }
    }

    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    // const signer = provider.getSigner();
    // let contract = new ethers.Contract(mitoken_address, mitoken_abi, signer);


    return (
        <>
            <form onSubmit={(e) => createNewToken(e)} style={{ marginTop: '80px'}}>
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
                <button type="submit" onClick={(e) => createNewToken(e)}>CREAR TOKEN</button>
            </form>

            <form onSubmit={(e) => changeContract(e)} id="cambiar-contrato">
                <div>
                    <label>Change Contract</label>
                    <input type="text" id="contract" name="contract" placeholder="New Contract" onChange={(e) => setNewContract(e.target.value)} required />
                </div>
                <button type="submit" onClick={(e) => changeContract(e)}>CAMBIAR CONTRATO</button>
            </form>
        </>
    );
};

export default Formularios
