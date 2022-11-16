import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'

export default function SplashScreen() {

    function handleCreateAccount()
    {
        
    }

    return (
        <div id="splash-screen">
        
        <div id = "SplashTitle"  sx={{fontSize: 100}}> Playlister </div>
        <div> Welcome to Playlister! </div>
        <div id = "Description"> Create, Publish and Browse Playlists as well as so much more! </div>
         
        <Box id = "SplashButtons" sx={{ '& button': { m: 1 } }}>
            <div>
                <Button  sx={{fontSize: 20, height: 50, width: 250, padding: 1, margin: 2}} variant="contained" size="large">
                GUEST
                </Button>
                <Button  sx={{fontSize: 20, height: 50, width: 250, padding: 1, margin: 2}} variant="contained" size="large"><Link  style={{ textDecoration: 'none', color: 'white' }} to='/login/'>
                LOGIN
                </ Link></Button>
                <Button onClick = {handleCreateAccount} sx={{fontSize: 20, height: 50, width: 250, padding: 1, margin: 2}} variant="contained" size="large"><Link  style={{ textDecoration: 'none', color: 'white' }}to='/register/'>
                CREATE ACCOUNT
                </ Link></Button>
            </div>
        </Box>
        
        </div>
        
    )
}