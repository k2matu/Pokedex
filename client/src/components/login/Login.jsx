import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import loginService from '../../services/login'
import Userpage from '../user/Userpage'

const Login = ({ users, user, setUser }) => {
	const { handleSubmit, register, formState: { errors } } = useForm();

	const handleLogin = async (data) => {
		const { username, password } = data;
		try {
			const user = await loginService.login({ username, password })
			setUser(user)
			window.localStorage.setItem('username', JSON.stringify(user.username));

		} catch (exception) {
			console.log('Invalid username or password')
		}
	}

	if (user === null) {
		return (
			<div>
				<h3>Login</h3>
				< form onSubmit={handleSubmit(handleLogin)}>
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

	return (
		<div>
			<Userpage setUser={setUser} />
		</div>
	)
}

export default Login