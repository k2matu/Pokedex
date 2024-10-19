import { useSelector, useDispatch } from 'react-redux';
import Pokemon from '../pokemon/Pokemon';
import { Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { initializeLikes } from '../../reducers/likesReducer';

const ShowFavorite = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const likedPokemons = useSelector((state) => state.likes);

	useEffect(() => {
		if (user && likedPokemons.length === 0) {
			dispatch(initializeLikes(user));
		}
	}, [dispatch, user, likedPokemons]);

	return (
		<div>
			<h3>Favorite</h3>
			<Row>
				{likedPokemons.map((pokemon) => (
					<Col key={pokemon.name} xs={12} sm={6} md={4} lg={3} className='mb-4'>
						<Pokemon pokemon={pokemon} />
					</Col>
				))}
			</Row>
		</div>
	);
};

export default ShowFavorite;