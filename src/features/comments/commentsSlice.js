import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../api';

// Fetch comments by video ID
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
			console.error('Error fetching comments:', error);
			return rejectWithValue(error.message);
		}
	}
);

// Add a comment to a video
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

			const token = getState().auth.accessToken;
			if (!token) {
				throw new Error('No access token found');
			}

			const response = await request.post('/commentThreads', obj, {
				params: {
					part: 'snippet',
				},
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			// Delay to allow the new comment to propagate
			setTimeout(() => dispatch(getCommentsOfVideoById(id)), 5000);
			return response.data;
		} catch (error) {
			console.error('Error adding comment:', error);
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
			})
			.addCase(addComment.pending, (state) => {
				state.isLoadingComments = true;
			})
			.addCase(addComment.fulfilled, (state, action) => {
				state.isLoadingComments = false;
			})
			.addCase(addComment.rejected, (state, action) => {
				state.isLoadingComments = false;
				state.error = action.payload;
			});
	},
});

export default commentsSlice.reducer;
