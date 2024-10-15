import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
import Home from './home/Home'
import Login from './login/Login'
import Register from './login/Register'
import Profile from './user/Profile'

const Path = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeUsers())
	}, [dispatch])

	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/login' element={<Login />} />
			<Route path='/profile' element={<Profile />} />
			<Route path='/register' element={<Register />} />
		</Routes>
	)
}
export default Path