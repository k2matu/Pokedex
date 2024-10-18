import {createSlice} from '@reduxjs/toolkit';
import { notif, removing } from './notifReducer';
import loginService from '../services/login';

const initialState = {
	user: null,
	token: '',
};

export const authSlice = createSlice({
	name: 'authorization',
	initialState,
	reducers: {
		setAuth: (state, action) => {
			const {username, token} = action.payload;
			state.user = username;
			state.token = token;
		},
		clear: (state) => {
			state.user = null;
			state.token = '';
		},
	},
});

export const {setAuth, clear} = authSlice.actions;

export const handleLogin = (data) => {
	return async (dispatch) => {
		const { username, password } = data;
		try {
			const user = await loginService.login({ username, password });
				dispatch(setAuth(user));
				dispatch(removing());
				window.localStorage.setItem('user', JSON.stringify(user));
				return true;
		} catch (exception) {
			dispatch(notif('Invalid username or password', 60, 'danger'));
			return false;
		}
	};
};


export const handlePasswordChange = (data) => {
	return async (dispatch, getState) => {
		const { oldPassword, newPassword } = data;
		const username = getState().authorization.user; 
		console.error(username);
		console.error(oldPassword);
		try {
			const user = await loginService.login({ username, oldPassword});
			if (user) {
				console.log("yes there was a user");
			}
		} catch (exception) {
			dispatch(notif('Invalid password', 60, 'danger'));
			return false;
		}
	}
}
export default authSlice.reducer;