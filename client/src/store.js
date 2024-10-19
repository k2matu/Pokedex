import { configureStore } from "@reduxjs/toolkit";

import userReducer from './reducers/userReducer';
import authReducer from './reducers/authReducer';
import notifReducer from './reducers/notifReducer';
import pokemonReducer from './reducers/pokemonReducer';
import likesReducer from './reducers/likesReducer';

const store = configureStore({
	reducer: {
		user: userReducer,
		auth: authReducer,
		notif: notifReducer,
		pokemon: pokemonReducer,
		likes: likesReducer,
	},
});

export default store;