import * as React from 'react';
import { factory_address, factory_abi } from '../contract/contract';
import { ethers } from "ethers";
import { Select, MenuItem, Button, Box } from "@mui/material";

const Formularios = () => {
    // Variables
    const [newContract, setNewContract] = React.useState("");
    // const [tokenType, setTokenType] = React.useState("ERC-20");
    // Functions
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
            {/* ELEGIR TOKEN */}


            {/* <form onSubmit={(e) => createNewToken(e)}>
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
            </form> */}
            {/* ACTUALIZAR CONTRATO */}
            <form onSubmit={(e) => changeContract(e)} id="cambiar-contrato">
                <div>
                    <label htmlFor="contract">Change Contract:</label>
                    <input type="text" id="contract" name="contract" placeholder="New Contract" onChange={(e) => setNewContract(e.target.value)} required />
                </div>
                <Button variant="contained" type="submit" sx={{ marginTop: '1rem' }} onClick={(e) => changeContract(e)}>CAMBIAR CONTRATO</Button>
            </form>

        </>
    );
};

export default Formularios
