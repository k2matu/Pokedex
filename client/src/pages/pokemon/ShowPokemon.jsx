import Pokemon from './Pokemon'
import DetailsOfPokemon from './DetailsOfPokemon'
import { useSelector } from 'react-redux'

const ShowPokemon = () => {
	const pokemons = useSelector((state) => state.pokemon.pokemons);
	const searchPokemon = useSelector((state) => state.pokemon.searchPokemon);
	const sortType = useSelector((state) => state.pokemon.sortType);

	if (!pokemons || pokemons.length === 0) {
		return <div>No Pokemon available</div>
	}

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
			})
	}

	const sortedPokemons = getFilteredAndSortedPokemons();

	if (sortedPokemons.length < 3 && sortedPokemons[0]) {
		return <DetailsOfPokemon pokemon={sortedPokemons[0]} />
	}

	return (
		<div>
			{sortedPokemons.map((pokemon) => (
				<div key={pokemon.index}>
					<Pokemon pokemon={pokemon} />
				</div>
			))}
		</div>
	)
}


export default ShowPokemon