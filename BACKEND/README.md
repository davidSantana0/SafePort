# 🚢 SafePort — Backend

> Backend do sistema **SafePort**, responsável por **autenticação**, **cadastro de usuários**, **validações**, **criptografia de senhas** e **integração com banco de dados PostgreSQL**.
>
> 🔐 Este repositório representa o **núcleo do projeto**, onde toda a lógica crítica, regras de negócio e segurança são centralizadas.

---

## Visão Geral

O backend do **SafePort** foi projetado para ser **robusto, seguro e organizado**, servindo como a base da aplicação.

Toda decisão crítica — como validações, proteção de dados e comunicação com o banco — é tratada exclusivamente no servidor, garantindo maior segurança e controle.

Princípios adotados no desenvolvimento:

* Segurança desde a origem dos dados
* Código modular e bem organizado
* Separação clara de responsabilidades
* Boas práticas de desenvolvimento backend
* Facilidade de manutenção e evolução

---

## Responsabilidades do Backend

O backend é responsável por:

* Cadastro de usuários
* Autenticação e validação de login
* Validação de dados recebidos do cliente
* Criptografia de senhas antes do armazenamento
* Comunicação segura com o banco de dados
* Renderização de páginas protegidas
* Padronização das respostas da API
* Controle de erros e status HTTP

---

## Tecnologias Utilizadas

* **Node.js** — ambiente de execução
* **Express** — framework web
* **PostgreSQL** — banco de dados relacional
* **pg (Pool)** — gerenciamento de conexões
* **bcrypt** — criptografia de senhas
* **dotenv** — variáveis de ambiente
* **cors** — controle de acesso
* **Express Handlebars (HBS)** — renderização de páginas

---

## 🌐 Rotas da API

### Cadastro de Usuário

**POST `/register`**

Cria um novo usuário no sistema, aplicando múltiplas validações antes da persistência dos dados.

Validações realizadas:

* Verificação de campos obrigatórios
* Aceita apenas endereços de email Gmail
* Prefixo do email com no mínimo 4 letras
* Verificação de email já cadastrado
* Criptografia da senha antes de salvar no banco

**Resposta de sucesso:**

```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "nome": "David"
  }
}
```

---

### Login

**POST `/login`**

Responsável pela autenticação do usuário no sistema.

Validações realizadas:

* Verificação de email e senha
* Confirmação da existência do usuário
* Comparação da senha informada com o hash armazenado
* Retorno de mensagens claras para erro ou sucesso

**Resposta de sucesso:**

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "nome": "David"
  }
}
```

---

### Home

**GET `/home/:id`**

Rota protegida responsável por:

* Buscar o usuário pelo ID
* Validar a existência do registro
* Renderizar uma página personalizada com Handlebars
* Exibir uma mensagem de boas-vindas ao usuário autenticado

---

## Banco de Dados

O projeto utiliza **PostgreSQL**, com conexão realizada via **Pool**, garantindo desempenho, reutilização de conexões e maior controle.

Configuração esperada no arquivo `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=safeport
```

---

## Testes da API

Durante o desenvolvimento, o backend foi testado utilizando duas abordagens:

* 🌐 **Browser**
  Utilizado principalmente para testar rotas `GET`, como a renderização da página `/home/:id`.

* 🧰 **Postman**
  Utilizado para testar rotas `POST`, como:

  * `/register`
  * `/login`

Os testes incluíram:

* Envio de dados em formato JSON
* Validação de respostas de erro
* Confirmação de respostas de sucesso
* Verificação correta dos códigos HTTP

---

## Estrutura de Pastas (Backend)

```
src/
 ├── app.js
 ├── server.js
 ├── routes/
 │   └── routeUser.js
 ├── controllers/
 │   ├── authController.js
 │   └── userController.js
 ├── config/
 │   └── Db.js
 ├── utils/
 │   └── bcryptHelper.js
 ├── views/
 │   ├── layout/
 │   │   └── main.hbs
 │   └── home.hbs
```

---

## Segurança

* Senhas armazenadas apenas em formato criptografado (**bcrypt**)
* Nenhuma senha é exposta ou retornada ao cliente
* Validações executadas exclusivamente no backend
* Estrutura preparada para futuras implementações (JWT, sessões, etc.)

---

## Observações Importantes

* O backend funciona de forma independente do frontend
* Pode ser consumido por qualquer tipo de cliente (web, mobile, etc.)
* Código estruturado para facilitar manutenção e evolução
* Projeto voltado para aprendizado prático e real de backend

---

## Contexto do Projeto

O **SafePort** foi desenvolvido com **ênfase total no backend**, priorizando segurança, organização e boas práticas.

O frontend atua apenas como camada de interface, enquanto toda a lógica sensível permanece protegida no servidor.

---

## 📜 Licença

Projeto de caráter educacional e demonstrativo.
© 2025 — **SafePort**
