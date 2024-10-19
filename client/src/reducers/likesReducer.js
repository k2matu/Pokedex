import { createSlice } from '@reduxjs/toolkit';
import likesService from '../services/likes';

const initialState = [];

const likesSlice = createSlice({
	name: 'likes',
	initialState,
	reducers: {
		setLikes: (state, action) => {
			return action.payload;
		},
		appendLikes: (state, action) => {
			state.push(action.payload);
		}
	}
});

export const { setLikes, appendLikes } = likesSlice.actions;

export const initializeLikes = (name) => {
	return async (dispatch) => {
		try {
			const pokemons = await likesService.getOne(name);
			console.log(pokemons);
			dispatch(setLikes(pokemons));
		} catch (err) {
			console.log("Error fetching pokemons:", err);
		}
	};
};

export default likesSlice.reducer;