import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../../reducers/userReducer';
import { useDispatch } from 'react-redux';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const Register = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const addUser = async (data) => {
		const success = await dispatch(createUser(data));
		if (success) {
			navigate('/login');
		}
	};

	return (
		<Container className="mt-5">
			<Row className="justify-content-center">
				<Col md={6}>
					<h3 className="text-center">Register</h3>
					<Form onSubmit={handleSubmit(addUser)}>
						<Form.Group controlId="formEmail">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter your email"
								{...register('email', {
									required: true,
									pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
								})}
								isInvalid={errors.email}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.email ? 'Enter a valid email address.' : ''}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="formUsername">
							<Form.Label className="my-2">Username</Form.Label>
							<Form.Control
								type="text"
								placeholder="Choose a username"
								{...register('username', {
									required: true,
									pattern: /^\w{1,30}$/,
								})}
								isInvalid={errors.username}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.username ? 'Username must be between one to 30 characters long.' : ''}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group controlId="formPassword">
							<Form.Label className="my-2">Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Create a password"
								{...register('password', {
									required: true,
									pattern: /^\w{6,30}$/,
								})}
								isInvalid={errors.password}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.password ? 'Create a password that is at least 6 characters in length.' : ''}
							</Form.Control.Feedback>
						</Form.Group>

						<Button variant="primary" type="submit" className="mt-3">
							Sign Up
						</Button>
					</Form>
					<div className="mt-3 text-center">
						Already have an account? <Link to="/login">Log In</Link>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default Register;