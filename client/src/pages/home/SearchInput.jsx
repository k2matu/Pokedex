import { useDispatch, useSelector } from 'react-redux'
import { setSearchPokemon } from '../../reducers/pokemonReducer'

const SearchInput = () => {
	const dispatch = useDispatch()

	const searchPokemon = useSelector((state) => state.pokemon.searchPokemon)
	return (
		<div>
			<p>
				Search Pokemon
				<input
					value={searchPokemon}
					onChange={(e) => dispatch(setSearchPokemon(e.target.value))} />
			</p>
		</div>
	)
}

export default SearchInput