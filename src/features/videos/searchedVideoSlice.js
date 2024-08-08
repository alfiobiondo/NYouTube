import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../api';

export const getVideosBySearch = createAsyncThunk(
	'searchedVideo/getVideosBySearch',
	async (keyword, { rejectWithValue, getState }) => {
		try {
			const response = await request.get('/search', {
				params: {
					part: 'snippet',
					maxResults: 20,
					pageToken: getState().searchedVideos.nextPageToken,
					q: keyword,
					type: 'video',
				},
			});
			console.log(keyword);
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

const searchedVideoSlice = createSlice({
	name: 'searchedVideo',
	initialState: {
		videos: [],
		isLoading: false,
		keyword: null,
		error: null,
	},
	reducers: {
		resetVideos: (state, action) => {
			state.videos = [];
			state.nextPageToken = null;
			state.keyword = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getVideosBySearch.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getVideosBySearch.fulfilled, (state, action) => {
				state.videos = [...state.videos, ...action.payload.data.items];
				state.nextPageToken = action.payload.data.nextPageToken;
				state.keyword = action.payload.keyword;
				state.isLoading = false;
			})
			.addCase(getVideosBySearch.rejected, (state, action) => {
				state.error = action.payload;
				state.isLoading = false;
			});
	},
});

export const { resetVideos } = searchedVideoSlice.actions;

export default searchedVideoSlice.reducer;
