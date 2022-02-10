import * as React from 'react';
import { Button } from "@mui/material";

const AddToken = () => {
    // functions
    const addToken = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                // Add token
                ethereum
                    .request({
                        method: 'wallet_watchAsset',
                        params: {
                            type: 'ERC20',
                            options: {
                                address: '0x245bB36BcE470e1f66572C861d32c8A4A6757a10',
                                symbol: 'usdb',
                                decimals: 18,
                            },
                        },
                    })
                    .then((success) => {
                        if (success) {
                            console.log('Token successfully added to wallet!');
                        } else {
                            throw new Error('Something went wrong.');
                        }
                    })
                    .catch(console.error);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Button variant="contained" onClick={addToken} sx={{ margin: '2rem' }}>Add Token</Button>
    )
}

export default AddToken