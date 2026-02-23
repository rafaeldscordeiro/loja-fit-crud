const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "loja_fit",
  password: "123",
  port: 5432,
});

module.exports = pool;

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Erro ao conectar no banco", err);
  } else {
    console.log("Banco conectado:", res.rows[0]);
  }
});
