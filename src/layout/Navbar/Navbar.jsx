import * as React from 'react';
import "./Navbar.css";
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext'
import { AppBar, Button, Toolbar, Skeleton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import ChainSelector from '../../components/ChainSelector/ChainSelector';
import backLogo from "../../assets/logodaaps.svg";


const Navbar = () => {
    // Variables
    const [loading, setLoading] = React.useState(true)
    const { currentAccount, connect, checkWallet } = useUser();
    const connectWallet = () => { connect() }
    const checkIfWalletIsConnected = () => { checkWallet() }

    // UseEffect
    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, [300])
        checkIfWalletIsConnected();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Componente que se renderiza
    return (
        <AppBar position="static" sx={{ marginBottom: '1rem', backgroundColor: 'white', color: '#663dbd' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', margin: '0 5%' }}>
                <Link to={`/`} style={{ marginTop: '.5rem', marginBottom: '.5rem' }}>
                    <img id="layout-header-logo" src={backLogo} alt="logo-action-fintech" width="150px" />
                </Link>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {loading ? <Skeleton width={175} height={35} animation="wave" />
                        : currentAccount === ""
                            ? <Button variant="contained" onClick={connectWallet}>Conectar Wallet</Button>
                            : <>
                                <Button variant="outlined" startIcon={<AccountCircle />} sx={{ height: '39px', marginRight: '1rem'}}>
                                    {currentAccount.slice(0, 5)}...{currentAccount.slice(37)}
                                </Button>
                                <ChainSelector />
                            </>
                    }</div>
            </Toolbar>
        </AppBar >
    )
};

export default Navbar;
