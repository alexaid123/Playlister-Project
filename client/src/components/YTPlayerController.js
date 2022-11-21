import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import StopIcon from '@mui/icons-material/Stop';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayCircleFilledWhiteSharpIcon from '@mui/icons-material/PlayCircleFilledWhiteSharp';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export default function YTPlayerController() {
    function handleCreateAccount()
    {
        
    }

    return (
        <Grid container direction = "column">
            <div id = "yComp2">
            </div>
        
            <Grid item container xs = {12} sm = {12} md={12}>
            <div id = "yComp">
            
            
            <Grid item container spacing = '3'>

                <Grid item xs = {5} sm = {5} md={5}></Grid>
                <Grid item xs = {7} sm = {7} md={7}>
                    <div className='fCont'> Now Playing </div>
                </Grid>

                <Grid item xs = {1} sm = {1} md={1}></Grid>
                <Grid item xs = {11} sm = {11} md={11}>
                    <div className='fCont'> Playlist: Dance Party </div>
                </Grid>

                <Grid item xs = {1} sm = {1} md={1}></Grid>
                <Grid item xs = {11} sm = {11} md={11}>
                    <div className='fCont'> Song #: 2 </div>
                </Grid>

                <Grid item xs = {1} sm = {1} md={1}></Grid>
                <Grid item xs = {11} sm = {11} md={11}>
                    <div className='fCont'> Title: Untitled </div>
                </Grid>
                <Grid item xs = {1} sm = {1} md={1}></Grid>
                <Grid item xs = {11} sm = {11} md={11}>
                    <div className='fCont'> Artist: Pink Floyd </div>
                </Grid>
            </Grid>

            <Grid className = "cBut" item container direction="row" spacing = '0'>
                    <Grid item xs = {3} sm = {3} md={3} lg = {3}>
                        
                    </Grid>
                    <Grid item xs = {1.5} sm = {1.5} md={1.5} lg = {1.5}>
                        <SkipPreviousIcon sx={{marginTop: '5px', boxShadow: 2 }} className='controllerButtons' onClick = {handleCreateAccount} fontSize="large"></SkipPreviousIcon>
                    </Grid>
                    <Grid item xs = {1.5} sm = {1.5} md={1.5} lg = {1.5}>
                        <StopIcon sx={{marginTop: '5px', boxShadow: 2 }} className='controllerButtons' fontSize="large"></StopIcon>
                    </Grid>
                    <Grid item xs = {1.5} sm = {1.5} md={1.5} lg = {1.5}>
                        <PlayCircleFilledWhiteSharpIcon sx={{ marginTop: '5px',boxShadow: 2 }}className='controllerButtons' fontSize = 'large' variant="contained"></PlayCircleFilledWhiteSharpIcon>
                    </Grid>
                    <Grid item xs = {1.5} sm = {1.5} md={1.5} lg = {1.5}>
                        <SkipNextIcon className='controllerButtons' sx={{ marginTop: '5px', boxShadow: 2 }} onClick = {handleCreateAccount} variant="contained" fontSize="large"><Link  style={{ textDecoration: 'none', color: 'white' }}to='/register/'>
                    </ Link></SkipNextIcon>
                    </Grid>
                    <Grid item xs = {3} sm = {3} md={3} lg = {3}>
                        
                    </Grid>
            </Grid>
            </div>
            </Grid>
        </Grid>
        
    )
}