import axios from 'axios';
const baseUrl = '/api/likes';

let token = null;

const setToken = newToken => {
	return `Bearer ${newToken}`;
};

const getAll = () => {
	const req = axios.get(baseUrl);
	return req.then(res => res.data);
};

const getOne = (name) => {
	const req = axios.get(`${baseUrl}/${name}`);
	return req.then(res => res.data);
};

const likeOrUnlike = (newObject, token) => {
	const validToken = setToken(token);
	const req = axios.post(baseUrl, newObject, {
		headers: {
			Authorization: validToken,
		},
	});
	return req.then(res => res.data);
};

export default { setToken, getAll, getOne, likeOrUnlike };