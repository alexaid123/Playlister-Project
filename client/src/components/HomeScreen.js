import React, { useContext, useEffect } from 'react'
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

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
  

const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
        store.start();
    }
    let controller = "";
    let listCard = "";
    let cardClass = "list-card unselected-list-card";
    if (store) {
        controller = <Control ></Control> 
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
                    <HomeIcon id = "cHo" sx = {{padding: "0 10px"}} fontSize="large" ></HomeIcon>
                    <GroupsIcon id = "cHo" sx = {{padding: "0 10px"}}  fontSize="large"></GroupsIcon>
                    <PersonOutlineIcon id = "cHo" sx = {{padding: "0 10px"}} fontSize="large"></PersonOutlineIcon>
                </div>
                <div>
                    <input type="text" placeholder = "Search" className = "searchBar" label="Search" variant="outlined" />
                </div>
                <div style = {{display: "flex"}}>
                    <div style = {{marginTop: "6px",fontSize: "17pt", marginRight: "5px"}}>Sort By </div>
                    <SortIcon id = "cHo" fontSize="large" label="Search" variant="outlined" />
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
                <div id = "plBContainer"> 
                <Typography id = "plB" variant="h6">Player</Typography>
                </div>
                <div id = "plBContainer"> 
                <Typography id = "plB" variant="h6">Comments</Typography>
                </div>
                </div>
                {
                    controller
                }
                </Box>
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