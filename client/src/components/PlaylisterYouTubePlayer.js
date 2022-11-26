import React from 'react';
import ReactPlayer from 'react-player';
import { GlobalStoreContext } from '../store';
import { useContext, useEffect, useState } from 'react';


function YouTubePlayerExample(props)
{
    const { store } = useContext(GlobalStoreContext);
    const {videoID} = props;
    let vid = "https://www.youtube.com/watch?v=" + videoID;
    

    const playerOptions = {
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

   
        if(store.currentList != null && store.currentList.songs != null && store.currentList.songs[0] != null)
        {
            vid = "https://www.youtube.com/watch?v=" + store.currentList.songs[0].youTubeId;
            if(!ReactPlayer.canPlay(vid))
            {
                vid = "https://www.youtube.com/watch?v=" + videoID;
            }
        }

    function onPlayerReady(event)
    {
        console.log("started playing");
    }

    return (
        <div style = {{position: 'absolute', height: '100%', width: '100%'}}>
           <ReactPlayer opts={playerOptions} controls = {false} pip = {false} onReady = {onPlayerReady} width = '100%' height= "100%" url = {vid}
           onError={() => console.log('eror')}
           />
        </div> 
    )
}

export default YouTubePlayerExample;