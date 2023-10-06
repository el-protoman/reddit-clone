import React, { useState } from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import { Paper, Typography } from '@mui/material';
import ContentCard from '../post/Card';


function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
    };
}

function ImageItem({ post, handleSelectedPost, comments }) {
    // Render each image item here, using the post and handleSelectedPost props
    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageClick = (post) => {
        setSelectedImage((prevSelectedImage) => {
            if (prevSelectedImage === post) {
                return null; // Reset to null if the same image is selected
            } else {
                return post; // Set the selected image to the new post
            }
        });
    };
    return (
        // Your image item JSX here
        <>
            {/* selectedImage is different from post and was causing rerendering after comments have been fetched */}
            {selectedImage && selectedImage.id === post.id ? (
                <ContentCard handleSelectedPost={handleSelectedPost} key={post.id} comments={comments} post={post} style={{ width: '100%' }} onClick={handleImageClick} />

            ) : (
                <ImageListItem key={post.id} onClick={() => handleImageClick(post)}>
                    {post.post_hint === 'image' && (
                        <img {...srcset(post.is_gallery ? post.thumbnail : post.url, 250)} alt={post.title} loading="lazy" />
                    )}
                    {post.post_hint === 'hosted:video' && (
                        <video src={post.media.reddit_video.fallback_url} controls width={250} height={250} />
                    )}
                    {post.is_self && (
                        <Paper elevation={2} style={{ backgroundColor: 'blue', margin: '10px', padding: '5px' }}>
                            <Typography variant="h5" component="h6">{post.title}</Typography>
                        </Paper>
                    )}
                </ImageListItem>
            )
            }

        </>
    );
}

export default ImageItem
// export default React.memo(ImageItem);