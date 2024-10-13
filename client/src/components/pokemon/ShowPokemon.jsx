import Pokemon from './Pokemon'
import DetailsOfPokemon from './DetailsOfPokemon'

const ShowPokemon = ({ pokemons, sortType }) => {
	const getLastNumberFromUrl = (url) => {
		const matches = url.match(/(\d+)/g);
		return matches ? Number(matches[matches.length - 1]) : null
	}

	if (sortType == 'A-Z') {
		pokemons.sort((a, b) => a.name.localeCompare(b.name))
	}
	else if (sortType == 'Z-A') {
		pokemons.sort((a, b) => b.name.localeCompare(a.name))
	}
	else if (sortType == "Lowest") {
		pokemons.sort((a, b) => {
			const lastNumA = getLastNumberFromUrl(a.url);
			const lastNumB = getLastNumberFromUrl(b.url);
			return lastNumA - lastNumB;
		});
	}
	else {
		pokemons.sort((a, b) => {
			const lastNumA = getLastNumberFromUrl(a.url);
			const lastNumB = getLastNumberFromUrl(b.url);
			return lastNumB - lastNumA;
		});
	}

	if (pokemons.length < 3 && pokemons[0]) {
		return <DetailsOfPokemon pokemon={pokemons[0]} />
	}

	return (
		<div>
			{pokemons.map(pokemon =>
				<Pokemon key={pokemon.name} pokemon={pokemon} />
			)}
		</div>
	)


}

export default ShowPokemon