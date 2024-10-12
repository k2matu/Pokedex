import { useState } from 'react'

const Login = () => {
	const [user, setUser] = useState(null)

	const addUser = (e) => {
		console.log(e.target.value)
		setUser(e.target.value)
	}

	return (
		< form action={addUser} >
			<input name='query' />
			<button type='submit'>Register</button>
		</form >
	)
}

export default Login