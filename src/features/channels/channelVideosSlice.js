import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import request from '../../api';

export const getVideosByChannel = createAsyncThunk(
	'channelVideos/getVideosByChannel',
	async (id, { rejectWithValue }) => {
		try {
			const uploadPlaylistIdResponse = await request.get('/channels', {
				params: {
					part: 'contentDetails',
					id: id,
				},
			});

			const uploadPlaylistId =
				uploadPlaylistIdResponse.data.items[0].contentDetails.relatedPlaylists
					.uploads;

			const getVideosByIdResponse = await request.get('/playlistItems', {
				params: {
					part: 'snippet,contentDetails',
					playlistId: uploadPlaylistId,
					maxResults: 30,
				},
			});

			return getVideosByIdResponse.data.items;
		} catch (error) {
			console.error(
				'API Error:',
				error.response ? error.response.data : error.message
			);
			return rejectWithValue(error.message);
		}
	}
);

const channelVideosSlice = createSlice({
	name: 'channelVideos',
	initialState: {
		videos: [],
		isLoading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getVideosByChannel.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getVideosByChannel.fulfilled, (state, action) => {
				state.isLoading = false;
				state.videos = action.payload;
			})
			.addCase(getVideosByChannel.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export default channelVideosSlice.reducer;
