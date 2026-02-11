let produtos = [
  { id: 1, nome: "Bermuda Fit Preta", tipo: "BERMUDA", preco: 79.9, estoque: 10 },
  { id: 2, nome: "Regata Dry Fit", tipo: "REGATA", preco: 49.9, estoque: 15 }
];

exports.listarProdutos = (req, res) => {
  res.json(produtos);
};
let proximoId = 3;

exports.criarProduto = (req, res) => {
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

  const novoProduto = { id: proximoId++, nome, tipo, preco, estoque };
  produtos.push(novoProduto);

  return res.status(201).json(novoProduto);
};

exports.buscarProdutoPorId = (req, res) => {
  const id = parseInt(req.params.id);

  const produto = produtos.find(p => p.id === id);

  if (!produto) {
    return res.status(404).json({ error: "produto não encontrado" });
  }

  res.json(produto);
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

exports.deletarProduto = (req, res) => {
  const id = parseInt(req.params.id);

  const index = produtos.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "produto não encontrado" });
  }

  produtos.splice(index, 1);

  res.status(204).send();
};

