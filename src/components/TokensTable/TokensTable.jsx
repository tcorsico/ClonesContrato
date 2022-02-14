import * as React from 'react';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AssistantIcon from '@mui/icons-material/Assistant';

const TokensTable = ({ tokens }) => {

    return (
        <TableContainer component={Paper} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Table sx={{ minWidth: 650, maxWidth: '75%', margin: '1rem 1rem 3rem 1rem', border: 'solid rgba(0, 0, 0, 0.12) 1px' }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Token Name</TableCell>
                        <TableCell align="right">Symbol</TableCell>
                        <TableCell align="right" ss>Contract Address</TableCell>
                        <TableCell align="right" sx={{ paddingRight: '40px' }}>Owner</TableCell>
                        <TableCell align="right">Initial Supply</TableCell>
                        <TableCell></TableCell>
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
                            <TableCell align="right"><a className="link-table" href={`https://rinkeby.etherscan.io/address/${token.args._nuevoToken}`} target="_blank" rel="noreferrer">{token.args._nuevoToken.slice(0, 5)}...{token.args._nuevoToken.slice(37)}</a><Tooltip title="Copy address" arrow><IconButton onClick={() => navigator.clipboard.writeText(token.args._nuevoToken)}><ContentCopyIcon /></IconButton></Tooltip></TableCell>
                            <TableCell align="right">{token.args._owner.slice(0, 5)}...{token.args._owner.slice(37)}<Tooltip title="Copy address" arrow><IconButton onClick={() => navigator.clipboard.writeText(token.args._owner)}><ContentCopyIcon /></IconButton></Tooltip></TableCell>
                            <TableCell align="right">{ethers.utils.formatEther((token.args._supply).toString())}</TableCell>
                            <TableCell><Link to={`/token/${token.args._nuevoToken}`}><IconButton><AssistantIcon /></IconButton></Link></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TokensTable