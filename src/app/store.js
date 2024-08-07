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
import homeVideosReducer from '../features/videos/homeVideosSlice';
import selectedVideoReducer from '../features/videos/selectedVideoSlice';
import relatedVideosReducer from '../features/videos/relatedVideosSlice';
import channelReducer from '../features/channels/channelsSlice';
import commentsReducer from '../features/comments/commentsSlice';
import searchedVideosReducer from '../features/videos/searchedVideoSlice';
import subscriptionsChannelReducer from '../features/subscriptions/subscribedChannelsSlice';
import channelVideosReducer from '../features/channels/channelVideosSlice';

const persistConfig = {
	key: 'root',
	storage: sessionStorage,
	whitelist: [
		'auth',
		'homeVideos',
		'selectedVideo',
		'relatedVideos',
		'channelDetails',
		'commentList',
		'searchedVideos',
		'subscriptionsChannel',
		'channelVideos',
	],
};

const rootReducer = combineReducers({
	auth: authReducer,
	homeVideos: homeVideosReducer,
	selectedVideo: selectedVideoReducer,
	relatedVideos: relatedVideosReducer,
	channelDetails: channelReducer,
	commentList: commentsReducer,
	searchedVideos: searchedVideosReducer,
	subscriptionsChannel: subscriptionsChannelReducer,
	channelVideos: channelVideosReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
				ignoredPaths: [
					'auth',
					'homeVideos',
					'selectedVideo',
					'relatedVideos',
					'channelDetails',
					'commentList',
					'searchedVideos',
					'subscriptionsChannel',
					'channelVideos',
				],
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
