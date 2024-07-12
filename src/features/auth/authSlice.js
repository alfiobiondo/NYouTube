import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth, googleProvider } from '../../firebase';
import { signInWithPopup, signOut } from 'firebase/auth';

// Async thunk for Google login
export const googleLogin = createAsyncThunk(
	'auth/googleLogin',
	async (_, { rejectWithValue }) => {
		try {
			const result = await signInWithPopup(auth, googleProvider);
			return result.user;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

// Async thunk for logout
export const logout = createAsyncThunk(
	'auth/logout',
	async (_, { rejectWithValue }) => {
		try {
			await signOut(auth);
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: null,
		status: 'idle',
		error: null,
	},
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		clearUser: (state) => {
			state.user = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(googleLogin.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(googleLogin.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.user = action.payload;
			})
			.addCase(googleLogin.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(logout.fulfilled, (state) => {
				state.status = 'succeeded';
				state.user = null;
			})
			.addCase(logout.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			});
	},
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
