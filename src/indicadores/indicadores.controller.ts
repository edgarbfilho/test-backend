import { Controller, Get, Query } from '@nestjs/common';
import { IndicadoresService } from './indicadores.service';

@Controller('maintenance/reports')
export class IndicadoresController {
  constructor(private readonly service: IndicadoresService) {}

  @Get('performance-indicator')
  async indicadores(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('typeMaintenance') typeMaintenance?: string,
  ) {
    const types = typeMaintenance
      ? typeMaintenance.split(',').map((t) => Number(t))
      : undefined;

    const data = await this.service.obterIndicadores({
      startDate,
      endDate,
      typeMaintenance: types,
    });

    return { success: true, data };
  }
}
