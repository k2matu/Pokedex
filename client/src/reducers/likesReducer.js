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
		},
		removeLikes: (state, action) => {
			return state.filter(pokemon => pokemon.name !== action.payload);
		}
	}
});

export const { setLikes, appendLikes, removeLikes } = likesSlice.actions;

export const initializeLikes = (name) => {
	return async (dispatch) => {
		try {
			const pokemons = await likesService.getOne(name);
			dispatch(setLikes(pokemons));
		} catch (err) {
			dispatch(setLikes([]));
			console.log("Error fetching pokemons:", err);
		}
	};
};

export const handleLike = (pokemon) => {
	return async (dispatch, getState) => {
		const loginUser = JSON.parse(window.localStorage.getItem('user'));
		try {
			await likesService.likeOrUnlike({
				pokemonName: pokemon.name,
				index: pokemon.index
			}, loginUser.token);
			const exist = getState().likes.some(liked => liked.name === pokemon.name);
				if (exist) {
					dispatch(removeLikes(pokemon.name));
				} else {
					dispatch(appendLikes(pokemon));
				}
			} catch (err) {
			console.error("Error while liking the Pokémon:", err);
		}
	};
};

export default likesSlice.reducer;