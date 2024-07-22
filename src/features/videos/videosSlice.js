import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import request from '../../api';

export const getPopularVideos = createAsyncThunk(
	'video/getVideos',
	async (_, { rejectWithValue }) => {
		try {
			const response = await request.get('/videos', {
				params: {
					part: 'snippet,contentDetails,statistics',
					chart: 'mostPopular',
					regionCode: 'IT',
					maxResults: 20,
					pageToken: '',
				},
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const getVideosByCategory = createAsyncThunk(
	'video/getVideoByCategory',
	async (keyword, { rejectWithValue, getState }) => {
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
			console.log(response.data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const getVideosById = createAsyncThunk(
	'video/getVideoById',
	async (id, { rejectWithValue }) => {
		try {
			const response = await request.get('/videos', {
				params: {
					part: 'snippet,statistics',
					id: id,
				},
			});
			console.log(response.data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const videosSlice = createSlice({
	name: 'videos',
	initialState: {
		videos: [],
		nextPageToken: null,
		category: 'All',
		isLoading: false,
		error: null,
	},
	reducers: {
		setCategory: (state, action) => {
			state.category = action.payload;
			state.nextPageToken = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getPopularVideos.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getPopularVideos.fulfilled, (state, action) => {
				state.isLoading = false;
				state.videos = action.payload.items;
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
				state.videos = action.payload.items;
				state.nextPageToken = action.payload.nextPageToken;
			})
			.addCase(getVideosByCategory.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(getVideosById.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getVideosById.fulfilled, (state, action) => {
				state.isLoading = false;
				state.videos = action.payload.items;
			})
			.addCase(getVideosById.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { setCategory } = videosSlice.actions;

export default videosSlice.reducer;
