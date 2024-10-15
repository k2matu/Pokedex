import { createSlice } from "@reduxjs/toolkit";

const notifSlice = createSlice({
	name: "notification",
	initialState: {
		notis: "",
		visible: false,
	},
	reducers: {
		setNotif(state, action) {
			state.notis = action.payload;
			state.visible = true;
		},
		removing(state) {
			state.notis = ""
			state.visible = false
		},
	},
})

export const { setNotif, removing } = notifSlice.actions

let timeoutId
export const notif = (content, seconds) => {
	return async (dispatch) => {
		if (timeoutId) {
			clearTimeout(timeoutId)
		}
		dispatch(setNotif(content))
		timeoutId = setTimeout(() => {
			dispatch(removing())
		}, seconds * 1000)
	}
}

export default notifSlice.reducer;