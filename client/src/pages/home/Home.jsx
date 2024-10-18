import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializePokemons } from '../../reducers/pokemonReducer';
import ShowPokemon from '../pokemon/ShowPokemon';
import SortDropDown from './SortDropDown';
import Container from 'react-bootstrap/Container';

const Home = () => {
	const dispatch = useDispatch();
	const pokemons = useSelector((state) => state.pokemon.pokemons);

	useEffect(() => {
		if (pokemons.length === 0) {
			dispatch(initializePokemons());
		}
	}, [dispatch]);

	return (
		<Container>
			<SortDropDown />
			<ShowPokemon />
		</Container>
	);
};

export default Home;