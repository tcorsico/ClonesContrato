import * as React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

const Layout = () => {
    const { currentAccount, adminAddress } = useUser();
    return (
        <>
            <Navbar />
            {currentAccount.toLowerCase() === adminAddress.toLowerCase()
                && <Link to='/admin'>IR A ADMIN</Link>}
            { currentAccount !== '' &&
            <Link to='/my-tokens'>IR A MIS TOKENS</Link>}
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout