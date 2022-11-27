const Playlist = require('../models/playlist-model');
const PublishedPlaylist = require('../models/published-model');
const User = require('../models/user-model');
/*
    This is our back-end API. It provides all the data services
    our database needs. Note that this file contains the controller
    functions for each endpoint.
    
    @author McKilla Gorilla
*/


createPublishedPlaylist = (req, res) => {
    console.log("Went inside the function");
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Playlist',
        })
    }
    
    const playlist = new PublishedPlaylist(body);
    if (!playlist) {
        return res.status(400).json({ success: false, error: err })
    }

     asyncPutList = async() =>
     {
        const savedList = await playlist.save();
     }
    asyncPutList();
  
   


    User.findOne({ _id: req.userId }, (err, user) => {
    if (playlist.ownerEmail != user.email) {
        return res.status(400).json({
            success: false,
            error: "authentication error",
        })
    }
        user.publishedPlaylists.push(playlist._id);
        user
            .save()
            .then(() => {
                playlist
                    .save()
                    .then(() => {
                        return res.status(201).json({
                            playlist: playlist
                        })
                    })
                    .catch(error => {
                        return res.status(400).json({
                            errorMessage: 'Playlist Not Created!'
                        })
                    })
            });
    })
}



createPlaylist = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Playlist',
        })
    }

    


    //"authentication error"
    const playlist = new Playlist(body);
    if (!playlist) {
        return res.status(400).json({ success: false, error: err })
    }

    

    User.findOne({ _id: req.userId }, (err, user) => {
    if (playlist.ownerEmail != user.email) {
        return res.status(400).json({
            success: false,
            error: "authentication error",
        })
    }
        user.playlists.push(playlist._id);
        user
            .save()
            .then(() => {
                playlist
                    .save()
                    .then(() => {
                        return res.status(201).json({
                            playlist: playlist
                        })
                    })
                    .catch(error => {
                        return res.status(400).json({
                            errorMessage: 'Playlist Not Created!'
                        })
                    })
            });
    })
}
deletePlaylist = async (req, res) => {
    Playlist.findById({ _id: req.params.id }, (err, playlist) => {
        if (err) {
            return res.status(404).json({
                errorMessage: 'Playlist not found!',
            })
        }

        // DOES THIS LIST BELONG TO THIS USER?
        async function asyncFindUser(list) {
            User.findOne({ email: list.ownerEmail }, (err, user) => {
                if (user._id == req.userId) {
                    Playlist.findOneAndDelete({ _id: req.params.id }, () => {

                        const index = user.playlists.indexOf(req.params.id);
                        if (index > -1) { 
                            user.playlists.splice(index, 1); 
                        }
                        
                        user
                            .save()
                                .then(() => {
                                    return res.status(200).json({});
                                })
                                .catch(error => {
                                    return res.status(400).json({
                                        errorMessage: 'Playlist Not Created!'
                                    })
                                })

                            
                                
                    }).catch(err => console.log(err))
                }
                else {
                    return res.status(400).json({ 
                        errorMessage: "authentication error" 
                    });
                }
            });
        }
        asyncFindUser(playlist);
    })
}



deletePublishedPlaylist = async (req, res) => {
    PublishedPlaylist.findById({ _id: req.params.id }, (err, playlist) => {
        if (err) {
            return res.status(404).json({
                errorMessage: 'Playlist not found!',
            })
        }

        // DOES THIS LIST BELONG TO THIS USER?
        async function asyncFindUser(list) {
            User.findOne({ email: list.ownerEmail }, (err, user) => {
                if (user._id == req.userId) {
                    PublishedPlaylist.findOneAndDelete({ _id: req.params.id }, () => {

                        const index = user.publishedPlaylists.indexOf(req.params.id);
                        if (index > -1) { 
                            user.publishedPlaylists.splice(index, 1); 
                        }
                        
                        user
                            .save()
                                .then(() => {
                                    return res.status(200).json({});
                                })
                                .catch(error => {
                                    return res.status(400).json({
                                        errorMessage: 'Playlist Not Created!'
                                    })
                                })

                            
                                
                    }).catch(err => console.log(err))
                }
                else {
                    return res.status(400).json({ 
                        errorMessage: "authentication error" 
                    });
                }
            });
        }
        asyncFindUser(playlist);
    })
}



getPlaylistById = async (req, res) => {
    await Playlist.findById({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        // DOES THIS LIST BELONG TO THIS USER?
        async function asyncFindUser(list) {
            await User.findOne({ email: list.ownerEmail }, (err, user) => {
                if (user._id == req.userId) {
                    return res.status(200).json({ success: true, playlist: list })
                }
                else {
                    return res.status(400).json({ success: false, description: "authentication error" });
                }
            });
        }
        asyncFindUser(list);
    }).catch(err => console.log(err))
}

getPublishedPlaylistById = async (req, res) => {
    await PublishedPlaylist.findById({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        return res.status(200).json({ success: true, playlist: list })
    }).catch(err => console.log(err))
}

getPlaylistPairs = async (req, res) => {
    await User.findOne({ _id: req.userId }, (err, user) => {
        async function asyncFindList(email) {
            await Playlist.find({ ownerEmail: email }, (err, playlists) => {
                if (err) {
                    return res.status(400).json({ success: false, error: err })
                }
                if (!playlists) {
                    return res
                        .status(404)
                        .json({ success: false, error: 'Playlists not found' })
                }
                else {
                    // PUT ALL THE LISTS INTO ID, NAME PAIRS
                    let pairs = [];
                    for (let key in playlists) {
                        let list = playlists[key];
                        let pair = {
                            _id: list._id,
                            name: list.name
                        };
                        pairs.push(list);
                    }
                    return res.status(200).json({ success: true, idNamePairs: pairs })
                }
            }).catch(err => console.log(err))
        }
        asyncFindList(user.email);
    }).catch(err => console.log(err))
}
getPlaylists = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Playlists not found` })
        }
        return res.status(200).json({ success: true, data: playlists })
    }).catch(err => console.log(err))
}
getPublishedPlaylists = async (req, res) => {
    await PublishedPlaylist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Playlists not found` })
        }
        return res.status(200).json({ success: true, data: playlists })
    }).catch(err => console.log(err))
}
updatePlaylist = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Playlist.findOne({ _id: req.params.id }, (err, playlist) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Playlist not found!',
            })
        }

        // DOES THIS LIST BELONG TO THIS USER?
        async function asyncFindUser(list) {
            await User.findOne({ email: list.ownerEmail }, (err, user) => {
                if (user._id == req.userId) {

                    list.name = body.playlist.name;
                    list.songs = body.playlist.songs; 
                    list.comments = body.playlist.comments;
                    list.published = body.playlist.published;
                    list
                        .save()
                        .then(() => {
                            return res.status(200).json({
                                success: true,
                                id: list._id,
                                message: 'Playlist updated!',
                            })
                        })
                        .catch(error => {
                            return res.status(404).json({
                                error,
                                message: 'Playlist not updated!',
                            })
                        })
                }
                else {
                    return res.status(400).json({ success: false, description: "authentication error" });
                }
            });
        }
        asyncFindUser(playlist);
    })
}

updatePublishedPlaylist = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    PublishedPlaylist.findOne({ _id: req.params.id }, (err, playlist) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Playlist not found!',
            })
        }

     
                    playlist.name = body.playlist.name;
                    playlist.songs = body.playlist.songs; 
                    playlist.comments = body.playlist.comments;
                    playlist.published = body.playlist.published;
                    playlist
                        .save()
                        .then(() => {
                            return res.status(200).json({
                                success: true,
                                id: list._id,
                                message: 'Playlist updated!',
                            })
                        })
                        .catch(error => {
                            return res.status(404).json({
                                error,
                                message: 'Playlist not updated!',
                            })
                        })

    })
}
module.exports = {
    createPlaylist,
    deletePlaylist,
    deletePublishedPlaylist,
    getPlaylistById,
    getPublishedPlaylistById,
    getPlaylistPairs,
    getPlaylists,
    getPublishedPlaylists,
    updatePlaylist,
    updatePublishedPlaylist,
    createPublishedPlaylist
}