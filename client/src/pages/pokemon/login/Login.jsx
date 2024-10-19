import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogin } from '../../../reducers/authReducer';

const Login = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const { handleSubmit, register, formState: { errors } } = useForm();

	const onHandleLogin = async (data) => {
		const success = await dispatch(handleLogin(data));
		if (success) {
			Navigate('/');
		}
	};

	if (user === null) {
		return (
			<div>
				<h3>Login</h3>
				< form onSubmit={handleSubmit(onHandleLogin)}>
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
		);
	}
};

export default Login;