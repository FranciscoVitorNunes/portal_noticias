# 📰 Portal de Notícias - Node.js + MongoDB

Este é um projeto de portal de notícias desenvolvido com **Node.js**, **Express** e **MongoDB**, que permite a criação, visualização, pesquisa e exclusão de notícias via painel administrativo.

## 🚀 Tecnologias Utilizadas

- Node.js
- Express
- MongoDB + Mongoose
- EJS (para renderização de páginas)
- Express-fileupload (upload de imagens)
- Express-session (autenticação simples de administrador)
- Body-parser

## 📁 Estrutura de Pastas

```
portal-noticias/
│
├── pages/              # Views HTML (EJS)
├── public/             # Arquivos estáticos (imagens)
│   └── images/
├── temp/               # Temporário para uploads
├── Posts.js            # Model de Postagem
├── server.js           # Arquivo principal do servidor
└── node_modules
```

## ⚙️ Funcionalidades

### 📖 Público Geral
- Ver notícias recentes na homepage
- Ver postagens populares (com mais views)
- Realizar busca por título
- Acessar uma notícia completa via `/slug`

### 🔐 Painel Administrativo
- Autenticação simples via login (usuário fixo)
- Criar nova postagem com upload de imagem `.jpg`
- Editar ou excluir postagens
- Acesso em `/admin/login`

## 📸 Cadastro de Notícias
Para cadastrar uma notícia no painel admin:
- Informe o título, conteúdo, categoria e slug
- Faça upload de imagem `.jpg`
- Imagem é salva em `/public/images/`
- Visualização é possível via `/slug`

## 🔑 Usuário de Acesso (Admin)
Usuário e senha são fixos no código:
```js
{ usuario: "admin", senha: "admin" }
```

## 🌐 Rotas principais

| Rota              | Descrição                            |
|-------------------|----------------------------------------|
| `/`               | Página inicial com listagem de posts   |
| `/admin/login`    | Tela de login e painel admin           |
| `/admin/cadastrar`| Cadastro de nova notícia               |
| `/admin/excluir/:id`| Excluir postagem pelo ID             |
| `/:slug`          | Visualizar notícia completa            |

## 📦 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seuusuario/portal-noticias.git
cd portal-noticias
```

2. Instale as dependências:
```bash
npm install
```

3. Crie o diretório `temp` (para uploads):
```bash
mkdir temp
```

4. Inicie o servidor:
```bash
node server.js
```

5. Acesse em: `http://localhost:5000`

## ✅ To-Do Futuro

- Validação de formulários
- Upload seguro (extensões e tamanho)
- Editor de texto rico (Markdown ou WYSIWYG)
- Sistema de categorias e comentários

---

Desenvolvido por Francisco Vitor.