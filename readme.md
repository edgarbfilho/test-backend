# Projeto Frontend e Backend

Para rodar o projeto, primeiro configure o backend. Copie os arquivos do repositório do backend para sua máquina e, na raiz do projeto, crie um arquivo `.env` com os dados do banco de dados, por exemplo: `DATABASE_URL="mysql://user_test:A.../sofman"`, substituindo `A...` pela senha correta. Em seguida, abra o terminal no VSCode e execute `docker-compose up --build`. O backend ficará disponível na porta 4000. Para testar, você pode acessar no navegador `http://localhost:4000/maintenance/reports/performance-indicator?startDate=2025-11-17&endDate=2025-12-17`.

No frontend, abra o arquivo `src/lib/api.ts` e altere a URL do backend para a porta 4000, assim: `export const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000' })`. O frontend deve rodar na porta 3000 para evitar problemas de CORS com o backend. Certifique-se de que o backend esteja rodando antes de iniciar o frontend.
