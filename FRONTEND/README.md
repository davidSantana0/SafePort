# 🌊 SafePort — Frontend

> Interface do sistema **SafePort**, desenvolvida para proporcionar uma experiência **clara, acessível e intuitiva** no processo de **cadastro e login de usuários**.
>
> ⚠️ **Atenção:** o foco principal do projeto é o **backend**.
> Este repositório/documentação descreve **exclusivamente o frontend** da aplicação.

---

## Visão Geral

O frontend do **SafePort** representa a **camada visual e de interação** com o usuário.
Ele consome uma API backend responsável por toda a lógica de negócio, validações críticas e segurança.

Este frontend foi pensado para:

* Facilitar a navegação do usuário
* Garantir clareza no preenchimento de formulários
* Oferecer feedback visual e textual em cada ação
* Integrar-se de forma direta e simples com o backend via HTTP

---

## Objetivos do Frontend

* Interface limpa e intuitiva
* Validações básicas no lado do cliente
* Comunicação eficiente com a API
* Boa experiência do usuário (UX)
* Código organizado e fácil de manter

---

## Páginas do Sistema

### Página Inicial (`index.html`)

Página institucional de apresentação do projeto.

Funcionalidades:

* Introdução ao SafePort
* Destaque para segurança e privacidade dos dados
* Chamada para ação (cadastro)
* Links de contato e redes sociais (WhatsApp, Instagram e Email)

---

### Cadastro (`register.html`)

Página responsável pela criação de novos usuários.

Funcionalidades:

* Validação de campos obrigatórios
* Validação de idade mínima (10 anos)
* Seleção de gênero
* Confirmação de senha
* Tooltips explicativos para auxiliar o usuário
* Envio de dados para o backend via `POST /register`

---

### Login (`login.html`)

Página responsável pela autenticação do usuário.

Funcionalidades:

* Validação de email e senha
* Regra mínima de senha (8 caracteres)
* Envio de dados para o backend via `POST /login`
* Redirecionamento dinâmico após login bem-sucedido

---

### ℹ️ Sobre (`about.html`)

Página institucional do projeto.

Conteúdo:

* Quem somos
* Propósito do SafePort
* Tecnologias utilizadas
* Diferenciais da plataforma
* Visão e objetivos futuros

Inclui:

* Efeito de **scroll snap**
* Seções visuais com imagens de fundo
* Estrutura focada em leitura fluida

---

## Estilização (CSS)

O projeto utiliza **CSS puro**, organizado por responsabilidade para facilitar manutenção e escalabilidade:

* `global.css` → reset e estilos globais
* `style.css` → página inicial
* `login.css` → tela de login
* `register.css` → tela de cadastro
* `about.css` → página institucional

Destaques visuais:

* Layout responsivo
* Glassmorphism e efeitos de blur
* Animações suaves
* Scroll controlado por seção
* Tipografia moderna (**Roboto Mono**)

---

## JavaScript (Frontend)

O JavaScript é responsável por toda a lógica de interação no cliente:

* Validação de formulários
* Controle de envio de dados
* Exibição de mensagens e tooltips
* Integração com o backend usando **Fetch API**
* Redirecionamento com base no `user.id` retornado pela API

 Nenhuma regra crítica de segurança é implementada no frontend.

---

## 🔗 Integração com Backend

O frontend espera que o backend esteja disponível em:

```
http://localhost:3000
```

### Rotas consumidas:

* `POST /register`
* `POST /login`

O redirecionamento do usuário ocorre de forma dinâmica, considerando ambientes de desenvolvimento ou produção.

---

## Estrutura de Pastas (Frontend)

```
src/
 ├── css/
 │   ├── stylesheet/
 │   │   └── global.css
 │   ├── style.css
 │   ├── login.css
 │   ├── register.css
 │   └── about.css
 ├── js/
 │   ├── login.js
 │   └── register.js
 ├── components/
 │   ├── login.html
 │   ├── register.html
 │   └── about.html
public/
 ├── resources/
 │   ├── images/
 │   └── icons/
```

---

## Observações Importantes

* Segurança real é responsabilidade exclusiva do **backend**
* O frontend atua apenas como camada de apresentação
* Nenhum dado sensível é armazenado no cliente
* Estrutura preparada para futuras melhorias visuais e funcionais

---

## Contexto do Projeto

O **SafePort** foi desenvolvido com **ênfase total no backend**, priorizando segurança, validações e boas práticas.

O frontend existe para fornecer uma interface funcional, clara e agradável, servindo como ponte entre o usuário final e a API.

A documentação completa do backend está disponível em seu respectivo repositório.

---

## 📜 Licença

Projeto de caráter educacional e demonstrativo.
© 2025 — **SafePort**
