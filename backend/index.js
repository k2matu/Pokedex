const express = require('express')
const axios = require('axios')
const app = express()
const baseUrl = 'https://pokeapi.co/api/v2/pokemon'

const cors = require('cors')
app.use(cors())

app.get('/api/pokemon', async (req, res) => {
	try {
		const apiRes = await axios.get(`${baseUrl}?limit=151`)
		const data = apiRes.data
		res.json(data)
	} catch (error) {
		res.status(500).json({error: 'Failed to fetch data'})
	}
})

app.get('/api/pokemon/:name', async (req, res) => {
	try {
		const name = req.params.name
		const apiRes = await axios.get(`${baseUrl}/${name}`)
		const data = apiRes.data
		res.json(data)
	} catch (error) {
		res.status(500).json({error: 'Failed to fetch data'})
	}
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)