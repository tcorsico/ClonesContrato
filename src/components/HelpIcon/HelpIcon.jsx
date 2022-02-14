import * as React from 'react'
import { Tooltip, InputAdornment } from '@mui/material';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';

const HelpIcon = ({ explicacion = 'explicacion' }) => {
    return (
        <Tooltip placement="right" title={explicacion} sx={{ cursor: 'pointer' }}>
            <InputAdornment position="end">
                <HelpCenterIcon />
            </InputAdornment>
        </Tooltip>
    )
}

export default HelpIcon