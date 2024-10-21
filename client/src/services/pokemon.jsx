import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/pokemon';

const getAll = () => {
	const req = axios.get(baseUrl);
	return req.then(res => res.data.results);
};

const getOne = (name) => {
	const req = axios.get(`${baseUrl}/${name}`);
	return req.then(res => res.data);
};

export default { getAll, getOne };