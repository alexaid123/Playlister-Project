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
import Dropdown from './Dropdown';
import {Menu, MenuItem} from "@mui/material";

//import YouTubePlayerExample from './PlaylisterYouTubePlayer.js'

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
  

const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const[open, setOpen] = useState(false);
    const[anchorElm, setAnchorElm] = useState(null);

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
        store.altUserLists(one, two, three);
        console.log(store.allUserLists);
    }

    function handleCreateNewList() {
        store.closeCurrentList();
        store.createNewList();
    }

    function handlePl()
    {
        console.log("Insidee");
        store.altPlayer(false);
    }

    function handleYT()
    {
        console.log("Insidee");
        store.altPlayer(true);
    }

    let pbutton = "";
    let cbutton = "";
    let controller = "";
    let listCard = "";
    let cardClass = "list-card unselected-list-card";
    if(store.player)
    {
        controller = <Control ></Control> 
        pbutton = <div id = "plBContainerP" onClick={handleYT}> <Typography id = "plB" variant="h6"  >Player</Typography> </div>
        cbutton = <div id = "plBContainer" onClick={handlePl}> <Typography id = "plB" variant="h6" >Comments</Typography> </div>
    }
    else
    {
        controller = <Comments ></Comments> 
        pbutton = <div id = "plBContainer" onClick={handleYT}> <Typography id = "plB" variant="h6"  >Player</Typography> </div>
        cbutton = <div id = "plBContainerP" onClick={handlePl}> <Typography id = "plB" variant="h6" >Comments</Typography> </div>
    }
    if (store) {
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
    return (
        <div className="playlist-selector">
        
            <div className='topC'>
                <div id = "topLeft">
                    <HomeIcon onClick = {() => handlePage(true, false, false) } id = "cHo" sx = {{padding: "0 10px"}} fontSize="large" ></HomeIcon>
                    <GroupsIcon onClick = {() => handlePage(false, true, false)} id = "cHo" sx = {{padding: "0 10px"}}  fontSize="large"></GroupsIcon>
                    <PersonOutlineIcon onClick = {() => handlePage(false, false, true)} id = "cHo" sx = {{padding: "0 10px"}} fontSize="large"></PersonOutlineIcon>
                </div>
                <div>
                    <input type="text" placeholder = "Search" className = "searchBar" label="Search" variant="outlined" />
                </div>
                <div style = {{display: "flex"}}>
                    <div style = {{marginTop: "6px",fontSize: "17pt", marginRight: "5px"}}>Sort By </div>
                    <SortIcon onClick = {handleOpen} id = "cHo" fontSize="large" label="Search" variant="outlined" />
                    <Menu anchorEl = {anchorElm} open = {open} onClose={handleClose}>
                    <MenuItem onClick={handleClose}>Name (A-Z)</MenuItem>
                    </Menu>
                </div>
            </div>

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
                {open && <Dropdown></Dropdown>}
            </Grid>
            
            <div id="add-list-button">
                <Box id = "addLB">
                    <AddIcon style={{fontSize:'48pt'}}id = "cHo" sx = {{verticalAlign: "middle", marginTop: "5px"}}onClick={handleCreateNewList} fontSize='large'/>
                    <Typography sx = {{marginTop: "18px"}} variant="h4">Your Lists</Typography>
                </Box>
            </div>
            
           
        </div>)
}

export default HomeScreen;