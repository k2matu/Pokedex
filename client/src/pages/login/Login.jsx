import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { handleLogin } from
	'../../reducers/authReducer'

const Login = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm()

	const onLoginSubmit = async (data) => {
		const success = dispatch(handleLogin(data))
		if (success) {
			navigate('/profile')
		}
	}

	return (
		<div>
			<h3>Login</h3>
			< form onSubmit={handleSubmit(onLoginSubmit)}>
				<input
					placeholder='Username'
					{...register('username', {
						required: true,
					})}
				/>
				<p>{errors.username && 'Username missing'}</p>
				<input
					placeholder='Password'
					{...register('password', {
						required: true,
					})}
				/>
				<p>{errors.password && 'Password missing'}</p>	<button type='submit'>Login</button>
			</form>
			<div>
				Don't have an account?
				<Link to='/register'> Sign up</Link>
			</div>
		</div>
	)
}

export default Login