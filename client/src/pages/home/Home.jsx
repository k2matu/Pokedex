import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializePokemons } from '../../reducers/pokemonReducer';
import ShowPokemon from '../pokemon/ShowPokemon';
import SortDropDown from './SortDropDown';
import Container from 'react-bootstrap/Container';
import SearchUser from './SearchUser';

const Home = () => {
	const dispatch = useDispatch();
	const pokemons = useSelector((state) => state.pokemon.pokemons);
	const searchUser = useSelector((state) => state.user.search);

	useEffect(() => {
		if (pokemons.length === 0) {
			dispatch(initializePokemons());
		}
	}, [dispatch]);

	return (
		<Container className="my-2 mx-center">
			{!searchUser ? (
				<>
					<SortDropDown />
					<ShowPokemon />
				</>
			) : (
				<>
					<SearchUser />
				</>
			)}
		</Container >
	);
};

export default Home;