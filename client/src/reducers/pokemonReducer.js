import { createSlice } from '@reduxjs/toolkit'
import pokemonService from '../services/pokemon'
import { setNotif } from './notifReducer'

const initialState = {
	pokemons: [],
	sortType: 'A-Z',
	searchPokemon: '',
}

const pokemonSlice = createSlice({
	name: 'pokemon',
	initialState,
	reducers: {
		setPokemons: (state, action) => {
			state.pokemons = action.payload
		},
		setSortType: (state, action) => {
			state.sortType = action.payload
		},
		setSearchPokemon: (state, action) => {
			state.searchPokemon = action.payload
		}
	}
})

export const {setPokemons, setSortType, setSearchPokemon} = pokemonSlice.actions

export const initializePokemons = () => {
	return async (dispatch) => {
		try {
			const res = await pokemonService.getAll()
			const pokemons = res.data.results
			
			const pokemonsWithIndex = await Promise.all(
				pokemons.map(async (pokemon, index) => {
					const info = await pokemonService.getOne(pokemon.name);
					return {
						name: pokemon.name,
						index: index + 1,
						info: info.data,
					}
				})
			)
console.log(pokemonsWithIndex)
dispatch(setPokemons(pokemonsWithIndex))
		} catch (err) {
			dispatch(setNotif({ message: 'Failed to load pokemons.', type: 'error' }))
			console.error('Error fetching pokemons:', err);
	}
	}
}

export default pokemonSlice.reducer