import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    post: null,
    comments: [],
    loading: false,
    error: null,
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        fetchPostPending: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchPostSuccess: (state, action) => {
            state.loading = false;
            state.post = action.payload.post;
            state.comments = action.payload.comments;
        },
        fetchPostError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        getCommentsPending: (state) => {
            state.loading = true;
            state.error = null;
        },
        getCommentsSuccess: (state, action) => {
            state.loading = false;
            state.comments = action.payload.comments;
        },
        getCommentsError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        upVotePostPending: (state) => {
            state.loading = true;
            state.error = null;
        },
        upVotePostSuccess: (state, action) => {
            state.loading = false;
            state.post = action.payload.post;
        },
        upVotePostError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchPostPending,
    fetchPostSuccess,
    fetchPostError,
    getCommentsPending,
    getCommentsSuccess,
    getCommentsError,
    upVotePostPending,
    upVotePostSuccess,
    upVotePostError,
} = postSlice.actions;

export default postSlice.reducer;

export const fetchPost = (postId) => {
    return async (dispatch) => {
        dispatch(fetchPostPending());

        try {
            const response = await fetch(`https://www.reddit.com/api/post/${postId}`);
            const data = await response.json();

            dispatch(fetchPostSuccess(data));
        } catch (error) {
            dispatch(fetchPostError(error.message));
        }
    };
};

export const getComments = (postId) => {
    return async (dispatch) => {
        dispatch(getCommentsPending());

        try {
            const response = await fetch(`https://www.reddit.com/api/comments/${postId}`);
            const data = await response.json();

            dispatch(getCommentsSuccess(data));
        } catch (error) {
            dispatch(getCommentsError(error.message));
        }
    };
};

export const upVotePost = (postId) => {
    return async (dispatch) => {
        dispatch(upVotePostPending());

        try {
            const response = await fetch(`https://www.reddit.com/api/upvote/${postId}`, {
                method: 'POST',
            });
            const data = await response.json();

            dispatch(upVotePostSuccess(data));
        } catch (error) {
            dispatch(upVotePostError(error.message));
        }
    };
};
