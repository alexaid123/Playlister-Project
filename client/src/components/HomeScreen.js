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
        controller = <Control></Control> 
        listCard = 
            <List sx={{ hieght: '40%', width: '94%', left: '5%', bgcolor: 'cornsilk' }}>
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
        <div id="playlist-selector">
        
            <div>
                <Box className = "topControls" sx  = {{marginLeft: "2%", marginTop:'1%'}}>
                <HomeIcon id = "topIndividual" fontSize="large" ></HomeIcon>
                <GroupsIcon id = "topIndividual" fontSize="large"></GroupsIcon>
                <PersonOutlineIcon id = "topIndividual" fontSize="large"></PersonOutlineIcon>
                <TextField sx = {{marginLeft: '10%', height: '10px', width: '40%', marginTop: '-0.5%'}} id="searchBar" label="Search" variant="outlined" />
                <SortIcon fontSize="large" sx = {{verticalAlign: 'top', paddingLeft: '40%', justifyContent: 'right',  marginTop: '-1%'}} id="searchBar" label="Search" variant="outlined" />
                </Box>
            </div>

            <div id = "comp">
                <span id="list-selector-list">
                <Box>
                    {
                        listCard
                    }
                    <MUIDeleteModal />
                </Box>
                </span>
                <Box>
                {
                    controller
                }
                </Box>
            </div>
    
            <div id="add-list-button">
                <Box sx = {{marginTop: '40%', justifyContent: "center", display: "flex", textAlign: 'center'}}>
                    <Fab color="primary" aria-label="add" onClick={handleCreateNewList}>
                    <AddIcon />
                    </Fab>
                    <Typography variant="h2">Your Lists</Typography>
                </Box>
            </div>

        </div>)
}

export default HomeScreen;