import React from 'react';
import ContentCard from './Card';

const Feed = () => {
    return (
        <div>
            <div style={{ display: 'grid', gridTemplateRows: 'repeat(4, 1fr)', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                <ContentCard />
                <ContentCard />
                <ContentCard />
                <ContentCard />
                <ContentCard />
                <ContentCard />
                <ContentCard />
                <ContentCard />
            </div>
        </div>
    );
}

export default Feed;
