import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchPostsFailure, fetchHomePosts, selectFilteredPosts, setSearchTerm } from './homeSlice';
import PostLoading from '../post/PostLoading';
import QuiltedImageList from './QuiltedImageList';
import Grid from '@mui/material/Grid';

const Home = (props) => {
    const { handleSelectedPost } = props;
    const home = useSelector((state) => state.home);
    const { loading, error, searchTerm } = home;
    const filteredPosts = useSelector(selectFilteredPosts);
    const dispatch = useDispatch();
    // separating comments
    const extractedComments = Array.isArray(filteredPosts) ? filteredPosts.map(post => post.comments) : [];

    useEffect(() => {
        dispatch(fetchHomePosts());
    }, [dispatch]);

    // console.log('the error state', error)
    // console.log('the loading state', loading)

    if (loading) {
        // Generate an array of PostLoading components with unique keys
        const postLoadingComponents = Array(Math.floor(Math.random() * (10 - 3 + 1)) + 3)
            .fill(null)
            .map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <PostLoading />
                </Grid>
            ));

        return (
            <>
                <Grid container spacing={2}>
                    {postLoadingComponents}
                </Grid>
            </>
        );
    }

    switch (true) {
        case error:
            return (
                <div className="error">
                    <h2>Failed to load posts.</h2>
                    <button type="button" onClick={() => {
                        const menu3 = ['/r/marvel/', '/r/starwars/']
                        const randomSubreddit = menu3[Math.floor(Math.random() * menu3.length)];
                        dispatch(fetchPosts(randomSubreddit))
                    }}>
                        Try again
                    </button>
                </div>
            );

        case filteredPosts.length === 0 && searchTerm !== '':
            return (
                <div className="error">
                    <h2>No posts matching "{searchTerm}"</h2>
                    <button type="button" onClick={() => dispatch(setSearchTerm(''))}>
                        Go home
                    </button>
                </div>
            );

        default:
            return (
                <QuiltedImageList handleSelectedPost={handleSelectedPost} posts={filteredPosts} comments={extractedComments} />
            );
    }
};

export default Home;