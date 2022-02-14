// import * as React from "react";
// import { ethers } from 'ethers';
// import { AvaxLogo, PolygonLogo, BSCLogo, ETHLogo } from "./Logos";


// const NetworkContext = React.createContext([]);
// const menuItems = [
//     {
//         key: "0x1",
//         value: "Ethereum Mainnet",
//         rpcurl: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
//         currencySymbol: "ETH",
//         icon: <ETHLogo />,
//     },
//     {
//         key: "0x539",
//         value: "Local Chain",
//         rpcurl: "",
//         currencySymbol: "ETH",
//         icon: <ETHLogo />,
//     },
//     {
//         key: "0x3",
//         value: "Ropsten Testnet",
//         rpcurl: "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
//         currencySymbol: "ETH",
//         icon: <ETHLogo />,
//     },
//     {
//         key: "0x4",
//         value: "Rinkeby Testnet",
//         rpcurl: "https://rinkey.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
//         currencySymbol: "ETH",
//         icon: <ETHLogo />,
//     },
//     {
//         key: "0x2a",
//         value: "Kovan Testnet",
//         rpcurl: "https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
//         currencySymbol: "ETH",
//         icon: <ETHLogo />,
//     },
//     {
//         key: "0x5",
//         value: "Goerli Testnet",
//         rpcurl: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
//         currencySymbol: "ETH",
//         icon: <ETHLogo />,
//     },
//     {
//         key: "0x38",
//         value: "Binance Smart Chain",
//         rpcurl: "https://bsc-dataseed.binance.org/",
//         currencySymbol: "BNB",
//         icon: <BSCLogo />,
//     },
//     {
//         key: "0x61",
//         value: "Smart Chain Testnet",
//         rpcurl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
//         currencySymbol: "BNB",
//         icon: <BSCLogo />,
//     },
//     {
//         key: "0x89",
//         value: "Polygon Mainnet",
//         rpcurl: "https://polygon-rpc.com",
//         currencySymbol: "MATIC",
//         icon: <PolygonLogo />,
//     },
//     {
//         key: "0x13881",
//         value: "Polygon Mumbai Testnet",
//         rpcurl: "https://rpc-mumbai.maticvigil.com",
//         currencySymbol: "MATIC",
//         icon: <PolygonLogo />,
//     },
//     {
//         key: "0xa86a",
//         value: "Avalanche Mainnet",
//         rpcurl: "https://api.avax.network/ext/bc/C/rpc",
//         currencySymbol: "AVAX",
//         icon: <AvaxLogo />,
//     },
//     {
//         key: "0xa869",
//         value: "Avalanche Fuji Testnet",
//         rpcurl: "https://api.avax-test.network/ext/bc/C/rpc",
//         currencySymbol: "AVAX",
//         icon: <AvaxLogo />,
//     },
// ];


// NetworkContext.displayName = "NetworkContext";
// export const NetworkProvider = ({ children }) => {
//     // Variables
//     const [currentNetwork, setCurrentNetwork] = React.useState("");
//     const adminAddress = "0x5c6a20eBa299B1D7D09757FD91F1384Fe9c5fA90";
//     // Funciones
//     const getNetwork = async () => {
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const network = await provider.getNetwork();
//         const newNetwork = menuItems.filter(menuItem => menuItem.key === `0x${network.chainId}`);
//         setCurrentNetwork(newNetwork[0].value);
//     }

//     return (
//         <UserContext.Provider value={{ currentAccount, adminAddress, connect, checkWallet }}>
//             {children}
//         </UserContext.Provider>
//     );
// };

// export const useUser = () => {
//     const context = React.useContext(UserContext);
//     return context;
// };