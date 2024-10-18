import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/user';
import { notif } from './notifReducer';

const initialState = [];

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUsers: (state, action) => {
			return action.payload;
		},
		appendUser: (state, action) => {
			state.push(action.payload);
		}
	}
});

export const {setUsers, appendUser} = userSlice.actions;

export const initializeUsers = () => {
	return async (dispatch) => {
		try {
			const res = await userService.getAll();
			const users = res.data;
			dispatch(setUsers(users));
		} catch (err) {
			dispatch(notif('Failed to load users.', 60, 'danger'));
			console.error('Error fetching users:', err);
	}
	};
};

export const createUser = (user) => {
	return async (dispatch, getState) => {
		try {
			const users = getState();
			const userExist = users.find(u => u.username === user.username);
			if (userExist) {
				dispatch(notif('This username is already taken. Please choose a different one.', 60, 'light'));
			} else {
				const res = await userService.create(user);
				const { data } = res;
				dispatch(appendUser(data));
				dispatch(notif('Successfully created user', 5, 'success'));
				return true;
			}
		} catch (err) {
			dispatch(notif('Failed to create user.', 60, 'danger'));
			console.error('Error creating user:', err);
			return false;
		}
	};
};

export default userSlice.reducer;