import * as React from 'react';
import "./TokenForm.css";
import { ethers } from "ethers";
import { factory_address, factory_abi } from '../../contract/contract';
import { Alert, Button, Box, TextField, Typography } from "@mui/material";

const TokenForm = () => {
    // Variables
    const [name, setName] = React.useState("");
    const [symbol, setSymbol] = React.useState("");
    const [supply, setSupply] = React.useState(0);
    const [newAddress, setNewAddress] = React.useState("");
    const [newName, setNewName] = React.useState("")
    const [error, setError] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [tarifa, setTarifa] = React.useState("0.009781055");
    const link = "https://rinkeby.etherscan.io/address/";
    // FUNCTIONS
    const createNewToken = async (e) => {
        e.preventDefault();
        if (name === "" || symbol === "") {
            setError(true);
            return;
        } else {
            setError(false);
            setSuccess(false);
            try {
                const { ethereum } = window;
                if (ethereum) {
                    // Conecto al contrato
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const signer = provider.getSigner();
                    let contract = new ethers.Contract(factory_address, factory_abi, signer);

                    // Obtengo el precio de tarifa
                    const gweiValue = (await contract.tarifa());
                    let etherValue = ethers.utils.formatEther(gweiValue);
                    setTarifa(Number(etherValue));
                    const sendValue = ethers.utils.parseUnits(etherValue, "ether");
                    console.log(`Comienza la creacion del Token--`);
                    const supplyDecimal = supply.toString();
                    // Ejecuto la funcion clonar
                    await contract.clonar(name, symbol, supplyDecimal, { value: sendValue });
                    checkEvents();
                } else {
                    console.log("No hay conexion a Metamask");
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
    const checkEvents = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        // const myAddress = await signer.getAddress();
        let contract = new ethers.Contract(factory_address, factory_abi, signer);
        contract.on("nuevoContrato", (address, symbol, name, owner) => {
            setNewAddress(address);
            setNewName(name);
            setSuccess(true);
        })
    }
    const getFee = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                // Conecto al contrato
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                let contract = new ethers.Contract(factory_address, factory_abi, provider);
                // Obtengo el precio de tarifa
                const gweiValue = (await contract.tarifa());
                let etherValue = ethers.utils.formatEther(gweiValue);
                setTarifa(Number(etherValue));
            } else {
                console.log("No hay conexion a Metamask");
            }
        } catch (error) {
            console.error(error);
        }
    }
    React.useEffect(() => {
        getFee();
    }, [])
    return (
        <>
            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, margin: '1rem', padding: '1rem', borderStyle: 'solid', borderWidth: '1px', borderColor: 'rgba(0, 0, 0, 0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} onSubmit={(e) => createNewToken(e)}>
                <div className="form-inputs">
                    <label htmlFor="name" style={{ display: 'none' }}>Name:</label>
                    <TextField type="text" id="name" label="NAME" name="name" variant="standard" onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-inputs">
                    <label htmlFor="symbol" style={{ display: 'none' }}>Symbol:</label>
                    <TextField type="text" id="symbol" label="SYMBOL" name="symbol" variant="standard" onChange={(e) => setSymbol(e.target.value)} required />
                </div>
                <div className="form-inputs">
                    <label htmlFor="supply" style={{ display: 'none' }}>Supply:</label>
                    <TextField type="number" id="supply" label="INITIAL SUPPLY" name="supply" variant="standard" onChange={(e) => setSupply(e.target.value * 10 ** 18)} required />
                </div>
                <Button variant="contained" type="submit" sx={{ marginTop: '1rem' }} onClick={(e) => createNewToken(e)}>CREAR TOKEN</Button>
                <Typography variant="overline" sx={{ marginTop: '1rem' }}>*El fee es de {tarifa} ether</Typography>
            </Box>
            {error && <Alert severity="error">Todos los espacios deben ser completados!</Alert>}
            {success && <Alert severity="success">Tu Token {newName} se deployo en <a href={link + newAddress} target="_blank" rel="noreferrer">{link + newAddress}</a></Alert>}
        </>);
};

export default TokenForm;
