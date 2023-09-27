import { createSlice, createSelector } from '@reduxjs/toolkit';
import { getSubredditPosts } from '../../api/reddit';

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        posts: [],
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
        getCommentsPending: (state) => {
            state.loading = true;
            state.error = null;
        },
        getCommentsSuccess: (state, action) => {
            state.comments = action.payload;
            state.loading = false;
            state.error = null;
        },
        getCommentsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        upVotePostPending: (state) => {
            state.loading = true;
            state.error = null;
        },
        upVotePostSuccess: (state) => {
            state.loading = false;
            state.error = null;
        },
        upVotePostFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const {
    setPosts,
    setSearchTerm,
    setSelectedSubreddit,
    fetchPostsPending,
    fetchPostsSuccess,
    fetchPostsFailure,
    getCommentsPending,
    getCommentsSuccess,
    getCommentsFailure,
    upVotePostPending,
    upVotePostSuccess,
    upVotePostFailure
} = homeSlice.actions;

export default homeSlice.reducer;

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
