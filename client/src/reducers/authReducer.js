import {createSlice} from '@reduxjs/toolkit'
import { notif } from './notifReducer'
import loginService from '../services/login'

const initialState = {
	user: '',
	token: '',
}

export const authSlice = createSlice({
	name: 'authorization',
	initialState,
	reducers: {
		setAuth: (state, action) => {
			const {username, token} = action.payload
			state.user = username
			state.token = token
		},
		clear: (state) => {
			state.user = ''
			state.token = ''
		},
	},
})

export const {setAuth, clear} = authSlice.actions

export const handleLogin = (data) => {
	return async (dispatch) => {
		const { username, password } = data;
		try {
			const user = await loginService.login({ username, password })
			dispatch(setAuth(user))
			window.localStorage.setItem('username', JSON.stringify(user.username))
			console.log(user)
		} catch (exception) {
			dispatch(notif('Invalid username or password'), 60)
			console.log('Invalid username or password')
		}
	}
}

export default authSlice.reducer