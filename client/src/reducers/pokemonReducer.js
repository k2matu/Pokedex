import { createSlice } from '@reduxjs/toolkit';
import pokemonService from '../services/pokemon';
import { notif } from './notifReducer';

const initialState = {
	pokemons: [],
	sortType: 'A-Z',
	searchPokemon: '',
	info: [],
	visible: true,
};

const pokemonSlice = createSlice({
	name: 'pokemon',
	initialState,
	reducers: {
		setPokemons: (state, action) => {
			state.pokemons = action.payload;
		},
		setSortType: (state, action) => {
		},
		setSearchPokemon: (state, action) => {
			state.searchPokemon = action.payload;
		},
		appendPokemonInfo: (state, action) => {
			state.info.push(action.payload);
		},
		setVisible: (state, action) => {
			state.visible = true;
		},
		clearVisible: (state, action) => {
			state.visible = false;
		}
	}
});

export const {setPokemons, setSortType, setSearchPokemon, appendPokemonInfo, setVisible, clearVisible} = pokemonSlice.actions;

export const initializePokemons = () => {
	return async (dispatch) => {
		try {
			const pokemons = await pokemonService.getAll();

			const pokemonsWithIndex = await Promise.all(
				pokemons.map((pokemon, index) => {
					return {
						name: pokemon.name,
						index: index + 1,
					};
				})
			);
			console.log(pokemonsWithIndex);
			dispatch(setPokemons(pokemonsWithIndex));
		} catch (err) {
			dispatch(notif('Failed to load pokemons.', 60, 'dark'));
			console.error('Error fetching pokemons:', err);
		}
	};
};

export const getPokemonInfo = (name) => {
	return async (dispatch, getState) => {
			try {
				const pokemonInfoExist = getState().pokemon.info.find((p) => p?.name === name);
			if (pokemonInfoExist) {
				return;
			}
			const info = await pokemonService.getOne(name);
			console.log(info);
			dispatch(appendPokemonInfo({ name, info }));
		} catch (err) {
			dispatch(notif('Failed to load pokemon info.', 60, 'dark'));
			console.error('Error fetching pokemon info:', err);
		}
	};
};

export default pokemonSlice.reducer;