import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ShowFavorite from './ShowFavorite';
import { useEffect } from 'react';

const Profile = () => {
	const navigate = useNavigate();

	const user = useSelector((state) => state.auth.user);
	console.log(user);

	return (
		<div>
			<h2>{user}</h2>
			<button onClick={() => navigate('/settings')} >settings</button>
			<ShowFavorite />
		</div>
	);
};

export default Profile;