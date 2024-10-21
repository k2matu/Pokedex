import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/user';

const getAll = () => {
	const req = axios.get(baseUrl);
	return req.then(res => res.data);
};

const getOne = (name) => {
	const req = axios.get(`${baseUrl}/${name}`);
	return req.then(res => res.data);
};

const create = (newObject) => {
	const req = axios.post(baseUrl, newObject);
	return req.then(res => res.data);
};

const remove = (name) => {
	const req = axios.delete(`${baseUrl}/${name}`);
	return req.then(res => res.data);
};

const updateUsername = (name, { username }) => {
	const req = axios.patch(`${baseUrl}/${name}/username`,
		{ username });
	return req.then(res => res.data);
};

const updatePassword = (name, { oldPassword, newPassword }) => {
	const req = axios.patch(`${baseUrl}/${name}/password`, {
		oldPassword,
		newPassword
	});
	return req.then(res => res.data);
};


export default {
	getAll,
	getOne,
	create,
	updateUsername,
	updatePassword,
	remove
};