import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'

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
    return (
        <div id="playlister-statusbar">
            <Typography variant="h4" align="center" padding ="18px" bgcolor={color} fontFamily="Comic-sans">{text}</Typography>
        </div>
    );
}

export default Statusbar;