/*
    This is our http api, which we use to send requests to
    our back-end API. Note we`re using the Axios library
    for doing this, which is an easy to use AJAX-based
    library. We could (and maybe should) use Fetch, which
    is a native (to browsers) standard, but Axios is easier
    to use when sending JSON back and forth and it`s a Promise-
    based API which helps a lot with asynchronous communication.
    
    @author McKilla Gorilla
*/

import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

// THESE ARE ALL THE REQUESTS WE`LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /top5list). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH LIST TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE WE WILL FORMAT HERE, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES
export const createPlaylist = (newListName, pID, newSongs, userName, userEmail, pb, pbDate, cmt, like, dislike, listen, lUsers, dlUsers) => {
    return api.post(`/playlist/`, {
        // SPECIFY THE PAYLOAD
        name: newListName,
        publishedID: pID,
        songs: newSongs, 
        published: pb,
        comments: cmt,
        publishedDate: pbDate,
        likes: like,
        dislikes: dislike,
        listens: listen,
        ownerEmail: userEmail,
        ownerUserName: userName,
        likedUsers: lUsers,
        dislikedUsers: dlUsers
    })
}
export const createPublishedPlaylist = (newListName, unpID, newSongs, userName, userEmail, pb, pbDate, cmt, like, dislike, listen, lUsers, dlUsers) => {
    return api.post(`/publishplaylist/`, {
        // SPECIFY THE PAYLOAD
        name: newListName,
        unpublishedID: unpID,
        songs: newSongs,
        published: pb,
        publishedDate: pbDate,
        likes: like,
        dislikes: dislike,
        listens: listen,
        comments: cmt,
        ownerEmail: userEmail,
        ownerUserName: userName,
        likedUsers: lUsers,
        dislikedUsers: dlUsers
    })
}
export const deletePlaylistById = (id) => api.delete(`/playlist/${id}`)
export const deletePublishedPlaylistById = (id) => api.delete(`/publishedplaylist/${id}`)
export const getPlaylistById = (id) => api.get(`/playlist/${id}`)
export const getPlaylistByName = (name) => api.get(`/playlistname/${name}`)
export const getPublishedPlaylistById = (id) => api.get(`/publishedplaylist/${id}`)
export const getPlaylistPairs = () => api.get(`/playlistpairs/`)
export const getSortedPublish = () => api.get(`/sortedpublish/`)
export const getSortedCreate = () => api.get(`/sortedcreate/`)
export const getSortedEdit = () => api.get(`/sortededit/`)
export const getPSortedPublish = () => api.get(`/psortedpublish/`)
export const getPSortedCreate = () => api.get(`/psortedcreate/`)
export const getPSortedEdit = () => api.get(`/psortededit/`)
export const getPublishedPlaylists = () => api.get(`/pbplaylists/`)
export const getPublishedPlaylistsSearch = (str) => api.get(`/publishedsearch/${str}`)
export const getPlaylistsSearch = (str, email) => api.get(`/playlistsearch/${str}/${email}`)
export const getPlaylistsSearchUser = (str) => api.get(`/usersearch/${str}`)
export const updatePlaylistById = (id, playlist) => {
    return api.put(`/playlist/${id}`, {
        // SPECIFY THE PAYLOAD
        playlist : playlist
    })
}
export const updatePublishedPlaylistById = (id, playlist) => {
    return api.put(`/publishedplaylist/${id}`, {
        // SPECIFY THE PAYLOAD
        playlist : playlist
    })
}


const apis = {
    createPlaylist,
    deletePlaylistById,
    deletePublishedPlaylistById,
    getPlaylistById,
    getPlaylistByName,
    getPublishedPlaylistById,
    getPlaylistPairs,
    getPublishedPlaylists,
    updatePlaylistById,
    getPublishedPlaylistsSearch,
    getPlaylistsSearch,
    getPlaylistsSearchUser,
    updatePublishedPlaylistById,
    createPublishedPlaylist,
    getSortedPublish,
    getSortedCreate,
    getSortedEdit,
    getPSortedPublish,
    getPSortedCreate,
    getPSortedEdit
}

export default apis
