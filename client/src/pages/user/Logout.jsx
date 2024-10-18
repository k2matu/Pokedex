import Nav from 'react-bootstrap/Nav';
import { useLogout } from '../../utils/authUtils';

const Logout = () => {
	const handleLogout = useLogout();

	const onLogoutClick = () => {
		handleLogout();
	};

	return (
		<Nav.Link as="span" onClick={onLogoutClick} style={{ cursor: 'pointer' }}>
			Logout
		</Nav.Link>
	);
};

export default Logout;