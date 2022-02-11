import * as React from 'react'
import { ethers } from 'ethers';
import { Button } from "@mui/material"
import TokensTable from "../../components/TokensTable/TokensTable";
import { factory_address, factory_abi } from "../../contract/contract"

const MyTokens = () => {
    // Variables
    const [open, setOpen] = React.useState(false);
    const [myTokens, setMyTokens] = React.useState([]);
    // UseEffect
    React.useEffect(() => {
        getMyTokens();
    }, [])
    // Functions
    const getMyTokens = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                // Instancio el contrato
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                let contract = new ethers.Contract(factory_address, factory_abi, signer);
                // Obtengo el address del cliente
                const myAddress = await signer.getAddress();
                // Busco en los eventos nuevoContrato solo los tokens que deployo myAddress
                let filterTo = contract.filters.nuevoContrato(null, null, null, myAddress);
                contract.queryFilter(filterTo)
                    .then((event) => setMyTokens(event))
                    .catch(() => console.error(`Flasheo`))
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <Button variant="contained" onClick={() => setOpen((prevState) => !prevState)} sx={{ margin: '2rem'}}>{open ? "Esconder tabla" : "Mostrar tabla de mis Tokens"}</Button>
            {open && <TokensTable tokens={myTokens} />}
        </>
    )
}

export default MyTokens