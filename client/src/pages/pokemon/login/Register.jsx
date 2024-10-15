import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import userService from '../../../services/user'

const Register = ({ users, setUsers }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm()

	const addUser = async (data) => {
		const userObject = {
			email: data.email,
			username: data.username,
			password: data.password,
		};
		if (users.find(user => user.username === data.username)) {
			window.alert('This username is already taken. Please choose a different one.')
		} else {
			userService
				.create(userObject)
				.then(() => {
					setUsers(prevUsers => [...prevUsers, { username: data.username }]);
					reset();
				})
				.catch(error => {
					console.error('Error creating user:', error);
					window.alert('Failed to create user. Please try again.');
				});
		}
	}

	return (
		<div>
			<h3>Register</h3>
			<form onSubmit={handleSubmit(addUser)}>
				<input
					placeholder='Email'
					{...register('email', {
						required: true,
						pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
					})}
				/>
				<p>{errors.email && 'Enter a valid email address.'}</p>
				<input
					placeholder='Username'
					{...register('username', {
						required: true,
						pattern: /^\w{1,30}$/,
					})}
				/>
				<p>
					{errors.username &&
						'Username must be between one to 30 characters long.'}
				</p>
				<input
					placeholder='Password'
					{...register('password', {
						required: true,
						pattern: /^\w{6,30}$/,
					})}
				/>
				<p>
					{errors.password &&
						'Create a password that is at least 6 characters in length.'}
				</p>
				<button type='submit'>Sign up</button>
			</form>
			<Link to='/login'>Log In</Link>
		</div>
	)
}

export default Register