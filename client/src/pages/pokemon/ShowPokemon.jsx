import Pokemon from './Pokemon';
import DetailsOfPokemon from './DetailsOfPokemon';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { clearVisible, setVisible } from '../../reducers/pokemonReducer';
import { useEffect, useState } from 'react';

const ShowPokemon = () => {
	const dispatch = useDispatch();
	const pokemons = useSelector((state) => state.pokemon.pokemons);
	const searchPokemon = useSelector((state) => state.pokemon.searchPokemon);
	const sortType = useSelector((state) => state.pokemon.sortType);
	const [selectedPokemon, setSelectedPokemon] = useState(null);

	const getFilteredAndSortedPokemons = () => {
		return pokemons
			.filter((pokemon) => pokemon.name.toLowerCase().includes(searchPokemon.toLowerCase()))
			.sort((a, b) => {
				switch (sortType) {
					case 'A-Z':
						return a.name.localeCompare(b.name);
					case 'Z-A':
						return b.name.localeCompare(a.name);
					case 'Lowest':
						return a.index - b.index;
					case 'Highest':
						return b.index - a.index;
					default:
						return 0;
				}
			});
	};

	const sortedPokemons = getFilteredAndSortedPokemons();

	useEffect(() => {
		if (sortedPokemons.length < 3 && sortedPokemons[0]) {
			dispatch(clearVisible());
			setSelectedPokemon(sortedPokemons[0]);
		} else {
			dispatch(setVisible());
			setSelectedPokemon(null);
		}
	}, [sortedPokemons, dispatch]);

	if (selectedPokemon) {
		return <DetailsOfPokemon pokemon={selectedPokemon} />;
	}

	return (
		<div>
			<Row>
				{sortedPokemons.map((pokemon) => (
					<Col key={pokemon.index} xs={12} sm={6} md={4} lg={3} className='mb-4'>
						<Pokemon pokemon={pokemon} />
					</Col>
				))}
			</Row>
		</div>
	);
};

export default ShowPokemon;