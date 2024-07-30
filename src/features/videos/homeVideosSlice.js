// features/videos/homeVideosSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../api';

export const getPopularVideos = createAsyncThunk(
	'homeVideos/getPopularVideos',
	async (_, { rejectWithValue, getState }) => {
		console.log('Fetching popular videos');
		try {
			const response = await request.get('/videos', {
				params: {
					part: 'snippet,contentDetails,statistics',
					chart: 'mostPopular',
					regionCode: 'IT',
					maxResults: 20,
					pageToken: getState().homeVideos.nextPageToken,
				},
			});
			return response.data;
		} catch (error) {
			console.error(
				'API Error:',
				error.response ? error.response.data : error.message
			);
			return rejectWithValue(error.message);
		}
	}
);

export const getVideosByCategory = createAsyncThunk(
	'homeVideos/getVideosByCategory',
	async (keyword, { rejectWithValue, getState }) => {
		console.log('Fetching videos by category');
		try {
			const response = await request.get('/search', {
				params: {
					part: 'snippet',
					maxResults: 20,
					pageToken: getState().homeVideos.nextPageToken,
					q: keyword,
					type: 'video',
				},
			});
			return { data: response.data, keyword };
		} catch (error) {
			console.error(
				'API Error:',
				error.response ? error.response.data : error.message
			);
			return rejectWithValue(error.message);
		}
	}
);

const homeVideosSlice = createSlice({
	name: 'homeVideos',
	initialState: {
		videos: [],
		nextPageToken: null,
		activeCategory: 'All',
		isLoading: false,
		error: null,
	},
	reducers: {
		setCategory: (state, action) => {
			state.activeCategory = action.payload;
			state.nextPageToken = null;
			state.videos = [];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getPopularVideos.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getPopularVideos.fulfilled, (state, action) => {
				state.isLoading = false;
				state.videos = [...state.videos, ...action.payload.items];
				state.nextPageToken = action.payload.nextPageToken;
			})
			.addCase(getPopularVideos.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(getVideosByCategory.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getVideosByCategory.fulfilled, (state, action) => {
				state.isLoading = false;
				state.videos = [...state.videos, ...action.payload.data.items];
				state.nextPageToken = action.payload.data.nextPageToken;
			})
			.addCase(getVideosByCategory.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { setCategory } = homeVideosSlice.actions;

export default homeVideosSlice.reducer;
