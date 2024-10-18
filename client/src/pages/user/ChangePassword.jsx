import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { handlePasswordChange } from '../../reducers/authReducer';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../utils/authUtils';

const ChangePassword = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleLogout = useLogout();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		try {
			const success = await dispatch(handlePasswordChange(data));
			if (success) {
				handleLogout();
				navigate('/login');
			}
		} catch (err) {
			console.error("Could not change password", err);
		}
	};

	return (
		<Container className="mt-5">
			<h3 className="mt-4">Change Password</h3>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Form.Group controlId="formOldPassword">
					<Form.Label>Old Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter your old password"
						{...register('oldPassword', { required: true })}
					/>
					{errors.oldPassword && <p className="text-danger">Old password is required</p>}
				</Form.Group>
				<Form.Group controlId="formNewPassword">
					<Form.Label className='my-2'>New Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter your new password"
						{...register('newPassword', { required: true })}
					/>
					{errors.newPassword && <p className="text-danger">New password is required</p>}
				</Form.Group>
				<Button variant="primary" type="submit" className="mt-3">
					Save
				</Button>
			</Form>
		</Container>
	);
};

export default ChangePassword;
