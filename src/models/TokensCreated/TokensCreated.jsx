import * as React from 'react'
import { ethers } from 'ethers';
import TokensTable from "../../components/TokensTable/TokensTable";
import { factory_address, factory_abi } from "../../contract/contract"

const TokensCreated = () => {
    // Variables
    const [tokensCreated, setTokensCreated] = React.useState([]);
    // UseEffect
    React.useEffect(() => {
        // Instancio el contrato
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        let contract = new ethers.Contract(factory_address, factory_abi, signer);
        // Busco en todos los eventos
        let filterTo = contract.filters.newToken();
        contract.queryFilter(filterTo)
            .then((event) => setTokensCreated(event))
            .catch(() => console.error(`Flasho`))
    }, [])
    return (
        <>
            <TokensTable tokens={tokensCreated} />
        </>
    )
}

export default TokensCreated