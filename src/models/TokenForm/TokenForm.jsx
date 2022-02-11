import * as React from 'react';
import "./TokenForm.css";
import { ethers } from "ethers";
import { factory_address, factory_abi } from '../../contract/contract';
import { Alert, Button, Box, IconButton, TextField, Typography, styled } from "@mui/material";
import { PhotoCamera } from '@mui/icons-material';
import { create } from 'ipfs-http-client';

const TokenForm = () => {
    // Variables
    const [name, setName] = React.useState("");
    const [symbol, setSymbol] = React.useState("");
    const [supply, setSupply] = React.useState(0);
    const [decimals, setDecimals] = React.useState(18);
    const [totalTokens, setTotalTokens] = React.useState(0);
    const [fileUrl, updateFileUrl] = React.useState(``)
    const Input = styled('input')({
        display: 'none',
    });
    const client = create('https://ipfs.infura.io:5001/api/v0')

    // Para mostrar la info
    const [newAddress, setNewAddress] = React.useState("");
    const [newName, setNewName] = React.useState("");
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
                    await checkEvents();
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
        let contract = new ethers.Contract(factory_address, factory_abi, signer);
        const myAddress = await signer.getAddress();
        let filter = contract.filters.nuevoContrato(null, symbol, null, myAddress);
        // EVENTO
        contract.on(filter, (address, symbol, name, owner) => {
            setNewAddress(address);
            setNewName(name);
            setSuccess(true);
            addToMetamask(address, symbol);
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

    const addToMetamask = async (addr, sym) => {
        console.log(`Comienza la funcion Add to Metamask --`)
        try {
            const { ethereum } = window;
            if (ethereum) {
                // Add token
                ethereum
                    .request({
                        method: 'wallet_watchAsset',
                        params: {
                            type: 'ERC20',
                            options: {
                                address: addr,
                                symbol: sym,
                                decimals: 18,
                                image: fileUrl,
                            },
                        },
                    })
                    .then((success) => {
                        if (success) {
                            console.log('Token successfully added to wallet!');
                        } else {
                            throw new Error('Something went wrong.');
                        }
                    })
                    .catch(console.error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function onChange(e) {
        const file = e.target.files[0]
        try {
            const added = await client.add(file)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`;
            updateFileUrl(url)
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
    }

    // useEffect
    React.useEffect(() => {
        getFee();
    }, [])
    React.useEffect(() => {
        let total = supply / (10 ** decimals);
        setTotalTokens(total);
    }, [decimals, supply])

    return (
        <>
            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' }, margin: '3rem', padding: '1rem', borderStyle: 'solid', borderWidth: '1px', borderColor: 'rgba(0, 0, 0, 0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} onSubmit={(e) => createNewToken(e)}>
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
                    <TextField type="number" id="supply" label="INITIAL SUPPLY" name="supply" variant="standard" onChange={(e) => setSupply(e.target.value)} required />
                </div>
                <div className="form-inputs">
                    <label htmlFor="decimals" style={{ display: 'none' }}>decimals:</label>
                    <TextField type="number" id="decimals" label="DECIMALS" name="decimals" variant="standard" defaultValue={18} onChange={(e) => setDecimals(e.target.value)} required />
                </div>
                <div className="form-inputs">
                    <label htmlFor="total-tokens" style={{ display: 'none' }}>total tokens:</label>
                    <TextField type="number" id="total-tokens" label="TOTAL ENTERA DE TOKENS" name="total-tokens" variant="standard" value={totalTokens} InputProps={{ readOnly: true }} />
                </div>
                <label htmlFor="contained-button-file">
                    <Input accept="image/" id="contained-button-file" multiple type="file" onChange={onChange} />
                    <Button variant="contained" component="span">
                        Upload Icon
                    </Button>
                </label>
                <label htmlFor="icon-button-file">
                    <Input accept="image/" id="icon-button-file" type="file" onChange={onChange} />
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera />
                    </IconButton>
                </label>


                {fileUrl && <img src={fileUrl} width="32px" height="32px" alt="imagen" />}
                <Button variant="contained" type="submit" sx={{ marginTop: '1rem' }} onClick={(e) => createNewToken(e)}>CREAR TOKEN</Button>
                <Typography variant="overline" sx={{ marginTop: '1rem' }}>*El fee es de {tarifa} ether + gas</Typography>
            </Box>
            {error && <Alert severity="error">Todos los espacios deben ser completados!</Alert>}
            {success && <Alert severity="success">Tu Token {newName} se deployo en <a href={link + newAddress} target="_blank" rel="noreferrer">{link + newAddress}</a></Alert>}
        </>);
};

export default TokenForm;