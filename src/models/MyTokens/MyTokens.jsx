import * as React from 'react'
import { ethers } from 'ethers';
import TokensTable from "../../components/TokensTable/TokensTable";
import { factory_address, factory_abi } from "../../contract/contract";
import { Skeleton } from '@mui/material';

const MyTokens = () => {
    // Variables
    const [loading, setLoading] = React.useState(true)
    const [myTokens, setMyTokens] = React.useState([]);
    // UseEffect
    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, [500]);
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
                // Busco en los eventos newToken solo los tokens que deployo myAddress
                let filterTo = contract.filters.newToken(null, null, null, myAddress, null, null);
                contract.queryFilter(filterTo)
                    .then((event) => setMyTokens(event))
                    .catch(() => console.error(`Flasheo`))
            }
        } catch (error) {
            console.error(error);
        }
    }
    if (loading) {
        return <div style={{ margin: 'auto', marginTop: '50px', width: '70%' }}>
            <Skeleton animation="wave" width={'100%'} height={35} />
            <Skeleton animation="wave" width={'100%'} height={35} />
            <Skeleton animation="wave" width={'100%'} height={35} />
        </div>
    } else {
        return (
            <>
                <TokensTable tokens={myTokens} />
            </>
        )
    }
}

export default MyTokens