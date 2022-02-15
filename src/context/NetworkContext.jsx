import * as React from "react";
import { ethers } from 'ethers';

const menuItems = [
    {
        key: "0x1",
        value: "Ethereum Mainnet",
        rpcurl: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        currencySymbol: "ETH",
    },
    {
        key: "0x539",
        value: "Local Chain",
        rpcurl: "",
        currencySymbol: "ETH",
    },
    {
        key: "0x3",
        value: "Ropsten Testnet",
        rpcurl: "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        currencySymbol: "ETH",
    },
    {
        key: "0x4",
        value: "Rinkeby Testnet",
        rpcurl: "https://rinkey.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        currencySymbol: "ETH",
    },
    {
        key: "0x2a",
        value: "Kovan Testnet",
        rpcurl: "https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        currencySymbol: "ETH",
    },
    {
        key: "0x5",
        value: "Goerli Testnet",
        rpcurl: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        currencySymbol: "ETH",
    },
    {
        key: "0x38",
        value: "Binance Smart Chain",
        rpcurl: "https://bsc-dataseed.binance.org/",
        currencySymbol: "BNB",
    },
    {
        key: "0x61",
        value: "Smart Chain Testnet",
        rpcurl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
        currencySymbol: "BNB",
    },
    {
        key: "0x89",
        value: "Polygon Mainnet",
        rpcurl: "https://polygon-rpc.com",
        currencySymbol: "MATIC",
    },
    {
        key: "0x13881",
        value: "Polygon Mumbai Testnet",
        rpcurl: "https://rpc-mumbai.maticvigil.com",
        currencySymbol: "MATIC",
    },
    {
        key: "0xa86a",
        value: "Avalanche Mainnet",
        rpcurl: "https://api.avax.network/ext/bc/C/rpc",
        currencySymbol: "AVAX",
    },
    {
        key: "0xa869",
        value: "Avalanche Fuji Testnet",
        rpcurl: "https://api.avax-test.network/ext/bc/C/rpc",
        currencySymbol: "AVAX",
    },
];

const NetworkContext = React.createContext([]);

NetworkContext.displayName = "NetworkContext";

export const NetworkProvider = ({ children }) => {
    // Variables
    const [currentNetwork, setCurrentNetwork] = React.useState("");

    // Funciones
    const getNetwork = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const network = await provider.getNetwork();
        const newNetwork = menuItems.filter(menuItem => menuItem.key === `0x${network.chainId}`);
        setCurrentNetwork(newNetwork[0].value);
    }
    const switchNetwork = async (e) => {
        const network = menuItems.filter(menuItem => menuItem.value === e.target.value);
        try {
            await window.ethereum.request({
                "jsonrpc": "2.0",
                "method": "wallet_switchEthereumChain",
                "params": [
                    {
                        "chainId": network[0].key,
                    }
                ]

            })
        } catch (e) {
            if (e.code === 4902) {
                await window.ethereum.request({
                    "jsonrpc": "2.0",
                    "method": "wallet_addEthereumChain",
                    "params": [
                        {
                            "chainName": network[0].value,
                            "chainId": network[0].key,
                            "rpcUrls": [network[0].rpcurl],
                            "nativeCurrency": {
                                "name": "string",
                                "symbol": network[0].currencySymbol,
                                "decimals": 18,
                            },
                        }
                    ]

                })
            }
        }
        setCurrentNetwork(e.target.value)
    }
    React.useEffect(() => {
        getNetwork();
    }, [])

    return (
        <NetworkContext.Provider value={{ currentNetwork, getNetwork, switchNetwork }}>
            {children}
        </NetworkContext.Provider>
    );
};

export const useNetwork = () => {
    const context = React.useContext(NetworkContext);
    return context;
};