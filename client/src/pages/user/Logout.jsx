import { clear } from '../../reducers/authReducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

const Logout = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogout = () => {
		window.localStorage.removeItem('user');
		dispatch(clear());
		navigate('/');
	};

	return (
		<Nav.Link as="span" onClick={handleLogout} style={{ cursor: 'pointer' }}>
			Logout
		</Nav.Link>
	);
};

export default Logout;