import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();
    let cardClass = "list-card unselected-list-card";
    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }
    function addSong()
    {
        store.addNewSong();
        //store.loadIdNamePairs();
    }
    return (
        <Box>
        <List 
            id="playlist-cards" 
            sx={{ height: '300px', overflowY: 'scroll', overflowY: 'scroll', width: '100%', bgcolor: 'background.paper' }}
        >
            {store.currentList != null && 
                store.currentList.songs.map((song, index) => (
                    <SongCard
                        id={'playlist-song-' + (index)}
                        key={'playlist-song-' + (index)}
                        index={index}
                        song={song}
                    />
                ))  
            }
            <Grid container>
            <Grid item xs = {1} sm = {1} md = {1} lg = {1}></Grid>
            <Grid item xs = {10} sm = {10} md = {10} lg = {10}>
            {store.currentList != null && !store.currentList.published && <div className = "LCard" style = {{height: '50%'}}>
                 <IconButton style={{marginLeft: '46%'}} onClick={(event) => { addSong() }}>
                <AddIcon style={{fontSize:'28pt'}} />
                </IconButton>
            </div>}
            </Grid>
            <Grid item xs = {1} sm = {1} md = {1} lg = {1}></Grid>
            </Grid>
        </List>            
        { modalJSX }
</Box>
    )
}

export default WorkspaceScreen;