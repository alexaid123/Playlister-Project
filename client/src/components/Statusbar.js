import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    let text ="";
    let color;
    if (store.currentList)
    {
        text = store.currentList.name;
        color = "green";
    }

    function handleCreateNewList() {
        store.createNewList();
        store.start();
    }
    return (
        <div id="playlister-statusbar">
            <Typography variant="h4" align="center" padding ="18px" bgcolor={color} fontFamily="Comic-sans">{text}</Typography>
            <div>
            
            </div>
        </div>
    );
}

export default Statusbar;