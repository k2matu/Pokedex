const Pokemon = ({ pokemon, user }) => {
	const handleLikes = () => {
		console.log("liked this pokemon")
	}

	if (user) {
		return (
			<div>
				<li>{pokemon.name}
					<button onClick={handleLikes}>like</button>
				</li>
			</div>
		)
	}
	return (
		<li>{pokemon.name}
		</li>
	)
}

export default Pokemon