import 'reflect-metadata'
import type { VercelRequest, VercelResponse } from '@vercel/node'
let appPromise: Promise<any>

async function bootstrap() {
  if (!appPromise) {
    appPromise = (async () => {
      const [{ NestFactory }, { ExpressAdapter }, { AppModule }] = await Promise.all([
        import('@nestjs/core'),
        import('@nestjs/platform-express'),
        import('../src/app.module'),
      ])

      const expressModule = await import('express')
      const express = (expressModule as any).default ?? expressModule
      const server = express()

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
  try {
    const app = await bootstrap()
    return app(req, res)
  } catch (error: any) {
    console.error('Erro ao iniciar função na Vercel:', error)
    return res.status(500).json({
      success: false,
      message: 'Erro interno ao iniciar API',
      error: error?.message ?? 'Erro desconhecido',
      stack: error?.stack,
    })
  }
}
