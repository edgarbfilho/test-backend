import 'reflect-metadata'
import { VercelRequest, VercelResponse } from '@vercel/node'
import { NestFactory } from '@nestjs/core'
import { AppModule } from '../src/app.module'
import { ExpressAdapter } from '@nestjs/platform-express'
import * as express from 'express'

const server = express()
let appPromise: Promise<any>

async function bootstrap() {
  if (!appPromise) {
    appPromise = (async () => {
      const app = await NestFactory.create(AppModule, new ExpressAdapter(server))

      app.enableCors({
        origin: '*',
        credentials: true,
      })

      await app.init()
      return server
    })()
  }

  return appPromise
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const app = await bootstrap()
  return app(req, res)
}
