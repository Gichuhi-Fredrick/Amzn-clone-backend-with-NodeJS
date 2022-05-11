const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "GichuhiGit",
  port: 5432,
});

module.exports = pool;
