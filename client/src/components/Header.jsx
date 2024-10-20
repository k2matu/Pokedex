import { useSelector } from 'react-redux';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import SearchInput from '../pages/Home/SearchInput';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../utils/authUtils';

const Header = ({ text }) => {
	const navigate = useNavigate();
	const user = useSelector((state) => state.auth.user);

	const handleLogout = useLogout();

	const onLogoutClick = () => {
		handleLogout();
	};

	return (
		<Navbar bg="light" data-bs-theme="light">
			<Container fluid>
				<Navbar.Brand href="/">{text}</Navbar.Brand>
				<Nav className="me-auto">
					<Nav.Link href="/">Home</Nav.Link>
				</Nav>
				<SearchInput />
				<Nav className="ms-auto">
					{!user ? (
						<>
							<Nav.Link href="/login">Login</Nav.Link>
							<Nav.Link href="/register">Register</Nav.Link>
						</>
					) : (
						<>
							<Nav.Link href="/profile">Profile</Nav.Link>
							<NavDropdown
								variant="outline-secondary"
								title=""
								id="input-group-dropdown-2"
								align="end"
							>
								<NavDropdown.Item onClick={() => navigate('/settings')}>Settings</NavDropdown.Item>
								<NavDropdown.Item onClick={onLogoutClick}>Logout</NavDropdown.Item>
							</NavDropdown>
						</>
					)}
				</Nav>
			</Container>
		</Navbar>
	);
};

export default Header;