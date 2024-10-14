require('dotenv').config()

const config = {
	PG_HOST: process.env.PG_HOST || 'localhost',
	PG_PORT: process.env.PG_PORT || 5432,
  PG_USER: process.env.PG_USER || 'postgres',
  PG_PASSWORD: process.env.PG_PASSWORD || 'mysecretpassword',
  PG_DATABASE: process.env.PG_DATABASE || 'pokedex_db',
	PORT: process.env.PORT || 3001,
}

module.exports = config