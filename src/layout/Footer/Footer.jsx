import * as React from 'react';
import "./Footer.css";
import { Grid } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import backLogo from "../../assets/logodaapsblanco.svg";
import { Container } from "react-bootstrap";

// function Copyright() {
//     return (
//         <Typography variant="body2" color="text.secondary">
//             {'Copyright © '}
//             <Link color="inherit" href="https://mui.com/">
//                 Your Website
//             </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }

export default function Footer() {
    return (
        <div className='footer'>
            <Container>
                <Grid
                    container
                    spacing={0}
                    direction="row"

                    alignItems="center"
                    className='grid-container'
                    wrap="nowrap"
                >
                    <Grid item={true} xs={4} sm={4} md={4} lg={4} className='footer-div primero'>
                        <img id="layout-header-logo" src={backLogo} width="250px" alt="logo-action-fintech" />
                    </Grid>
                    <div className='divider' />
                    <Grid item={true} xs={4} sm={4} md={4} lg={4} className='footer-div'>
                        <p className='footer-text'>Albarellos 1916 Oficina E11</p>
                        <p className='footer-text'>Martinez(1640) Buenos Aires Argentina</p>
                        <p className='footer-text'>Ventas@actionfintech.com</p>
                        <p className='footer-text'>Tel. +54 11-7079-1777</p>
                        <a href="https://dappsfactory.io" target="_blank" rel="noreferrer" className='footer-link'>dappsfactory.io</a>
                    </Grid>
                    <div className='divider' />
                    <Grid item={true} xs={4} sm={4} md={4} lg={4} className='footer-div tercero'>
                        <a href="https://www.instagram.com/dappsfactory/" target="_blank" rel="noreferrer"><InstagramIcon sx={{ color: "white", fontSize: '2.5rem', padding: '0 1rem', '&:hover': { color: '#8b79b3'} }} /></a>
                        <a href="https://www.facebook.com/DAppsFactory" target="_blank" rel="noreferrer"><FacebookIcon sx={{ color: "white", fontSize: '2.5rem', padding: '0 1rem', '&:hover': { color: '#8b79b3'} }} /></a>
                        <a href="https://twitter.com/DApp_Factory" target="_blank" rel="noreferrer"><TwitterIcon sx={{ color: "white", fontSize: '2.5rem', padding: '0 1rem', '&:hover': { color: '#8b79b3'} }} /></a>
                    </Grid>
                </Grid>
            </Container>
        </div>

    );
}