import { useDispatch, useSelector } from 'react-redux';
import AbilityDisplay from './AbilityDisplay';
import TypeDisplay from './TypeDisplay';
import { useEffect } from 'react';
import { getPokemonInfo } from '../../reducers/pokemonReducer';
import { Card, Container, Row, Col, Badge } from 'react-bootstrap';
import InfoDisplay from './InfoDisplay';
import Spinner from 'react-bootstrap/Spinner';

const DetailsOfPokemon = ({ pokemon }) => {
	const dispatch = useDispatch();

	const pokemonInfo = useSelector((state) =>
		state.pokemon.info.find((p) => p.name === pokemon.name)
	);

	useEffect(() => {
		if (!pokemonInfo) {
			dispatch(getPokemonInfo(pokemon.name));
		}
	}, [dispatch, pokemon.name, pokemonInfo]);

	if (!pokemonInfo) {
		return (
			< Spinner animation="border" />
		);
	}

	return (
		<Container className="my-5">
			<Row className="justify-content-center">
				<Col md={6} className="mb-4">
					<Card className="shadow-lg border-0 rounded">
						<Card.Img
							variant="top"
							src={`/pokemon/pokemon/${pokemon.index}.png`}
							alt={pokemon.name}
							height="500px"
							className="img-fluid rounded-top"
						/>
					</Card>
				</Col>
				<Col md={6} className="mb-4">
					<Card className="shadow-lg border-0 rounded h-100">
						<Card.Body>
							<Card.Title className="text-center display-4">
								{pokemon.name} {`#${pokemon.index}`}
							</Card.Title>
							<TypeDisplay types={pokemonInfo.info.types} />
							<AbilityDisplay abilities={pokemonInfo.info.abilities} />
							<InfoDisplay type={'Height: '} value={pokemonInfo.info.height} metric={'kg'} />
							<InfoDisplay type={'Weight: '} value={pokemonInfo.info.weight} metric={'dm'} />
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default DetailsOfPokemon;