
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage for web

// Import slices
import authReducer from './slices/authSlice';
import settingsReducer from './slices/settingsSlice';
import chatReducer from './slices/chatSlice';
import transitionReducer from './slices/transitionSlice';
import monitoringReducer from './slices/monitoringSlice';
import selfManagementReducer from './slices/selfManagementSlice';

// Configure persist
const persistConfig = {
  key: 'focalyze-root',
  storage,
  whitelist: ['auth', 'settings'], // Only persist these reducers
};

const rootReducer = combineReducers({
  auth: authReducer,
  settings: settingsReducer,
  chat: chatReducer,
  transition: transitionReducer,
  monitoring: monitoringReducer,
  selfManagement: selfManagementReducer,
  // Add other reducers as needed
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore non-serializable values in these reducers
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default { store, persistor };
