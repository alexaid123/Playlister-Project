import { createContext, StrictMode, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import jsTPS from '../common/jsTPS'
import api from './store-request-api'
import CreateSong_Transaction from '../transactions/CreateSong_Transaction'
import MoveSong_Transaction from '../transactions/MoveSong_Transaction'
import RemoveSong_Transaction from '../transactions/RemoveSong_Transaction'
import UpdateSong_Transaction from '../transactions/UpdateSong_Transaction'
import AuthContext from '../auth'
import { getStepConnectorUtilityClass } from '@mui/material'

/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    LOAD_PUBLISHED_LISTS: "LOAD_PUBLISHED_LISTS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_CURRENT_SONG: "SET_CURRENT_SONG",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    EDIT_SONG: "EDIT_SONG",
    REMOVE_SONG: "REMOVE_SONG",
    HIDE_MODALS: "HIDE_MODALS",
    SHOW_ERROR: "SHOW_ERROR",
    HANDLE_KEY_PRESS: "HANDLE_KEY_PRESS",
    ALTERNATE_PLAYER: "ALTERNATE_PLAYER",
    SWITCHPAGE_USER: "SWITCHPAGE_USER",
    RESET_VARS: "RESET_VARS",
    CHANGE_SONG_ERR: "CHANGE_SONG_ERR"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

const CurrentModal = {
    NONE : "NONE",
    DELETE_LIST : "DELETE_LIST",
    EDIT_SONG : "EDIT_SONG",
    REMOVE_SONG : "REMOVE_SONG"
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);
    const [store, setStore] = useState({
        currentModal : CurrentModal.NONE,
        idNamePairs: [],
        currentList: null,
        currentSongIndex : -1,
        currentSong : null,
        newListCounter: 0,
        listNameActive: false,
        listIdMarkedForDeletion: null,
        listMarkedForDeletion: null,
        error: null,
        called: false,
        player: true,
        allUserLists: true,
        allLists: false,
        allUserPublished: false,
        publicLists: [],
        playingList: null,
        sortName: false,
        sortPDate: false,
        sortListens: false,
        sortLikes: false,
        sortDislikes: false,
        sortEditDate: false,
        sortCreate: false,
        viewSearch: false,
        searchText: "",
        currentDeleteSong: []
    });
    const history = useHistory();

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {

            case GlobalStoreActionType.RESET_VARS: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: [],
                    currentList: null,
                    currentSongIndex : -1,
                    currentSong : null,
                    newListCounter: 0,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    error: null,
                    called: false,
                    player: true,
                    allUserLists: true,
                    allLists: false,
                    allUserPublished: false,
                    publicLists: store.publicLists,
                    playingList: null,
                    sortName: false,
                    sortPDate: false,
                    sortListens: false,
                    sortLikes: false,
                    sortDislikes: false,
                    sortEditDate: false,
                    sortCreate: false,
                    viewSearch: false,
                    searchText: "",
                    currentDeleteSong: null
                });
            }

            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload.idNamePairs,
                    currentList: null,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: payload.edit,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    error: payload.err,
                    called: store.called,
                    player: true,
                    allUserLists: store.allUserLists,
                    allLists: store.allLists,
                    allUserPublished: store.allUserPublished,
                    publicLists: store.publicLists,
                    playingList: store.playingList,
                    sortName: store.sortName,
                    sortPDate: store.sortPDate,
                    sortListens: store.sortListens,
                    sortLikes: store.sortLikes,
                    sortDislikes: store.sortDislikes,
                    sortEditDate: store.sortEditDate,
                    sortCreate: store.sortCreate,
                    viewSearch: store.viewSearch,
                    searchText: "",
                    currentDeleteSong: null
                });
            }

             // LIST UPDATE OF ITS NAME
             case GlobalStoreActionType.CHANGE_SONG_ERR: {
                return setStore({
                    currentModal : CurrentModal.EDIT_SONG,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    error: payload.err,
                    called: store.called,
                    player: store.player,
                    allUserLists: store.allUserLists,
                    allLists: store.allLists,
                    allUserPublished: store.allUserPublished,
                    publicLists: store.publicLists,
                    playingList: store.playingList,
                    sortName: store.sortName,
                    sortPDate: store.sortPDate,
                    sortListens: store.sortListens,
                    sortLikes: store.sortLikes,
                    sortDislikes: store.sortDislikes,
                    sortEditDate: store.sortEditDate,
                    sortCreate: store.sortCreate,
                    viewSearch: store.viewSearch,
                    searchText: "",
                    currentDeleteSong: null
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    error: null,
                    called: store.called,
                    player: store.player,
                    allUserLists: store.allUserLists,
                    allLists: store.allLists,
                    allUserPublished: store.allUserPublished,
                    publicLists: store.publicLists,
                    playingList: store.playingList,
                    sortName: store.sortName,
                    sortPDate: store.sortPDate,
                    sortListens: store.sortListens,
                    sortLikes: store.sortLikes,
                    sortDislikes: store.sortDislikes,
                    sortEditDate: store.sortEditDate,
                    sortCreate: store.sortCreate,
                    viewSearch: store.viewSearch,
                    searchText: store.searchText,
                    currentDeleteSong: null
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {             
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: payload,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    error: null,
                    called: store.called,
                    player: true,
                    allUserLists: store.allUserLists,
                    allLists: store.allLists,
                    allUserPublished: store.allUserPublished,
                    publicLists: store.publicLists,
                    playingList: store.playingList,
                    sortName: store.sortName,
                    sortPDate: store.sortPDate,
                    sortListens: store.sortListens,
                    sortLikes: store.sortLikes,
                    sortDislikes: store.sortDislikes,
                    sortEditDate: store.sortEditDate,
                    sortCreate: store.sortCreate,
                    viewSearch: store.viewSearch,
                    searchText: "",
                    currentDeleteSong: null
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload.pairs,
                    currentList: null,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: null,
                    newListCounter: payload.count,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    error: null,
                    called: store.called,
                    player: true,
                    allUserLists: !auth.user.guest,
                    allLists: store.allLists,
                    allUserPublished: store.allUserPublished,
                    publicLists: store.publicLists,
                    playingList: store.playingList,
                    sortName: payload.sName,
                    sortPDate: payload.sPDate,
                    sortListens: payload.sListens,
                    sortLikes: payload.sLikes,
                    sortDislikes: payload.sDislikes,
                    sortEditDate: payload.sEditDate,
                    sortCreate: payload.sCreate,
                    viewSearch: store.viewSearch,
                    searchText: payload.text,
                    currentDeleteSong: null
                });
            }
             // GET ALL THE PUBLISHED LISTS SO WE CAN PRESENT THEM
             case GlobalStoreActionType.LOAD_PUBLISHED_LISTS: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    currentSongIndex: payload.cInd,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    error: null,
                    called: store.called,
                    player: true,
                    allUserLists: store.allUserLists,
                    allLists: store.allLists,
                    allUserPublished: payload.uLi,
                    publicLists: payload.pArray,
                    playingList: payload.plList,
                    sortName: payload.sName,
                    sortPDate: payload.sPDate,
                    sortListens: payload.sListens,
                    sortLikes: payload.sLikes,
                    sortDislikes: payload.sDislikes,
                    sortEditDate: payload.sEditDate,
                    sortCreate: payload.sCreate,
                    viewSearch: store.viewSearch,
                    searchText: store.searchText,
                    currentDeleteSong: null
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    currentModal : CurrentModal.DELETE_LIST,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: payload.id,
                    listMarkedForDeletion: payload.playlist,
                    error: null,
                    called: store.called,
                    player: store.player,
                    allUserLists: store.allUserLists,
                    allLists: store.allLists,
                    allUserPublished: store.allUserPublished,
                    publicLists: store.publicLists,
                    playingList: store.playingList,
                    sortName: store.sortName,
                    sortPDate: store.sortPDate,
                    sortListens: store.sortListens,
                    sortLikes: store.sortLikes,
                    sortDislikes: store.sortDislikes,
                    sortEditDate: store.sortEditDate,
                    sortCreate: store.sortCreate,
                    viewSearch: store.viewSearch,
                    searchText: store.searchText,
                    currentDeleteSong: null
                });
            }

            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload.pArray,
                    currentList: payload.list,
                    currentSongIndex: payload.index,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    error: null,
                    called: store.called,
                    player: payload.cm,
                    allUserLists: store.allUserLists,
                    allLists: store.allLists,
                    allUserPublished: store.allUserPublished,
                    publicLists: payload.public,
                    playingList: payload.plist,
                    sortName: store.sortName,
                    sortPDate: store.sortPDate,
                    sortListens: store.sortListens,
                    sortLikes: store.sortLikes,
                    sortDislikes: store.sortDislikes,
                    sortEditDate: store.sortEditDate,
                    sortCreate: store.sortCreate,
                    viewSearch: store.viewSearch,
                    searchText: store.searchText,
                    currentDeleteSong: null
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    error: null,
                    called: store.called,
                    player: store.player,
                    allUserLists: store.allUserLists,
                    allLists: store.allLists,
                    allUserPublished: store.allUserPublished,
                    publicLists: store.publicLists,
                    playingList: store.playingList,
                    sortName: store.sortName,
                    sortPDate: store.sortPDate,
                    sortListens: store.sortListens,
                    sortLikes: store.sortLikes,
                    sortDislikes: store.sortDislikes,
                    sortEditDate: store.sortEditDate,
                    sortCreate: store.sortCreate,
                    viewSearch: store.viewSearch,
                    searchText: "",
                    currentDeleteSong: null
                });
            }
            // 
            case GlobalStoreActionType.EDIT_SONG: {
                return setStore({
                    currentModal : CurrentModal.EDIT_SONG,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    error: null,
                    called: store.called,
                    player: store.player,
                    allUserLists: store.allUserLists,
                    allLists: store.allLists,
                    allUserPublished: store.allUserPublished,
                    publicLists: store.publicLists,
                    playingList: store.playingList,
                    sortName: store.sortName,
                    sortPDate: store.sortPDate,
                    sortListens: store.sortListens,
                    sortLikes: store.sortLikes,
                    sortDislikes: store.sortDislikes,
                    sortEditDate: store.sortEditDate,
                    sortCreate: store.sortCreate,
                    viewSearch: store.viewSearch,
                    searchText: "",
                    currentDeleteSong: null
                });
            }
            case GlobalStoreActionType.REMOVE_SONG: {
                return setStore({
                    currentModal : CurrentModal.REMOVE_SONG,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    error: null,
                    called: store.called,
                    player: store.player,
                    allUserLists: store.allUserLists,
                    allLists: store.allLists,
                    allUserPublished: store.allUserPublished,
                    publicLists: store.publicLists,
                    playingList: store.playingList,
                    sortName: store.sortName,
                    sortPDate: store.sortPDate,
                    sortListens: store.sortListens,
                    sortLikes: store.sortLikes,
                    sortDislikes: store.sortDislikes,
                    sortEditDate: store.sortEditDate,
                    sortCreate: store.sortCreate,
                    viewSearch: store.viewSearch,
                    searchText: "",
                    currentDeleteSong: payload.currentSong
                });
            }
            case GlobalStoreActionType.HIDE_MODALS: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    error: null,
                    called: store.called,
                    player: store.player,
                    allUserLists: store.allUserLists,
                    allLists: store.allLists,
                    allUserPublished: store.allUserPublished,
                    publicLists: store.publicLists,
                    playingList: store.playingList,
                    sortName: store.sortName,
                    sortPDate: store.sortPDate,
                    sortListens: store.sortListens,
                    sortLikes: store.sortLikes,
                    sortDislikes: store.sortDislikes,
                    sortEditDate: store.sortEditDate,
                    sortCreate: store.sortCreate,
                    viewSearch: store.viewSearch,
                    searchText: "",
                    currentDeleteSong: null
                });
            }

            case GlobalStoreActionType.SHOW_ERROR: {
                return setStore({
                    currentModal : store.currentModal,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    error: payload,
                    called: store.called,
                    player: store.player,
                    allUserLists: store.allUserLists,
                    allLists: store.allLists,
                    allUserPublished: store.allUserPublished,
                    publicLists: store.publicLists,
                    playingList: store.playingList,
                    sortName: store.sortName,
                    sortPDate: store.sortPDate,
                    sortListens: store.sortListens,
                    sortLikes: store.sortLikes,
                    sortDislikes: store.sortDislikes,
                    sortEditDate: store.sortEditDate,
                    sortCreate: store.sortCreate,
                    viewSearch: store.viewSearch,
                    searchText: "",
                    currentDeleteSong: null
                });
            }

            case GlobalStoreActionType.HANDLE_KEY_PRESS: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    error: payload,
                    called: true,
                    player: store.player,
                    allUserLists: store.allUserLists,
                    allLists: store.allLists,
                    allUserPublished: store.allUserPublished,
                    publicLists: store.publicLists,
                    playingList: store.playingList,
                    sortName: store.sortName,
                    sortPDate: store.sortPDate,
                    sortListens: store.sortListens,
                    sortLikes: store.sortLikes,
                    sortDislikes: store.sortDislikes,
                    sortEditDate: store.sortEditDate,
                    sortCreate: store.sortCreate,
                    viewSearch: store.viewSearch,
                    searchText: "",
                    currentDeleteSong: null
                });
            }

            case GlobalStoreActionType.ALTERNATE_PLAYER: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    error: store.payload,
                    called: store.called,
                    player: payload,
                    allUserLists: store.allUserLists,
                    allLists: store.allLists,
                    allUserPublished: store.allUserPublished,
                    publicLists: store.publicLists,
                    playingList: store.playingList,
                    sortName: store.sortName,
                    sortPDate: store.sortPDate,
                    sortListens: store.sortListens,
                    sortLikes: store.sortLikes,
                    sortDislikes: store.sortDislikes,
                    sortEditDate: store.sortEditDate,
                    sortCreate: store.sortCreate,
                    viewSearch: store.viewSearch,
                    searchText: store.searchText,
                    currentDeleteSong: null
                });
            }

            case GlobalStoreActionType.SWITCHPAGE_USER: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload.pairsID,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    error: store.error,
                    called: store.called,
                    player: true,
                    allUserLists: payload.one,
                    allLists: payload.two,
                    allUserPublished: payload.three,
                    publicLists: payload.pArray,
                    playingList: null,
                    sortName: store.sortName,
                    sortPDate: store.sortPDate,
                    sortListens: store.sortListens,
                    sortLikes: store.sortLikes,
                    sortDislikes: store.sortDislikes,
                    sortEditDate: store.sortEditDate,
                    sortCreate: store.sortCreate,
                    viewSearch: store.viewSearch,
                    searchText: "",
                    currentDeleteSong: null
                });
            }

            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.



    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName, oldName) {
        if(store.idNamePairs.filter(value=> value.name.toLowerCase() === newName.toLowerCase()).length > 0 && newName !== oldName)
        {
            store.error = "Cant have the same name";
            storeReducer({
                type: GlobalStoreActionType.CHANGE_LIST_NAME,
                payload: {
                    idNamePairs: store.idNamePairs,
                    err: "Please enter a unique playlist name",
                    edit: true
                }
            });
        }
        else
        {
        // GET THE LIST
                async function asyncChangeListName(id) {
                    let response = await api.getPlaylistById(id);
                    if (response.data.success) {
                        let playlist = response.data.playlist;
                        playlist.name = newName;
                            async function updateList(playlist) {
                                
                                response = await api.updatePlaylistById(playlist._id, playlist);
                                if (response.data.success) {
                                    async function getListPairs(playlist) {
                                        response = await api.getPlaylistPairs();
                                        if (response.data.success) {
                                            let pairsArray = response.data.idNamePairs;
                                            storeReducer({
                                                type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                                payload: {
                                                    idNamePairs: pairsArray,
                                                    playlist: playlist,
                                                    err: null
                                                }
                                            });
                                        }
                                    }
                                    getListPairs(playlist);
                                }
                            }
                            updateList(playlist);
                    }
                }
                asyncChangeListName(id);
        }
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        tps.clearAllTransactions();
        history.push("/");
    }

    store.addErrorM = function(msg)
    {
        storeReducer({
            type: GlobalStoreActionType.SHOW_ERROR,
            payload: msg
        }
        );
    }

    store.hideError = function()
    {
        storeReducer({
            type: GlobalStoreActionType.SHOW_ERROR,
            payload: null
        }
        );
    }


    store.altUserLists = function (first, second, third)
    {
        store.searchText = "";
        if(third)
        {
            store.viewSearch = false;
            storeReducer({
                type: GlobalStoreActionType.SWITCHPAGE_USER,
                payload: {one: first, two: second, three: third, pArray: []}
            });
        }
        else
        {
            if(second)
            {
                async function asyncLoadIdNamePairs() {
                    const response = await api.getPublishedPlaylists();
                    if (response.data.success) {
                        let pairsArray = response.data.data;
                        let p = store.sortPlaylists(store.sortName, store.sortPDate, store.sortListens, store.sortLikes, store.sortDislikes, store.sortEditDate, store.sortCreate, pairsArray);
         
                        storeReducer({
                            type: GlobalStoreActionType.SWITCHPAGE_USER,
                            payload: {one: first, two: second, three: third, pArray: p, pairsID: store.idNamePairs}
                        });
                    }
                    else {
                        console.log("API FAILED TO GET THE LIST PAIRS");
                    }
                }
                asyncLoadIdNamePairs();
           }
           else if(first)
           {
                async function asyncLoadIdNamePairs() {
                    const response = await api.getPlaylistPairs();
                    if (response.data.success) {
                        let pairsArray = response.data.idNamePairs;
                        let p = store.sortPlaylists(store.sortName, store.sortPDate, store.sortListens, store.sortLikes, store.sortDislikes, store.sortEditDate, store.sortCreate, pairsArray);
         
                        storeReducer({
                            type: GlobalStoreActionType.SWITCHPAGE_USER,
                            payload: {one: first, two: second, three: third, pArray: store.publicLists, pairsID: p}
                        });
                    }
                    else {
                        console.log("API FAILED TO GET THE LIST PAIRS");
                    }
                }
                asyncLoadIdNamePairs();
           }
            
        }
    }

    store.altPlayer = function (screen)
    {
        storeReducer({
            type: GlobalStoreActionType.ALTERNATE_PLAYER,
            payload: screen
        });
    }

    store.publishCurrentList = function()
    {
        store.currentList.published = true;
 
        var today = new Date();
        var dd = String(today).padStart(2, '0');
        var mm = String(today).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + ' ' + dd + ',' + yyyy;
        today = today.substring(4, 10) + ", " + yyyy;

        let pplaylist;
        async function asyncAdd(id) {
            const response = await api.createPublishedPlaylist(store.currentList.name, store.currentList._id, store.currentList.songs, auth.user.userName, auth.user.email, true, today, store.currentList.comments, 0, 0, 0, [], []);
            if (response.status === 201) {
                // IF IT'S A VALID LIST THEN LET'S START EDITING IT
                pplaylist = response.data.playlist;
                async function asyncChangeListName(id) {
                    let response = await api.getPlaylistById(id);
                    if (response.data.success) {
                        let playlist = response.data.playlist;
                        playlist.published = true;
                        playlist.publishedID = pplaylist._id;
                        playlist.publishedDate = today;
                            async function updateList(playlist) {
                                response = await api.updatePlaylistById(playlist._id, playlist);
                                if (response.data.success) {
                                    async function getListPairs(playlist) {
                                        response = await api.getPlaylistPairs();
                                        if (response.data.success) {
                                            let pairsArray = response.data.idNamePairs;
                                            storeReducer({
                                                type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                                payload: {
                                                    idNamePairs: pairsArray,
                                                    playlist: playlist
                                                }
                                            });
                                        }
                                    }
                                    getListPairs(playlist);
                                }
                            }
                            updateList(playlist);
                    }
                }
                asyncChangeListName(store.currentList._id);
        

            }
            else {
                console.log("API FAILED TO CREATE A NEW LIST");
            }
            
        }

        asyncAdd(store.currentList._id);
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {

            let i = 0;
            while(store.idNamePairs.filter(value=> value.name.toLowerCase() === ("untitled" + " " + i)).length > 0)
            {
                i++;
            }
        


        let newListName = "Untitled " + i;
        const response = await api.createPlaylist(newListName, "null", [], auth.user.userName, auth.user.email, false, "null", [], 0, 0, 0, [], []);
        if (response.status === 201) {
            tps.clearAllTransactions();
            let newList = response.data.playlist;
          
                                      
            store.loadIdNamePairs();
                // IF IT'S A VALID LIST THEN LET'S START EDITING IT
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }   
        
    }

    store.duplicateCurrentList= function ()
    {
        let newName = store.currentList.name;
        if(store.idNamePairs.filter(value=> value.name === newName).length > 0)
        {
            let i = 0;
            while(store.idNamePairs.filter(value=> value.name.toLowerCase() === (store.currentList.name.toLowerCase() + " " + i)).length > 0)
            {
                i++;
            }
           newName = store.currentList.name + " " + i;
        }
       
       
        async function createList()
        {
        const response = await api.createPlaylist(newName, "null", store.currentList.songs, auth.user.userName, auth.user.email, false, "null", [], 0, 0, 0);
        if (response.status === 201) {
            tps.clearAllTransactions();
            let newList = response.data.playlist;
            /*storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: store.newListCounter + 1
            });*/
            if(store.allUserLists)
            {
                store.loadIdNamePairs();
            }
           
            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
        }
        createList();
    }


    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
       
        if(auth.user.guest)
        {
            store.allUserLists = false;
            store.allLists = true;
            store.allUserPublished = false;
            store.altUserLists(false, true, false);
            store.loadPublishedPlaylists();
        }
        else
        {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                let p = store.sortPlaylists(store.sortName, store.sortPDate, store.sortListens, store.sortLikes, store.sortDislikes, store.sortEditDate, store.sortCreate, pairsArray);
                                  
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: {pairs: p, count: store.newListCounter, sName: store.sortName, sPDate: store.sortPDate, sListens: store.sortListens, sLikes: store.sortLikes, sDislikes: store.sortDislikes, sEditDate: store.sortEditDate, sCreate: store.sortCreate, text: ""}
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
        }
    }


    store.incrementLikes = function (id)
    {
        if((store.allLists || store.allUserPublished) && !auth.user.guest)
        {
            async function getListToLike(id) {
                let response = await api.getPublishedPlaylistById(id);
                if (response.data.success) {
                    let playlist = response.data.playlist;

                    if(playlist.likedUsers.includes(auth.user.email))
                    {
                        playlist.likes = playlist.likes - 1;
                        playlist.likedUsers.pop(auth.user.email);
                    }
                    else
                    {
                        playlist.likes = playlist.likes + 1;
                        playlist.likedUsers.push(auth.user.email);
                    }

                    if(playlist.dislikedUsers.includes(auth.user.email))
                    {
                        playlist.dislikes = playlist.dislikes - 1;
                        playlist.dislikedUsers.pop(auth.user.email);
                    }


                    async function getPListToLike(id) {
                        let response = await api.getPlaylistById(id);
                        if (response.data.success) {
                            let pplaylist = response.data.playlist;
                            
                            if(pplaylist.likedUsers.includes(auth.user.email))
                            {
                                pplaylist.likes = pplaylist.likes - 1;
                                pplaylist.likedUsers.pop(auth.user.email);
                            }
                            else
                            {
                                pplaylist.likes = pplaylist.likes + 1;
                                pplaylist.likedUsers.push(auth.user.email);
                            }

                            if(pplaylist.dislikedUsers.includes(auth.user.email))
                            {
                                pplaylist.dislikes = pplaylist.dislikes - 1;
                                pplaylist.dislikedUsers.pop(auth.user.email);
                            }

                            async function updateList() {
                            response = await api.updatePlaylistById(pplaylist._id, pplaylist);
                            }
                                
                            updateList();
                        }
                    }
                    getPListToLike(playlist.unpublishedID);



                        async function updateList(playlist) {
                            response = await api.updatePublishedPlaylistById(playlist._id, playlist);
                            if (response.data.success) {
                                async function getPublishedPlaylists() {
                                    const response = await api.getPublishedPlaylists();
                                    if (response.data.success) {


                                        if(store.allUserPublished && !store.allLists)
                                        {
                                            let pairsArray = response.data.data;
                                            let p = pairsArray.filter(playlist => {
                                                if (playlist.ownerUserName.toLowerCase().includes(store.searchText.toLowerCase())) {
                                                  return true;
                                                }
                                                return false;
                                              });
                                            p = store.sortPlaylists(store.sortName, store.sortPDate, store.sortListens, store.sortLikes, store.sortDislikes, store.sortEditDate, store.sortCreate, p);
                                            storeReducer({
                                                type: GlobalStoreActionType.LOAD_PUBLISHED_LISTS,
                                                payload: {pArray: p, sName: store.sortName, sPDate: store.sortPDate, sListens: store.sortListens, sLikes: store.sortLikes, sDislikes: store.sortDislikes, sEditDate: store.sortEditDate, sCreate: store.sortCreate, uLi: store.allUserPublished, cInd: store.currentSongIndex, plList: store.playingList}
                                            });
                                        }
                                        else if(store.allLists)
                                        {
                                            let pairsArray = response.data.data;
                                            let p = pairsArray.filter(playlist => {
                                                if (playlist.name.toLowerCase().includes(store.searchText.toLowerCase())) {
                                                  return true;
                                                }
                                                return false;
                                              });
                                            p = store.sortPlaylists(store.sortName, store.sortPDate, store.sortListens, store.sortLikes, store.sortDislikes, store.sortEditDate, store.sortCreate, p);
                                            storeReducer({
                                                type: GlobalStoreActionType.LOAD_PUBLISHED_LISTS,
                                                payload: {pArray: p, sName: store.sortName, sPDate: store.sortPDate, sListens: store.sortListens, sLikes: store.sortLikes, sDislikes: store.sortDislikes, sEditDate: store.sortEditDate, sCreate: store.sortCreate, uLi: store.allUserPublished, cInd: store.currentSongIndex, plList: store.playingList}
                                            });
                                        }
                                        
                                        
                                       
                                    }
                                }
                                getPublishedPlaylists();
                            }
                        }
                    updateList(playlist);
                }
            }
            getListToLike(id);
        }
        else if(!auth.user.guest)
        {
            async function getListToLike(id) {
                let response = await api.getPlaylistById(id);
                if (response.data.success) {
                    let playlist = response.data.playlist;
                    
                    if(playlist.likedUsers.includes(auth.user.email))
                    {
                        playlist.likes = playlist.likes - 1;
                        playlist.likedUsers.pop(auth.user.email);
                    }
                    else
                    {
                        playlist.likes = playlist.likes + 1;
                        playlist.likedUsers.push(auth.user.email);
                    }
                   
                    if(playlist.dislikedUsers.includes(auth.user.email))
                    {
                        playlist.dislikes = playlist.dislikes - 1;
                        playlist.dislikedUsers.pop(auth.user.email);
                    }

                    async function getPListToLike(id) {
                        let response = await api.getPublishedPlaylistById(id);
                        if (response.data.success) {
                            let pplaylist = response.data.playlist;
                            
                            if(pplaylist.likedUsers.includes(auth.user.email))
                            {
                                pplaylist.likes = pplaylist.likes - 1;
                                pplaylist.likedUsers.pop(auth.user.email);
                            }
                            else
                            {
                                pplaylist.likes = pplaylist.likes + 1;
                                pplaylist.likedUsers.push(auth.user.email);
                            }

                            if(pplaylist.dislikedUsers.includes(auth.user.email))
                            {
                                pplaylist.dislikes = pplaylist.dislikes - 1;
                                pplaylist.dislikedUsers.pop(auth.user.email);
                            }

                            async function updateList() {
                            response = await api.updatePublishedPlaylistById(pplaylist._id, pplaylist);
                            }
                                
                            updateList();
                        }
                    }
                    getPListToLike(playlist.publishedID);

                        async function updateList(playlist) {
                            response = await api.updatePlaylistById(playlist._id, playlist);
                            if (response.data.success) {
                                async function getPlaylists() {
                                    const response = await api.getPlaylistPairs();
                                    if (response.data.success) {
                                        
                                        let pairsArray = response.data.idNamePairs;
                                        let p = store.sortPlaylists(store.sortName, store.sortPDate, store.sortListens, store.sortLikes, store.sortDislikes, store.sortEditDate, store.sortCreate, pairsArray);
                                        if(store.searchText !== "")
                                        {
                                            p = p.filter(playlist => {
                                                if (playlist.name.toLowerCase().includes(store.searchText.toLowerCase())) {
                                                return true;
                                                }
                                                return false;
                                            });
                                        }
                                        storeReducer({
                                            type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                                            payload: {pairs: p, count: store.newListCounter,sName: store.sortName, sPDate: store.sortPDate, sListens: store.sortListens, sLikes: store.sortLikes, sDislikes: store.sortDislikes, sEditDate: store.sortEditDate, sCreate: store.sortCreate, text: store.searchText}
                                        });
                                    }
                                }
                                getPlaylists();
                            }
                        }
                    updateList(playlist);
                }
            }
            getListToLike(id);
        }
    }







    store.incrementDislikes = function (id)
    {
        if((store.allLists || store.allUserPublished) && !auth.user.guest && !store.allUserLists)
        {
            async function getListToLike(id) {
                let response = await api.getPublishedPlaylistById(id);
                if (response.data.success) {
                    let playlist = response.data.playlist;

                    if(playlist.dislikedUsers.includes(auth.user.email))
                    {
                        playlist.dislikes = playlist.dislikes - 1;
                        playlist.dislikedUsers.pop(auth.user.email);
                    }
                    else
                    {
                        playlist.dislikes = playlist.dislikes + 1;
                        playlist.dislikedUsers.push(auth.user.email);
                    }

                    if(playlist.likedUsers.includes(auth.user.email))
                    {
                        playlist.likes = playlist.likes - 1;
                        playlist.likedUsers.pop(auth.user.email);
                    }

                    async function getPListToLike(id) {
                        let response = await api.getPlaylistById(id);
                        if (response.data.success) {
                            let pplaylist = response.data.playlist;
                            
                            if(pplaylist.dislikedUsers.includes(auth.user.email))
                            {
                                pplaylist.dislikes = pplaylist.dislikes - 1;
                                pplaylist.dislikedUsers.pop(auth.user.email);
                            }
                            else
                            {
                                pplaylist.dislikes = pplaylist.dislikes + 1;
                                pplaylist.dislikedUsers.push(auth.user.email);
                            }
                            if(pplaylist.likedUsers.includes(auth.user.email))
                            {
                                pplaylist.likes = pplaylist.likes - 1;
                                pplaylist.likedUsers.pop(auth.user.email);
                            }
                            async function updateList() {
                            response = await api.updatePlaylistById(pplaylist._id, pplaylist);
                            }
                                
                            updateList();
                        }
                    }

                        getPListToLike(playlist.unpublishedID);
                    



                        async function updateList(playlist) {
                            response = await api.updatePublishedPlaylistById(playlist._id, playlist);
                            if (response.data.success) {
                                async function getPublishedPlaylists() {
                                    const response = await api.getPublishedPlaylists();
                                    if (response.data.success) {
                                        if(store.allUserPublished && !store.allLists)
                                        {
                                            let pairsArray = response.data.data;
                                            let p = pairsArray.filter(playlist => {
                                                if (playlist.ownerUserName.toLowerCase().includes(store.searchText.toLowerCase())) {
                                                  return true;
                                                }
                                                return false;
                                              });
                                            p = store.sortPlaylists(store.sortName, store.sortPDate, store.sortListens, store.sortLikes, store.sortDislikes, store.sortEditDate, store.sortCreate, p);
                                            storeReducer({
                                                type: GlobalStoreActionType.LOAD_PUBLISHED_LISTS,
                                                payload: {pArray: p, sName: store.sortName, sPDate: store.sortPDate, sListens: store.sortListens, sLikes: store.sortLikes, sDislikes: store.sortDislikes, sEditDate: store.sortEditDate, sCreate: store.sortCreate, uLi: store.allUserPublished, cInd: store.currentSongIndex, plList: store.playingList}
                                            });
                                        }
                                        else if(store.allLists)
                                        {
                                            let pairsArray = response.data.data;
                                            let p = store.sortPlaylists(store.sortName, store.sortPDate, store.sortListens, store.sortLikes, store.sortDislikes, store.sortEditDate, store.sortCreate, pairsArray);
                                            p = p.filter(playlist => {
                                                if (playlist.name.toLowerCase().includes(store.searchText.toLowerCase())) {
                                                  return true;
                                                }
                                                return false;
                                              });
                                             storeReducer({
                                                type: GlobalStoreActionType.LOAD_PUBLISHED_LISTS,
                                                payload: {pArray: p, sName: store.sortName, sPDate: store.sortPDate, sListens: store.sortListens, sLikes: store.sortLikes, sDislikes: store.sortDislikes, sEditDate: store.sortEditDate, sCreate: store.sortCreate, uLi: store.allUserPublished, cInd: store.currentSongIndex, plList: store.playingList}
                                            });
                                        }
                                    }
                                }
                                getPublishedPlaylists();
                            }
                        }
                    updateList(playlist);
                }
            }
            getListToLike(id);
        }
        else if(!auth.user.guest)
        {
            async function getListToLike(id) {
                let response = await api.getPlaylistById(id);
                if (response.data.success) {
                    let playlist = response.data.playlist;
                    
                    if(playlist.dislikedUsers.includes(auth.user.email))
                    {
                        playlist.dislikes = playlist.dislikes - 1;
                        playlist.dislikedUsers.pop(auth.user.email);
                    }
                    else
                    {
                        playlist.dislikes = playlist.dislikes + 1;
                        playlist.dislikedUsers.push(auth.user.email);
                    }
                    if(playlist.likedUsers.includes(auth.user.email))
                    {
                        playlist.likes = playlist.likes - 1;
                        playlist.likedUsers.pop(auth.user.email);
                    }
                   

                    async function getPListToLike(id) {
                        let response = await api.getPublishedPlaylistById(id);
                        if (response.data.success) {
                            let pplaylist = response.data.playlist;
                            
                            if(pplaylist.dislikedUsers.includes(auth.user.email))
                            {
                                pplaylist.dislikes = pplaylist.dislikes - 1;
                                pplaylist.dislikedUsers.pop(auth.user.email);
                            }
                            else
                            {
                                pplaylist.dislikes = pplaylist.dislikes + 1;
                                pplaylist.dislikedUsers.push(auth.user.email);
                            }
                            if(pplaylist.likedUsers.includes(auth.user.email))
                            {
                                pplaylist.likes = pplaylist.likes - 1;
                                pplaylist.likedUsers.pop(auth.user.email);
                            }
                            async function updateList() {
                            response = await api.updatePublishedPlaylistById(pplaylist._id, pplaylist);
                            }
                                
                            updateList();
                        }
                    }
                    getPListToLike(playlist.publishedID);

                        async function updateList(playlist) {
                            response = await api.updatePlaylistById(playlist._id, playlist);
                            if (response.data.success) {
                                async function getPlaylists() {
                                    const response = await api.getPlaylistPairs();
                                    if (response.data.success) {
                                        
                                        let pairsArray = response.data.idNamePairs;
                                        let p = store.sortPlaylists(store.sortName, store.sortPDate, store.sortListens, store.sortLikes, store.sortDislikes, store.sortEditDate, store.sortCreate, pairsArray);
                                        if(store.searchText !== "")
                                        {
                                            p = p.filter(playlist => {
                                                if (playlist.name.toLowerCase().includes(store.searchText.toLowerCase())) {
                                                return true;
                                                }
                                                return false;
                                            });
                                        }
                                        storeReducer({
                                            type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                                            payload: {pairs: p, count: store.newListCounter,sName: store.sortName, sPDate: store.sortPDate, sListens: store.sortListens, sLikes: store.sortLikes, sDislikes: store.sortDislikes, sEditDate: store.sortEditDate, sCreate: store.sortCreate, text: store.searchText}
                                        });
                                    }
                                }
                                getPlaylists();
                            }
                        }
                    updateList(playlist);
                }
            }
            getListToLike(id);
        }
    }




    store.resetAll = function ()
    {
        storeReducer({
            type: GlobalStoreActionType.RESET_VARS,
            payload: {}
        });
    }


    store.searchPlaylists = function (text, pl)
    {
        if(store.allLists)
        {
            store.searchText = text;
            if(text === "")
            {
                storeReducer({
                    type: GlobalStoreActionType.LOAD_PUBLISHED_LISTS,
                    payload: {pArray: [], sName: store.sortName, sPDate: store.sortPDate, sListens: store.sortListens, sLikes: store.sortLikes, sDislikes: store.sortDislikes, sEditDate: store.sortEditDate, sCreate: store.sortCreate, uLi: store.allUserPublished, txt: text}
                });
            }
            else
            {
               
                async function asyncGetLists(play) {
                    const response = await api.getPublishedPlaylistsSearch(text);
                    if (response.data.success) {
                        let pairsArray = response.data.data;
                        let p = store.sortPlaylists(store.sortName, store.sortPDate, store.sortListens, store.sortLikes, store.sortDislikes, store.sortEditDate, store.sortCreate, pairsArray);
                        if(pl != null)
                        {
                            
                            return pl;
                        }
                            storeReducer({
                            type: GlobalStoreActionType.LOAD_PUBLISHED_LISTS,
                            payload: {pArray: p, sName: store.sortName, sPDate: store.sortPDate, sListens: store.sortListens, sLikes: store.sortLikes, sDislikes: store.sortDislikes, sEditDate: store.sortEditDate, sCreate: store.sortCreate, uLi: store.allUserPublished, txt: text}
                        });
                    }
                    else {
                        console.log("API FAILED TO GET THE LIST PAIRS");
                    }
                }
                asyncGetLists(pl);
            }
        }
        else if(store.allUserLists)
        {
            if(text === "")
            {
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: {pairs: [], count: store.newListCounter + 1, sName: store.sortName, sPDate: store.sortPDate, sListens: store.sortListens, sLikes: store.sortLikes, sDislikes: store.sortDislikes, sEditDate: store.sortEditDate, sCreate: store.sortCreate, text: text}
                });
            }
            else
            {
            let p = store.idNamePairs.filter(playlist => {
                if (playlist.name.toLowerCase().includes(text.toLowerCase())) {
                  return true;
                }
                return false;
              });
              p = store.sortPlaylists(store.sortName, store.sortPDate, store.sortListens, store.sortLikes, store.sortDislikes, store.sortEditDate, store.sortCreate, p);
                    
              storeReducer({
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                payload: {pairs: p, count: store.newListCounter + 1, sName: store.sortName, sPDate: store.sortPDate, sListens: store.sortListens, sLikes: store.sortLikes, sDislikes: store.sortDislikes, sEditDate: store.sortEditDate, sCreate: store.sortCreate, text: text}
            });
            }
        }
        else if(store.allUserPublished)
        {
            if(text === "")
            {
                store.viewSearch = false;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_PUBLISHED_LISTS,
                    payload: {pArray: [], sName: store.sortName, sPDate: store.sortPDate, sListens: store.sortListens, sLikes: store.sortLikes, sDislikes: store.sortDislikes, sEditDate: store.sortEditDate, sCreate: store.sortCreate, uLi: store.allUserPublished}
                });
            }
            else
            {
                store.viewSearch = true;
                store.searchText = text;
                async function getPublishedPlaylists() {
                    const response = await api.getPublishedPlaylists();
                    if (response.data.success) {
                        let pairsArray = response.data.data;
                        if(pl != null)
                        {
                            
                            return pl;
                        }
                         let p = pairsArray.filter(playlist => {
                            if (playlist.ownerUserName.toLowerCase().includes(text.toLowerCase())) {
                              return true;
                            }
                            return false;
                          });
                         p = store.sortPlaylists(store.sortName, store.sortPDate, store.sortListens, store.sortLikes, store.sortDislikes, store.sortEditDate, store.sortCreate, p);
                        
                        storeReducer({
                            type: GlobalStoreActionType.LOAD_PUBLISHED_LISTS,
                            payload: {pArray: p, sName: store.sortName, sPDate: store.sortPDate, sListens: store.sortListens, sLikes: store.sortLikes, sDislikes: store.sortDislikes, sEditDate: store.sortEditDate, sCreate: store.sortCreate, uLi: store.allUserPublished}
                        });
                    }
                }
                getPublishedPlaylists();
        }
        }
    }

    store.sortPlaylists = function(one, two, three, four, five, six, seven, pl)
    {
        let p = store.idNamePairs;
        
        if(pl != null)
        {
           p = pl;
        }
       
        if((store.allLists || store.allUserPublished) && pl == null)
        {
            p = store.publicLists;
        }
        if(one)
        {
            function compare( a, b ) {
                    if ( a.name < b.name ){
                    return -1;
                    }
                    if ( a.name > b.name ){
                    return 1;
                    }
                    return 0;
            }
            if(store.searchText !== "")
            {
                if(store.allLists)
                {
                    p = p.filter(playlist => {
                        if (playlist.name.toLowerCase().includes(store.searchText.toLowerCase())) {
                        return true;
                        }
                        return false;
                    });
                }
                else if(store.allUserPublished)
                {
                    p = p.filter(playlist => {
                        if (playlist.ownerUserName.toLowerCase().includes(store.searchText.toLowerCase())) {
                        return true;
                        }
                        return false;
                    });
                }
            }
            p.sort(compare);
        }
        else if(two)
        {
            if(store.allUserLists)
            {
                async function asyncGetLists() {
                    const response = await api.getSortedPublish();
                    if (response.data.success) {
                        let pairsArray = response.data.idNamePairs;
                        if(store.searchText !== "")
                        {
                                pairsArray = pairsArray.filter(playlist => {
                                    if (playlist.name.toLowerCase().includes(store.searchText.toLowerCase())) {
                                    return true;
                                    }
                                    return false;
                                });
                        }
                        if(pl != null)
                        {
                            store.sortPDate = true;
                            store.sortCreate = false;
                            store.sortDislikes = false;
                            store.sortLikes = false;
                            store.sortName = false;
                            store.sortListens = false;
                            store.sortEditDate = false;
                            return pairsArray;
                        }
                        storeReducer({
                            type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                            payload: {pairs: pairsArray, count: store.newListCounter + 1, sName: one, sPDate: two, sListens: three, sLikes: four, sDislikes: five, sEditDate: six, sCreate: seven, text: store.searchText}
                        });
                        return pairsArray;
                    }
                    else {
                        console.log("API FAILED TO GET THE LIST PAIRS");
                    }
                }
                asyncGetLists();
            }
            else
            {
                async function asyncGetLists() {
                    const response = await api.getPSortedPublish();
                    if (response.data.success) {
                        let pairsArray = response.data.idNamePairs;
                        if(store.searchText !== "")
                        {
                            if(store.allLists)
                            {
                                pairsArray = pairsArray.filter(playlist => {
                                    if (playlist.name.toLowerCase().includes(store.searchText.toLowerCase())) {
                                    return true;
                                    }
                                    return false;
                                });
                            }
                            else
                            {
                                pairsArray = pairsArray.filter(playlist => {
                                    if (playlist.ownerUserName.toLowerCase().includes(store.searchText.toLowerCase())) {
                                    return true;
                                    }
                                    return false;
                                });
                            }
                        }
                        if(pl != null)
                        {
                            store.sortPDate = true;
                            store.sortCreate = false;
                            store.sortDislikes = false;
                            store.sortLikes = false;
                            store.sortName = false;
                            store.sortListens = false;
                            store.sortEditDate = false;
                            return pairsArray;
                        }
                        
                        storeReducer({
                            type: GlobalStoreActionType.LOAD_PUBLISHED_LISTS,
                            payload: {pArray: pairsArray, sName: one, sPDate: two, sListens: three, sLikes: four, sDislikes: five, sEditDate: six, sCreate: seven, uLi: store.allUserPublished, cInd: store.currentSongIndex, plList: store.playingList}
                        });
                        return pairsArray;
                    }
                    else {
                        console.log("API FAILED TO GET THE LIST PAIRS");
                    }
                }
                asyncGetLists();
            }
        }
        else if(three)
        {
            function compare( a, b ) {
                    if ( a.listens < b.listens ){
                    return 1;
                    }
                    if ( a.listens > b.listens ){
                    return -1;
                    }
                    return 0;
            }
            if(store.searchText !== "")
            {
                if(store.allLists)
                {
                    p = p.filter(playlist => {
                        if (playlist.name.toLowerCase().includes(store.searchText.toLowerCase())) {
                        return true;
                        }
                        return false;
                    });
                }
                else if(store.allUserPublished)
                {
                    p = p.filter(playlist => {
                        if (playlist.ownerUserName.toLowerCase().includes(store.searchText.toLowerCase())) {
                        return true;
                        }
                        return false;
                    });
                }
            }
            p.sort(compare);
            if(pl != null)
            {
                return p;
            }
            
        }
        else if(four)
        {
            function compare( a, b ) {
                    if ( a.likes < b.likes ){
                    return 1;
                    }
                    if ( a.likes > b.likes ){
                    return -1;
                    }
                    return 0;
            }
            if(store.searchText !== "")
            {
                if(store.allLists)
                {
                    p = p.filter(playlist => {
                        if (playlist.name.toLowerCase().includes(store.searchText.toLowerCase())) {
                        return true;
                        }
                        return false;
                    });
                }
                else if(store.allUserPublished)
                {
                    p = p.filter(playlist => {
                        if (playlist.ownerUserName.toLowerCase().includes(store.searchText.toLowerCase())) {
                        return true;
                        }
                        return false;
                    });
                }
            }
            p.sort(compare);
            if(pl != null)
            {
                return p;
            }
        }
        else if(five)
        {
            function compare( a, b ) {
                    if ( a.dislikes < b.dislikes ){
                    return 1;
                    }
                    if ( a.dislikes > b.dislikes ){
                    return -1;
                    }
                    return 0;
            }
            if(store.searchText !== "")
            {
                if(store.allLists)
                {
                    p = p.filter(playlist => {
                        if (playlist.name.toLowerCase().includes(store.searchText.toLowerCase())) {
                        return true;
                        }
                        return false;
                    });
                }
                else if(store.allUserPublished)
                {
                    p = p.filter(playlist => {
                        if (playlist.ownerUserName.toLowerCase().includes(store.searchText.toLowerCase())) {
                        return true;
                        }
                        return false;
                    });
                }
            }
            p.sort(compare);
        }
        else if(six)
        {
            if(store.allUserLists)
            {
                async function asyncGetLists() {
                    const response = await api.getSortedCreate();
                    if (response.data.success) {
                        let pairsArray = response.data.idNamePairs;
                        if(store.searchText !== "")
                        {
                            pairsArray = pairsArray.filter(playlist => {
                                if (playlist.name.toLowerCase().includes(store.searchText.toLowerCase())) {
                                return true;
                                }
                                return false;
                            });
                        }
                        if(pl != null)
                        {
                            return pairsArray;
                        }
                        storeReducer({
                            type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                            payload: {pairs: pairsArray, count: store.newListCounter + 1, sName: one, sPDate: two, sListens: three, sLikes: four, sDislikes: five, sEditDate: six, sCreate: seven, text: store.searchText, cInd: store.currentSongIndex, plList: store.playingList}
                        });
                    }
                    else {
                        console.log("API FAILED TO GET THE LIST PAIRS");
                    }
                }
                asyncGetLists();
            }
            else
            {
                async function asyncGetLists() {
                    const response = await api.getPSortedCreate();
                    if (response.data.success) {
                        let pairsArray = response.data.idNamePairs;
                        if(store.searchText !== "")
                        {
                            pairsArray = pairsArray.filter(playlist => {
                                if (playlist.name.toLowerCase().includes(store.searchText.toLowerCase())) {
                                return true;
                                }
                                return false;
                            });
                        }
                        if(pl != null)
                        {
                            return pairsArray;
                        }
                        storeReducer({
                            type: GlobalStoreActionType.LOAD_PUBLISHED_LISTS,
                            payload: {pArray: pairsArray, sName: one, sPDate: two, sListens: three, sLikes: four, sDislikes: five, sEditDate: six, sCreate: seven, uLi: store.allUserPublished, cInd: store.currentSongIndex, plList: store.playingList}
                        });
                    }
                    else {
                        console.log("API FAILED TO GET THE LIST PAIRS");
                    }
                }
                asyncGetLists();
            }
        }
        else if(seven)
        {
            if(store.allUserLists)
            {
                async function asyncGetLists() {
                    const response = await api.getSortedEdit();
                    if (response.data.success) {
                        let pairsArray = response.data.idNamePairs;
                        if(store.searchText !== "")
                        {
                            pairsArray = pairsArray.filter(playlist => {
                                if (playlist.name.toLowerCase().includes(store.searchText.toLowerCase())) {
                                return true;
                                }
                                return false;
                            });
                        }
                        if(pl != null)
                        {
                            return pairsArray;
                        }
                        storeReducer({
                            type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                            payload: {pairs: pairsArray, count: store.newListCounter + 1, sName: one, sPDate: two, sListens: three, sLikes: four, sDislikes: five, sEditDate: six, sCreate: seven, text: store.searchText, cInd: store.currentSongIndex, plList: store.playingList}
                        });
                    }
                    else {
                        console.log("API FAILED TO GET THE LIST PAIRS");
                    }
                }
                asyncGetLists();
            }
            else
            {
                async function asyncGetLists() {
                    const response = await api.getPSortedEdit();
                    if (response.data.success) {
                        let pairsArray = response.data.idNamePairs;
                        if(store.searchText !== "")
                        {
                            pairsArray = pairsArray.filter(playlist => {
                                if (playlist.name.toLowerCase().includes(store.searchText.toLowerCase())) {
                                return true;
                                }
                                return false;
                            });
                        }
                        if(pl != null)
                        {
                            return pairsArray;
                        }
                        storeReducer({
                            type: GlobalStoreActionType.LOAD_PUBLISHED_LISTS,
                            payload: {pArray: pairsArray, sName: one, sPDate: two, sListens: three, sLikes: four, sDislikes: five, sEditDate: six, sCreate: seven, uLi: store.allUserPublished, cInd: store.currentSongIndex, plList: store.playingList}
                        });
                    }
                    else {
                        console.log("API FAILED TO GET THE LIST PAIRS");
                    }
                }
                asyncGetLists();
            }
        }
       
       
        if((store.allLists || store.allUserPublished) && (!two && !six && !seven) && pl == null)
        {
            storeReducer({
                type: GlobalStoreActionType.LOAD_PUBLISHED_LISTS,
                payload: {pArray: p, sName: one, sPDate: two, sListens: three, sLikes: four, sDislikes: five, sEditDate: six, sCreate: seven, uLi: store.allUserPublished, txt: store.searchText, cInd: store.currentSongIndex, plList: store.playingList}
            });
        }
        else if(!two && !six && !seven && pl == null)
        {
            storeReducer({
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                payload: {pairs: p, count: store.newListCounter + 1, sName: one, sPDate: two, sListens: three, sLikes: four, sDislikes: five, sEditDate: six, sCreate: seven, text: store.searchText}
            });
        }

        return p;
        
    }

    store.loadPublishedPlaylists = function ()
    {
        async function asyncGetLists() {
            const response = await api.getPublishedPlaylists();
            if (response.data.success) {
                let pairsArray = response.data.data;
               
                let p = store.sortPlaylists(store.sortName, store.sortPDate, store.sortListens, store.sortLikes, store.sortDislikes, store.sortEditDate, store.sortCreate, pairsArray);
                      
                storeReducer({
                    type: GlobalStoreActionType.LOAD_PUBLISHED_LISTS,
                    payload: {pArray: p, sName: store.sortName, sPDate: store.sortPDate, sListens: store.sortListens, sLikes: store.sortLikes, sDislikes: store.sortDislikes, sEditDate: store.sortEditDate, sCreate: store.sortCreate, uLi: true}
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncGetLists();
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = function (id) {
        if(store.currentList.ownerEmail !== auth.user.email || store.allLists || store.allUserPublished)
        {
            async function getListToDelete(id) {
                let response = await api.getPublishedPlaylistById(id);
                if (response.data.success) {
                    let playlist = response.data.playlist;
                    storeReducer({
                        type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                        payload: {id: id, playlist: playlist}
                    });
                }
            }
            getListToDelete(id);
        }
        else
        {
        async function getListToDelete(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                    payload: {id: id, playlist: playlist}
                });
            }
        }
        getListToDelete(id);
    }
    }

    store.unmarkListForDeletion = function () {
                storeReducer({
                    type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                    payload: {id: null, playlist: null}
                });
    }

    store.deleteList = function (id) {
        if(store.allLists || store.allUserPublished)
        {
            async function processDelete(id) {
                let response = await api.deletePublishedPlaylistById(id);
                if (response.status === 200) {
                    async function processDDelete(id) {
                        let response = await api.deletePlaylistById(store.listMarkedForDeletion.unpublishedID);
                        store.closeCurrentList();
                        if (response.status === 200) {
                            store.closeCurrentList();
                            store.loadPublishedPlaylists();
                            history.push("/"); 
                        }
                    }
                    processDDelete(id);
                }
            }
            processDelete(id);
            
        }
        else
        {
            if(store.listMarkedForDeletion.published)
            {
                async function processDelete(id) {
                    let response = await api.deletePublishedPlaylistById(store.listMarkedForDeletion.publishedID);
                    if (response.status === 200) {
                        async function processDDelete(id) {
                            let response = await api.deletePlaylistById(store.listIdMarkedForDeletion);
                            store.closeCurrentList();
                            if (response.status === 200) {
                                store.closeCurrentList();
                                store.loadIdNamePairs();
                                history.push("/"); 
                            }
                        }
                        processDDelete(id);
                    }
                }
                processDelete(id);
            }
            else
            {
                async function processDelete(id) {
                    let response = await api.deletePlaylistById(id);
                    store.closeCurrentList();
                    
                    if (response.status === 200) {
                        store.loadIdNamePairs();
                        history.push("/"); 
                    }
                }
                processDelete(id);
            }
        }
    }
    store.deleteMarkedList = function() {
        store.deleteList(store.listIdMarkedForDeletion);
        store.hideModals();
    }

    store.handleMove = function (first, second)
    {
       /* storeReducer({
            type: GlobalStoreActionType.HANDLE_DRAG,
            payload: {
                isDragging: first,
                draggedTo: second
            }
        });*/
    }

    // THIS FUNCTION SHOWS THE MODAL FOR PROMPTING THE USER
    // TO SEE IF THEY REALLY WANT TO DELETE THE LIST

    store.showEditSongModal = (songIndex, songToEdit) => {
        storeReducer({
            type: GlobalStoreActionType.EDIT_SONG,
            payload: {currentSongIndex: songIndex, currentSong: songToEdit}
        });        
    }
    store.showRemoveSongModal = (songIndex, songToRemove) => {
        let s = {song: songToRemove, index: songIndex}
        storeReducer({
            type: GlobalStoreActionType.REMOVE_SONG,
            payload: {currentSongIndex: songIndex, currentSong: s}
        });        
    }
    store.hideModals = () => {
        storeReducer({
            type: GlobalStoreActionType.HIDE_MODALS,
            payload: {}
        });    
    }
    store.isDeleteListModalOpen = () => {
        return store.currentModal === CurrentModal.DELETE_LIST;
    }
    store.isEditSongModalOpen = () => {
        return store.currentModal === CurrentModal.EDIT_SONG;
    }
    store.isRemoveSongModalOpen = () => {
        return store.currentModal === CurrentModal.REMOVE_SONG;
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        storeReducer({
                            type: GlobalStoreActionType.SET_CURRENT_LIST,
                            payload: {list: playlist, index: store.currentSongIndex, public: store.publicLists, pArray: store.idNamePairs, plist: store.playingList, cm: store.player}
                        });
                    }
            }
        }
        asyncSetCurrentList(id);
    }

    store.playList = function (id, index)
    {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                        if(playlist.published)
                        {
                            
                            if(store.playingList != null && store.playingList._id === playlist._id)
                            {
                                
                            }
                            else
                            {
                                store.incrementListens(playlist._id, index);
                            }
                        }
                        else
                        {
                            /*let p = store.sortPlaylists(store.sortName, store.sortPDate, store.sortListens, store.sortLikes, store.sortDislikes, store.sortEditDate, store.sortCreate);
                            
                            storeReducer({
                                type: GlobalStoreActionType.SET_CURRENT_LIST,
                                payload: {list: store.currentList, index: index, public: store.publicLists, pArray: p, plist: playlist, cm: true}
                            });*/




                            let p = store.idNamePairs;
                            if(store.searchText !== "")
                            {
                                p = p.filter(playlist => {
                                if (playlist.name.toLowerCase().includes(store.searchText.toLowerCase())) {
                                  return true;
                                }
                                return false;
                              });
                            }
                           
                            p = store.sortPlaylists(store.sortName, store.sortPDate, store.sortListens, store.sortLikes, store.sortDislikes, store.sortEditDate, store.sortCreate, p);
                           
                            storeReducer({
                                type: GlobalStoreActionType.SET_CURRENT_LIST,
                                payload: {list: store.currentList, index: index, public: store.publicLists, pArray: p, plist: playlist, cm: true}
                            });
                        }
            }
        }
        asyncSetCurrentList(id);
    }

    store.playPublishedList = function (id, index)
    {
        async function asyncSetCurrentList(id) {
            let response = await api.getPublishedPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                    if(store.playingList != null && store.playingList._id === playlist._id)
                    {
                        
                    }
                    else
                    {
                        store.incrementListens(id, index);
                    }
            }
        }
        asyncSetCurrentList(id);
    }

    store.setCurrentSong = function (index) {
        async function asyncSetCurrentList(id) {
          
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: {list: store.currentList, index: id, public: store.publicLists, pArray: store.idNamePairs, plist: store.playingList, cm: store.player}
                    });
                
            }
        asyncSetCurrentList(index);
    }

    store.setPublishedList = function (id)
    {
        async function asyncSetPublishedList(id) {
            let response = await api.getPublishedPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: {list: playlist, index: store.currentSongIndex, public: store.publicLists, pArray: store.idNamePairs, plist: store.playingList, cm: true}
                });
            }
        }
        asyncSetPublishedList(id);
    }


    store.incrementListens = function(id, index)
    {
        if(store.allLists || store.allUserPublished)
        {
            async function getListToLike(id) {
                let response = await api.getPublishedPlaylistById(id);
                if (response.data.success) {
                    let playlist = response.data.playlist;

                    playlist.listens = playlist.listens + 1;


                    async function getPListToLike(id) {
                        let response = await api.getPlaylistById(id);
                        if (response.data.success) {
                            let pplaylist = response.data.playlist;
                            
                           pplaylist.listens = pplaylist.listens + 1;
                            async function updateList() {
                            response = await api.updatePlaylistById(pplaylist._id, pplaylist);
                            }
                                
                            updateList();
                        }
                    }
                    getPListToLike(playlist.unpublishedID);
                        async function updateList(playlist) {
                            
                            response = await api.updatePublishedPlaylistById(playlist._id, playlist);
                            if (response.data.success) {
                                async function getPublishedPlaylists() {
                                    const response = await api.getPublishedPlaylists();
                                    if (response.data.success) {
                                        let pairsArray = response.data.data;
                                       
                                        if(store.allUserPublished && !store.allLists)
                                        { 
                                            let p = pairsArray.filter(playlist => {
                                                if (playlist.ownerUserName.toLowerCase().includes(store.searchText.toLowerCase())) {
                                                  return true;
                                                }
                                                return false;
                                              });
                                            p = store.sortPlaylists(store.sortName, store.sortPDate, store.sortListens, store.sortLikes, store.sortDislikes, store.sortEditDate, store.sortCreate, p);
                                           
                                          
                                            storeReducer({
                                                type: GlobalStoreActionType.SET_CURRENT_LIST,
                                                payload: {list: store.currentList, index: index, public: p, pArray: store.idNamePairs, plist: playlist, cm: true}
                                            });
                                        }
                                        else
                                        {
                                           let p = pairsArray;
                                           
                                           if(store.searchText !== "")
                                           {
                                               p = p.filter(playlist => {
                                               if (playlist.name.toLowerCase().includes(store.searchText.toLowerCase())) {
                                                 return true;
                                               }
                                               return false;
                                             });
                                           }

                                           p = store.sortPlaylists(store.sortName, store.sortPDate, store.sortListens, store.sortLikes, store.sortDislikes, store.sortEditDate, store.sortCreate, p);
                                           
                                           
                                            storeReducer({
                                                type: GlobalStoreActionType.SET_CURRENT_LIST,
                                                payload: {list: store.currentList, index: index, public: p, pArray: store.idNamePairs, plist: playlist, cm: true}
                                            });
                                        }
                                    }
                                }
                                getPublishedPlaylists();
                            }
                        }
                    updateList(playlist);
                }
            }
            getListToLike(id);
        }
        else
        {
            async function getListToLike(id) {
                let response = await api.getPlaylistById(id);
                if (response.data.success) {
                    let playlist = response.data.playlist;
                    
                    playlist.listens = playlist.listens + 1;
                   

                    async function getPListToLike(id) {
                        let response = await api.getPublishedPlaylistById(id);
                        if (response.data.success) {
                            let pplaylist = response.data.playlist;
                            
                            pplaylist.listens = pplaylist.listens + 1;

                            async function updateList() {
                            response = await api.updatePublishedPlaylistById(pplaylist._id, pplaylist);
                            }
                                
                            updateList();
                        }
                    }
                    getPListToLike(playlist.publishedID);

                        async function updateList(playlist) {
                            response = await api.updatePlaylistById(playlist._id, playlist);
                            if (response.data.success) {
                                async function getPlaylists() {
                                    const response = await api.getPlaylistPairs();
                                    if (response.data.success) {
                                        
                                        let pairsArray = response.data.idNamePairs;
                                        let p = store.sortPlaylists(store.sortName, store.sortPDate, store.sortListens, store.sortLikes, store.sortDislikes, store.sortEditDate, store.sortCreate, pairsArray);
                                        if(store.searchText !== "")
                                        {
                                            p = p.filter(playlist => {
                                                if (playlist.name.toLowerCase().includes(store.searchText.toLowerCase())) {
                                                return true;
                                                }
                                                return false;
                                            });
                                        }
                                        storeReducer({
                                            type: GlobalStoreActionType.SET_CURRENT_LIST,
                                            payload: {list: store.currentList, index: index, public: store.publicLists, pArray: p, plist: playlist, cm: store.player}
                                        });
                                    }
                                }
                                getPlaylists();
                            }
                        }
                    updateList(playlist);
                }
            }
            getListToLike(id);
        }
    }

    store.changeCurSong = function (inc) {
       
        storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_LIST,
            payload: {list: store.currentList, index: store.currentSongIndex + inc, public: store.publicLists, pArray: store.idNamePairs, plist: store.playingList, cm: store.player}
        });
    }

    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.addNewSong = function() {
        let index = this.getPlaylistSize();
        this.addCreateSongTransaction(index, "Untitled", "?", "dQw4w9WgXcQ");
    }
    // THIS FUNCTION CREATES A NEW SONG IN THE CURRENT LIST
    // USING THE PROVIDED DATA AND PUTS THIS SONG AT INDEX
    store.createSong = function(index, song) {
        let list = store.currentList;      
        list.songs.splice(index, 0, song);
        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION MOVES A SONG IN THE CURRENT LIST FROM
    // start TO end AND ADJUSTS ALL OTHER ITEMS ACCORDINGLY
    store.moveSong = function(start, end) {
        let list = store.currentList;

        // WE NEED TO UPDATE THE STATE FOR THE APP
        if (start < end) {
            let temp = list.songs[start];
            for (let i = start; i < end; i++) {
                list.songs[i] = list.songs[i + 1];
            }
            list.songs[end] = temp;
        }
        else if (start > end) {
            let temp = list.songs[start];
            for (let i = start; i > end; i--) {
                list.songs[i] = list.songs[i - 1];
            }
            list.songs[end] = temp;
        }

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION REMOVES THE SONG AT THE index LOCATION
    // FROM THE CURRENT LIST
    store.removeSong = function(index) {
        let list = store.currentList;      
        list.songs.splice(index, 1); 

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION UPDATES THE TEXT IN THE ITEM AT index TO text
    store.updateSong = function(index, songData) {
        let list = store.currentList;
        let song = list.songs[index];
        song.title = songData.title;
        song.artist = songData.artist;
        song.youTubeId = songData.youTubeId;

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    store.addNewSong = () => {
        let playlistSize = store.getPlaylistSize();
        store.addCreateSongTransaction(
            playlistSize, "Untitled", "Unknown", "dQw4w9WgXcQ");
    }

    store.invalidSong = function()
    {
        storeReducer({
            type: GlobalStoreActionType.CHANGE_SONG_ERR,
            payload: {
                err: "Please enter a valid YouTube ID"
            }
        });
    }
    // THIS FUNCDTION ADDS A CreateSong_Transaction TO THE TRANSACTION STACK
    store.addCreateSongTransaction = (index, title, artist, youTubeId) => {
        // ADD A SONG ITEM AND ITS NUMBER
        let song = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        let transaction = new CreateSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }    
    store.addMoveSongTransaction = function (start, end) {
        let transaction = new MoveSong_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }
    // THIS FUNCTION ADDS A RemoveSong_Transaction TO THE TRANSACTION STACK
    store.addRemoveSongTransaction = () => {
        let index = store.currentDeleteSong.index;
        let song = store.currentList.songs[index];
        let transaction = new RemoveSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }
    store.addUpdateSongTransaction = function (index, newSongData) {
        let song = store.currentList.songs[index];
        let oldSongData = {
            title: song.title,
            artist: song.artist,
            youTubeId: song.youTubeId
        };
        let transaction = new UpdateSong_Transaction(this, index, oldSongData, newSongData);        
        tps.addTransaction(transaction);
    }
   
    store.updateCurrentList = function() {
        async function asyncUpdateCurrentList() {
            const response = await api.updatePlaylistById(store.currentList._id, store.currentList);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: {list: store.currentList, index: store.index, public: store.publicLists, pArray: store.idNamePairs, plist: store.currentList, cm: store.player}
                });
            }
        }
        asyncUpdateCurrentList();
    }


    store.updatePlayingList = function()
    {
        async function asyncUpdateCurrentList() {
            const response = await api.updatePlaylistById(store.playingList._id, store.playingList);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: {list: store.currentList, index: 0, public: store.publicLists, pArray: store.idNamePairs, plist: store.playingList, cm: store.player}
                });
            }
        }

        if(store.playingList.published)
        {
            async function getPListToLike(id) {
                let response = await api.getPublishedPlaylistById(id);
                if (response.data.success) {
                    let pplaylist = response.data.playlist;
                    
                    pplaylist.comments = store.playingList.comments;

                    async function updateList() {
                    response = await api.updatePublishedPlaylistById(pplaylist._id, pplaylist);
                    }
                        
                    updateList();
                }
            }
            getPListToLike(store.playingList.publishedID);
        }
        asyncUpdateCurrentList();
    }

    store.updatePuplishedCurrent = function()
    {
        async function asyncUpdateCurrentList() {
            const response = await api.updatePublishedPlaylistById(store.playingList._id, store.playingList);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: {list: store.currentList, index: store.currentSongIndex, public: store.publicLists, pArray: store.idNamePairs, plist: store.playingList, cm: false}
                });
            }
        }
        asyncUpdateCurrentList();


        async function getPListToLike(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let pplaylist = response.data.playlist;
                
                pplaylist.comments = store.playingList.comments;
                async function updateList() {
                response = await api.updatePlaylistById(pplaylist._id, pplaylist);
                }
                    
                updateList();
            }
        }
        getPListToLike(store.playingList.unpublishedID);
    }

    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }
    store.canAddNewSong = function() {
        return (store.currentList !== null && store.currentModal === CurrentModal.NONE);
    }

    store.canUndo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToUndo() && store.currentModal === CurrentModal.NONE);
    }
    store.canRedo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToRedo() && store.currentModal === CurrentModal.NONE);
    }

    store.canClose = function() {
        return (store.currentList !== null && store.currentModal === CurrentModal.NONE);
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    function KeyPress(event) {
        if (!store.modalOpen && event.ctrlKey){
            if(event.key === 'z'){
                store.undo();
            } 
            if(event.key === 'y'){
                store.redo();
            }
        }
    }
  
    document.onkeydown = (event) => KeyPress(event);

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };