import React, { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ContentCard from '../../components/Card';
import PostLoading from '../post/PostLoading';
import { Paper, Typography } from '@mui/material';


function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
    };
}

const QuiltedImageList = ({ posts }) => {
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
        <>
            {/* <ImageList variant="quilted" cols={4} rowHeight={250} style={{ width: '100%' }}>
                {posts && Array.isArray(posts) ? (
                    posts.map((post, index) => (
                        selectedImage === post ? (
                            <ContentCard key={post.id} post={post} style={{ width: '100%' }} onClick={handleImageClick} />
                        ) : (
                            <ImageListItem key={post.id} onClick={() => handleImageClick(post)}>
                                <img {...srcset(post.is_gallery ? post.thumbnail : post.url, 250)} alt={post.title} loading="lazy" />
                            </ImageListItem>
                        )
                    ))) : (
                    // Render a loading message or handle the empty posts case
                    <PostLoading />
                )
                }
            </ImageList> */}
            <ImageList variant="quilted" cols={4} rowHeight={250} style={{ width: '100%' }}>
                {posts && Array.isArray(posts) ? (
                    posts.map((post, index) => (
                        selectedImage === post ? (
                            <ContentCard key={post.id} post={post} style={{ width: '100%' }} onClick={handleImageClick} />

                        ) : (
                            <ImageListItem key={post.id} onClick={() => handleImageClick(post)}>
                                {post.post_hint === 'image' && (
                                    <img {...srcset(post.is_gallery ? post.thumbnail : post.url, 250)} alt={post.title} loading="lazy" />
                                )}
                                {post.post_hint === 'hosted:video' && (
                                    <video src={post.media.reddit_video.fallback_url} controls />
                                )}
                                {post.is_self && (
                                    <Paper elevation={2} style={{ backgroundColor: 'blue', margin: '10px', padding: '5px' }}>
                                        <Typography variant="h5" component="h6">{post.title}</Typography>
                                    </Paper>
                                )}
                            </ImageListItem>
                        )
                    ))
                ) : (
                    <PostLoading />
                )}
            </ImageList>
        </>
    );
};

export default QuiltedImageList;