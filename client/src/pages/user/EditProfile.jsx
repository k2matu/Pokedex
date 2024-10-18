import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const EditProfile = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = () => {
		console.log("Submitted password");
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
				<Form.Group controlId="formEmail">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter your email"
						{...register('email')}
					/>
					{errors.email && <p className="text-danger">Email is required</p>}
				</Form.Group>
				<Button variant="primary" type="submit" className="mt-3">
					Save
				</Button>
			</Form>
		</Container>
	);
};

export default EditProfile;
