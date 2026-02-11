const express = require("express");
const router = express.Router();

const produtosController = require("../controllers/produtos.controller");

router.get("/", produtosController.listarProdutos);
router.post("/", produtosController.criarProduto);
router.get("/:id", produtosController.buscarProdutoPorId);
router.put("/:id", produtosController.atualizarProduto);
router.delete("/:id", produtosController.deletarProduto);



module.exports = router;