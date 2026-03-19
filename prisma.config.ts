// Importa o helper oficial do Prisma para tipar e validar a configuração.
import { defineConfig } from 'prisma/config'

// Exporta a configuração do Prisma para ser usada pelos comandos do CLI
// (ex.: migrate, generate, db push).
export default defineConfig({
  // Define as fontes de dados (bancos) que o Prisma vai usar.
  datasources: {
    // "db" é o nome da datasource principal (mesmo nome usado no schema.prisma).
    db: {
      // Lê a string de conexão do ambiente.
      // O "!" (non-null assertion) informa ao TypeScript que essa variável deve existir.
      url: process.env.DATABASE_URL!,
    },
  },
})
