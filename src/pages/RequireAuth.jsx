import * as React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const RequireAuth = () => {
    const { currentAccount, adminAddress } = useUser();
    const location = useLocation();

    if (currentAccount.toLowerCase() === adminAddress.toLowerCase()) {
        return <Outlet />
    } else {
        return <Navigate to="/" state={{ from: location }} replace />
    }
}

export default RequireAuth