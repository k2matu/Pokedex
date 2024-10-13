import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

const Login = () => {
	const { handleSubmit, register, formState: { errors } } = useForm();
	const onSubmit = values => console.log(values);

	return (
		<div>
			< form onSubmit={handleSubmit(onSubmit)}>
				<label>Username</label>
				<input
					{...register("username", {
						validate: value => value !== "admin" || "Nice try!"
					})}
				/>
				<br />
				<label>Password</label>
				<input
					{...register("password", {
						validate: value => value !== "admin" || "Nice try!"
					})}
				/>
				{errors.password && errors.password.message}
				<button type='submit'>Log in</button>
			</form>
			<div>
				Don't have an account?
				<Link to='/register' >Sign up</Link>
			</div>
		</div>
	)
}

export default Login