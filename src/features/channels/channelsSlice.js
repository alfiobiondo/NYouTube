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
		const { accessToken } = getState().auth;
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
			return response.data.items.length !== 0;
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
		error: null,
	},
	reducers: {
		setSubscriptionStatus: (state, action) => {
			state.subscriptionStatus = action.payload;
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
				state.subscriptionStatus = action.payload;
			})
			.addCase(checkSubscriptionStatus.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { setSubscriptionStatus } = channelsSlice.actions;

export default channelsSlice.reducer;
