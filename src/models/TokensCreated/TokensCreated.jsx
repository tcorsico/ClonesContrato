import * as React from 'react'
import { ethers } from 'ethers';
import { Button } from "@mui/material"
import TokensTable from "../../components/TokensTable/TokensTable";
import { factory_address, factory_abi } from "../../contract/contract"

const TokensCreated = () => {
    // Variables
    const [open, setOpen] = React.useState(false);
    const [tokensCreated, setTokensCreated] = React.useState([]);
    // UseEffect
    React.useEffect(() => {
        // Instancio el contrato
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        let contract = new ethers.Contract(factory_address, factory_abi, signer);
        // Busco en todos los eventos
        let filterTo = contract.filters.nuevoContrato();
        contract.queryFilter(filterTo)
            .then((event) => setTokensCreated(event))
            .catch(() => console.error(`Flasho`))
    }, [])
    return (
        <>
            <Button variant="contained" onClick={() => setOpen((prevState) => !prevState)} sx={{ margin: '2rem'}}>{open ? "Esconder tabla" : "Mostrar tabla de Tokens creados"}</Button>
            {open && <TokensTable tokens={tokensCreated} />}
        </>
    )
}

export default TokensCreated