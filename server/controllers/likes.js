const jwt = require('jsonwebtoken');
const likesRouter = require('express').Router();
const pool = require('../utils/db');

// Function to extract token from request headers
const getTokenFrom = req => {
    const authorization = req.get('authorization');
    if (authorization) {
        return authorization;
    }
    return null;
};

// POST route for liking a Pokémon
likesRouter.post('/', async (req, res) => {
    const { pokemonName } = req.body;
    console.log(pokemonName);
    
    const token = getTokenFrom(req);
    if (!token) {
        return res.status(401).json({ error: 'token missing' });
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.SECRET);
    } catch (error) {
        return res.status(401).json({ error: 'token invalid' });
    }

    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token invalid' });
    }

    try {
        // Insert Pokémon into the pokemons table if it doesn't exist
        await pool.query(
            `INSERT INTO pokemons (name)
            VALUES ($1)
            ON CONFLICT (name) DO NOTHING`,
            [pokemonName]
        );

        // Get the Pokémon ID and user ID
        const pokemonResult = await pool.query('SELECT id FROM pokemons WHERE name = $1', [pokemonName]);
        const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [decodedToken.id]);

        // Check if the Pokémon exists
        if (pokemonResult.rows.length === 0) {
            return res.status(404).json({ error: 'Pokémon not found' });
        }

        // Check if the user exists
        if (userResult.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid user' });
        }

        const userId = userResult.rows[0].id;
        const pokemonId = pokemonResult.rows[0].id;

        // Insert the user-pokemon relationship
        await pool.query(
            `INSERT INTO user_pokemon (user_id, pokemon_id, liked)
            VALUES ($1, $2, TRUE)
            ON CONFLICT (user_id, pokemon_id) 
            DO UPDATE SET liked = EXCLUDED.liked`,
            [userId, pokemonId]
        );

        return res.status(200).json({ message: 'Like added successfully!' });
    } catch (error) {
        console.error('Error while processing like:', error);
        return res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
});

module.exports = likesRouter;
