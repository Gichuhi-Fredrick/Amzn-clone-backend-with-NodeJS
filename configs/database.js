const { Pool } = require("pg");

const connectionString =
  "postgresql://dbuser:secretpassword@database.server.com:3211/mydb";

const pool = new Pool({
  connectionString: connectionString,
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "GichuhiGit",
  port: 5432,
});

module.exports = pool;
