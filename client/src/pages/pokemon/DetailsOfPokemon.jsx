import { useSelector } from 'react-redux'
import AbilityDisplay from './AbilityDisplay'
import TypeDisplay from './TypeDisplay'

const DetailsOfPokemon = ({ pokemon }) => {
	const pokemons = useSelector((state) => state.pokemon.pokemons)

	const info = pokemons.find(p => p.name === pokemon.name)

	return (
		<div>
			<h1>
				{pokemon.name} {`#${pokemon.index}`}
			</h1>
			<img src={`/pokemon/pokemon/${pokemon.index}.png`} alt={pokemon.name} height="200px" />
			<TypeDisplay types={info.info.types} />
			<AbilityDisplay abilities={info.info.abilities} />
			<h3>Weight:</h3><p>{info.info.weight}</p>
			<h3>Height:</h3><p>{info.info.height}</p>
		</div>
	)
}

export default DetailsOfPokemon