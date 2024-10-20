import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ShowFavorite from './ShowFavorite';
import { Row, Col, Container } from 'react-bootstrap';

const Profile = () => {
	const navigate = useNavigate();

	const user = useSelector((state) => state.auth.user);
	const firstLetter = user ? user.charAt(0).toUpperCase() : '';

	return (
		<Container className="mt-4 text-center mb-4">
			<Row className="justify-content-center">
				<Col xs={12} md={4} className="d-flex justify-content-center md-5">
					<div
						style={{
							width: '130px',
							height: '130px',
							borderRadius: '50%',
							backgroundColor: 'white',
							color: 'black',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							fontSize: '3rem',
							fontWeight: 'bold',
							borderColor: 'black',
							borderWidth: '1px',
							borderStyle: 'solid',
						}}
					>
						{firstLetter}
					</div>
				</Col>
			</Row>
			<h2 className="mt-2">{user}</h2>
			<ShowFavorite user={user} />
		</Container>
	);
};

export default Profile;