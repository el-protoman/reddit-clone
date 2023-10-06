import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchHomePosts, selectFilteredPosts, setSearchTerm } from './homeSlice';
import PostLoading from '../post/PostLoading';
import QuiltedImageList from './QuiltedImageList';

const Home = (props) => {
    const { handleSelectedPost } = props;
    const home = useSelector((state) => state.home);
    const { loading, error, searchTerm } = home;
    const filteredPosts = useSelector(selectFilteredPosts);
    const dispatch = useDispatch();
    // separating comments
    const extractedComments = filteredPosts.map(post => post.comments);

    useEffect(() => {
        dispatch(fetchHomePosts());
    }, [dispatch]);

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
    };

    if (error) {
        return (
            <div className="error">
                <h2>Failed to load posts.</h2>
                <button type="button" onClick={() => {
                    const menu3 = ['/r/marvel/', '/r/starwars/']
                    const randomSubreddit = menu3[Math.floor(Math.random() * menu3.length)];
                    dispatch(fetchPosts(randomSubreddit)
                    )
                }}>
                    Try again
                </button>
            </div>
        );
    };

    if (filteredPosts.length === 0 && searchTerm !== '') {
        return (
            <div className="error">
                <h2>No posts matching "{searchTerm}"</h2>
                <button type="button" onClick={() => dispatch(setSearchTerm(''))}>
                    Go home
                </button>
            </div>
        );
    } else if (filteredPosts.length > 0) {
        return (
            <QuiltedImageList handleSelectedPost={handleSelectedPost} posts={filteredPosts} comments={extractedComments} />
        );
    } else {
        return (
            <div>
                <h2>Select a subreddit or load posts from /r/nibbio</h2>
                <button type="button" onClick={() => dispatch(fetchPosts('/r/nibbio'))}>
                    Fetch Posts
                </button>
            </div>
        );
    };
};

export default Home;

// export default React.memo(Home, (prevProps, nextProps) => {
//     // only update if the posts prop has changed
//     return prevProps.posts !== nextProps.posts;
// });

