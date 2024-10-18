import { createSlice } from "@reduxjs/toolkit";

const notifSlice = createSlice({
	name: "notification",
	initialState: {
		notis: "",
		visible: false,
		type: ""
	},
	reducers: {
		setNotif(state, action) {
			state.notis = action.payload.message;
			state.visible = true;
			state.type = action.payload.type;
		},
		removing(state) {
			state.notis = "";
			state.visible = false;
			state.type = "";
		},
	},
});

export const { setNotif, removing } = notifSlice.actions;

let timeoutId;
export const notif = (content, seconds, notifType) => {
	return async (dispatch) => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		dispatch(setNotif({message: content, type: notifType})); 
		timeoutId = setTimeout(() => {
			dispatch(removing());
		}, seconds * 1000);
	};
};

export default notifSlice.reducer;