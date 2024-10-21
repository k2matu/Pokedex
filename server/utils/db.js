const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool({
  connectionString: process.env.PG_CONNECTION_STRING,
});

module.exports = pool;
