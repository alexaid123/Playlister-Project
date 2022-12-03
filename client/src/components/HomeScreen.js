import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import Control from './YTPlayerController.js'
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import TextField from '@mui/material/TextField';
import SortIcon from '@mui/icons-material/Sort';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Comments from './Comments.js';
import {Menu, MenuItem} from "@mui/material";
import {useRef} from 'react';
import AuthContext from '../auth'
import MUIErrorAlert from './MUIErrorAlert'

//import YouTubePlayerExample from './PlaylisterYouTubePlayer.js'

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
  

const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const[open, setOpen] = useState(false);
    const[anchorElm, setAnchorElm] = useState(null);
    const [text, setText] = useState("");
  //  const [view, setView] = useState(false);
    const inputRef = useRef(null);
    const { auth } = useContext(AuthContext);
    function handleKeyPress(event) {
        event.stopPropagation();
        if (event.code === "Enter") {
                if(text !== "")
                {
                   // setView(true);
                   store.viewSearch = true;
                }
                inputRef.current.value = "";
                store.searchPlaylists(text);
                
                setText("");
            
           
            
        }
    }
    function handleUpdateText(event) {
        event.stopPropagation();
        setText(event.target.value);
    }

    function handleSort(one, two, three, four, five, six, seven)
    {
        handleClose();
        store.sortName = one;
        store.sortPDate = two;
        store.sortListens = three;
        store.sortLikes = four;
        store.sortDislikes = five;
        store.sortEditDate = six;
        store.sortCreate = seven;
        
        store.sortPlaylists(one, two, three, four, five, six, seven);
    }


    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    const handleClose = () => {
        setAnchorElm(null);
        setOpen(false);
    }

    const handleOpen = (e) => {
        setAnchorElm(e.currentTarget);
        setOpen(!open);
    }

    function handlePage(one, two, three)
    {
        if((!one && two && !three))
        {
            store.loadPublishedPlaylists();
        }
        if((one && !two && !three) && !auth.user.guest)
        {
            store.loadIdNamePairs();
        }
        store.allUserLists = one;
        store.allLists = two;
        store.allUserPublished = three;
        store.currentList = null;
        store.playingList = null;
        store.currentSongIndex = -1;
        store.altUserLists(one, two, three);
    }

    function handleCreateNewList() {
        store.createNewList();
    }

    function handlePl()
    {
        store.altPlayer(false);
    }

    function handleYT()
    {
        store.altPlayer(true);
    }

    let pbutton = "";
    let cbutton = "";
    let controller = "";
    let listCard = "";
    let cardClass = "list-card unselected-list-card";
    let comCLass = "cmDisabled";
    let dClass = "";
    if(auth.user.guest)
    {
        dClass = "dHome";
    }
    if(store.playingList != null && store.playingList.published)
    {
        comCLass = "plbContainer";
    }
    if(store.player)
    {
        controller = <Control ></Control> 
        pbutton = <div id = "plBContainerP" onClick={handleYT}> <Typography id = "plB" variant="h6"  >Player</Typography> </div>
        cbutton = <div className = {comCLass} id = "plBContainer" onClick={handlePl}> <Typography id = "plB" variant="h6" >Comments</Typography> </div>
    }
    else
    {
        controller = <Comments ></Comments> 
        pbutton = <div id = "plBContainer" onClick={handleYT}> <Typography id = "plB" variant="h6"  >Player</Typography> </div>
        cbutton = <div id = "plBContainerP" onClick={handlePl}> <Typography id = "plB" variant="h6" >Comments</Typography> </div>
    }
    if (store && store.allUserLists) {
        listCard = 
            <List>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard 
                        className={cardClass}
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    else if((store.publicLists.length !== 0 && store.allLists) || (store.allUserPublished && store.viewSearch))
    {
        listCard = 
            <List>
            {
                store.publicLists.map((pair) => (
                    <ListCard 
                        className={cardClass}
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    return (
        <div className="playlist-selector">
        
            <div className='topC'>
                <div id = "topLeft">
                    <HomeIcon className = {dClass} onClick = {() => handlePage(true, false, false) } id = "cHo" sx = {{padding: "0 10px"}} fontSize="large" ></HomeIcon>
                    <GroupsIcon onClick = {() => handlePage(false, true, false)} id = "cHo" sx = {{padding: "0 10px"}}  fontSize="large"></GroupsIcon>
                    <PersonOutlineIcon onClick = {() => handlePage(false, false, true)} id = "cHo" sx = {{padding: "0 10px"}} fontSize="large"></PersonOutlineIcon>
                </div>
                <div>
                    <input type="text" 
                    ref={inputRef}
                    onKeyPress={handleKeyPress}
                    onChange={handleUpdateText} 
                    defaultValue={text}
                    placeholder = "Search" className = "searchBar" label="Search" variant="outlined" />
                </div>
                <div style = {{display: "flex"}}>
                    <div style = {{marginTop: "6px",fontSize: "17pt", marginRight: "5px"}}>Sort By </div>
                    {!store.allUserLists &&  <span><SortIcon onClick = {handleOpen} id = "cHo" fontSize="large" label="Search" variant="outlined" />
                    <Menu anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                    transformOrigin={{vertical: 'top', horizontal: 'right'}}
                    anchorEl = {anchorElm} open = {open} onClose={handleClose}>
                    <MenuItem onClick = {() => handleSort(true, false, false, false, false, false, false) } sx  = {{marginTop: '-8px', border: "1px solid grey"}}>Name (A-Z)</MenuItem>
                    <MenuItem onClick = {() => handleSort(false, true, false, false, false, false, false) } sx = {{border: "1px solid grey"}}>Publish Date (Newest)</MenuItem>
                    <MenuItem onClick = {() => handleSort(false, false, true, false, false, false, false) } sx = {{border: "1px solid grey"}}>Listens (High - Low)</MenuItem>
                    <MenuItem onClick = {() => handleSort(false, false, false, true, false, false, false) } sx = {{border: "1px solid grey"}}>Likes (High - Low)</MenuItem>
                    <MenuItem onClick = {() => handleSort(false, false, false, false, true, false, false) } sx = {{border: "1px solid grey"}}>Dislikes (High - Low)</MenuItem>
                    
                    </Menu></span>}
                    {store.allUserLists &&  <span><SortIcon onClick = {handleOpen} id = "cHo" fontSize="large" label="Search" variant="outlined" />
                    <Menu anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                    transformOrigin={{vertical: 'top', horizontal: 'right'}}
                    anchorEl = {anchorElm} open = {open} onClose={handleClose}>
                    <MenuItem onClick = {() => handleSort(false, false, false, false, false, true, false) } sx = {{marginTop: '-8px', border: "1px solid grey"}}>Creation Date (Old - New)</MenuItem>
                    <MenuItem onClick = {() => handleSort(false, false, false, false, false, false, true) } sx = {{border: "1px solid grey"}}>Last Edit Date (New - Old)</MenuItem>
                    <MenuItem onClick = {() => handleSort(true, false, false, false, false, false, false) } sx  = {{ border: "1px solid grey"}}>Name (A-Z)</MenuItem>
                   
                    </Menu></span>}
                </div>
            </div>
            <MUIErrorAlert />
            <Grid container id = "mid">
                <Grid item xs = {7.2} sm = {7.2} md={7.2}>
                <Paper>
                <Box id="list-selector-list">
                    {
                        listCard 
                    }
                    <MUIDeleteModal />
                </Box>
                </Paper>
                </Grid>
                
                <Box id = "ytController">
                <div style = {{display: "flex"}}>
                
                    {pbutton}
               
                
                    {cbutton}
            
                </div>
                {
                    controller
                }
                </Box>
            </Grid>
            
            <div id="add-list-button">
                <Box id = "addLB">
                {store.allUserLists && <AddIcon style={{fontSize:'48pt'}}id = "cHo" sx = {{verticalAlign: "middle", marginTop: "5px"}}onClick={handleCreateNewList} fontSize='large'/>}
                {store.allUserLists && <Typography sx = {{marginTop: "18px"}} variant="h4">Your Lists</Typography> }
                {store.allLists && <Typography sx = {{marginTop: "18px"}} variant="h4">Viewing {store.searchText} Playlists</Typography>}
                {store.allUserPublished && !store.allLists && <Typography sx = {{marginTop: "18px"}} variant="h4">Viewing {store.searchText} User Playlists</Typography>}
                </Box>
            </div>
            
           
        </div>)
}

export default HomeScreen;