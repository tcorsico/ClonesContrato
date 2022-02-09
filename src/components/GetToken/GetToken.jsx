import * as React from 'react';
import { ethers } from 'ethers';
import { factory_address, factory_abi } from '../../contract/contract';
import { Menu, Button, MenuItem } from "@mui/material";


const GetToken = () => {
    const [myTokens, setMyTokens] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [tokensCreated, setTokensCreated] = React.useState([{}]);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        navigator.clipboard.writeText(myTokens[0])
        setAnchorEl(null);
    };
    const getMyTokens = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                let contract = new ethers.Contract(factory_address, factory_abi, signer);
                // Search historic events
                let filterTo = contract.filters.nuevoContrato();
                contract.queryFilter(filterTo)
                    .then((event) => setMyTokens(event))
                    .catch(() => console.error(`Flasho en getMyTokens`))
            } else {
                console.log("No hay conexion a Metamask");
            }
        } catch (error) {
            console.error(error);
        }
    }
    React.useEffect(() => {
        // Instancio el contrato
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        let contract = new ethers.Contract(factory_address, factory_abi, signer);
        // Search historic events
        let filterTo = contract.filters.nuevoContrato();
        contract.queryFilter(filterTo)
            .then((event) => setTokensCreated(event))
            .catch(() => console.error(`Flasho`))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <Button id="basic-button" aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick} variant="contained" sx={{ margin: '0 1rem' }}>SEE MY TOKEN</Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>{myTokens[0]}</MenuItem>
            </Menu>
        </>
    )
}

export default GetToken
