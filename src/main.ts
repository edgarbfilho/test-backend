import 'dotenv/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Habilita CORS para o frontend
  app.enableCors({
    origin: 'http://localhost:3000', // URL do frontend Next.js
    credentials: true,                // permite enviar cookies ou headers de autenticação
  })

  await app.listen(4000)
  console.log('Backend rodando em http://localhost:4000')
}
bootstrap()
