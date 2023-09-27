import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, selectFilteredPosts, setSearchTerm } from './homeSlice';
import PostLoading from '../post/PostLoading';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import QuiltedImageList from './QuiltedImageList';

const Home = () => {
    const home = useSelector((state) => state.home);
    const { loading, error, searchTerm } = home;
    const posts = useSelector(selectFilteredPosts);
    const dispatch = useDispatch();
    // dispatch(fetchPosts('/r/pics/'))

    if (loading) {
        // Generate an array of PostLoading components with unique keys
        const postLoadingComponents = Array(Math.floor(Math.random() * (10 - 3 + 1)) + 3)
            .fill(null)
            .map((_, index) => <PostLoading key={index} />);

        return (
            <div>
                {postLoadingComponents}
            </div>
        );
    }

    if (error) {
        return (
            <div className="error">
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
        <QuiltedImageList posts={posts} />
    );
};

export default Home;