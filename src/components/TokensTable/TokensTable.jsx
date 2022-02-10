import * as React from 'react';
import { ethers } from 'ethers';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TokensTable = ({ tokens }) => {
    
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
                    {tokens.length > 0 && tokens.map((token, index) => (
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