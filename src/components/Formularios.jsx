import * as React from 'react';
import { factory_address, factory_abi } from '../contract/contract';
import { ethers } from "ethers";
import { Select, MenuItem, Button } from "@mui/material";

const Formularios = () => {
    // Variables
    const [name, setName] = React.useState("");
    const [symbol, setSymbol] = React.useState("");
    const [supply, setSupply] = React.useState(0);
    const [newContract, setNewContract] = React.useState("");
    const [tokenType, setTokenType] = React.useState("ERC-20")
    // Functions
    const createNewToken = async (e) => {
        e.preventDefault();
        try {
            const { ethereum } = window;
            if (ethereum) {
                // Conecto al contrato
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const myAddress = await signer.getAddress();
                let contract = new ethers.Contract(factory_address, factory_abi, signer);
                // Ejecuto la funcion clonar
                await contract.clonar(name, symbol, supply);
                console.log(contract.filter.nuevoContrato(null, null, null, myAddress));
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
    // Component
    return (
        <>
            <form onSubmit={(e) => createNewToken(e)} style={{ marginTop: '80px' }}>
                <div>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={tokenType}
                        label="Token Type"
                        onChange={(e) => setTokenType(e.target.value)}
                    >
                        <MenuItem value={"ERC-20"}>ERC-20</MenuItem>
                        <MenuItem value={"Capped"}>ERC-20 CAPPED</MenuItem>
                        <MenuItem value={"Mintable"}>ERC-20 MINTABLE</MenuItem>
                    </Select>
                </div>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="symbol">Symbol:</label>
                    <input type="text" id="symbol" name="symbol" onChange={(e) => setSymbol(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="supply">Supply:</label>
                    <input type="number" id="supply" name="supply" onChange={(e) => setSupply(e.target.value)} required />
                </div>
                <Button variant="contained" type="submit" sx={{ backgroundColor: '#663DBD', marginTop: '1rem' }} onClick={(e) => createNewToken(e)}>CREAR TOKEN</Button>
            </form>

            <form onSubmit={(e) => changeContract(e)} id="cambiar-contrato">
                <div>
                    <label htmlFor="contract">Change Contract:</label>
                    <input type="text" id="contract" name="contract" placeholder="New Contract" onChange={(e) => setNewContract(e.target.value)} required />
                </div>
                <Button variant="contained" type="submit" sx={{ backgroundColor: '#663DBD', marginTop: '1rem' }} onClick={(e) => changeContract(e)}>CAMBIAR CONTRATO</Button>
            </form>
        </>
    );
};

export default Formularios
