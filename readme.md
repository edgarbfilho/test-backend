O BACKEND ESTÁ RODANDO NA PORTA 4000

PARA QUE FUNCIONE O FRONT DEVE ESTAR NA PORTA 3000 POR CONTA DO CORS.

Edite o arquivo do front src/lib/api.ts para alterar a URL do backend para a porta 4000:<br>
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
})

NO BACKEND CRIE UM ARQUIVO .env na raiz o projeto com os dados do banco:
DATABASE_URL="mysql://user_test:A.../sofman"

COPIE OS ARQUIVOS DO REPOSITÓRIO GIT BACKEND E EXECUTE O COMANDO ABAIXO NO TERMINAL DO VSCODE:
docker-compose up --build

CASO QUEIRA VISUALIZAR NO NAVEGADOR O RETORNO:
http://localhost:4000/maintenance/reports/performance-indicator?startDate=2025-11-17&endDate=2025-12-17