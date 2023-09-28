import * as React from 'react';
import Comments from './Comments';
import ContentCard from './Card';

export default function Subcontent() {
    return (
        <>
            <ContentCard key="test" />
            <div>
                <Comments />
            </div>
        </>
    );
}
