import Pokemon from './Pokemon';
import DetailsOfPokemon from './DetailsOfPokemon';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { clearVisible, setVisible } from '../../reducers/pokemonReducer';
import { useEffect, useState } from 'react';
import { initializeLikes } from '../../reducers/likesReducer';
import PageRendering from '../../components/Pagination';

const ShowPokemon = () => {
	const dispatch = useDispatch();
	const pokemons = useSelector((state) => state.pokemon.pokemons);
	const searchPokemon = useSelector((state) => state.pokemon.searchPokemon);
	const sortType = useSelector((state) => state.pokemon.sortType);
	const user = useSelector((state) => state.auth.user);
	const likedPokemons = useSelector((state) => state.likes);

	const [selectedPokemon, setSelectedPokemon] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const pokemonPerPage = 16;
	const indexOfLastPokemon = currentPage * pokemonPerPage;
	const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;

	useEffect(() => {
		if (user && likedPokemons.length === 0) {
			dispatch(initializeLikes(user));
		}
	}, [dispatch, user, likedPokemons]);

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
	const currentPokemons = sortedPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

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
		<>
			<Row>
				{currentPokemons.map((pokemon) => {
					const isLiked = likedPokemons.some(liked => liked.name === pokemon.name);
					return (
						<Col key={pokemon.index} xs={12} sm={6} md={4} lg={3} className='mb-4'>
							<Pokemon pokemon={pokemon} likeStatus={isLiked} />
						</Col>
					);
				})}
			</Row>

			<PageRendering
				totalPokemons={sortedPokemons.length}
				pokemonPerPage={pokemonPerPage}
				currentPage={currentPage}
				onPageChange={setCurrentPage}
			/>
		</>
	);
};

export default ShowPokemon;
