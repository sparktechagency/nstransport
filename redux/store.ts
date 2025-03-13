import {api} from './api/baseApi';
import {configureStore} from '@reduxjs/toolkit';
import extraReducer from './slices/extraSlices';
import tokenReducer from './slices/tokenSlice';
import userReducer from './slices/userSlices';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    token: tokenReducer,
    extra: extraReducer,
    user: userReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
