import {
	BrowserRouter as Router,
	Routes, Route, Link
} from 'react-router-dom'
import Body from './components/layout/Body'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Login from './components/login/Login'
import Register from './components/login/Register'
import { useState, useEffect } from 'react'
import userService from './services/user'
import pokemonService from './services/pokemon'

const App = () => {
	const [users, setUsers] = useState([])
	const [user, setUser] = useState(null)

	useEffect(() => {
		userService
			.getAll()
			.then(res => {
				setUsers(res.data)
				console.log(res.data)
			})
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('username')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			// pokemonService.setToken(user.token)
		}
	}, [])

	return (
		<Router>
			<div>
				<Header />
				<Link to='/'>Home</Link>
				{!user && <Link to='/login'>Login</Link>}
				{user && <Link to='/login'>Userpage</Link>}
			</div>

			<Routes>
				<Route path='/login' element={<Login users={users} user={user} setUser={setUser} />} />
				<Route path='/register' element={<Register users={users} setUsers={setUsers} />} />
				<Route path='/' element={<Body user={user} />} />
			</Routes>

			<div>
				<Footer />
			</div>
		</Router >
	)
}

export default App
