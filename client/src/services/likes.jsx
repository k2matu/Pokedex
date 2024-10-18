import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/likes';

let token = null;

const setToken = newToken => {
	token = `Bearer ${newToken}`;
};

const getAll = () => {
	const req = axios.get(baseUrl);
}

const create = (newObject, token) => {
	return axios.post(baseUrl, newObject, {
		headers: {
			Authorization: token,
		},
	});
};

export default { create };