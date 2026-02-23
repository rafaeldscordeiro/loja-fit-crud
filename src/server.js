const express = require("express");
require("./db/connection");


const app = express();
app.use(express.json());

const produtosRoutes = require("./routes/produtos.routes");
app.use("/produtos", produtosRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
