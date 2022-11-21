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

export default function Dropdown() {
    return (
        <Grid className = "dropDown" container direction = "column" sx = {{width: '17%', backgroundColor: 'white'}}>
           <Grid className = "alex" style={{border: "1px solid grey" }} item>
            <div style = {{marginLeft: '8px'}} className = "sortMen">Name (A-Z)</div>
           </Grid>
           <Grid className = "alex" style={{ border: "1px solid grey" }} item>
            <div style = {{marginLeft: '8px'}} className = "sortMen">Publish Date (Newest)</div>
           </Grid>
           <Grid className = "alex" style={{ border: "1px solid grey" }} item>
            <div style = {{marginLeft: '8px'}} className = "sortMen">Listens (High - Low)</div>
           </Grid>
           <Grid className = "alex" style={{ border: "1px solid grey" }} item>
            <div style = {{marginLeft: '8px'}} className = "sortMen">Likes (High - Low)</div>
           </Grid>
           <Grid className = "alex" style={{ border: "1px solid grey" }} item>
            <div style = {{marginLeft: '8px'}} className = "sortMen">Dislikes (High - Low)</div>
           </Grid>
        </Grid>
        
    )
}