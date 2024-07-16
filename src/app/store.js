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

const persistConfig = {
	key: 'root',
	storage: sessionStorage,
	whitelist: ['auth'],
};

const rootReducer = combineReducers({
	auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
				ignoredPaths: ['auth.user'],
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
