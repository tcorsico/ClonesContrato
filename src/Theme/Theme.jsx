import { createTheme } from '@mui/material';

const customTheme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#663dbd',
        },
        secondary: {
            main: '#3ec78f',
        },
        error: {
            main: '#dc3545',
        },
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