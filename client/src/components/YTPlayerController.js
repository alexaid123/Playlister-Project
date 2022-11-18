import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import StopIcon from '@mui/icons-material/Stop';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayCircleFilledWhiteSharpIcon from '@mui/icons-material/PlayCircleFilledWhiteSharp';

export default function YTPlayerController() {
    function handleCreateAccount()
    {
        
    }
    return (
        <div id="controller">
        
        <div id = "controllerTitle"> Now Playing </div>
        <div id = "controllerText"> Playlist: Dance Party </div>
        <div id = "controllerText"> Song #2 </div>
        <div id = "controllerText"> Title: Untitled </div>
        <div id = "controllerText"> Artist: Pink Floyd </div>
         
        <Box sx={{marginBottom: '-15%', marginTop: '3%', marginLeft: '12.5%', width: '75%', height: '50%', backgroundColor: 'lightGray', '& button': { m: 1 } }}>
            <div>
            <SkipPreviousIcon id = "controllerButtons" onClick = {handleCreateAccount} sx={{fontSize: 20, height: 50, width: 50}} variant="contained" size="large"><Link  style={{ textDecoration: 'none', color: 'white' }}to='/register/'>
                </ Link></SkipPreviousIcon>
                <StopIcon id = "controllerButtons"  sx={{fontSize: 10, height: 50, width: 50}} variant="contained" size="large">
                </StopIcon>
                <PlayCircleFilledWhiteSharpIcon id = "controllerButtons"  fontSize = 'small' sx={{fontSize: "small", height: 45, width: 50}} variant="contained" size="large"><Link  style={{ textDecoration: 'none', color: 'white' }} to='/login/'>
                </ Link></PlayCircleFilledWhiteSharpIcon>
              
                <SkipNextIcon id = "controllerButtons" onClick = {handleCreateAccount} sx={{fontSize: 20, height: 50, width: 50}} variant="contained" size="large"><Link  style={{ textDecoration: 'none', color: 'white' }}to='/register/'>
                </ Link></SkipNextIcon>
            </div>
        </Box>
        
        </div>
        
    )
}