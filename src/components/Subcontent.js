import * as React from 'react';
import Comments from './Comments';
import ContentCard from './Card';

export default function Subcontent(props) {
    const { closeSelectedPost, post } = props
    return (
        <>
            <ContentCard closeSelectedPost={closeSelectedPost} key={post.id} post={post} />
            <div>
                <Comments />
            </div>
        </>
    );
}
