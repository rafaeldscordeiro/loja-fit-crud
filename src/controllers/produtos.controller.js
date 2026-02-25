const pool = require("../db/connection");

exports.listarProdutos = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM produtos ORDER BY id");
    res.json(result.rows);
  } catch (error) {
  return res.status(500).json({ error: "erro interno do servidor" });
}
};

exports.criarProduto = async (req, res) => {
  try {
    const { nome, tipo, preco, estoque } = req.body;

    if (!nome || !tipo || preco === undefined || estoque === undefined) {
      return res.status(400).json({ error: "nome, tipo, preco e estoque são obrigatórios" });
    }

    if (!["BERMUDA", "REGATA"].includes(tipo)) {
      return res.status(400).json({ error: "tipo deve ser BERMUDA ou REGATA" });
    }

    if (typeof preco !== "number" || preco <= 0) {
      return res.status(400).json({ error: "preco deve ser número > 0" });
    }

    if (!Number.isInteger(estoque) || estoque < 0) {
      return res.status(400).json({ error: "estoque deve ser inteiro >= 0" });
    }

    const result = await pool.query(
      `
      INSERT INTO produtos (nome, tipo, preco, estoque)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [nome, tipo, preco, estoque]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Erro ao criar produto:", error);

    if (error.code === "23514") {
      return res.status(400).json({ error: "dados inválidos (restrição do banco)" });
    }

    if (error.code === "23502") {
      return res.status(400).json({ error: "campo obrigatório ausente" });
    }

    if (error.code === "23505") {
      return res.status(400).json({ error: "registro duplicado" });
    }

    return res.status(500).json({ error: "erro interno do servidor" });
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


exports.atualizarProduto = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nome, tipo, preco, estoque } = req.body;

    // Validações (só quando o campo vem no body)
    if (tipo !== undefined && !["BERMUDA", "REGATA"].includes(tipo)) {
      return res.status(400).json({ error: "tipo deve ser BERMUDA ou REGATA" });
    }

    if (preco !== undefined && (typeof preco !== "number" || preco <= 0)) {
      return res.status(400).json({ error: "preco deve ser número > 0" });
    }

    if (estoque !== undefined && (!Number.isInteger(estoque) || estoque < 0)) {
      return res.status(400).json({ error: "estoque deve ser inteiro >= 0" });
    }

    const result = await pool.query(
      `
      UPDATE produtos
      SET
        nome = COALESCE($2, nome),
        tipo = COALESCE($3, tipo),
        preco = COALESCE($4, preco),
        estoque = COALESCE($5, estoque)
      WHERE id = $1
      RETURNING *
      `,
      [id, nome ?? null, tipo ?? null, preco ?? null, estoque ?? null]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "produto não encontrado" });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);

    if (error.code === "23514") {
      return res.status(400).json({ error: "dados inválidos (restrição do banco)" });
    }

    return res.status(500).json({ error: "erro interno do servidor" });
  }
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
  console.error("Erro ao deletar produto:", error);
  return res.status(500).json({ error: "erro interno do servidor" });
}
};


