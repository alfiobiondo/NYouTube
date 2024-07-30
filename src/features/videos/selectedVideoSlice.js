// features/videos/selectedVideoSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../api';

export const getVideosById = createAsyncThunk(
	'selectedVideo/getVideoById',
	async (id, { rejectWithValue }) => {
		try {
			const response = await request.get('/videos', {
				params: {
					part: 'snippet,statistics',
					id: id,
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

const selectedVideoSlice = createSlice({
	name: 'selectedVideo',
	initialState: {
		video: null,
		isLoading: false,
		error: null,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getVideosById.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getVideosById.fulfilled, (state, action) => {
				state.isLoading = false;
				state.video = action.payload.data.items[0];
			})
			.addCase(getVideosById.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
				state.video = null;
			});
	},
});

export default selectedVideoSlice.reducer;
