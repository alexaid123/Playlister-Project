import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'

import { useContext } from 'react';
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store';

export default function SplashScreen() {

    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    function handleGuest()
    {
        auth.registerUser(
            store,
            'userName' + Math.floor(Math.random() * 1000),
            'Guest',
            'Guest',
            'email' + Math.floor(Math.random() * 1000), 
            'passwordahdjhajdhsdjdjdhj',
            'passwordahdjhajdhsdjdjdhj',
            true
        );

    }

    return (
        <div id="splash-screen">
        
        <div id = "SplashTitle"  sx={{fontSize: 100}}> Playlister </div>
        <div> Welcome to Playlister! </div>
        <div id = "Description"> Create, Publish and Browse Playlists as well as so much more! </div>
         
        <Box id = "SplashButtons" sx={{ '& button': { m: 1 } }}>
            <div>
                <Button onClick = {handleGuest} sx={{fontSize: 20, height: 50, width: 250, padding: 1, margin: 2}} variant="contained" size="large">
                GUEST
                </Button>
                <Button  sx={{fontSize: 20, height: 50, width: 250, padding: 1, margin: 2}} variant="contained" size="large"><Link  style={{ textDecoration: 'none', color: 'white' }} to='/login/'>
                LOGIN
                </ Link></Button>
                <Button sx={{fontSize: 20, height: 50, width: 250, padding: 1, margin: 2}} variant="contained" size="large"><Link  style={{ textDecoration: 'none', color: 'white' }}to='/register/'>
                CREATE ACCOUNT
                </ Link></Button>
            </div>
        </Box>
        
        </div>
        
    )
}