import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { createUser } from '../../reducers/userReducer'
import { useDispatch } from 'react-redux'

const Register = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm()

	const addUser = (data) => {
		const success = dispatch(createUser(data))
		if (success) {
			navigate('/login')
		}
		reset()
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