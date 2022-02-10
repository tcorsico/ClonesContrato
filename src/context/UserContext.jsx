import * as React from "react";

const UserContext = React.createContext([]);

UserContext.displayName = "UserContext";
export const UserProvider = ({ children }) => {
    // Variables
    const [currentAccount, setCurrentAccount] = React.useState("");
    const adminAddress = "0x5c6a20eBa299B1D7D09757FD91F1384Fe9c5fA90";
    // Funciones
    const checkWallet = async () => {
        try {
            const { ethereum } = window;
            if (!ethereum) {
                return;
            }
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            if (accounts.length !== 0) {
                const account = accounts[0];
                console.log(`This account is connected -- ${account}`);
                setCurrentAccount(account);
            } else {
                console.log(`No authorized account found`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const connect = async () => {
        try {
            const { ethereum } = window;
            if (!ethereum) {
                console.log("no hay metamask instalado");
                return;
            }
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            console.log("Connected", accounts[0]);
            checkWallet();

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <UserContext.Provider value={{ currentAccount, adminAddress, connect, checkWallet }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = React.useContext(UserContext);
    return context;
};