const Pool = require('pg').Pool;

const pool = new Pool({
  user: process.env.DB_USER || 'admin',
  host: process.env.DB_HOST || '127.0.0.1',
  database: process.env.DB_NAME || 'clientDb',
  password: process.env.DB_PASSWORD || 'admin',
  port: process.env.DB_PORT || 5432,
});

module.exports = pool;
