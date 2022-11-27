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
import { GlobalStoreContext } from '../store';
import { useContext, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

export default function YTPlayerController(props) {
    const { store } = useContext(GlobalStoreContext);
    const [count, setCount] = useState(0);
    const [playing, setPlaying] = useState(true); 


    let vid = "https://www.youtube.com/watch?v=";


    const playerOptions = {
        playerVars: {
            autoplay: 0,
        },
    };

    let bSClass = "controllerButtons";
    let bPClass = "controllerButtons";
    let bRSClass = "controllerButtons";
    if(store.currentList != null && (count < 0 ))
    {
        bSClass = "disableController";
    }
    if(store.currentList == null || store.currentList.songs == null)
    {
        bPClass = "disableController";
    }
    if(store.currentList == null || (store.currentList.songs == null))
    {
        bSClass = "disableController";
        bPClass = "disableController";
        bRSClass = "disableController";
    }

    function nextSong()
    {
        if(store.currentList != null && store.currentSongIndex < store.currentList.songs.length - 1)
        {
            store.changeCurSong(1);
        }
    }
    function prevSong()
    {
        if(store.currentSongIndex > 0)
        {
            store.changeCurSong(-1);
        }
       
    }

   
    if(store.currentList != null && store.currentList.songs != null && store.currentList.songs[store.currentSongIndex] != null)
    {
        console.log("Playing song " + store.currentSongIndex);
        vid = "https://www.youtube.com/watch?v=" + store.currentList.songs[store.currentSongIndex].youTubeId;
        if(!ReactPlayer.canPlay(vid))
        {
            vid = "";
        }
    }

    function onPlayerReady(event)
    {
        console.log("started playing");
    }

    return (
        <Grid container direction = "column">
            <div id = "yComp2">
            <div style = {{marginTop: '-5%'}}>
          <div style = {{position: 'absolute', height: '100%', width: '100%'}}>
          <ReactPlayer playing = {playing} onEnded = {nextSong} opts={playerOptions} controls = {false} pip = {false} onReady = {onPlayerReady} width = '100%' height= "100%" url = {vid}
           onError={() => console.log('eror')}
           />
        </div> 
            </div>
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
                    <div className='fCont'> Playlist: {store.currentList != null && store.currentList.songs != null && store.currentList.songs[store.currentSongIndex] != null && store.currentList.name} </div>
                </Grid>

                <Grid item xs = {1} sm = {1} md={1}></Grid>
                <Grid item xs = {11} sm = {11} md={11}>
                    <div className='fCont'> Song #: {store.currentList != null && store.currentList.songs != null && store.currentList.songs[store.currentSongIndex] != null && store.currentSongIndex + 1} </div>
                </Grid>

                <Grid item xs = {1} sm = {1} md={1}></Grid>
                <Grid item xs = {11} sm = {11} md={11}>
                    <div className='fCont'> Title: {store.currentList != null && store.currentList.songs != null && store.currentList.songs[store.currentSongIndex] != null && store.currentList.songs[store.currentSongIndex].title} </div>
                </Grid>
                <Grid item xs = {1} sm = {1} md={1}></Grid>
                <Grid item xs = {11} sm = {11} md={11}>
                    <div className='fCont'> Artist: {store.currentList != null && store.currentList.songs != null && store.currentList.songs[store.currentSongIndex] != null && store.currentList.songs[store.currentSongIndex].artist} </div>
                </Grid>
            </Grid>

            <Grid className = "cBut" item container direction="row" spacing = '0' sx = {{marginTop: '20px'}}>
                    <Grid item xs = {3} sm = {3} md={3} lg = {3}>
                        
                    </Grid>
                    <Grid item xs = {1.5} sm = {1.5} md={1.5} lg = {1.5}>
                        <SkipPreviousIcon onClick = {prevSong} sx={{marginTop: '5px', boxShadow: 2 }} className={bPClass} fontSize="large"></SkipPreviousIcon>
                    </Grid>
                    <Grid item xs = {1.5} sm = {1.5} md={1.5} lg = {1.5}>
                        <StopIcon onClick={() => setPlaying(false)} sx={{marginTop: '5px', boxShadow: 2 }} className={bRSClass} fontSize="large"></StopIcon>
                    </Grid>
                    <Grid item xs = {1.5} sm = {1.5} md={1.5} lg = {1.5}>
                        <PlayCircleFilledWhiteSharpIcon onClick={() => setPlaying(true)} sx={{ marginTop: '5px',boxShadow: 2 }}className={bRSClass} fontSize = 'large' variant="contained"></PlayCircleFilledWhiteSharpIcon>
                    </Grid>
                    <Grid item xs = {1.5} sm = {1.5} md={1.5} lg = {1.5}>
                        <SkipNextIcon onClick= {nextSong} className={bSClass} sx={{ marginTop: '5px', boxShadow: 2 }} variant="contained" fontSize="large"><Link  style={{ textDecoration: 'none', color: 'white' }}to='/register/'>
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