import { useDispatch, useSelector } from 'react-redux';
import { setSearchPokemon } from '../../reducers/pokemonReducer';
import { clearSearch, setSearchUser } from '../../reducers/userReducer';
import { Form, InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import { useState } from 'react';

const SearchInput = () => {
	const dispatch = useDispatch();
	const [searchType, setSearchType] = useState('pokemon');

	const user = useSelector((state) => state.auth.user);
	const searchPokemon = useSelector((state) => state.pokemon.searchPokemon);
	const searchUser = useSelector((state) => state.user.searchUser);

	const handleSearch = (e) => {
		if (searchType === 'pokemon') {
			dispatch(clearSearch());
			dispatch(setSearchPokemon(e.target.value));
		} else {
			dispatch(setSearchUser(e.target.value));
		}
	};

	return (
		<InputGroup>
			<Form.Control
				type="text"
				value=
				{searchType === 'pokemon' ? searchPokemon : searchUser}
				placeholder={`Search`}
				onChange={handleSearch}
				className="mr-sm-2"
			/>
			{user && <DropdownButton
				variant="outline-secondary"
				title={`${searchType}`}
				id="input-group-dropdown-2"
				align="end"
			>
				<Dropdown.Item onClick={() => setSearchType('pokemon')}>pokemon</Dropdown.Item>
				<Dropdown.Item onClick={() => setSearchType('user')}>user</Dropdown.Item>
			</DropdownButton>}
		</InputGroup>
	);
};

export default SearchInput;