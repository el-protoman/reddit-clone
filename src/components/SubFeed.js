import React, { useEffect } from 'react';
import ContentCard from './Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, selectFilteredPosts, setSearchTerm } from '../features/feed/homeSlice';
import PostLoading from '../features/post/PostLoading';

const SubFeed = () => {
    const home = useSelector((state) => state.home);
    const { loading, error, searchTerm, selectedSubreddit } = home;
    const posts = useSelector(selectFilteredPosts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts(selectedSubreddit));
    }, [selectedSubreddit]);

    if (loading) {
        // Generate an array of PostLoading components with unique keys
        const postLoadingComponents = Array(Math.floor(Math.random() * (5 - 3 + 1)) + 3)
            .fill(null)
            .map((_, index) => <PostLoading key={index} />);

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
        <div style={{ display: 'grid', gridTemplateRows: 'repeat(4, 1fr)', gridTemplateColumns: '1fr', gap: '10px' }}>
            {posts && Array.isArray(posts) ? (
                posts.map((post) => (
                    <ContentCard key={post.id} post={post} />
                )))
                : (<PostLoading />
                )}
        </div>
    );
}

export default SubFeed;
