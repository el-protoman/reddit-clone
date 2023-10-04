import { configureStore, combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import homeReducer from '../features/feed/homeSlice';
import postReducer from '../features/post/postSlice';

export const store = configureStore({
  reducer: combineReducers({
    counter: counterReducer,
    home: homeReducer,
    post: postReducer
  }),
});

export const setupStore = preloadedState => {
  return configureStore({
    reducer: combineReducers({
      counter: counterReducer,
      home: homeReducer,
      post: postReducer
    }), preloadedState
  })
}
