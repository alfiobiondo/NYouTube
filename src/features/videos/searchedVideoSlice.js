import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../api';

export const getVideosBySearch = createAsyncThunk(
	'searchedVideo/getVideosBySearch',
	async (keyword, { rejectWithValue }) => {
		try {
			const response = await request.get('/search', {
				params: {
					part: 'snippet',
					maxResults: 20,
					q: keyword,
					type: 'video',
				},
			});
			return response.data.items;
		} catch (error) {
			console.error(
				'API Error:',
				error.response ? error.response.data : error.message
			);
			return rejectWithValue(error.message);
		}
	}
);

const searchedVideoSlice = createSlice({
	name: 'searchedVideo',
	initialState: {
		videos: [],
		isLoading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getVideosBySearch.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getVideosBySearch.fulfilled, (state, action) => {
				state.videos = action.payload;
				state.isLoading = false;
			})
			.addCase(getVideosBySearch.rejected, (state, action) => {
				state.error = action.payload;
				state.isLoading = false;
			});
	},
});

export default searchedVideoSlice.reducer;
