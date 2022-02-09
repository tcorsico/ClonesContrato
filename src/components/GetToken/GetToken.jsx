import * as React from 'react';
import { ethers } from 'ethers';
import { factory_address, factory_abi } from '../../contract/contract';
import { Menu, Button, MenuItem } from "@mui/material";


const GetToken = () => {
    const [myTokens, setMyTokens] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
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
                // Conecto al contrato
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const myAddress = await signer.getAddress();
                let contract = new ethers.Contract(factory_address, factory_abi, signer);
                // Ejecuto la funcion clonar
                const myTokens2 = await contract.clones(myAddress);
                setMyTokens([...myTokens, myTokens2]);
            } else {
                console.log("No hay conexion a Metamask");
            }
        } catch (error) {
            console.error(error);
        }
    }
    React.useEffect(() => {
        getMyTokens();
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
