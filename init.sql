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

INSERT INTO users (username, password_hash, email) VALUES 
	('kim', '$2a$10$1QGGqL1/jQscUL0DrIHlc.ACY5QKuaWsCePtB1fOrjgsY.xFGAYDm', 'kim@gmail.com'),
	('lily', '$2a$10$nY48CQCzg6l6Z9P4BH3b3.sn3M9rdokx96QPJjzLAAgdhHRnDVWPC', 'lily@gmail.com');
	
INSERT INTO pokemons (index, name) VALUES
	(142, 'aerodactyl'),
	(113, 'chansey'),
	(4, 'charmander'),
	(25, 'pikachu'),
	(122, 'mr-mime'),
	(30, 'nidorina');

INSERT INTO user_pokemon (user_id, pokemon_id, liked) VALUES
	(2, 1, true),
	(2, 2, true),
	(2, 3, true),
	(2, 4, true),
	(1, 4, true),
	(1, 6, true);