import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { handleLike } from '../../reducers/likesReducer';

const LikeButton = ({ pokemon }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const likedPokemons = useSelector((state) => state.likes);

	const isLiked = likedPokemons.some(liked => liked.name === pokemon.name);

	const onHandleLike = async (pokemon) => {
		await dispatch(handleLike(pokemon));
	};

	return (
		<>
			{user && (
				<Button
					variant="light"
					onClick={() => onHandleLike(pokemon)}
					style={{
						backgroundImage: `url(${isLiked ? '/heart.jpeg' : '/unheart.jpg'})`,
						backgroundSize: 'cover',
						width: '30px',
						height: '30px',
						border: 'none'
					}}
				></Button>
			)}
		</>
	);
};

export default LikeButton;
