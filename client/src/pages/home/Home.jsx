import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializePokemons } from '../../reducers/pokemonReducer'
import ShowPokemon from '../pokemon/ShowPokemon'
import SearchInput from './SearchInput'
import SortDropDown from './SortDropDown'

const Home = () => {
	const dispatch = useDispatch()
	const pokemons = useSelector((state) => state.pokemon.pokemons)

	useEffect(() => {
		if (pokemons.length === 0) {
			dispatch(initializePokemons())
		}
	}, [dispatch]);

	return (
		<div>
			<SearchInput />
			<SortDropDown />
			<ShowPokemon />
		</div>
	)
}

export default Home