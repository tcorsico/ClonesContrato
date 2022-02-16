import { createTheme } from '@mui/material';

const customTheme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#6D26D7',
        },
        secondary: {
            main: '#00C7C5',
        },
        error: {
            main: '#dc3545',
        },
        info: {
            main: '#ffffff'
        }
    },
    typography: {
        fontFamily: 'Montserrat',
        fontWeightRegular: 500,
        button: {
            fontWeight: 600,
        },
    },
    spacing: 10,
    props: {
        MuiButtonBase: {
            disableRipple: true,
        },
        MuiTooltip: {
            arrow: true,
        },
    },
});

export default customTheme;