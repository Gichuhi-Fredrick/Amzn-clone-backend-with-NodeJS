const { Pool } = require("pg");

const connectionString =
  "postgresql://dbuser:secretpassword@database.server.com:3211/mydb";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

module.exports = pool;
