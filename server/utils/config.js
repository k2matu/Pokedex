require('dotenv').config();

const config = {
  PG_HOST: process.env.PG_HOST || 'db-pokedex.internal',
  PG_PORT: process.env.PG_PORT || 5433,
  PG_USER: process.env.PG_USER || 'postgres',
  PG_PASSWORD: process.env.PG_PASSWORD || '',
  PG_DATABASE: process.env.PG_DATABASE || 'db-pokedex',
  PORT: process.env.PORT || 3001,
};

module.exports = config;
