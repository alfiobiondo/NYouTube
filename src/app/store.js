import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';

import authReducer, { logout } from '../features/auth/authSlice';
import videosReducer from '../features/videos/videosSlice';

const persistConfig = {
	key: 'root',
	storage: sessionStorage,
	whitelist: ['auth', 'videos'],
};

const rootReducer = combineReducers({
	auth: authReducer,
	homeVideos: videosReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
				ignoredPaths: ['auth', 'videos'],
			},
		}).concat((store) => (next) => (action) => {
			if (action.type === logout.fulfilled.type) {
				persistStore(store).purge(); // Clear session storage on logout
			}
			return next(action);
		}),
});

const persistor = persistStore(store);

export { store, persistor };
