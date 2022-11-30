import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [ draggedTo, setDraggedTo ] = useState(0);
    const { song, index } = props;

    function handleDragStart(event) {
        event.dataTransfer.setData("song", index);
    }
 
    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let targetIndex = index;
        let sourceIndex = Number(event.dataTransfer.getData("song"));
        setDraggedTo(false);

        // UPDATE THE LIST
        store.addMoveSongTransaction(sourceIndex, targetIndex);
    }
    function handleRemoveSong(event) {
        event.stopPropagation();
        store.showRemoveSongModal(index, song);
    }
    function handleClick(event) {
        // DOUBLE CLICK IS FOR SONG EDITING
        event.stopPropagation();
        if (event.detail === 2 && !store.currentList.published) {
            store.showEditSongModal(index, song);
        }
        else
        {
            if(store.playingList != null && store.currentList._id === store.playingList._id)
            {
                store.setCurrentSong(index);
            }
            else
            {
                store.playList(store.currentList._id, index);
            }
            
        }
    }

    let cardClass = "list-card unselected-list-card";
    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable={!store.currentList.published}
            onClick={handleClick}
        >
            {index + 1}.
            <span
                id={'song-' + index + '-link'}
                className="song-link"
                >
                {song.title} by {song.artist}
            </span>
           {!store.currentList.published && <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                style = {{fontSize: '10pt'}}
                value={"\u2715"}
                onClick={handleRemoveSong}
            />}
        </div>
    );
}

export default SongCard;