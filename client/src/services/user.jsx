import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/user'

const getAll = () => {
	return axios.get(baseUrl)
}

const getOne = (name) => {
	return axios.get(`${baseUrl}/${name}`)
}

const create = (newObject) => {
	return axios.post(baseUrl, newObject)
}

const remove = (name) => {
	return axios.delete(`${baseUrl}/${name}`)
}

const update = (name, newObject) => {
	const req = axios.put(`${baseUrl}/${name}`, newObject)
	return req.then(res => res.data)
}

export default { getAll, getOne, create, update, remove }