import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Serviço do Prisma que centraliza a conexão com o banco de dados.
// Implementa hooks do ciclo de vida do Nest para conectar e desconectar automaticamente.
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // Executado quando o módulo é inicializado.
  async onModuleInit() {
    await this.$connect();
  }

  // Executado quando o módulo é destruído/encerrado.
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
