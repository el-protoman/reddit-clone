import React from 'react';
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

// export default React.memo(Feed, (prevProps, nextProps) => {
//     // only update if the posts prop has changed
//     return prevProps.posts !== nextProps.posts;
// });
