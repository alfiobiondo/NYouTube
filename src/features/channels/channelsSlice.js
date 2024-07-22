import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import request from '../../api';

export const getChannelDetails = (id) =>
	createAsyncThunk(
		'channels/getChannelDetails',
		async (channelId, { rejectWithValue }) => {
			try {
				const response = await request.get('/channels', {
					params: {
						part: 'snippet, statistics, contentDetails',
						id,
					},
				});
				return response.data;
			} catch (error) {
				return rejectWithValue(error.message);
			}
		}
	);

export const checkSubscriptionStatus = (id) =>
	createAsyncThunk(
		'channels/checkSubscriptionStatus',
		async (channelId, { rejectWithValue }) => {
			try {
				const response = await request.get('/subscriptions', {
					params: {
						part: 'snippet',
						forChannelId: channelId,
						mine: true,
					},
					headers: {
						Authorization: `Bearer ${sessionStorage.getItem('token')}`,
					},
				});
				return response.data;
			} catch (error) {
				return rejectWithValue(error.message);
			}
		}
	);

const channelsSlice = createSlice({
	name: 'channels',
	initialState: {
		isLoading: false,
		channel: {},
		subscriptionStatus: false,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getChannelDetails.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getChannelDetails.fulfilled, (state, action) => {
				state.isLoading = false;
				state.channel = action.payload.items[0];
			})
			.addCase(getChannelDetails.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(checkSubscriptionStatus.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(checkSubscriptionStatus.fulfilled, (state, action) => {
				state.isLoading = false;
				state.subscriptionStatus = action.payload.items.length > 0;
			})
			.addCase(checkSubscriptionStatus.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export default channelsSlice.reducer;
