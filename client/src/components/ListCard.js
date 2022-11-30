import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import Grid from '@mui/material/Grid';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import SongCard from './SongCard.js';
import MUIEditSongModal from './MUIEditSongModal';
import MUIRemoveSongModal from './MUIRemoveSongModal';
import List from '@mui/material/List';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import AddIcon from '@mui/icons-material/Add';
import WorkspaceScreen from './WorkspaceScreen'
import AuthContext from '../auth'

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;
    const { auth } = useContext(AuthContext);

    let likeIcon = <span><ThumbUpAltIcon style={{fontSize:'28pt'}} /><div style = {{marginLeft: "10px", fontWeight:'bold', color: 'black'}}>{idNamePair.likes}</div></span>;
    let dislikeIcon = <span><ThumbDownAltIcon style={{fontSize:'28pt'}} /><div style = {{marginLeft: "10px", fontWeight:'bold', color: 'black'}}>{idNamePair.dislikes}</div></span>;

    if(idNamePair.likedUsers.includes(auth.user.email))
    {
        likeIcon = <span><ThumbUpAltIcon style={{fontSize:'28pt', color: 'blue'}} /><div style = {{marginLeft: "10px", fontWeight:'bold', color: 'black'}}>{idNamePair.likes}</div></span>;
    }

    if(idNamePair.dislikedUsers.includes(auth.user.email))
    {
        dislikeIcon = <span><ThumbDownAltIcon style={{fontSize:'28pt', color: 'red'}} /><div style = {{marginLeft: "10px", fontWeight:'bold', color: 'black'}}>{idNamePair.dislikes}</div></span>;
    }

    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }

    function handleOpen(event, id)
    {
        event.stopPropagation();
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);
            // CHANGE THE CURRENT LIST
            else
            {
                if(store.allLists)
                {
                    store.setPublishedList(id);
                }
                else
                {
                    store.setCurrentList(id);
                }
            }
        }
    }

    function handleCloseB(event, id)
    {
        event.stopPropagation();
        if (!event.target.disabled) {
            store.closeCurrentList();
        }
    }

    function handleLoadList(event, id) {
        event.stopPropagation();
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            // CHANGE THE CURRENT LIST
            if(store.allLists)
            {
                store.setPublishedList(id);
            }
            else
            {
                store.setCurrentList(id);
            }
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleLike(event, id) {
        event.stopPropagation();
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            // CHANGE THE CURRENT LIST
           store.incrementLikes(id);
        }
    }

    function handleDislike(event, id) {
        event.stopPropagation();
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            // CHANGE THE CURRENT LIST
           store.incrementDislikes(id);
        }
    }

    function handlePublish(event)
    {
        event.stopPropagation();
        store.currentList.published = true;
        store.publishCurrentList();
        store.updateCurrentList();  
        store.loadPublishedPlaylists();
    }

    function handleKeyPress(event) {
        event.stopPropagation();
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            if(text != "")
            {
                store.changeListName(id, text);
            }
           
            toggleEdit();
        }
    }

    function handleDuplicate()
    {
        store.duplicateCurrentList();
    }

    function handleUClick(event)
    {
        event.stopPropagation();
        console.log("clicked");
    }

    function handleUpdateText(event) {
        event.stopPropagation();
        setText(event.target.value);
    }

    function handleClick(event, id)
    {
        event.stopPropagation();
        if (event.detail === 2) {
           handleToggleEdit(event);
        }
        else
        {
            if(store.allLists)
            {
                store.playPublishedList(id);
            }
            else
            {
                store.playList(id, 0);
            }
        }
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }
    let cardElement = "";


   if(store.currentList == null && store.allUserLists && !idNamePair.published)
    {
        cardElement = <Box>
            <ListItem
                className = "LCard"
                id={idNamePair._id}
                key={idNamePair._id}
                sx={{backgroundColor: 'Beige', marginTop: '15px', display: 'flex', p: 1 }}
                style={{borderRadius: '20px', left: '5%', width: '90%', fontSize: '28pt'}}
                button
                onClick={(event) => {
                    handleClick(event, idNamePair._id)
                }}
            >
                <Grid container>
                    <Grid item container>
                        <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}<div style={{marginLeft: '5px', fontSize:'14pt'}}>By: <span onClick = {handleUClick} style = {{textDecoration: 'underline', color: 'blue', cursor: 'pointer'}}>{idNamePair.ownerUserName}</span> </div></Box>
                       
                    </Grid>
                    <Grid item container>
                    <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}> </Box>
                    <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}> </Box>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={(event) => {
                                    handleOpen(event, idNamePair._id)
                                }} >
                                <KeyboardDoubleArrowDownIcon style={{fontSize:'28pt'}} />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </ListItem>
        </Box>  
    }

    if(store.currentList != null && store.currentList._id !== idNamePair._id && store.allUserLists && !idNamePair.published)
    {
        cardElement = <Box>
            <ListItem
                className = "LCard"
                id={idNamePair._id}
                key={idNamePair._id}
                sx={{backgroundColor: 'Beige', marginTop: '15px', display: 'flex', p: 1 }}
                style={{borderRadius: '20px', left: '5%', width: '90%', fontSize: '28pt'}}
                button
                onClick={(event) => {
                    handleClick(event, idNamePair._id)
                }}
            >
                <Grid container>
                    <Grid item container>
                        <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}<div style={{marginLeft: '5px', fontSize:'14pt'}}>By: <span onClick = {handleUClick} style = {{textDecoration: 'underline', color: 'blue', cursor: 'pointer'}}>{idNamePair.ownerUserName}</span> </div></Box>
                       
                    </Grid>
                    <Grid item container>
                    <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}> </Box>
                    <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}> </Box>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={(event) => {
                                    handleOpen(event, idNamePair._id)
                                }} >
                                <KeyboardDoubleArrowDownIcon style={{fontSize:'28pt'}} />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </ListItem>
        </Box>  
    }

    if(store.currentList != null && store.allUserPublished && idNamePair._id !== store.currentList._id && idNamePair.published)
    {
        cardElement = <Box>
            <ListItem
                className = "LCard"
                id={idNamePair._id}
                key={idNamePair._id}
                sx={{backgroundColor: 'Beige', marginTop: '15px', display: 'flex', p: 1 }}
                style={{borderRadius: '20px', left: '5%', width: '90%', fontSize: '28pt'}}
                button
                 onClick={(event) => {
                    handleClick(event, idNamePair._id)
                }}
            >
                <Grid container>
                    <Grid item container>
                        <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}<div style={{marginLeft: '5px', fontSize:'14pt'}}>By: <span onClick = {handleUClick} style = {{textDecoration: 'underline', color: 'blue', cursor: 'pointer'}}>{idNamePair.ownerUserName}</span></div></Box>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={(event) => {handleLike(event, idNamePair._id)}} aria-label='edit'>
                                {likeIcon}
                            </IconButton>
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={(event) => {handleDislike(event, idNamePair._id)}} aria-label='delete'>
                                {dislikeIcon}
                            </IconButton>
                        </Box>
                    </Grid>
                    <Grid item container>
                    <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Published: <span style = {{color: 'green'}}>{idNamePair.publishedDate}</span> </Box>
                    <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Listens: <span style = {{color:'red'}}>{idNamePair.listens}</span></Box>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={(event) => {
                                    handleOpen(event, idNamePair._id)
                                }} >
                                <KeyboardDoubleArrowDownIcon style={{fontSize:'28pt'}} />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </ListItem>
        </Box>
    }

    if(store.currentList == null && idNamePair.published)
    {
       cardElement = <Box>
            <ListItem
                className = "LCard"
                id={idNamePair._id}
                key={idNamePair._id}
                sx={{backgroundColor: 'Beige', marginTop: '15px', display: 'flex', p: 1 }}
                style={{borderRadius: '20px', left: '5%', width: '90%', fontSize: '28pt'}}
                button
                onClick={(event) => {
                    handleClick(event, idNamePair._id)
                }}
            >
                <Grid container>
                    <Grid item container>
                        <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}<div style={{marginLeft: '5px', fontSize:'14pt'}}>By: <span onClick = {handleUClick} style = {{textDecoration: 'underline', color: 'blue', cursor: 'pointer'}}>{idNamePair.ownerUserName}</span></div></Box>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={(event) => {handleLike(event, idNamePair._id)}} aria-label='edit'>
                               {likeIcon}
                            </IconButton>
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <IconButton  onClick={(event) => {handleDislike(event, idNamePair._id)}} aria-label='delete'>
                                {dislikeIcon}
                            </IconButton>
                        </Box>
                    </Grid>
                    <Grid item container>
                    <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Published: <span style = {{color: 'green'}}>{idNamePair.publishedDate}</span> </Box>
                    <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Listens: <span style = {{color:'red'}}>{idNamePair.listens}</span></Box>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={(event) => {
                                    handleOpen(event, idNamePair._id)
                                }} >
                                <KeyboardDoubleArrowDownIcon style={{fontSize:'28pt'}} />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </ListItem>
        </Box>
    }

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name" 
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }

    if(store.currentList != null && idNamePair._id === store.currentList._id && store.allUserPublished && idNamePair.published)
    {
        cardElement = <Box>
        <ListItem
            className = "LCard"
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{backgroundColor: 'Beige', marginTop: '15px', display: 'flex', p: 1 }}
            style={{borderRadius: '20px', left: '5%', width: '90%', fontSize: '28pt'}}
        >
            <Grid container>
                <Grid item container>
                    <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}<div style={{marginLeft: '5px', fontSize:'14pt'}}>By: <span onClick = {handleUClick} style = {{textDecoration: 'underline', color: 'blue', cursor: 'pointer'}}>{idNamePair.ownerUserName}</span></div></Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={(event) => {handleLike(event, idNamePair._id)}} aria-label='edit'>
                           {likeIcon}
                        </IconButton>
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton  onClick={(event) => {handleDislike(event, idNamePair._id)}} aria-label='delete'>
                           {dislikeIcon}
                        </IconButton>
                    </Box>
                </Grid>
                <Grid item xs = {12} sm = {12} md = {12} lg = {12}>
                
                 <WorkspaceScreen></WorkspaceScreen>
 
                </Grid>
                <Grid item container>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '13px', fontSize:'15pt'}}>  </Box>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '13px', fontSize:'15pt'}}>  </Box>
                    
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={(event) => {
                                handleCloseB(event, idNamePair._id)
                            }}>
                        </IconButton>
    
                        {idNamePair.ownerEmail === auth.user.email && <button onClick={(event) => {
                                handleDeleteList(event, idNamePair._id)
                            }} style={{fontSize:'14pt', marginLeft: '10px'}}>Delete</button>}
                        <button onClick = {handleDuplicate} style={{fontSize:'14pt', marginLeft: '10px'}}>Duplicate</button>
                    </Box>
                </Grid>
                <Grid item container>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Published: <span style = {{color: 'green'}}>{idNamePair.publishedDate}</span></Box>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Listens: <span style = {{color:'red'}}>{idNamePair.listens}</span></Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={(event) => {
                                handleCloseB(event, idNamePair._id)
                            }}>
                            <KeyboardDoubleArrowUpIcon style={{fontSize:'28pt'}} />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
        </ListItem>
   </Box>
    }


    if(store.currentList != null && idNamePair._id === store.currentList._id && store.allUserLists && idNamePair.published)
    {
        cardElement = <Box>
        <ListItem
            className = "LCard"
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{backgroundColor: 'Beige', marginTop: '15px', display: 'flex', p: 1 }}
            style={{borderRadius: '20px', left: '5%', width: '90%', fontSize: '28pt'}}
        >
            <Grid container>
                <Grid item container>
                    <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}<div style={{marginLeft: '5px', fontSize:'14pt'}}>By: <span onClick = {handleUClick} style = {{textDecoration: 'underline', color: 'blue', cursor: 'pointer'}}>{idNamePair.ownerUserName}</span></div></Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={(event) => {handleLike(event, idNamePair._id)}} aria-label='edit'>
                            {likeIcon}
                        </IconButton>
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton  onClick={(event) => {handleDislike(event, idNamePair._id)}} aria-label='delete'>
                            {dislikeIcon}
                        </IconButton>
                    </Box>
                </Grid>
                <Grid item xs = {12} sm = {12} md = {12} lg = {12}>
                
                 <WorkspaceScreen></WorkspaceScreen>
 
                </Grid>
                <Grid item container>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '13px', fontSize:'15pt'}}>  </Box>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '13px', fontSize:'15pt'}}>  </Box>
                    
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={(event) => {
                                handleCloseB(event, idNamePair._id)
                            }}>
                        </IconButton>
    
                        {idNamePair.ownerEmail === auth.user.email && <button onClick={(event) => {
                                handleDeleteList(event, idNamePair._id)
                            }} style={{fontSize:'14pt', marginLeft: '10px'}}>Delete</button>}
                        <button onClick = {handleDuplicate} style={{fontSize:'14pt', marginLeft: '10px'}}>Duplicate</button>
                    </Box>
                </Grid>
                <Grid item container>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Published: <span style = {{color: 'green'}}>{idNamePair.publishedDate}</span></Box>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Listens: <span style = {{color:'red'}}>{idNamePair.listens}</span></Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={(event) => {
                                handleCloseB(event, idNamePair._id)
                            }}>
                            <KeyboardDoubleArrowUpIcon style={{fontSize:'28pt'}} />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
        </ListItem>
   </Box>
    }


    if(store.currentList != null && idNamePair._id === store.currentList._id && store.allUserLists && !idNamePair.published)
    {
        cardElement = <Box>
        <ListItem
            className = "LCard"
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{backgroundColor: 'Beige', marginTop: '15px', display: 'flex', p: 1 }}
            style={{borderRadius: '20px', left: '5%', width: '90%', fontSize: '28pt'}}
        >
            <Grid container>
                <Grid item container>
                    <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}<div style={{marginLeft: '5px', fontSize:'14pt'}}>By: <span onClick = {handleUClick} style = {{textDecoration: 'underline', color: 'blue', cursor: 'pointer'}}>{idNamePair.ownerUserName}</span></div></Box>
                    <Box sx={{ p: 1 }}>
                     
                    </Box>
                    <Box sx={{ p: 1 }}>
                      
                    </Box>
                </Grid>
                <Grid item xs = {12} sm = {12} md = {12} lg = {12}>
                
                 <WorkspaceScreen></WorkspaceScreen>
 
                </Grid>
                <Grid item container>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '13px', fontSize:'15pt'}}>  <button disabled={!store.canUndo()} onClick = {handleUndo} style={{fontSize:'14pt', marginLeft: '0px'}}>Undo</button><button disabled={!store.canRedo()}onClick = {handleRedo} style={{fontSize:'14pt', marginLeft: '10px'}}>Redo</button>  </Box>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '13px', fontSize:'15pt'}}>  </Box>
                    
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={(event) => {
                                handleCloseB(event, idNamePair._id)
                            }}>
                        </IconButton>
                        <button disabled={store.currentList.published} onClick={(event) => {
                                handlePublish(event)
                            }} style={{fontSize:'14pt', marginLeft: '20px'}}>Publish</button>
                        <button onClick={(event) => {
                                handleDeleteList(event, idNamePair._id)
                            }} style={{fontSize:'14pt', marginLeft: '10px'}}>Delete</button>
                        <button onClick = {handleDuplicate} style={{fontSize:'14pt', marginLeft: '10px'}}>Duplicate</button>
                    </Box>
                </Grid>
                <Grid item container>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}></Box>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}></Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={(event) => {
                                handleCloseB(event, idNamePair._id)
                            }}>
                            <KeyboardDoubleArrowUpIcon style={{fontSize:'28pt'}} />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
        </ListItem>
        </Box>
    }

    if(store.currentList != null && store.currentList._id !== idNamePair._id && store.allUserLists && idNamePair.published)
    {
        cardElement = <Box>
        <ListItem
            className = "LCard"
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{backgroundColor: 'Beige', marginTop: '15px', display: 'flex', p: 1 }}
            style={{borderRadius: '20px', left: '5%', width: '90%', fontSize: '28pt'}}
            button
            onClick={(event) => {
                handleClick(event, idNamePair._id)
            }}
        >
            <Grid container>
                <Grid item container>
                    <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}<div style={{marginLeft: '5px', fontSize:'14pt'}}>By: <span onClick = {handleUClick} style = {{textDecoration: 'underline', color: 'blue', cursor: 'pointer'}}>{idNamePair.ownerUserName}</span></div></Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={(event) => {handleLike(event, idNamePair._id)}} aria-label='edit'>
                           {likeIcon}
                        </IconButton>
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton  onClick={(event) => {handleDislike(event, idNamePair._id)}} aria-label='delete'>
                            {dislikeIcon}
                        </IconButton>
                    </Box>
                </Grid>
                <Grid item container>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Published: <span style = {{color: 'green'}}>{idNamePair.publishedDate}</span> </Box>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Listens: <span style = {{color:'red'}}>{idNamePair.listens}</span></Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={(event) => {
                                handleOpen(event, idNamePair._id)
                            }} >
                            <KeyboardDoubleArrowDownIcon style={{fontSize:'28pt'}} />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
        </ListItem>
    </Box>
    }

    if(store.allLists && (store.currentList == null || idNamePair._id !== store.currentList._id))
    {
        cardElement = <Box>
            <ListItem
                className = "LCard"
                id={idNamePair._id}
                key={idNamePair._id}
                sx={{backgroundColor: 'Beige', marginTop: '15px', display: 'flex', p: 1 }}
                style={{borderRadius: '20px', left: '5%', width: '90%', fontSize: '28pt'}}
                button
                onClick={(event) => {
                    handleClick(event, idNamePair._id)
                }}
            >
                <Grid container>
                    <Grid item container>
                        <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}<div style={{marginLeft: '5px', fontSize:'14pt'}}>By: <span onClick = {handleUClick} style = {{textDecoration: 'underline', color: 'blue', cursor: 'pointer'}}>{idNamePair.ownerUserName}</span></div></Box>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={(event) => {handleLike(event, idNamePair._id)}} aria-label='edit'>
                               {likeIcon}
                            </IconButton>
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={(event) => {handleDislike(event, idNamePair._id)}} aria-label='delete'>
                                {dislikeIcon}
                            </IconButton>
                        </Box>
                    </Grid>
                    <Grid item container>
                    <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Published: <span style = {{color: 'green'}}>{idNamePair.publishedDate}</span> </Box>
                    <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Listens: <span style = {{color:'red'}}>{idNamePair.listens}</span></Box>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={(event) => {
                                    handleOpen(event, idNamePair._id)
                                }} >
                                <KeyboardDoubleArrowDownIcon style={{fontSize:'28pt'}} />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </ListItem>
        </Box>
    }

    if(store.allLists && store.currentList != null && store.currentList._id === idNamePair._id)
    {
        cardElement = <Box>
        <ListItem
            className = "LCard"
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{backgroundColor: 'Beige', marginTop: '15px', display: 'flex', p: 1 }}
            style={{borderRadius: '20px', left: '5%', width: '90%', fontSize: '28pt'}}
        >
            <Grid container>
                <Grid item container>
                    <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}<div style={{marginLeft: '5px', fontSize:'14pt'}}>By: <span onClick = {handleUClick} style = {{textDecoration: 'underline', color: 'blue', cursor: 'pointer'}}>{idNamePair.ownerUserName}</span></div></Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={(event) => {handleLike(event, idNamePair._id)}} aria-label='edit'>
                            {likeIcon}
                        </IconButton>
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={(event) => {handleDislike(event, idNamePair._id)}} aria-label='delete'>
                           {dislikeIcon}
                        </IconButton>
                    </Box>
                </Grid>
                <Grid item xs = {12} sm = {12} md = {12} lg = {12}>
                
                 <WorkspaceScreen></WorkspaceScreen>
 
                </Grid>
                <Grid item container>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '13px', fontSize:'15pt'}}>  </Box>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '13px', fontSize:'15pt'}}>  </Box>
                    
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={(event) => {
                                handleCloseB(event, idNamePair._id)
                            }}>
                        </IconButton>
    
                        {idNamePair.ownerEmail === auth.user.email && <button onClick={(event) => {
                                handleDeleteList(event, idNamePair._id)
                            }} style={{fontSize:'14pt', marginLeft: '10px'}}>Delete</button>}
                        <button onClick = {handleDuplicate} style={{fontSize:'14pt', marginLeft: '10px'}}>Duplicate</button>
                    </Box>
                </Grid>
                <Grid item container>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Published: <span style = {{color: 'green'}}>{idNamePair.publishedDate}</span></Box>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Listens: <span style = {{color:'red'}}>{idNamePair.listens}</span></Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={(event) => {
                                handleCloseB(event, idNamePair._id)
                            }}>
                            <KeyboardDoubleArrowUpIcon style={{fontSize:'28pt'}} />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
        </ListItem>
   </Box>
    }






































    if(store.currentList == null && store.allUserLists && !idNamePair.published && store.playingList != null && idNamePair._id === store.playingList._id)
    {
        cardElement = <Box>
            <ListItem
                className = "LCard"
                id={idNamePair._id}
                key={idNamePair._id}
                sx={{backgroundColor: 'lightgreen', marginTop: '15px', display: 'flex', p: 1 }}
                style={{borderRadius: '20px', left: '5%', width: '90%', fontSize: '28pt'}}
                button
                onClick={(event) => {
                    handleClick(event, idNamePair._id)
                }}
            >
                <Grid container>
                    <Grid item container>
                        <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}<div style={{marginLeft: '5px', fontSize:'14pt'}}>By: <span onClick = {handleUClick} style = {{textDecoration: 'underline', color: 'blue', cursor: 'pointer'}}>{idNamePair.ownerUserName}</span> </div></Box>
                       
                    </Grid>
                    <Grid item container>
                    <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}> </Box>
                    <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}> </Box>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={(event) => {
                                    handleOpen(event, idNamePair._id)
                                }} >
                                <KeyboardDoubleArrowDownIcon style={{fontSize:'28pt'}} />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </ListItem>
        </Box>  
    }

    if(store.currentList != null && store.currentList._id !== idNamePair._id && store.allUserLists && !idNamePair.published && store.playingList != null && idNamePair._id === store.playingList._id)
    {
        cardElement = <Box>
            <ListItem
                className = "LCard"
                id={idNamePair._id}
                key={idNamePair._id}
                sx={{backgroundColor: 'lightgreen', marginTop: '15px', display: 'flex', p: 1 }}
                style={{borderRadius: '20px', left: '5%', width: '90%', fontSize: '28pt'}}
                button
                onClick={(event) => {
                    handleClick(event, idNamePair._id)
                }}
            >
                <Grid container>
                    <Grid item container>
                        <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}<div style={{marginLeft: '5px', fontSize:'14pt'}}>By: <span onClick = {handleUClick} style = {{textDecoration: 'underline', color: 'blue', cursor: 'pointer'}}>{idNamePair.ownerUserName}</span> </div></Box>
                       
                    </Grid>
                    <Grid item container>
                    <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}> </Box>
                    <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}> </Box>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={(event) => {
                                    handleOpen(event, idNamePair._id)
                                }} >
                                <KeyboardDoubleArrowDownIcon style={{fontSize:'28pt'}} />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </ListItem>
        </Box>  
    }

    if(store.currentList != null && store.allUserPublished && idNamePair._id !== store.currentList._id && idNamePair.published && store.playingList != null && idNamePair._id === store.playingList._id)
    {
        cardElement = <Box>
            <ListItem
                className = "LCard"
                id={idNamePair._id}
                key={idNamePair._id}
                sx={{backgroundColor: 'lightgreen', marginTop: '15px', display: 'flex', p: 1 }}
                style={{borderRadius: '20px', left: '5%', width: '90%', fontSize: '28pt'}}
                button
                 onClick={(event) => {
                    handleClick(event, idNamePair._id)
                }}
            >
                <Grid container>
                    <Grid item container>
                        <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}<div style={{marginLeft: '5px', fontSize:'14pt'}}>By: <span onClick = {handleUClick} style = {{textDecoration: 'underline', color: 'blue', cursor: 'pointer'}}>{idNamePair.ownerUserName}</span></div></Box>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={(event) => {handleLike(event, idNamePair._id)}} aria-label='edit'>
                                {likeIcon}
                            </IconButton>
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={(event) => {handleDislike(event, idNamePair._id)}} aria-label='delete'>
                                {dislikeIcon}
                            </IconButton>
                        </Box>
                    </Grid>
                    <Grid item container>
                    <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Published: <span style = {{color: 'green'}}>{idNamePair.publishedDate}</span> </Box>
                    <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Listens: <span style = {{color:'red'}}>{idNamePair.listens}</span></Box>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={(event) => {
                                    handleOpen(event, idNamePair._id)
                                }} >
                                <KeyboardDoubleArrowDownIcon style={{fontSize:'28pt'}} />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </ListItem>
        </Box>
    }

    if(store.currentList == null && idNamePair.published && store.playingList != null && idNamePair._id === store.playingList._id)
    {
       cardElement = <Box>
            <ListItem
                className = "LCard"
                id={idNamePair._id}
                key={idNamePair._id}
                sx={{backgroundColor: 'lightgreen', marginTop: '15px', display: 'flex', p: 1 }}
                style={{borderRadius: '20px', left: '5%', width: '90%', fontSize: '28pt'}}
                button
                onClick={(event) => {
                    handleClick(event, idNamePair._id)
                }}
            >
                <Grid container>
                    <Grid item container>
                        <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}<div style={{marginLeft: '5px', fontSize:'14pt'}}>By: <span onClick = {handleUClick} style = {{textDecoration: 'underline', color: 'blue', cursor: 'pointer'}}>{idNamePair.ownerUserName}</span></div></Box>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={(event) => {handleLike(event, idNamePair._id)}} aria-label='edit'>
                               {likeIcon}
                            </IconButton>
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <IconButton  onClick={(event) => {handleDislike(event, idNamePair._id)}} aria-label='delete'>
                                {dislikeIcon}
                            </IconButton>
                        </Box>
                    </Grid>
                    <Grid item container>
                    <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Published: <span style = {{color: 'green'}}>{idNamePair.publishedDate}</span> </Box>
                    <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Listens: <span style = {{color:'red'}}>{idNamePair.listens}</span></Box>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={(event) => {
                                    handleOpen(event, idNamePair._id)
                                }} >
                                <KeyboardDoubleArrowDownIcon style={{fontSize:'28pt'}} />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </ListItem>
        </Box>
    }

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name" 
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }

    if(store.currentList != null && idNamePair._id === store.currentList._id && store.allUserPublished && idNamePair.published && store.playingList != null && idNamePair._id === store.playingList._id)
    {
        cardElement = <Box>
        <ListItem
            className = "LCard"
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{backgroundColor: 'lightgreen', marginTop: '15px', display: 'flex', p: 1 }}
            style={{borderRadius: '20px', left: '5%', width: '90%', fontSize: '28pt'}}
        >
            <Grid container>
                <Grid item container>
                    <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}<div style={{marginLeft: '5px', fontSize:'14pt'}}>By: <span onClick = {handleUClick} style = {{textDecoration: 'underline', color: 'blue', cursor: 'pointer'}}>{idNamePair.ownerUserName}</span></div></Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={(event) => {handleLike(event, idNamePair._id)}} aria-label='edit'>
                           {likeIcon}
                        </IconButton>
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton  onClick={(event) => {handleDislike(event, idNamePair._id)}} aria-label='delete'>
                           {dislikeIcon}
                        </IconButton>
                    </Box>
                </Grid>
                <Grid item xs = {12} sm = {12} md = {12} lg = {12}>
                
                 <WorkspaceScreen></WorkspaceScreen>
 
                </Grid>
                <Grid item container>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '13px', fontSize:'15pt'}}>  </Box>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '13px', fontSize:'15pt'}}>  </Box>
                    
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={(event) => {
                                handleCloseB(event, idNamePair._id)
                            }}>
                        </IconButton>
    
                        {idNamePair.ownerEmail === auth.user.email && <button onClick={(event) => {
                                handleDeleteList(event, idNamePair._id)
                            }} style={{fontSize:'14pt', marginLeft: '10px'}}>Delete</button>}
                        <button onClick = {handleDuplicate} style={{fontSize:'14pt', marginLeft: '10px'}}>Duplicate</button>
                    </Box>
                </Grid>
                <Grid item container>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Published: <span style = {{color: 'green'}}>{idNamePair.publishedDate}</span></Box>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Listens: <span style = {{color:'red'}}>{idNamePair.listens}</span></Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={(event) => {
                                handleCloseB(event, idNamePair._id)
                            }}>
                            <KeyboardDoubleArrowUpIcon style={{fontSize:'28pt'}} />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
        </ListItem>
   </Box>
    }


    if(store.currentList != null && idNamePair._id === store.currentList._id && store.allUserLists && idNamePair.published && store.playingList != null && idNamePair._id === store.playingList._id)
    {
        cardElement = <Box>
        <ListItem
            className = "LCard"
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{backgroundColor: 'lightgreen', marginTop: '15px', display: 'flex', p: 1 }}
            style={{borderRadius: '20px', left: '5%', width: '90%', fontSize: '28pt'}}
        >
            <Grid container>
                <Grid item container>
                    <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}<div style={{marginLeft: '5px', fontSize:'14pt'}}>By: <span onClick = {handleUClick} style = {{textDecoration: 'underline', color: 'blue', cursor: 'pointer'}}>{idNamePair.ownerUserName}</span></div></Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={(event) => {handleLike(event, idNamePair._id)}} aria-label='edit'>
                            {likeIcon}
                        </IconButton>
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton  onClick={(event) => {handleDislike(event, idNamePair._id)}} aria-label='delete'>
                            {dislikeIcon}
                        </IconButton>
                    </Box>
                </Grid>
                <Grid item xs = {12} sm = {12} md = {12} lg = {12}>
                
                 <WorkspaceScreen></WorkspaceScreen>
 
                </Grid>
                <Grid item container>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '13px', fontSize:'15pt'}}>  </Box>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '13px', fontSize:'15pt'}}>  </Box>
                    
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={(event) => {
                                handleCloseB(event, idNamePair._id)
                            }}>
                        </IconButton>
    
                        {idNamePair.ownerEmail === auth.user.email && <button onClick={(event) => {
                                handleDeleteList(event, idNamePair._id)
                            }} style={{fontSize:'14pt', marginLeft: '10px'}}>Delete</button>}
                        <button onClick = {handleDuplicate} style={{fontSize:'14pt', marginLeft: '10px'}}>Duplicate</button>
                    </Box>
                </Grid>
                <Grid item container>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Published: <span style = {{color: 'green'}}>{idNamePair.publishedDate}</span></Box>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Listens: <span style = {{color:'red'}}>{idNamePair.listens}</span></Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={(event) => {
                                handleCloseB(event, idNamePair._id)
                            }}>
                            <KeyboardDoubleArrowUpIcon style={{fontSize:'28pt'}} />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
        </ListItem>
   </Box>
    }


    if(store.currentList != null && idNamePair._id === store.currentList._id && store.allUserLists && !idNamePair.published && store.playingList != null && idNamePair._id === store.playingList._id)
    {
        cardElement = <Box>
        <ListItem
            className = "LCard"
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{backgroundColor: 'lightgreen', marginTop: '15px', display: 'flex', p: 1 }}
            style={{borderRadius: '20px', left: '5%', width: '90%', fontSize: '28pt'}}
        >
            <Grid container>
                <Grid item container>
                    <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}<div style={{marginLeft: '5px', fontSize:'14pt'}}>By: <span onClick = {handleUClick} style = {{textDecoration: 'underline', color: 'blue', cursor: 'pointer'}}>{idNamePair.ownerUserName}</span></div></Box>
                    <Box sx={{ p: 1 }}>
                     
                    </Box>
                    <Box sx={{ p: 1 }}>
                      
                    </Box>
                </Grid>
                <Grid item xs = {12} sm = {12} md = {12} lg = {12}>
                
                 <WorkspaceScreen></WorkspaceScreen>
 
                </Grid>
                <Grid item container>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '13px', fontSize:'15pt'}}>  <button disabled={!store.canUndo()} onClick = {handleUndo} style={{fontSize:'14pt', marginLeft: '0px'}}>Undo</button><button disabled={!store.canRedo()}onClick = {handleRedo} style={{fontSize:'14pt', marginLeft: '10px'}}>Redo</button>  </Box>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '13px', fontSize:'15pt'}}>  </Box>
                    
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={(event) => {
                                handleCloseB(event, idNamePair._id)
                            }}>
                        </IconButton>
                        <button disabled={store.currentList.published} onClick={(event) => {
                                handlePublish(event)
                            }} style={{fontSize:'14pt', marginLeft: '20px'}}>Publish</button>
                        <button onClick={(event) => {
                                handleDeleteList(event, idNamePair._id)
                            }} style={{fontSize:'14pt', marginLeft: '10px'}}>Delete</button>
                        <button onClick = {handleDuplicate} style={{fontSize:'14pt', marginLeft: '10px'}}>Duplicate</button>
                    </Box>
                </Grid>
                <Grid item container>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}></Box>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}></Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={(event) => {
                                handleCloseB(event, idNamePair._id)
                            }}>
                            <KeyboardDoubleArrowUpIcon style={{fontSize:'28pt'}} />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
        </ListItem>
        </Box>
    }

    if(store.currentList != null && store.currentList._id !== idNamePair._id && store.allUserLists && idNamePair.published && store.playingList != null && idNamePair._id === store.playingList._id)
    {
        cardElement = <Box>
        <ListItem
            className = "LCard"
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{backgroundColor: 'lightgreen', marginTop: '15px', display: 'flex', p: 1 }}
            style={{borderRadius: '20px', left: '5%', width: '90%', fontSize: '28pt'}}
            button
            onClick={(event) => {
                handleClick(event, idNamePair._id)
            }}
        >
            <Grid container>
                <Grid item container>
                    <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}<div style={{marginLeft: '5px', fontSize:'14pt'}}>By: <span onClick = {handleUClick} style = {{textDecoration: 'underline', color: 'blue', cursor: 'pointer'}}>{idNamePair.ownerUserName}</span></div></Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={(event) => {handleLike(event, idNamePair._id)}} aria-label='edit'>
                           {likeIcon}
                        </IconButton>
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton  onClick={(event) => {handleDislike(event, idNamePair._id)}} aria-label='delete'>
                            {dislikeIcon}
                        </IconButton>
                    </Box>
                </Grid>
                <Grid item container>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Published: <span style = {{color: 'green'}}>{idNamePair.publishedDate}</span> </Box>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Listens: <span style = {{color:'red'}}>{idNamePair.listens}</span></Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={(event) => {
                                handleOpen(event, idNamePair._id)
                            }} >
                            <KeyboardDoubleArrowDownIcon style={{fontSize:'28pt'}} />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
        </ListItem>
    </Box>
    }

    if(store.allLists && (store.currentList == null || idNamePair._id !== store.currentList._id) && store.playingList != null && idNamePair._id === store.playingList._id)
    {
        cardElement = <Box>
            <ListItem
                className = "LCard"
                id={idNamePair._id}
                key={idNamePair._id}
                sx={{backgroundColor: 'lightgreen', marginTop: '15px', display: 'flex', p: 1 }}
                style={{borderRadius: '20px', left: '5%', width: '90%', fontSize: '28pt'}}
                button
                onClick={(event) => {
                    handleClick(event, idNamePair._id)
                }}
            >
                <Grid container>
                    <Grid item container>
                        <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}<div style={{marginLeft: '5px', fontSize:'14pt'}}>By: <span onClick = {handleUClick} style = {{textDecoration: 'underline', color: 'blue', cursor: 'pointer'}}>{idNamePair.ownerUserName}</span></div></Box>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={(event) => {handleLike(event, idNamePair._id)}} aria-label='edit'>
                               {likeIcon}
                            </IconButton>
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={(event) => {handleDislike(event, idNamePair._id)}} aria-label='delete'>
                                {dislikeIcon}
                            </IconButton>
                        </Box>
                    </Grid>
                    <Grid item container>
                    <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Published: <span style = {{color: 'green'}}>{idNamePair.publishedDate}</span> </Box>
                    <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Listens: <span style = {{color:'red'}}>{idNamePair.listens}</span></Box>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={(event) => {
                                    handleOpen(event, idNamePair._id)
                                }} >
                                <KeyboardDoubleArrowDownIcon style={{fontSize:'28pt'}} />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </ListItem>
        </Box>
    }

    if(store.allLists && store.currentList != null && store.currentList._id === idNamePair._id && store.playingList != null && idNamePair._id === store.playingList._id)
    {
        cardElement = <Box>
        <ListItem
            className = "LCard"
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{backgroundColor: 'lightgreen', marginTop: '15px', display: 'flex', p: 1 }}
            style={{borderRadius: '20px', left: '5%', width: '90%', fontSize: '28pt'}}
        >
            <Grid container>
                <Grid item container>
                    <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}<div style={{marginLeft: '5px', fontSize:'14pt'}}>By: <span onClick = {handleUClick} style = {{textDecoration: 'underline', color: 'blue', cursor: 'pointer'}}>{idNamePair.ownerUserName}</span></div></Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={(event) => {handleLike(event, idNamePair._id)}} aria-label='edit'>
                            {likeIcon}
                        </IconButton>
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={(event) => {handleDislike(event, idNamePair._id)}} aria-label='delete'>
                           {dislikeIcon}
                        </IconButton>
                    </Box>
                </Grid>
                <Grid item xs = {12} sm = {12} md = {12} lg = {12}>
                
                 <WorkspaceScreen></WorkspaceScreen>
 
                </Grid>
                <Grid item container>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '13px', fontSize:'15pt'}}>  </Box>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '13px', fontSize:'15pt'}}>  </Box>
                    
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={(event) => {
                                handleCloseB(event, idNamePair._id)
                            }}>
                        </IconButton>
    
                        {idNamePair.ownerEmail === auth.user.email && <button onClick={(event) => {
                                handleDeleteList(event, idNamePair._id)
                            }} style={{fontSize:'14pt', marginLeft: '10px'}}>Delete</button>}
                        <button onClick = {handleDuplicate} style={{fontSize:'14pt', marginLeft: '10px'}}>Duplicate</button>
                    </Box>
                </Grid>
                <Grid item container>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Published: <span style = {{color: 'green'}}>{idNamePair.publishedDate}</span></Box>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Listens: <span style = {{color:'red'}}>{idNamePair.listens}</span></Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={(event) => {
                                handleCloseB(event, idNamePair._id)
                            }}>
                            <KeyboardDoubleArrowUpIcon style={{fontSize:'28pt'}} />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
        </ListItem>
   </Box>
    }

   


    return (
        cardElement
    );
}

export default ListCard;