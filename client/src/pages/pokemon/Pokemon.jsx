import { useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import likesService from '../../services/likes';

const Pokemon = ({ pokemon }) => {
	const user = useSelector((state) => state.auth.user);

	const handleLike = async (pokemon) => {
		const loginUser = JSON.parse(window.localStorage.getItem('user'));
		const likeData = {
			pokemonName: pokemon.name
		};
		try {
			const response = await likesService.create(likeData, loginUser.token);
			if (response.status === 200) {
				console.log("Like added successfully!");
			} else {
				console.log("Failed to add like.");
			}
		} catch (error) {
			console.error("Error while liking the Pokémon:", error);
		}
	};

	return (
		<Card style={{ width: '15rem' }}>
			<Card.Img
				variant="top"
				src={`/pokemon/pokemon/${pokemon.index}.png`}
				className="img-fluid"
			/>
			<div style={{ height: '1px', backgroundColor: '#ccc', margin: '0' }} ></div>
			<Card.Body>
				<div
					className="d-flex justify-content-between align-items-center">
					<Card.Title className='mb-0'>{pokemon.name}</Card.Title>
					{user && (
						<Button
							variant="primary"
							onClick={() => handleLike(pokemon)}
							style={{ backgroundImage: `url('/unheart.jpg')`, backgroundSize: 'cover', width: '30px', height: '30px', border: 'none' }}
						></Button>
					)}
				</div>
			</Card.Body>
		</Card >
	);
};

export default Pokemon;