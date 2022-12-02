import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function CommentCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { comment, index } = props;
    function handleUClick(event)
    {
        event.stopPropagation();
        store.allUserPublished = true;
        store.allLists = false;
        store.allUserLists = false;
        store.searchPlaylists(comment.user);
        console.log("clicked " + comment.user);
    }
    let cardClass = "list-cardComment unselected-list-card";
    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass} style = {{cursor: 'auto'}} draggable = 'false'>
            
               
                <div><span onClick = {handleUClick} style = {{textDecoration: 'underline', color: 'blue', cursor: 'pointer'}}>{comment.user}</span> </div> 
                <div style = {{marginTop: '10px'}}>{comment.comment}</div>    
            
        </div>
    );
}

export default CommentCard;