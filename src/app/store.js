import { configureStore, combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import homeReducer from '../features/feed/homeSlice'

export const store = configureStore({
  reducer: combineReducers({
    counter: counterReducer,
    home: homeReducer,
  }),
});
