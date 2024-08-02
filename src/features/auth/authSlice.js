import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { auth, googleProvider } from '../../firebase';
import { signInWithPopup, signOut } from 'firebase/auth';

import { REHYDRATE } from 'redux-persist/es/constants';

// Async thunk for Google login
export const googleLogin = createAsyncThunk(
	'auth/googleLogin',
	async (_, { rejectWithValue }) => {
		try {
			googleProvider.setCustomParameters({ prompt: 'select_account' });

			const result = await signInWithPopup(auth, googleProvider);
			console.log(result);
			console.log(result.user);
			const { displayName, photoURL } = result.user;
			const accessToken = result._tokenResponse.oauthAccessToken;
			return {
				displayName,
				photoURL,
				accessToken,
			};
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
		accessToken: null,
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
				state.user = {
					name: action.payload.displayName,
					photoURL: action.payload.photoURL,
				};
				state.accessToken = action.payload.accessToken;
			})
			.addCase(googleLogin.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(logout.fulfilled, (state) => {
				state.status = 'succeeded';
				state.user = null;
				state.accessToken = null;
			})
			.addCase(logout.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(REHYDRATE, (state, action) => {
				if (action.payload && action.payload.auth) {
					state.user = action.payload.auth.user;
					state.accessToken = action.payload.auth.accessToken;
					state.status = 'idle';
					state.error = null;
				}
			});
	},
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
