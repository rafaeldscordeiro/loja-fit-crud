📦 Loja Fit CRUD API

API REST desenvolvida para estudo de backend e automação de testes, simulando uma loja fitness com venda de bermudas e regatas.

🚀 Tecnologias

Node.js

Express

PostgreSQL

Cypress (testes automatizados)

Postman (testes manuais)

📌 Funcionalidades

Criar produto

Listar produtos

Buscar produto por ID

Atualizar produto

Deletar produto

Validações de regra de negócio

Tratamento adequado de erros (400 / 404 / 500)

Testes automatizados E2E com Cypress

🗄️ Banco de Dados

Tabela produtos:

id (SERIAL)

nome (TEXT)

tipo (BERMUDA ou REGATA)

preco (NUMERIC > 0)

estoque (INT >= 0)

criado_em (TIMESTAMP)

▶️ Como rodar o projeto
1️⃣ Instalar dependências
npm install
2️⃣ Configurar banco PostgreSQL

Criar database:

CREATE DATABASE loja_fit;

Executar schema da tabela produtos.

3️⃣ Iniciar API
npm start

Servidor rodando em:

http://localhost:3000
🧪 Testes Automatizados (Cypress)

Abrir interface:

npm run cy:open

Rodar em modo headless:

npm run cy:run

Cobertura:

Health check

CRUD completo

Cenários negativos (400 / 404)

📂 Estrutura do Projeto
src/
  controllers/
  routes/
  db/
cypress/
  e2e/
🎯 Objetivo

Projeto desenvolvido com foco em:

Estruturação de API REST

Integração com banco relacional

Boas práticas de validação

Automação de testes de API

Construção de portfólio para QA / Testes Automatizados
