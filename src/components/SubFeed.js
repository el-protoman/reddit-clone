import React from 'react';
import ContentCard from './Card';

const SubFeed = () => {
    return (
        <div style={{ display: 'grid', gridTemplateRows: 'repeat(4, 1fr)', gridTemplateColumns: '1fr', gap: '10px' }}>
            <ContentCard key="test1" />
            <ContentCard key="test2" />
            <ContentCard key="test3" />
            <ContentCard key="test4" />
        </div>
    );
}

export default SubFeed;
