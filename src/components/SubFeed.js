import React, { useEffect } from 'react';
import ContentCard from '../features/post/Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, selectFilteredPosts, setSearchTerm } from '../features/feed/homeSlice';
import ImageList from '@mui/material/ImageList';
import PostLoading from '../features/post/PostLoading';
import Skeleton from '@mui/material/Skeleton';

const SubFeed = (props) => {
    const { handleSelectedPost } = props;
    const home = useSelector((state) => state.home);
    const { loading, error, searchTerm, selectedSubreddit } = home;
    const posts = useSelector(selectFilteredPosts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts(selectedSubreddit));
    }, [selectedSubreddit, dispatch]);

    if (loading) {
        // Generate an array of PostLoading components with unique keys
        const postLoadingComponents = Array(Math.floor(Math.random() * (5 - 3 + 1)) + 3)
            .fill(null)
            .map((_, index) => <>
                <PostLoading key={index} />
            </>);

        return (
            <div style={{ display: 'grid', gridTemplateRows: 'repeat(4, 1fr)', gridTemplateColumns: '1fr', gap: '10px' }}>
                {postLoadingComponents}
            </div>
        );
    }

    if (error) {
        return (
            <div className="error" style={{ display: 'grid', gridTemplateRows: 'repeat(4, 1fr)', gridTemplateColumns: '1fr', gap: '10px' }}>
                <h2>Failed to load posts.</h2>
                <button type="button" onClick={() => dispatch(fetchPosts('/r/nibbio'))}>
                    Try again
                </button>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="error">
                <h2>No posts matching "{searchTerm}"</h2>
                <button type="button" onClick={() => dispatch(setSearchTerm(''))}>
                    Go home
                </button>
            </div>
        );
    }
    return (
        <div>
            <ImageList variant="quilted" cols={1} style={{ width: '100%' }}>
                {posts && Array.isArray(posts) ? (
                    posts.map((post) => (
                        <ContentCard key={post.id} handleSelectedPost={handleSelectedPost} post={post} style={{ padding: '10px', margin: '10px' }} />
                    )))
                    : (
                        <PostLoading />
                    )}
            </ImageList>
        </div>
    );
}

export default SubFeed;
