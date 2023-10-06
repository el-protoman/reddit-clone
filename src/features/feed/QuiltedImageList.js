import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageItem from './ImageItem';
import PostLoading from '../post/PostLoading';

const QuiltedImageList = ({ posts, handleSelectedPost, comments }) => {
    return (
        <>
            <ImageList variant="quilted" cols={4} rowHeight={250} style={{ width: '100%' }}>
                {posts && Array.isArray(posts) ? (
                    posts.map((post, index) => (
                        <ImageItem key={post.id} post={post} comments={comments[index]} handleSelectedPost={handleSelectedPost} />
                    ))
                ) : (
                    <PostLoading />
                )}
            </ImageList>
        </>
    );
};

// export default React.memo(QuiltedImageList, (prevProps, nextProps) => {
//     return prevProps.posts !== nextProps.posts;
// });

export default QuiltedImageList;