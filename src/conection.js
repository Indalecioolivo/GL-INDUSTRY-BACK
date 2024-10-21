const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "204076",
  database: "gl_industry",
});

module.exports = pool;
