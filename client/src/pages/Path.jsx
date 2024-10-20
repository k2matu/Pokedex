import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeUsers } from '../reducers/userReducer';
import Home from './home/Home';
import Login from './login/Login';
import Register from './login/Register';
import Profile from './user/Profile';
import Settings from './user/Settings';

const Path = () => {
	const dispatch = useDispatch();
	const location = useLocation();

	useEffect(() => {
		dispatch(initializeUsers());
	}, [dispatch]);

	const getBackgroundImage = () => {
		switch (location.pathname) {
			case '/login':
			case '/register':
				return `hd_bg.jpeg`;
			case '/settings':
				return `pikachu.jpg`;
			case '/profile':
				return `pikachu_bg.png`;
			case '/':
				return `2.jpg`;
			default:
				return null;
		}
	};

	const backgroundImage = getBackgroundImage();

	const backgroundStyle = {
		backgroundImage: backgroundImage ? `url(${getBackgroundImage()})` : 'none',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		height: '100vh',
		width: '100vw',
		margin: 0,
		padding: 0,
		overflow: 'auto',
	};

	return (
		<div style={backgroundStyle}>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/register' element={<Register />} />
				<Route path='/settings' element={<Settings />} />
			</Routes>
		</div>
	);
};
export default Path;