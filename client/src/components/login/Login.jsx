import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

const Login = ({ users }) => {
	const { handleSubmit, register, formState: { errors } } = useForm();
	const onSubmit = values => console.log(values);

	return (
		<div>
			<h3>Login</h3>
			< form onSubmit={handleSubmit(onSubmit)}>
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
				<p>{errors.password && 'Password missing'}</p>	<button type='submit'>Sign up</button>
			</form>
			<div>
				Don't have an account?
				<Link to='/register'> Sign up</Link>
			</div>
		</div>
	)
}

export default Login