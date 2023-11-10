import { createSelector, createSlice } from '@reduxjs/toolkit';
import { updatePostInHome } from '../feed/homeSlice';
import { getPostComments } from '../../api/reddit';


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
        getPostPending: (state, action) => {
            state.loading = true;
            state.post = action.payload;
            state.error = false;
        },
        getPostSuccess: (state, action) => {
            state.loading = false;
            state.post = action.payload;
            state.error = false;
            // cannot use dispatch in reducer as it is a pure function, use in async thunk instead
            // dispatch(updatePostInHome(action.payload));
        },
        getPostError: (state, action) => {
            state.loading = false;
            state.error = [...state.error, action.payload.error];
        },
        getCommentsPending: (state) => {
            state.loading = true;
            state.error = false;
            state.post.loadingComments = true;
        },
        getCommentsSuccess: (state, action) => {
            state.loading = false;
            state.comments = action.payload;
            state.post.comments = state.comments;
            state.post.loadingComments = false;
            state.error = false;
        },
        getCommentsError: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // TODO : UPDATE VOTES ACTIONS
        upVotePostPending: (state) => {
            state.loading = true;
            state.error = false;
        },
        upVotePostSuccess: (state) => {
            state.loading = false;
            state.post.ups += 1;
            state.error = false;
            // Update the post in the home state
            updatePostInHome(state.post);
        },
        upVotePostError: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
    },
});

export const {
    getPostPending,
    getPostSuccess,
    getPostError,
    getCommentsPending,
    getCommentsSuccess,
    getCommentsError,
    upVotePostPending,
    upVotePostSuccess,
    upVotePostError,
} = postSlice.actions;

export default postSlice.reducer;

export const getComments = (postId) => async (dispatch, getState) => {
    try {
        const post = postId
        const permalink = postId.permalink

        dispatch(getPostPending(post));
        dispatch(getCommentsPending());
        dispatch(updatePostInHome(getState().post.post))

        const comments = await getPostComments(permalink);
        console.log('comments returned', comments)
        dispatch(getPostSuccess(post));
        dispatch(getCommentsSuccess(comments));
        dispatch(updatePostInHome(getState().post.post))
    } catch (error) {
        dispatch(getCommentsError(error.message));
        dispatch(getPostError(error.message));
    }
};

// TODO: update this
export const upVotePost = () => {
    return async (dispatch) => {
        dispatch(upVotePostPending());
        try {
            dispatch(upVotePostSuccess());
        } catch (error) {
            dispatch(upVotePostError(error.message));
        }
    };
};

// Selectors
const selectComments = (state) => state.post.comments;
export const selectPostComments = createSelector(selectComments)
