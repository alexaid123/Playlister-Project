
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
import React, { useContext, useEffect, useState, useRef} from 'react';
import { GlobalStoreContext } from '../store'
import { TextField } from '@mui/material';
import CommentCard from './CommentCard';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';

export default function Comments() {
    const { store } = useContext(GlobalStoreContext);
    const [text, setText] = useState("");
    const inputRef = useRef(null);
    //<input type = "text" id = "commentsInput" placeholder='Add Comment'></input>
    
    function handleKeyPress(event) {
        event.stopPropagation();
        if (event.code === "Enter") {
            if(text != "")
            {
                console.log(text);
                inputRef.current.value = "";
                let cm = {user: "alex", comment: "TEst"};
                store.currentList.comments.push(cm);
                store.updateCurrentList();
                setText("");
            }
           
            
        }
    }
    function handleUpdateText(event) {
        event.stopPropagation();
        setText(event.target.value);
    }

    return (
        <Grid container direction = "column">
            <div id = "yComp3">
            
            <Grid item xs = {12} sm = {12} md = {12} lg = {12}>
            </Grid>
            




            <Box>
                    {store.currentList != null && <List 
                        id="playlist-cards" 
                        sx={{ height: '360px', overflowY: 'scroll', width: '100%', bgcolor: 'background.paper' }}
                    >
                        {
                            store.currentList.comments.map((comment, index) => (
                                <CommentCard
                                    id={'playlist-comment-' + (index)}
                                    key={'playlist-comment-' + (index)}
                                    index={index}
                                    comment={comment}
                                />
                            )) 
                        }
                        <Grid container>
                        <Grid item xs = {1} sm = {1} md = {1} lg = {1}></Grid>
                        <Grid item xs = {10} sm = {10} md = {10} lg = {10}>
                       
                        </Grid>
                        <Grid item xs = {1} sm = {1} md = {1} lg = {1}></Grid>
                        </Grid>
                    </List>}        
                  
            </Box>









            <input 
                ref={inputRef}
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                placeholder = "Add Comment"
                defaultValue={text}
                type = "text" id = "commentsInput"></input>
            </div>
        </Grid>
        
    )
}