import React from 'react';
import ContentCard from './Card';

const SubFeed = () => {
    return (
        <div style={{ display: 'grid', gridTemplateRows: 'repeat(4, 1fr)', gridTemplateColumns: '1fr', gap: '10px' }}>
            <ContentCard />
            <ContentCard />
            <ContentCard />
            <ContentCard />
        </div>
    );
}

export default SubFeed;
