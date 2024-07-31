import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../api';

export const getRelatedVideos = createAsyncThunk(
	'relatedVideos/getRelatedVideos',
	async (id, { rejectWithValue }) => {
		try {
			const response = await request.get('/search', {
				params: {
					part: 'snippet',
					relatedToVideo: id,
					maxResults: 15,
					type: 'video',
				},
			});
			return { data: response.data, id };
		} catch (error) {
			console.error(
				'API Error:',
				error.response ? error.response.data : error.message
			);
			return rejectWithValue(error.message);
		}
	}
);

const relatedVideosSlice = createSlice({
	name: 'relatedVideos',
	initialState: {
		videos: [], // Ensure videos is an array initially
		isLoading: false,
		error: null,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getRelatedVideos.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getRelatedVideos.fulfilled, (state, action) => {
				state.isLoading = false;
				state.videos = action.payload.data.items;
			})
			.addCase(getRelatedVideos.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export default relatedVideosSlice.reducer;
