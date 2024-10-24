import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleLogin } from
	'../../reducers/authReducer';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

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
		<Container fluid style={{ height: '100vh' }} className="d-flex align-items-center">
			<Row className="w-100">
				<Col md={4} className="offset-md-6">
					<h3 className="text-center text-white">Login</h3>
					<Form onSubmit={handleSubmit(onLoginSubmit)}>
						<Form.Group controlId="formUsername">
							<Form.Label className="text-white">Username</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter username"
								{...register('username', { required: true })}
							/>
							{errors.username && <p className="text-danger">Username is required</p>}
						</Form.Group>
						<Form.Group controlId="formPassword">
							<Form.Label className='my-2 text-white'>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								{...register('password', { required: true })}
							/>
							{errors.password && <p className="text-danger">Password is required</p>}
						</Form.Group>
						<div className="text-center mt-3">
							<Button variant="light" type="submit" className="mt-3">
								Login
							</Button>
						</div>
					</Form>
					<div className="mt-3 text-center text-white">
						Don't have an account? <Link to="/register" className="text-black">Sign up</Link>
					</div>
				</Col>
			</Row>
		</Container>
	);
};


export default Login;