import Header from './components/Header';
import Footer from './components/Footer';
import Notif from './components/Notif';
import Path from './pages/Path';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuth } from './reducers/authReducer';


const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const loginUser = JSON.parse(window.localStorage.getItem('user'));
		if (loginUser) {
			dispatch(setAuth(loginUser));
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
