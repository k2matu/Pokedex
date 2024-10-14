const Userpage = ({ setUser }) => {
	const handleLogout = () => {
		window.localStorage.removeItem('username')
		setUser(null)
	}

	return (
		<div>
			<button onClick={handleLogout}>Logout</button>
		</div>
	)
}

export default Userpage