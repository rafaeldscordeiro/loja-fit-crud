const pool = require("../db/connection");

let produtos = [
  { id: 1, nome: "Bermuda Fit Preta", tipo: "BERMUDA", preco: 79.9, estoque: 10 },
  { id: 2, nome: "Regata Dry Fit", tipo: "REGATA", preco: 49.9, estoque: 15 }
];

exports.listarProdutos = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM produtos ORDER BY id");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "erro ao buscar produtos" });
  }
};

exports.criarProduto = async (req, res) => {
  try {
    const { nome, tipo, preco, estoque } = req.body;

    if (!nome || !tipo || preco === undefined || estoque === undefined) {
      return res.status(400).json({ error: "nome, tipo, preco e estoque são obrigatórios" });
    }

    const result = await pool.query(
      `
      INSERT INTO produtos (nome, tipo, preco, estoque)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [nome, tipo, preco, estoque]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "erro ao criar produto" });
  }
};


exports.buscarProdutoPorId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await pool.query("SELECT * FROM produtos WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "produto não encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "erro ao buscar produto" });
  }
};


exports.atualizarProduto = (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, tipo, preco, estoque } = req.body;

  const produto = produtos.find(p => p.id === id);

  if (!produto) {
    return res.status(404).json({ error: "produto não encontrado" });
  }

  if (nome !== undefined) produto.nome = nome;
  if (tipo !== undefined) produto.tipo = tipo;
  if (preco !== undefined) produto.preco = preco;
  if (estoque !== undefined) produto.estoque = estoque;

  res.json(produto);
};

exports.deletarProduto = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const result = await pool.query(
      "DELETE FROM produtos WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "produto não encontrado" });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "erro ao deletar produto" });
  }
};


