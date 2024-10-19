const pokemonRouter = require('express').Router();
const axios = require('axios');
const baseUrl = 'https://pokeapi.co/api/v2/pokemon';

// Get all 151 original pokemons
pokemonRouter.get('/', async (req, res) => {
	try {
		const apiRes = await axios.get(`${baseUrl}?limit=151`);
		const data = apiRes.data;
		res.json(data);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch data' });
	}
});

// Get pokemon by name
pokemonRouter.get('/:name', async (req, res) => {
	try {
		const name = req.params.name;
		const apiRes = await axios.get(`${baseUrl}/${name}`);
		const data = apiRes.data;

		const abilities = data.abilities.map(({ ability }) => ({
			name: ability.name,
		}));

		const id = data.id;
		const weight = data.weight;
		const height = data.height;
		const types = data.types.map(({ type }) => ({
			name: type.name,
		}));

		const response = {
			id,
			abilities,
			weight,
			height,
			types,
		};
		res.json(response);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch data' });
	}
});

module.exports = pokemonRouter;
