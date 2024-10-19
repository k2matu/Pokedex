import { useSelector } from 'react-redux';
import Logout from '../pages/user/Logout';
import { Navbar, Container, Nav } from 'react-bootstrap';
import SearchInput from '../pages/Home/SearchInput';

const Header = ({ text }) => {
	const user = useSelector((state) => state.auth.user);

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
							<Logout />
						</>
					)}
				</Nav>
			</Container>
		</Navbar >
	);
};

export default Header;