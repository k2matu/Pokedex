import { useState, useEffect } from 'react'
import axios from 'axios'
import ShowPokemon from './components/ShowPokemon'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
	const [pokemons, setPokemons] = useState([])
	const [sortType, setSortType] = useState("A-Z")
	const [searchPokemon, setSearchPokemon] = useState('')

	useEffect(() => {
		axios
			.get('https://pokeapi.co/api/v2/pokemon?limit=151')
			.then(res => {
				setPokemons(res.data.results)
			})
	}, [])

	const handleSearchChange = (e) => {
		console.log(e.target.value)
		setSearchPokemon(e.target.value)
	}

	const handleSort = (e) => {
		console.log(e.target.value)
		setSortType(e.target.value)
	}

	const pokemon = pokemons
		.filter((pokemon) => pokemon.name.toLowerCase().includes(searchPokemon.toLowerCase())
		)

	return (
		<div>
			<Header />
			<p>
				Search Pokemon
				<input onChange={handleSearchChange} />
			</p>
			<form>
				<p>Sort By</p>
				<select value={sortType} onChange={handleSort}>
					<option value="A-Z">A-Z</option>
					<option value="Z-A">Z-A</option>
					<option value="Lowest">Lowest Number (First)</option>
					<option value="Highest">Highest Number (First)</option>
				</select>
			</form>
			<ShowPokemon pokemons={pokemon} sortType={sortType} />
			<Footer />
		</div>
	)
}

export default App
