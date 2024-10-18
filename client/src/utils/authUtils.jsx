import { clear } from '../reducers/authReducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogout = () => {
		window.localStorage.removeItem('user');
		dispatch(clear());
		navigate('/');
	};

	return handleLogout;
};
