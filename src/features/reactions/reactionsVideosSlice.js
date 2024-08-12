import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import request from '../../api';

export const getLikedVideos = createAsyncThunk(
	'reactionsVideos/getLikedVideos',
	async (_, { rejectWithValue, getState }) => {
		try {
			const response = await request.get('/videos', {
				params: {
					part: 'snippet',
					myRating: 'like',
					maxResults: 20,
					pageToken: getState().reactionsVideos.nextPageToken,
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

export const likeVideo = createAsyncThunk(
	'reactionsVideos/likeVideo',
	async (id, { rejectWithValue, getState }) => {
		try {
			const response = await request.post(
				`/videos/rate?id=${id}&rating=like`,
				null,
				{
					headers: {
						Authorization: `Bearer ${getState().auth.accessToken}`, // Use accessToken for authorization
					},
				}
			);
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

export const dislikeVideo = createAsyncThunk(
	'reactionsVideos/dislikeVideo',
	async (id, { rejectWithValue, getState }) => {
		try {
			const response = await request.post(
				`/videos/rate?id=${id}&rating=dislike`,
				null,
				{
					headers: {
						Authorization: `Bearer ${getState().auth.accessToken}`, // Use accessToken for authorization
					},
				}
			);
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

export const removeRate = createAsyncThunk(
	'reactionsVideos/removeRate',
	async (id, { rejectWithValue, getState }) => {
		try {
			const response = await request.post(
				`/videos/rate?id=${id}&rating=none`,
				null,
				{
					headers: {
						Authorization: `Bearer ${getState().auth.accessToken}`, // Use accessToken for authorization
					},
				}
			);
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

const reactionsVideosSlice = createSlice({
	name: 'reactionsVideos',
	initialState: {
		videos: [],
		nextPageToken: null,
		isLoading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getLikedVideos.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getLikedVideos.fulfilled, (state, action) => {
				state.videos = [...state.videos, ...action.payload];
				state.nextPageToken = action.payload.nextPageToken;
				state.isLoading = false;
			})
			.addCase(getLikedVideos.rejected, (state, action) => {
				state.error = action.payload;
				state.isLoading = false;
			});
	},
});

export default reactionsVideosSlice.reducer;
