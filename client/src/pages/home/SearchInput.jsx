import { useDispatch, useSelector } from 'react-redux';
import { setSearchPokemon } from '../../reducers/pokemonReducer';
import Form from 'react-bootstrap/Form';

const SearchInput = () => {
	const dispatch = useDispatch();

	const searchPokemon = useSelector((state) => state.pokemon.searchPokemon);

	return (
		<Form.Control
			type="text"
			value={searchPokemon}
			placeholder="Search"
			onChange={(e) => dispatch(setSearchPokemon(e.target.value))}
			className="mr-sm-2"
		/>
	);
};

export default SearchInput;