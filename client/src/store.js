import { configureStore } from "@reduxjs/toolkit";

import userReducer from './reducers/userReducer';
import authReducer from './reducers/authReducer';
import notifReducer from './reducers/notifReducer';
import pokemonReducer from './reducers/pokemonReducer';

const store = configureStore({
	reducer: {
		user: userReducer,
		auth: authReducer,
		notif: notifReducer,
		pokemon: pokemonReducer,
	},
});

export default store;