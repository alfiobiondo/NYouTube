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
				},
				headers: {
					Authorization: `Bearer ${getState().auth.accessToken}`,
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

const subscriptionsChannelsSlice = createSlice({
	name: 'subscribedChannels',
	initialState: {
		videos: [],
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
				state.videos = action.payload;
			})
			.addCase(getSubscribedChannels.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export default subscriptionsChannelsSlice.reducer;
