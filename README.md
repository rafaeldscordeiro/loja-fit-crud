🚀 Loja Fit API
API REST com Node.js, PostgreSQL e Testes Automatizados com Cypress

------------------------------


📌 Sobre o Projeto

API REST para gerenciamento de produtos (bermudas e regatas), com foco em:

Integração com banco relacional

Validação de regras de negócio

Tratamento correto de erros HTTP

Automação de testes de API
------------------------------

🧰 Stack

Node.js

Express

PostgreSQL

Cypress (E2E)

Postman

Git

------------------------------
⚙️ Funcionalidades

Criar produto

Listar produtos

Buscar por ID

Atualizar produto

Deletar produto

Validações (tipo, preço, estoque)

Tratamento de erros (400 / 404 / 500)
------------------------------
🧪 Testes Automatizados

Cobertura implementada:

✅ Health check

✅ CRUD completo

✅ Cenários negativos

Executar:

npm run cy:open ou npm run cy:run

▶️ Como Executar
1️⃣ Instalar dependências
npm install
2️⃣ Criar banco
CREATE DATABASE loja_fit;

--Executar o schema.sql.

3️⃣ Iniciar API
npm start

Disponível em:

http://localhost:3000
------------------------------
📂 Estrutura

src/
  controllers/
  routes/
  db/
cypress/
  e2e/
  ------------------------------
🎯 Objetivo

Demonstrar competências em:

Desenvolvimento de API REST

Integração com PostgreSQL

Validações de backend

Automação de testes de API com Cypress

Organização profissional de projeto versionado