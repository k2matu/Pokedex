import Header from './components/Header';
import Footer from './components/Footer';
import Notif from './components/Notif';
import Path from './pages/Path';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuth } from './reducers/authReducer';
import likesService from './services/likes';


const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const loginUser = JSON.parse(window.localStorage.getItem('user'));
		console.log(loginUser);
		if (loginUser) {
			dispatch(setAuth(loginUser));
			likesService.setToken(loginUser.token);
		}
	}, [dispatch]);

	return (
		<div>
			<Header text='Pokedex App' />
			<Notif />
			<Path />
			<Footer />
		</div >
	);
};

export default App;
