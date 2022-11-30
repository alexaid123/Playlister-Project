import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function CommentCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { comment, index } = props;

    let cardClass = "list-cardComment unselected-list-card";
    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}>
            
               
                <div><a href = "test">{comment.user}</a> </div> 
                <div style = {{marginTop: '10px'}}>{comment.comment}</div>    
            
        </div>
    );
}

export default CommentCard;