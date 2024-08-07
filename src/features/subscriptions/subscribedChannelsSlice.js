import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import request from '../../api';

export const getSubscribedChannels = createAsyncThunk(
	'subscribedChannels/getSubscribedChannels',
	async (_, { rejectWithValue, getState }) => {
		try {
			const response = await request.get('/subscriptions', {
				params: {
					part: 'snippet,contentDetails',
					mine: true,
					maxResults: 20,
					pageToken: getState().subscriptionsChannel.nextPageToken,
				},
				headers: {
					Authorization: `Bearer ${getState().auth.accessToken}`,
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

const subscriptionsChannelsSlice = createSlice({
	name: 'subscribedChannels',
	initialState: {
		videos: [],
		nextPageToken: null,
		isLoading: false,
		error: null,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getSubscribedChannels.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getSubscribedChannels.fulfilled, (state, action) => {
				state.isLoading = false;
				state.videos = [...state.videos, ...action.payload.items];
				state.nextPageToken = action.payload.nextPageToken;
			})
			.addCase(getSubscribedChannels.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export default subscriptionsChannelsSlice.reducer;
