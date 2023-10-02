import React from 'react';
import ContentCard from './Card';
import Home from '../features/feed/HomeFeed'

const Feed = (props) => {
    const { handleSelectedPost } = props;
    return (
        <div>
            <Home handleSelectedPost={handleSelectedPost} />
        </div>
    );
}

export default Feed;
