
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
import WorkspaceScreen from './WorkspaceScreen';
import React, { useContext, useEffect, useState } from 'react';
import { GlobalStoreContext } from '../store'

export default function Comments() {
    const { store } = useContext(GlobalStoreContext);

    return (
        <Grid container direction = "column">
            <div id = "yComp3">
            
            <Grid item xs = {12} sm = {12} md = {12} lg = {12}>
               
              {store.currentList != null && <WorkspaceScreen></WorkspaceScreen>}

            </Grid>
            <input type = "text" id = "commentsInput" placeholder='Add Comment'></input>

            </div>
        </Grid>
        
    )
}