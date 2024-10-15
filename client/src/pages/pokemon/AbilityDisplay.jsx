const AbilityDisplay = ({ abilities }) => {
	return (
		<div>
			<h3>Abilities:</h3>
			<ul>
				{abilities && abilities.length > 0 ? (
					abilities.map((ability, index) => (
						<li key={index}>{ability.name}</li>
					))
				) : (
					<li>No abilities found.</li>
				)}
			</ul>
		</div>
	)
}

export default AbilityDisplay
