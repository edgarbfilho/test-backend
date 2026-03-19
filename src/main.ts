import 'dotenv/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

// Função principal responsável por iniciar a aplicação NestJS.
async function bootstrap() {
  // Cria a instância da aplicação usando o módulo raiz.
  const app = await NestFactory.create(AppModule)

  // Habilita CORS para o frontend
  app.enableCors({
    origin: 'http://localhost:3000', // URL do frontend Next.js
    credentials: true,                // permite enviar cookies ou headers de autenticação
  })

  // Inicia o servidor HTTP na porta 4000.
  await app.listen(4000)
  console.log('Backend rodando em http://localhost:4000')
}

// Executa o bootstrap para subir a aplicação.
bootstrap()
