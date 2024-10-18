const jwt = require('jsonwebtoken');
const likesRouter = require('express').Router();
const pool = require('../utils/db');
const { checkIfExist } = require('./user');
const { getTokenFrom, validateToken } = require('../utils/auth')


const handleLike = async (pokemonName, decodedToken) => {
	await pool.query(
		`INSERT INTO pokemons (name)
					VALUES ($1)
					ON CONFLICT (name) DO NOTHING`,
		[pokemonName],
	);

	const pokemonResult = await pool.query(
		'SELECT id FROM pokemons WHERE name = $1',
		[pokemonName],
	);
	const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [
		decodedToken.id,
	]);
	
	const user = checkIfExist(userResult, 'User');
	const pokemon = checkIfExist(pokemonResult, 'Pokemon');

	const userId = user.id;
	const pokemonId = pokemon.id;

	await pool.query(
		`INSERT INTO user_pokemon (user_id, pokemon_id, liked)
					VALUES ($1, $2, TRUE)
					ON CONFLICT (user_id, pokemon_id) 
					DO UPDATE SET liked = EXCLUDED.liked`,
		[userId, pokemonId],
	);
}

// Create a new like
likesRouter.post('/', async (req, res) => {
	const { pokemonName } = req.body;

	try {
		const token = getTokenFrom(req);
		const decodedToken = await validateToken(token);
		await handleLike(pokemonName, decodedToken);
		return res.status(200).json({ message: 'Like added successfully!' });
	} catch (err) {
		next(err);
}
});

module.exports = likesRouter;
