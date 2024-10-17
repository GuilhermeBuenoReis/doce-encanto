# 🍰 Doce Encanto - Backend

**Doce Encanto** é o backend de um sistema de e-commerce para uma confeitaria, desenvolvido para gerenciar produtos, pedidos e usuários. Esta aplicação foi construída com foco em desempenho e escalabilidade, utilizando tecnologias modernas como **Fastify**, **TypeScript**, **Prisma**, e **PostgreSQL**.

## 🚀 Tecnologias Utilizadas

- **[Fastify](https://www.fastify.io/)**: Framework web rápido e eficiente.
- **[TypeScript](https://www.typescriptlang.org/)**: Superset do JavaScript com tipagem estática.
- **[Prisma](https://www.prisma.io/)**: ORM moderno para bancos de dados SQL.
- **[PostgreSQL](https://www.postgresql.org/)**: Sistema de banco de dados relacional.
- **[Zod](https://github.com/colinhacks/zod)**: Biblioteca para validação de schemas.
- **[Vitest](https://vitest.dev/)**: Framework de testes unitários.
- **[pnpm](https://pnpm.io/)**: Gerenciador de pacotes rápido e eficiente.

## 📦 Instalação

Siga os passos abaixo para rodar o projeto localmente:

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/GuilhermeBuenoReis/doce-encanto.git
   ```

2. **Entre no diretório do projeto**:
   ```bash
   cd doce-encanto-backend
   ```

3. **Instale as dependências**:
   ```bash
   pnpm install
   ```

4. **Configure o banco de dados**:
   Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
   ```env
   DATABASE_URL="postgresql://docker:docker@localhost:5432/doceencanto"
   ```

5. **Execute as migrações do banco de dados**:
   ```bash
   pnpm prisma migrate dev
   ```

6. **Inicie o servidor**:
   ```bash
   pnpm dev
   ```

   O servidor estará rodando em `http://localhost:3000`.

## 🧪 Testes

Para rodar os testes, use o comando:

```bash
pnpm test
```

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto.
2. Crie uma nova branch:
   ```bash
   git checkout -b minha-nova-feature
   ```
3. Faça suas alterações e submeta um pull request.

## 📜 Licença

Este projeto está licenciado sob a licença MIT.
