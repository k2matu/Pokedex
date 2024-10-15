import { clear } from '../../reducers/authReducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleLogout = () => {
		window.localStorage.removeItem('username')
		dispatch(clear())
		navigate('/')
	}

	return (
		<div>
			<button onClick={handleLogout}>Logout</button>
		</div>
	)
}

export default Profile