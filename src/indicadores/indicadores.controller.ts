import { Controller, Get, Query } from '@nestjs/common';
import { IndicadoresService } from './indicadores.service';

// Controller responsável por expor os endpoints HTTP de indicadores.
@Controller('maintenance/reports')
export class IndicadoresController {
  // Injeta o service que contém as regras de negócio.
  constructor(private readonly service: IndicadoresService) {}

  // Endpoint para buscar indicadores de performance por período.
  @Get('performance-indicator')
  async indicadores(
    // Data inicial do filtro (query string).
    @Query('startDate') startDate: string,
    // Data final do filtro (query string).
    @Query('endDate') endDate: string,
    // Tipos de manutenção separados por vírgula (opcional).
    @Query('typeMaintenance') typeMaintenance?: string,
  ) {
    // Converte "1,2,3" para [1, 2, 3] quando informado.
    const types = typeMaintenance
      ? typeMaintenance.split(',').map((t) => Number(t))
      : undefined;

    // Chama o service para calcular os indicadores.
    const data = await this.service.obterIndicadores({
      startDate,
      endDate,
      typeMaintenance: types,
    });

    // Retorna resposta padronizada da API.
    return { success: true, data };
  }
}
