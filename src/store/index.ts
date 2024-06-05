import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import recordReducer from './recordSlice';
import folderReducer from './folderSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        records: recordReducer,
        folders: folderReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
