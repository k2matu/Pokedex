CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(30) NOT NULL UNIQUE,
	password_hash VARCHAR (255) NOT NULL,
	email VARCHAR (255) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pokemons (
	id SERIAL PRIMARY KEY,
	index INTEGER NOT NULL UNIQUE,
	name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS user_pokemon (
	user_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
	pokemon_id INTEGER REFERENCES pokemons (id) ON DELETE CASCADE,
	liked BOOLEAN NOT NULL,
	PRIMARY KEY(user_id, pokemon_id)
);