import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/pokemon'

const getAll = () => {
	return axios.get(baseUrl)
}

const getOne = (name) => {
	return axios.get(`${baseUrl}/${name}`)
}

export default { getAll, getOne }