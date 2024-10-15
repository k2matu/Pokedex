import {createSlice} from '@reduxjs/toolkit'
import userService from '../services/user'
import { setNotif } from './notifReducer'

const initialState = []

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUsers: (state, action) => {
			return action.payload
		},
		appendUser: (state, action) => {
			state.push(action.payload)
		}
	}
})

export const {setUsers, appendUser} = userSlice.actions

export const initializeUsers = () => {
	return async (dispatch) => {
		try {
			const res = await userService.getAll()
			const users = res.data
			dispatch(setUsers(users))
		} catch (err) {
			dispatch(setNotif({ message: 'Failed to load users.', type: 'error' }))
			console.error('Error fetching users:', err);
	}
	}
}

export const createUser = (user) => {
	return async (dispatch, getState) => {
		try {
			const users = getState().user
			const userExist = users.find(u => u.username === user.username)
			if (userExist) {
				window.alert('This username is already taken. Please choose a different one.')
			} else {
				const res = await userService.create(user)
				const { data } = res
				dispatch(appendUser(data))
			}
		} catch (err) {
			dispatch(setNotif({ message: 'Failed to create user.', type: 'error'}))
			console.error('Error creating user:', err)
		}
	}
}

export default userSlice.reducer