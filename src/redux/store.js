// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import profileReducer from './slices/profileSlice';

// Configure persistence
const persistConfig = {
  key: 'root',
  storage,
};

// Wrap the profile reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, profileReducer);

const store = configureStore({
  reducer: {
    profile: persistedReducer,
  },
});

export const persistor = persistStore(store);
export default store;
