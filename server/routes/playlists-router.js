/*
    This is where we'll route all of the received http requests
    into controller response functions.
    
    @author McKilla Gorilla
*/
const express = require('express')
const PlaylistController = require('../controllers/playlist-controller')
const router = express.Router()
const auth = require('../auth')

router.post('/playlist', auth.verify, PlaylistController.createPlaylist)
router.post('/publishplaylist', auth.verify, PlaylistController.createPublishedPlaylist)
router.delete('/playlist/:id', auth.verify, PlaylistController.deletePlaylist)
router.delete('/publishedplaylist/:id', auth.verify, PlaylistController.deletePublishedPlaylist)
router.get('/playlist/:id', auth.verify, PlaylistController.getPlaylistById)
router.get('/playlistname/:name', auth.verify, PlaylistController.getPlaylistByName)
router.get('/publishedplaylist/:id', PlaylistController.getPublishedPlaylistById)
router.get('/publishedsearch/:str', PlaylistController.getPublishedPlaylistsSearch)
router.get('/playlistsearch/:str/:email', PlaylistController.getPlaylistsSearch)
router.get('/usersearch/:str', PlaylistController.getPlaylistsSearchUser)

router.get('/playlistpairs', auth.verify, PlaylistController.getPlaylistPairs)
router.get('/playlists', auth.verify, PlaylistController.getPlaylists)
router.get('/pbplaylists', auth.verify, PlaylistController.getPublishedPlaylists)
router.put('/playlist/:id', auth.verify, PlaylistController.updatePlaylist)
router.put('/publishedplaylist/:id', auth.verify, PlaylistController.updatePublishedPlaylist)

module.exports = router