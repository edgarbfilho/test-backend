import { Module } from '@nestjs/common';
import { IndicadoresService } from './indicadores.service';
import { IndicadoresController } from './indicadores.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [IndicadoresService],
  controllers: [IndicadoresController],
  exports: [IndicadoresService],
})
export class IndicadoresModule {}
