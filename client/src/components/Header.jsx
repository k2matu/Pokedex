import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Header = ({ text }) => {
	const user = useSelector((state) => state.auth.user)

	return (
		<header>
			<h1>{text}</h1>
			<Link to='/'>Home</Link>
			{!user && <Link to='/login'>Login</Link>}
			{user && <Link to='/profile'>Profile</Link>}
		</header >
	)
}

export default Header