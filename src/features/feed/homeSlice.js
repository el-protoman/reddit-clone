import { createSlice, createSelector } from '@reduxjs/toolkit';
import { getSubredditPosts, getSubreddits, getAllPosts } from '../../api/reddit';

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        posts: [],
        subreddits: [],
        loading: false,
        error: false,
        searchTerm: '',
        selectedSubreddit: '/r/nibbio/',
    },
    reducers: {
        setPosts(state, action) {
            state.posts = action.payload;
        },
        setSearchTerm(state, action) {
            state.searchTerm = action.payload;
        },
        setSelectedSubreddit(state, action) {
            state.selectedSubreddit = action.payload;
            state.searchTerm = '';
        },
        fetchPostsPending: (state) => {
            state.loading = true;
            state.error = false;
        },
        fetchPostsSuccess: (state, action) => {
            state.posts = action.payload;
            state.loading = false;
            state.error = false;
        },
        fetchPostsFailure: (state, action) => {
            state.loading = false;
            state.error = true;
        },
        getSubredditsPending(state) {
            state.loading = true;
            state.error = false;
        },
        getSubredditsSuccess(state, action) {
            state.loading = false;
            state.subreddits = action.payload;
        },
        getSubredditsFailure(state) {
            state.loading = false;
            state.error = true;
        },
        updatePostInHome: (state, action) => {
            const updatedPost = action.payload;
            // Update Immutably
            state.posts = state.posts.map((post) => {
                if (post.id === updatedPost.id) {
                    return updatedPost;
                }
                return post;
            });
        },
    }
});

export const {
    setPosts,
    setSearchTerm,
    setSelectedSubreddit,
    fetchPostsPending,
    fetchPostsSuccess,
    fetchPostsFailure,
    getSubredditsPending,
    getSubredditsSuccess,
    getSubredditsFailure,
    updatePostInHome
} = homeSlice.actions;

export default homeSlice.reducer;

// Redux Thunk that gets posts from a subreddit
export const fetchPosts = (subreddit) => async (dispatch) => {
    try {
        dispatch(fetchPostsPending());
        const posts = await getSubredditPosts(subreddit);
        console.log('this is the posts array: ', posts)
        const postsWithMetadata = posts.map((post) => ({
            ...post,
            showingComments: false,
            comments: [],
            loadingComments: false,
            errorComments: false,
        }))
        dispatch(fetchPostsSuccess(postsWithMetadata));
    } catch (error) {
        dispatch(fetchPostsFailure());
    }
}

// Redux Thunk that gets posts from array of specified subreddits
export const fetchHomePosts = () => async (dispatch) => {
    try {
        // testing failure
        // dispatch(fetchPostsFailure())

        dispatch(getSubredditsPending());
        const subreddits = await getSubreddits();
        // console.log('subreddits:', subreddits)
        dispatch(getSubredditsSuccess(subreddits));
        dispatch(fetchPostsPending());
        const posts = await getAllPosts(subreddits);
        // console.log('fetch home posts', posts)
        const postsWithMetadata = posts.map((post) => ({
            ...post,
            showingComments: false,
            comments: [],
            loadingComments: false,
            errorComments: false,
        }))
        dispatch(fetchPostsSuccess(postsWithMetadata));
    } catch (error) {
        console.log('redux thunk fetch all posts error: ', error)
        dispatch(getSubredditsFailure());
        dispatch(fetchPostsFailure());
    }
}

// slice is called home
const selectPosts = (state) => state.home.posts;
const selectSearchTerm = (state) => state.home.searchTerm;
export const selectSelectedSubreddit = (state) => state.home.selectedSubreddit;
export const selectFilteredPosts = createSelector(
    [selectPosts, selectSearchTerm],
    (posts, searchTerm) => {
        if (searchTerm !== '') {
            return posts.filter((post) =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return posts;
    }
);
