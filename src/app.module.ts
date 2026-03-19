import { Module } from '@nestjs/common'
import { IndicadoresModule } from './indicadores/indicadores.module'

// Módulo raiz da aplicação.
// Aqui são registrados os módulos de funcionalidade que compõem o backend.
@Module({
  imports: [IndicadoresModule],
})
export class AppModule {}
