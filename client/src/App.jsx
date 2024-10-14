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

const App = () => {
	const [users, setUsers] = useState([])

	useEffect(() => {
		userService
			.getAll()
			.then(res => {
				setUsers(res.data)
				console.log(res.data)
			})
	}, [])

	return (
		<Router>
			<div>
				<Header />
				<Link to='/'>Home</Link>
				<Link to='/login'>Login</Link>
			</div>

			<Routes>
				<Route path='/login' element={<Login users={users} />} />
				<Route path='/register' element={<Register users={users} setUsers={setUsers} />} />
				<Route path='/' element={<Body />} />
			</Routes>

			<div>
				<Footer />
			</div>
		</Router >
	)
}

export default App
