import {
	BrowserRouter as Router,
	Routes, Route, Link
} from 'react-router-dom'
import Body from './components/layout/Body'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Login from './components/login/Login'
import Register from './components/login/Register'

const App = () => {
	return (
		<Router>
			<div>
				<Header />
				<Link to='/'>Home</Link>
				<Link to='/login'>Login</Link>
			</div>

			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/' element={<Body />} />
			</Routes>

			<div>
				<Footer />
			</div>
		</Router >
	)
}

export default App
