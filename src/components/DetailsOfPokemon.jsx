import { useState, useEffect } from 'react'
import axios from 'axios'

const DetailsOfPokemon = ({ pokemon }) => {
	const [info, setInfo] = useState([])

	useEffect(() => {
		axios
			.get(pokemon.url)
			.then(res => {
				setInfo(res.data)
				console.log(res.data)
			})
	}, [])

	return (
		<div>
			<h1>
				{pokemon.name} {info?.order ? `#${info.order}` : 'Unknown'}
			</h1>
			<img src={info?.sprites ? info.sprites.front_default : 'Unknown'} alt={pokemon.name} height="120px" />
			<div>
				Type: {info?.types ? info.types.map(typeInfo => typeInfo.type.name).join(', ') : 'Unknown'} <br />
			</div>
		</div>
	)
}

export default DetailsOfPokemon