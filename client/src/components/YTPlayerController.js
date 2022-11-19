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

    /*
        <SkipPreviousIcon onClick = {handleCreateAccount} variant="contained" fontSize="large"></SkipPreviousIcon>
            
            <StopIcon fontSize="large"></StopIcon>
                
            <PlayCircleFilledWhiteSharpIcon fontSize = 'large' variant="contained"></PlayCircleFilledWhiteSharpIcon>
              
                <SkipNextIcon onClick = {handleCreateAccount} variant="contained" fontSize="large"><Link  style={{ textDecoration: 'none', color: 'white' }}to='/register/'>
                </ Link></SkipNextIcon>
    */

    return (
        <div id = "yComp">
        
        <div id = "controllerTitle"> Now Playing </div>
        <div id = "ena" className='controllerText'> Playlist: Dance Party </div>
        <div id = "dio" className='controllerText'> Song #: 2 </div>
        <div id = "tria" className='controllerText'> Title: Untitled </div>
        <div id = "tes" className='controllerText'> Artist: Pink Floyd </div>
         
        <div id = "pente" className='controllerButtons'>
        <SkipPreviousIcon sx = {{top: '50%'}}onClick = {handleCreateAccount} fontSize="large"></SkipPreviousIcon>
            
        </div>
        
        </div>
        
    )
}