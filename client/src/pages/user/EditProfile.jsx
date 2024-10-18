import { useDispatch } from 'react-redux';
import { Form, Button, Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useLogout } from '../../utils/authUtils';
import { updateUserName } from '../../reducers/authReducer';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
	const dispatch = useDispatch();
	const handleLogout = useLogout();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		try {
			const success = await dispatch(updateUserName(data));
			if (success) {
				handleLogout();
				navigate('/login');
			}
		} catch (err) {
			console.error("Could not change username", err);
		}
	};

	return (
		<Container className="mt-5">
			<h3>Edit Profile</h3>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Form.Group controlId="formUsername">
					<Form.Label>Username</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter your username"
						{...register('username')}
					/>
				</Form.Group>
				<Button variant="primary" type="submit" className="mt-3">
					Save
				</Button>
			</Form>
		</Container>
	);
};

export default EditProfile;
