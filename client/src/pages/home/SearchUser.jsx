import { useSelector } from 'react-redux';
import ShowFavorite from '../user/ShowFavorite';
import { Row, Col, Container, ListGroup } from 'react-bootstrap'

const SearchUser = () => {
	const users = useSelector((state) => state.user.users);
	const searchUser = useSelector((state) => state.user.searchUser);

	const filteredUsers = users.filter((user) => user.username.includes(searchUser));

	if (filteredUsers.length === 1) {
		return <ShowFavorite user={filteredUsers[0].username} isTrue={true} />
	}

	return (
		<Container className="my-4">
			<h3 className="text-center mb-4">Users List</h3>
			<Row className="justify-content-center">
				<Col xs={12} md={6}>
					{users.length > 0 ? (
						<ListGroup>
							{users.map((user) => (
								<ListGroup.Item key={user.id}>
									{user.username}
								</ListGroup.Item>
							))}
						</ListGroup>
					) : (
						<p className="text-center">No users found.</p>
					)}
				</Col>
			</Row>
		</Container>
	);
};

export default SearchUser;