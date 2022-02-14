import * as React from 'react'
import { ethers } from 'ethers';
import { factory_address, factory_abi } from '../../../contract/contract'
import { useLocation, Navigate, Outlet, useParams } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import { Skeleton } from '@mui/material';

const RequireTokenAuth = () => {
    // Variables
    const [loading, setLoading] = React.useState(true)
    const { currentAccount } = useUser();
    const location = useLocation();
    const { tokenId } = useParams();
    const [tokenOwner, setTokenOwner] = React.useState()

    // Functions
    const getTokenOwner = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                // Instancio el contrato
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                let contract = new ethers.Contract(factory_address, factory_abi, signer);
                // Busco en los eventos nuevoContrato solo los tokens que deployo myAddress
                let filterTo = contract.filters.nuevoContrato(tokenId);
                contract.queryFilter(filterTo)
                    .then((event) => setTokenOwner(event[0].args._owner))
                    .catch(() => console.error(`Flasheo`))
            }
        } catch (error) {
            console.error(error);
        }
    }

    // UseEffect
    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, [300]);
        getTokenOwner();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading) {
        return <div style={{ margin: 'auto', marginTop: '50px', width: '70%' }}>
            <Skeleton animation="wave" width={'100%'} />
            <Skeleton animation="wave" width={'100%'} />
            <Skeleton animation="wave" width={'100%'} />
        </div>
    } else {
        if (currentAccount.toLowerCase() === tokenOwner.toLowerCase()) {
            return <Outlet />
        } else {
            return <Navigate to="/" state={{ from: location }} replace />
        }
    }
}

export default RequireTokenAuth