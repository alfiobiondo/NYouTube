import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../api';

export const getChannelDetails = createAsyncThunk(
	'channels/getChannelDetails',
	async (id, { rejectWithValue }) => {
		try {
			const response = await request.get('/channels', {
				params: {
					part: 'snippet, statistics, contentDetails',
					id,
				},
			});
			return response.data.items[0];
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const checkSubscriptionStatus = createAsyncThunk(
	'channels/checkSubscriptionStatus',
	async (id, { rejectWithValue, getState }) => {
		const accessToken = getState().auth.accessToken;
		if (!accessToken) {
			return rejectWithValue('No access token available');
		}

		try {
			const response = await request.get('/subscriptions', {
				params: {
					part: 'snippet',
					forChannelId: id,
					mine: true,
				},
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			// If subscription exists, return the subscription ID
			return response.data.items.length !== 0
				? response.data.items[0].id
				: null;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const subscribeToChannel = createAsyncThunk(
	'channels/subscribeToChannel',
	async (channelId, { rejectWithValue, getState }) => {
		const accessToken = getState().auth.accessToken;
		if (!accessToken) {
			return rejectWithValue('No access token available');
		}

		const body = {
			snippet: {
				resourceId: {
					kind: 'youtube#channel',
					channelId: channelId,
				},
			},
		};
		try {
			await request.post('/subscriptions?part=snippet', body, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			console.log('Subscribed to channel');
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const unsubscribeFromChannel = createAsyncThunk(
	'channels/unsubscribeFromChannel',
	async (subscriptionId, { rejectWithValue, getState }) => {
		const accessToken = getState().auth.accessToken;
		if (!accessToken) {
			return rejectWithValue('No access token available');
		}

		try {
			await request.delete(`/subscriptions?id=${subscriptionId}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const channelsSlice = createSlice({
	name: 'channels',
	initialState: {
		isLoading: true,
		channel: {},
		subscriptionStatus: false,
		subscriptionId: null, // Store subscription ID here
		error: null,
	},
	reducers: {
		setSubscriptionStatus: (state, action) => {
			state.subscriptionStatus = action.payload.status;
			state.subscriptionId = action.payload.subscriptionId;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getChannelDetails.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getChannelDetails.fulfilled, (state, action) => {
				state.isLoading = false;
				state.channel = action.payload;
			})
			.addCase(getChannelDetails.rejected, (state, action) => {
				state.isLoading = false;
				state.channel = null;
				state.error = action.payload;
			})
			.addCase(checkSubscriptionStatus.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(checkSubscriptionStatus.fulfilled, (state, action) => {
				state.isLoading = false;
				state.subscriptionStatus = action.payload !== null;
				state.subscriptionId = action.payload; // Store subscription ID
			})
			.addCase(checkSubscriptionStatus.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(subscribeToChannel.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(subscribeToChannel.fulfilled, (state) => {
				state.isLoading = false;
				state.subscriptionStatus = true;
			})
			.addCase(subscribeToChannel.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(unsubscribeFromChannel.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(unsubscribeFromChannel.fulfilled, (state) => {
				state.isLoading = false;
				state.subscriptionStatus = false;
				state.subscriptionId = null; // Clear subscription ID after unsubscribing
			})
			.addCase(unsubscribeFromChannel.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { setSubscriptionStatus } = channelsSlice.actions;

export default channelsSlice.reducer;
