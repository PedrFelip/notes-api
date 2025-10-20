# 📝 Notes API

API REST simples para gerenciamento de notas com Node.js, Fastify, TypeScript e Prisma.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Fastify** - Framework web
- **TypeScript** - Tipagem estática
- **Prisma** - ORM
- **Zod** - Validação de dados
- **PostgreSQL** - Banco de dados
- **Docker** - Containerização

## 🔧 Instalação e Uso

### 1. Clone e instale

```bash
git clone https://github.com/PedrFelip/notes-api.git
cd notes-api
npm install
```

### 2. Configure o ambiente

Crie um arquivo `.env` baseado no exemplo abaixo (ou copie o `.env.example`):

```bash
cp .env.example .env
```

Conteúdo do `.env.example`:

```env
POSTGRES_USER=notes_user
POSTGRES_PASSWORD=notes_123
POSTGRES_DB=notes_db

# para o prisma
DATABASE_URL="postgresql://notes_user:notes_123@localhost:5432/notes_db?schema=public"
```

### 3. Inicie o banco de dados

```bash
docker-compose up -d
```

### 4. Execute as migrações

```bash
npx prisma generate
npx prisma migrate dev
```

### 5. Inicie o servidor

```bash
npm start
```

Servidor rodando em: `http://localhost:3000`

## 📚 Endpoints

### Criar Nota
```http
POST /api/notes
```
```json
{
  "titulo": "Minha nota",
  "conteudo": "Conteúdo da nota"
}
```

### Buscar Nota
```http
GET /api/notes/read/:id
```

### Atualizar Nota
```http
PATCH /api/notes/update/:id
```
```json
{
  "titulo": "Novo título",
  "conteudo": "Novo conteúdo"
}
```

### Deletar Nota
```http
DELETE /api/notes/delete/:id
```

### Health Check
```http
GET /
```

## 🏗️ Estrutura

```
src/
├── modules/
│   └── notes/
│       ├── dto/notes.schema.ts       # Validações Zod
│       ├── note.controller.ts        # Handlers HTTP
│       ├── note.service.ts           # Lógica de negócio
│       ├── note.repository.ts        # Acesso ao banco
│       └── notes.routes.ts           # Rotas
└── index.ts                          # Servidor
```

## � Modelo de Dados

```typescript
{
  id: string         // UUID
  titulo: string     // 2-100 caracteres
  conteudo: string   // 10-1000 caracteres
  createdAt: Date
  updatedAt: Date
}
```

## 🎯 Validações

- Título: 2 a 100 caracteres
- Conteúdo: 10 a 1000 caracteres
- ID: deve ser UUID válido
- Títulos duplicados são automaticamente numerados
---

Desenvolvido por [Pedro Felipe](https://github.com/PedrFelip)

