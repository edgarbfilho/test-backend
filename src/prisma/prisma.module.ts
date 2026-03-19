import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// Módulo responsável por disponibilizar o PrismaService para toda a aplicação.
@Module({
  // Registra o provider de acesso ao banco.
  providers: [PrismaService],
  exports: [PrismaService], // assim outros módulos podem usar
})
export class PrismaModule {}
