import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../api';

export const getPopularVideos = createAsyncThunk(
	'video/getVideos',
	async (_, { rejectWithValue, getState }) => {
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

const videosSlice = createSlice({
	name: 'videos',
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
				if (state.activeCategory === action.payload.keyword) {
					state.videos = [...state.videos, ...action.payload.data.items];
					state.nextPageToken = action.payload.data.nextPageToken;
				} else {
					state.videos = action.payload.data.items;
					state.nextPageToken = action.payload.data.nextPageToken;
				}
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
