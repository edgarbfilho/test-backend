import { Module } from '@nestjs/common'
import { IndicadoresModule } from './indicadores/indicadores.module'

@Module({
  imports: [IndicadoresModule],
})
export class AppModule {}
