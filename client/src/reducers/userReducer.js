import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/user';
import { notif } from './notifReducer';

const initialState = {
	users: [],
	searchUser: '',
	search: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUsers: (state, action) => {
			state.users = action.payload;
		},
		appendUser: (state, action) => {
			state.users.push(action.payload);
		},
		setSearchUser: (state, action) => {
			state.searchUser = action.payload;
			state.search = true;
		},
		clearSearch: (state, action) => {
			state.searchUser = '';
			state.search = false;
		}
	}
});

export const {setUsers, appendUser, setSearchUser, clearSearch} = userSlice.actions;

export const initializeUsers = () => {
	return async (dispatch) => {
		try {
			const users = await userService.getAll();
			console.log(users);
			dispatch(setUsers(users));
		} catch (err) {
			console.error('Error fetching users:', err);
	}
	};
};

export const createUser = (user) => {
	return async (dispatch, getState) => {
		try {
			const users = getState().user.users;
			const userExist = users.find(u => u.username === user.username);
			if (userExist) {
				dispatch(notif('This username is already taken. Please choose a different one.', 60, 'light'));
			} else {
				const data = await userService.create(user);
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