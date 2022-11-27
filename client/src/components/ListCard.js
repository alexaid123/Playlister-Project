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
            console.log("THE ID FOR THUIS IS " + id);
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
            console.log("enetered");
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

    function handlePublish(event)
    {
        event.stopPropagation();
        store.currentList.published = true;
        store.publishCurrentList();
        store.updateCurrentList();  
        store.loadPublishedPlaylists();
        console.log("Published is " + store.currentList.published);
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
    function handleUpdateText(event) {
        event.stopPropagation();
        setText(event.target.value);
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
                    handleLoadList(event, idNamePair._id)
                }}
            >
                <Grid container>
                    <Grid item container>
                        <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}<div style={{marginLeft: '5px', fontSize:'14pt'}}>By: {idNamePair.ownerUserName} </div></Box>
                       
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
                    handleLoadList(event, idNamePair._id)
                }}
            >
                <Grid container>
                    <Grid item container>
                        <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}<div style={{marginLeft: '5px', fontSize:'14pt'}}>By: {idNamePair.ownerUserName} </div></Box>
                       
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
                    handleLoadList(event, idNamePair._id)
                }}
            >
                <Grid container>
                    <Grid item container>
                        <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}<div style={{marginLeft: '5px', fontSize:'14pt'}}>By: {idNamePair.ownerUserName}</div></Box>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={handleToggleEdit} aria-label='edit'>
                                <ThumbUpAltIcon style={{fontSize:'28pt'}} /><div style = {{marginLeft: "10px"}}>0</div>
                            </IconButton>
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={(event) => {
                                    handleDeleteList(event, idNamePair._id)
                                }} aria-label='delete'>
                                <ThumbDownAltIcon style={{fontSize:'28pt'}} /><div style = {{marginLeft: "10px"}}>0</div>
                            </IconButton>
                        </Box>
                    </Grid>
                    <Grid item container>
                    <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Published: <span style = {{color: 'green'}}>{idNamePair.updatedAt}</span> </Box>
                    <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Listens: </Box>
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
                    handleLoadList(event, idNamePair._id)
                }}
            >
                <Grid container>
                    <Grid item container>
                        <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}<div style={{marginLeft: '5px', fontSize:'14pt'}}>By: {idNamePair.ownerUserName}</div></Box>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={handleToggleEdit} aria-label='edit'>
                                <ThumbUpAltIcon style={{fontSize:'28pt'}} /><div style = {{marginLeft: "10px"}}>0</div>
                            </IconButton>
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={(event) => {
                                    handleDeleteList(event, idNamePair._id)
                                }} aria-label='delete'>
                                <ThumbDownAltIcon style={{fontSize:'28pt'}} /><div style = {{marginLeft: "10px"}}>0</div>
                            </IconButton>
                        </Box>
                    </Grid>
                    <Grid item container>
                    <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Published: <span style = {{color: 'green'}}>{idNamePair.updatedAt}</span> </Box>
                    <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Listens: </Box>
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
                    <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}<div style={{marginLeft: '5px', fontSize:'14pt'}}>By:{idNamePair.ownerUserName}</div></Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={handleToggleEdit} aria-label='edit'>
                            <ThumbUpAltIcon style={{fontSize:'28pt'}} /><div style = {{marginLeft: "10px"}}>0</div>
                        </IconButton>
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={(event) => {
                                handleDeleteList(event, idNamePair._id)
                            }} aria-label='delete'>
                            <ThumbDownAltIcon style={{fontSize:'28pt'}} /><div style = {{marginLeft: "10px"}}>0</div>
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
                        <button style={{fontSize:'14pt', marginLeft: '10px'}}>Duplicate</button>
                    </Box>
                </Grid>
                <Grid item container>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Published: <span style = {{color: 'green'}}>{idNamePair.updatedAt}</span></Box>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Listens: </Box>
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

    if(store.currentList == null && store.allLists && idNamePair.published)
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
                    handleLoadList(event, idNamePair._id)
                }}
            >
                <Grid container>
                    <Grid item container>
                        <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}<div style={{marginLeft: '5px', fontSize:'14pt'}}>By: {idNamePair.ownerUserName}</div></Box>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={handleToggleEdit} aria-label='edit'>
                                <ThumbUpAltIcon style={{fontSize:'28pt'}} /><div style = {{marginLeft: "10px"}}>0</div>
                            </IconButton>
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={(event) => {
                                    handleDeleteList(event, idNamePair._id)
                                }} aria-label='delete'>
                                <ThumbDownAltIcon style={{fontSize:'28pt'}} /><div style = {{marginLeft: "10px"}}>0</div>
                            </IconButton>
                        </Box>
                    </Grid>
                    <Grid item container>
                    <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Published: <span style = {{color: 'green'}}>{idNamePair.updatedAt}</span> </Box>
                    <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Listens: </Box>
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
                    <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}<div style={{marginLeft: '5px', fontSize:'14pt'}}>By:{idNamePair.ownerUserName}</div></Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={handleToggleEdit} aria-label='edit'>
                            <ThumbUpAltIcon style={{fontSize:'28pt'}} /><div style = {{marginLeft: "10px"}}>0</div>
                        </IconButton>
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={(event) => {
                                handleDeleteList(event, idNamePair._id)
                            }} aria-label='delete'>
                            <ThumbDownAltIcon style={{fontSize:'28pt'}} /><div style = {{marginLeft: "10px"}}>0</div>
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
                        <button style={{fontSize:'14pt', marginLeft: '10px'}}>Duplicate</button>
                    </Box>
                </Grid>
                <Grid item container>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Published: <span style = {{color: 'green'}}>{idNamePair.updatedAt}</span></Box>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Listens: </Box>
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
                    <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}<div style={{marginLeft: '5px', fontSize:'14pt'}}>By: {idNamePair.ownerUserName}</div></Box>
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
                        <button style={{fontSize:'14pt', marginLeft: '10px'}}>Duplicate</button>
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
                handleLoadList(event, idNamePair._id)
            }}
        >
            <Grid container>
                <Grid item container>
                    <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}<div style={{marginLeft: '5px', fontSize:'14pt'}}>By: {idNamePair.ownerUserName}</div></Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={handleToggleEdit} aria-label='edit'>
                            <ThumbUpAltIcon style={{fontSize:'28pt'}} /><div style = {{marginLeft: "10px"}}>0</div>
                        </IconButton>
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={(event) => {
                                handleDeleteList(event, idNamePair._id)
                            }} aria-label='delete'>
                            <ThumbDownAltIcon style={{fontSize:'28pt'}} /><div style = {{marginLeft: "10px"}}>0</div>
                        </IconButton>
                    </Box>
                </Grid>
                <Grid item container>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Published: <span style = {{color: 'green'}}>{idNamePair.updatedAt}</span> </Box>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Listens: </Box>
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

    if(store.allLists && store.currentList == null)
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
                    handleLoadList(event, idNamePair._id)
                }}
            >
                <Grid container>
                    <Grid item container>
                        <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}<div style={{marginLeft: '5px', fontSize:'14pt'}}>By: {idNamePair.ownerUserName}</div></Box>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={handleToggleEdit} aria-label='edit'>
                                <ThumbUpAltIcon style={{fontSize:'28pt'}} /><div style = {{marginLeft: "10px"}}>0</div>
                            </IconButton>
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={(event) => {
                                    handleDeleteList(event, idNamePair._id)
                                }} aria-label='delete'>
                                <ThumbDownAltIcon style={{fontSize:'28pt'}} /><div style = {{marginLeft: "10px"}}>0</div>
                            </IconButton>
                        </Box>
                    </Grid>
                    <Grid item container>
                    <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Published: <span style = {{color: 'green'}}>{idNamePair.updatedAt}</span> </Box>
                    <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Listens: </Box>
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
                    <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}<div style={{marginLeft: '5px', fontSize:'14pt'}}>By:{idNamePair.ownerUserName}</div></Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={handleToggleEdit} aria-label='edit'>
                            <ThumbUpAltIcon style={{fontSize:'28pt'}} /><div style = {{marginLeft: "10px"}}>0</div>
                        </IconButton>
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={(event) => {
                                handleDeleteList(event, idNamePair._id)
                            }} aria-label='delete'>
                            <ThumbDownAltIcon style={{fontSize:'28pt'}} /><div style = {{marginLeft: "10px"}}>0</div>
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
                        <button style={{fontSize:'14pt', marginLeft: '10px'}}>Duplicate</button>
                    </Box>
                </Grid>
                <Grid item container>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Published: <span style = {{color: 'green'}}>{idNamePair.updatedAt}</span></Box>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{marginTop: '30px', fontSize:'15pt'}}>Listens: </Box>
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