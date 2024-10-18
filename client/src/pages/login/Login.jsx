import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleLogin } from
	'../../reducers/authReducer';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm();

	const onLoginSubmit = async (data) => {
		try {
			const success = await dispatch(handleLogin(data));
			if (success) {
				navigate('/');
			}
		} catch (err) {
			console.error('Error during login', err);
		}
	};

	return (
		<Container className="mt-5">
			<Row className="justify-content-center">
				<Col md={6}>
					<h3 className="text-center">Login</h3>
					<Form onSubmit={handleSubmit(onLoginSubmit)}>
						<Form.Group controlId="formUsername">
							<Form.Label>Username</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter username"
								{...register('username', { required: true })}
							/>
							{errors.username && <p className="text-danger">Username is required</p>}
						</Form.Group>
						<Form.Group controlId="formPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								{...register('password', { required: true })}
							/>
							{errors.password && <p className="text-danger">Password is required</p>}
						</Form.Group>
						<Button variant="primary" type="submit" className="mt-3">
							Login
						</Button>
					</Form>
					<div className="mt-3 text-center">
						Don't have an account? <Link to="/register">Sign up</Link>
					</div>
				</Col>
			</Row>
		</Container>
	);
};


export default Login;