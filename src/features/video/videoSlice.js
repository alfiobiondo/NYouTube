import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import request from '../../api';

export const getPopularVideos = createAsyncThunk(
	'video/getVideos',
	async (_, { rejectWithValue }) => {
		try {
			const response = await request.get('/videos', {
				params: {
					part: 'snippet, contentDetails, statistics',
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

const videoSlice = createSlice({
	name: 'video',
	initialState: {
		videos: [],
		isLoading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getPopularVideos.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getPopularVideos.fulfilled, (state, action) => {
				state.isLoading = false;
				state.videos = action.payload;
			})
			.addCase(getPopularVideos.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export default videoSlice.reducer;
