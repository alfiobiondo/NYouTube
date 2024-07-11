import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
	name: 'Alfio',
	age: '33',
};

const author = createSlice({
	name: 'author',
	initialState,
});

export default configureStore({
	reducer: {
		author: author.reducer,
	},
});
