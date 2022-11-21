import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function CommentCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { comment, index } = props;

    let cardClass = "list-card unselected-list-card";
    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}>
            {index + 1}.
            <a
                id={'comment-' + index + '-link'}
                className="song-link"
                href={comment.youTubeId}>
                {comment.user} by {comment.comment}
            </a>
        </div>
    );
}

export default CommentCard;