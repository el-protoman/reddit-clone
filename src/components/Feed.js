import React from 'react';
import ContentCard from './Card';
import Home from '../features/feed/HomeFeed'

const Feed = () => {
    return (
        <div>
            <Home />

            <div style={{ display: 'grid', gridTemplateRows: 'repeat(4, 1fr)', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                <ContentCard key={"test1"} />
                <ContentCard key="test2" />
                <ContentCard key="test3" />
                <ContentCard key="test4" />
                <ContentCard key="test5" />
                <ContentCard key="test6" />
                <ContentCard key="test7" />
                <ContentCard key="test8" />
            </div>
        </div>
    );
}

export default Feed;
