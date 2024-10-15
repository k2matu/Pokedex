import { useSelector } from 'react-redux'

const Pokemon = ({ pokemon }) => {
	const user = useSelector((state) => state.auth.user)

	const handleLike = () => {
		console.log("liked this pokemon")
	}

	const handleDislike = () => {
		console.log("disliked this pokemon")
	}

	return (
		<div>
			<img src={`/pokemon/pokemon/${pokemon.index}.png`} height={'20px'} />
			{pokemon.name}
			{user && (
				<div>
					<button onClick={handleLike}>like</button>
					<button onClick={handleDislike}>dislike</button>
				</div>
			)}
		</div>
	);
}

export default Pokemon