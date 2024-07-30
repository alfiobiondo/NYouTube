import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import request from '../../api';

export const getCommentsOfVideoById = createAsyncThunk(
	'comments/getCommentsOfVideoById',
	async (id, { rejectWithValue }) => {
		try {
			const response = await request.get('/commentThreads', {
				params: {
					part: 'snippet',
					videoId: id,
				},
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const addComment = createAsyncThunk(
	'comments/addComment',
	async ({ id, text }, { rejectWithValue, getState, dispatch }) => {
		try {
			const obj = {
				snippet: {
					videoId: id,
					topLevelComment: {
						snippet: {
							textOriginal: text,
						},
					},
				},
			};

			const response = await request.post('/commentThreads', obj, {
				params: {
					part: 'snippet',
				},
				headers: {
					Authorization: `Bearer ${getState().auth.accessToken}`,
				},
			});
			setTimeout(() => dispatch(getCommentsOfVideoById(id)), 3000);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const commentsSlice = createSlice({
	name: 'comments',
	initialState: {
		comments: null,
		isLoadingComments: true,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getCommentsOfVideoById.pending, (state) => {
				state.isLoadingComments = true;
			})
			.addCase(getCommentsOfVideoById.fulfilled, (state, action) => {
				state.isLoadingComments = false;
				state.comments = action.payload.items;
			})
			.addCase(getCommentsOfVideoById.rejected, (state, action) => {
				state.isLoadingComments = false;
				state.error = action.payload;
			});
	},
});

export default commentsSlice.reducer;
