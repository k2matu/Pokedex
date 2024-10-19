import Card from 'react-bootstrap/Card';
import LikeButton from './LikeButton';
import { useSelector } from 'react-redux';

const Pokemon = ({ pokemon }) => {
	const search = useSelector((state) => state.user.search)

	return (
		<Card style={{ width: '15rem' }}>
			<Card.Img
				variant="top"
				src={`/pokemon/pokemon/${pokemon.index}.png`}
				className="img-fluid"
			/>
			<div style={{ height: '1px', backgroundColor: '#ccc', margin: '0' }}></div>
			<Card.Body>
				<div className="d-flex justify-content-between align-items-center">
					<Card.Title className='mb-0'>{pokemon.name}</Card.Title>
					{!search && (
						<LikeButton pokemon={pokemon} />
					)
					}
				</div>
			</Card.Body>
		</Card>
	);
};

export default Pokemon;
