import * as React from 'react';
import { ethers } from 'ethers';
import { factory_address, factory_abi } from '../../contract/contract';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TokensTable = () => {
    const [tokensCreated, setTokensCreated] = React.useState([{}]);
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
        <TableContainer component={Paper} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Table sx={{ minWidth: 650, maxWidth: '75%', margin: '1rem 1rem 3rem 1rem', border: 'solid rgba(0, 0, 0, 0.12) 1px' }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Token Name</TableCell>
                        <TableCell align="right">Symbol</TableCell>
                        <TableCell align="right">Address</TableCell>
                        <TableCell align="right">Owner</TableCell>
                        <TableCell align="right">Initial Supply</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tokensCreated.length > 1 && tokensCreated.map((token, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {token.args._name}
                            </TableCell>
                            <TableCell align="right">{token.args._symbol}</TableCell>
                            <TableCell align="right">{token.args._nuevoToken}</TableCell>
                            <TableCell align="right">{token.args._owner}</TableCell>
                            <TableCell align="right">{ethers.utils.formatEther((token.args._supply).toString())}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TokensTable