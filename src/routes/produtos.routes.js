const express = require("express");
const router = express.Router();

const produtosController = require("../controllers/produtos.controller");

router.get("/", produtosController.listarProdutos);
router.post("/", produtosController.criarProduto);


module.exports = router;