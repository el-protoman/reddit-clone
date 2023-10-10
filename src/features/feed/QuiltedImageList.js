// import React, { useState } from 'react';
// import ImageItem from './ImageItem';
// import PostLoading from '../post/PostLoading';
// import Grid from '@mui/material/Grid';
// import './Home.css'

// const QuiltedImageList = ({ posts, handleSelectedPost, comments }) => {
//     const [selectedItemId, setSelectedItemId] = useState(null);

//     return (
//         <>
//             <Grid container spacing={2}>
//                 {posts && Array.isArray(posts) ? (
//                     posts.map((post, index) => (
//                         <Grid item xs={12} sm={6} md={4} lg={3} key={post.id}>
//                             <ImageItem post={post} comments={comments[index]} handleSelectedPost={handleSelectedPost} selectedItemId={selectedItemId} setSelectedItemId={setSelectedItemId} />
//                         </Grid>
//                     ))
//                 ) : (
//                     <PostLoading />
//                 )}
//             </Grid>
//         </>
//     );
// };

// // export default React.memo(QuiltedImageList, (prevProps, nextProps) => {
// //     return prevProps.posts !== nextProps.posts;
// // });

// export default QuiltedImageList;

import React, { useState } from 'react';
import ImageItem from './ImageItem';
import PostLoading from '../post/PostLoading';
import Grid from '@mui/material/Grid';

const QuiltedImageList = ({ posts, handleSelectedPost, comments }) => {
    const [selectedItemId, setSelectedItemId] = useState(null);

    const handleItemClick = (itemId) => {
        setSelectedItemId(itemId);
    };

    return (
        <>
            <Grid container spacing={2}>
                {posts && Array.isArray(posts) ? (
                    posts.map((post, index) => (
                        <Grid item xs={selectedItemId === post.id ? 12 : 6} md={selectedItemId === post.id ? 8 : 4} lg={selectedItemId === post.id ? 6 : 3} key={post.id}>
                            <ImageItem
                                post={post}
                                comments={comments[index]}
                                handleSelectedPost={handleSelectedPost}
                                isSelected={selectedItemId === post.id}
                                onClick={() => handleItemClick(post.id)}
                                selectedItemId={selectedItemId}
                                setSelectedItemId={setSelectedItemId}
                            />
                        </Grid>
                    ))
                ) : (
                    <PostLoading />
                )}
            </Grid>
        </>
    );
};

export default QuiltedImageList;
