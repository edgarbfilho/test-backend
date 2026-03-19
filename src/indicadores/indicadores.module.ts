import { Module } from '@nestjs/common';
import { IndicadoresService } from './indicadores.service';
import { IndicadoresController } from './indicadores.controller';
import { PrismaModule } from '../prisma/prisma.module';

// Módulo de indicadores.
// Agrupa controller, service e dependências necessárias para esse domínio.
@Module({
  // Importa o módulo do Prisma para acesso ao banco de dados.
  imports: [PrismaModule],
  // Registra os providers (regras de negócio) do módulo.
  providers: [IndicadoresService],
  // Registra os controllers (rotas HTTP) do módulo.
  controllers: [IndicadoresController],
  // Exporta o service caso outros módulos precisem reutilizá-lo.
  exports: [IndicadoresService],
})
export class IndicadoresModule {}
