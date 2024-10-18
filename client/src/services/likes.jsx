import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/likes';

const create = (newObject, token) => {
	return axios.post(baseUrl, newObject, {
		headers: {
			Authorization: token,
		},
	});
};

export default { create };