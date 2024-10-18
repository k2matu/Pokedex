import {createSlice} from '@reduxjs/toolkit';
import { notif, removing } from './notifReducer';
import loginService from '../services/login';
import userService from '../services/user';

const initialState = {
	user: null,
	token: '',
};

export const authSlice = createSlice({
	name: 'authorization',
	initialState,
	reducers: {
		setAuth: (state, action) => {
			const {token, username} = action.payload;
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
		try {
			const username = getState().auth.user; 
			if (username) {
				await userService.updatePassword(username, data);
				dispatch(notif('Successfully changed password. Please log in again', 5, 'success'));
				return true;
			}
		} catch (exception) {
			dispatch(notif('Could not change password', 60, 'danger'));
			console.error('Error during password change:', exception);
			return false;
		}
	}
}

export const updateUserName = (data) => {
	return async (dispatch, getState) => {
	try {
		const username = getState().auth.user;
		if (username) {
			await userService.updateUsername(username, data);
			dispatch(notif('Successfully changed username. Please log in again', 5, 'success'));
			return true;
		}
	} catch (exception) {
		dispatch(notif('Could not change username', 60, 'danger'));
		console.error('Error during username change:', exception);
		return false;
	}
}};

export default authSlice.reducer;