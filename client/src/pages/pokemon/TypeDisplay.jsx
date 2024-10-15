const TypeDisplay = ({ types }) => {
	return (
		<div>
			<h3>Type:</h3>
			{types && types.length > 0 ? (
				types.map((typeInfo, index) => (
					<img
						key={index}
						src={`/pokemon/types/${typeInfo.name}.png`}
						height="15px"
						alt={typeInfo.name}
					/>
				))
			) : (
				'Unknown'
			)}
		</div>
	);
};

export default TypeDisplay