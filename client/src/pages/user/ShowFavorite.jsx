import { useSelector, useDispatch } from 'react-redux';
import Pokemon from '../pokemon/Pokemon';
import { Row, Col, Container } from 'react-bootstrap';
import { useEffect } from 'react';
import { initializeLikes } from '../../reducers/likesReducer';

const ShowFavorite = ({ user, isTrue }) => {
	const dispatch = useDispatch();
	const likedPokemons = useSelector((state) => state.likes);

	useEffect(() => {
		if (user) {
			dispatch(initializeLikes(user));
		}
	}, [dispatch, user]);

	return (
		<Container className="mt-4">
			{isTrue && (
				<h3 className="text-center mb-4">{user}</h3>
			)}
			<h3 className="text-center mb-4">Favorite</h3>
			<Row>
				{likedPokemons.length > 0 ? (
					likedPokemons.map((pokemon) => (
						<Col key={pokemon.name} xs={12} sm={6} md={4} lg={3} className='mb-4'>
							<Pokemon pokemon={pokemon} />
						</Col>
					))
				) : (
					<Col className="text-center mb-4" xs={12}>
						<p>No favorite Pokémon found.</p>
					</Col>
				)}
			</Row>
		</Container >
	);
};

export default ShowFavorite;