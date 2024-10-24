const likesRouter = require('express').Router();
const pool = require('../utils/db');
const { getTokenFrom, validateToken } = require('../utils/auth');
const { checkIfExist } = require('../utils/dbHelpers');

const handleLike = async (pokemonName, decodedToken, index) => {
	await pool.query(
		`INSERT INTO pokemons (name, index)
					VALUES ($1, $2)
					ON CONFLICT (name) DO NOTHING;`,
		[pokemonName, index],
	);

	const pokemonResult = await pool.query(
		'SELECT id FROM pokemons WHERE name = $1;',
		[pokemonName],
	);
	const userResult = await pool.query('SELECT * FROM users WHERE id = $1;', [
		decodedToken.id,
	]);

	const user = checkIfExist(userResult, 'User');
	const pokemon = checkIfExist(pokemonResult, 'Pokemon');

	const userId = user.id;
	const pokemonId = pokemon.id;

	const userPokemonResult = await pool.query(
		`
		SELECT * FROM user_pokemon
		WHERE user_id = $1 AND pokemon_id = $2;`,
		[user.id, pokemon.id],
	);

	if (userPokemonResult.rows.length > 0) {
		await pool.query(
			`
				DELETE FROM user_pokemon WHERE user_id = $1 and pokemon_id = $2;`,
			[userId, pokemonId],
		);
	} else {
		await pool.query(
			`INSERT INTO user_pokemon (user_id, pokemon_id, liked)
							VALUES ($1, $2, TRUE)
							ON CONFLICT (user_id, pokemon_id) 
							DO UPDATE SET liked = EXCLUDED.liked;`,
			[userId, pokemonId],
		);
	}
};

// Create a new like
likesRouter.post('/', async (req, res, next) => {
	const { pokemonName, index } = req.body;

	try {
		const token = getTokenFrom(req);
		const decodedToken = await validateToken(token);
		await handleLike(pokemonName, decodedToken, index);
		return res.status(200).json({ message: 'Like added successfully!' });
	} catch (err) {
		next(err);
	}
});

// Get all likes
likesRouter.get('/', async (req, res, next) => {
	try {
		const result = await pool.query(`
			SELECT users.username, pokemons.name
			FROM users
			JOIN user_pokemon ON users.id = user_pokemon.user_id
			JOIN pokemons ON pokemons.id = user_pokemon.pokemon_id
			WHERE user_pokemon.liked = TRUE;`);

		res.json(result.rows);
	} catch (err) {
		next(err);
	}
});

// Get user like
likesRouter.get('/:userName', async (req, res, next) => {
	const { userName } = req.params;
	try {
		const result = await pool.query(
			`
			SELECT pokemons.name, pokemons.index
			FROM users
			JOIN user_pokemon ON users.id = user_pokemon.user_id
			JOIN pokemons ON pokemons.id = user_pokemon.pokemon_id
			WHERE users.username = $1 AND user_pokemon.liked = TRUE;`,
			[userName],
		);

		checkIfExist(result, 'Pokemon likes');
		res.json(result.rows);
	} catch (err) {
		next(err);
	}
});

module.exports = likesRouter;
