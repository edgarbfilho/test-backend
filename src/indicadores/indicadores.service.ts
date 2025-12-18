import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class IndicadoresService {
  constructor(private readonly prisma: PrismaService) {}

  async obterIndicadores(params: {
    startDate: string;
    endDate: string;
    typeMaintenance?: number[];
  }) {
    const { startDate, endDate, typeMaintenance } = params;

  

    const typesCondition = typeMaintenance && typeMaintenance.length
      ? `AND o.tipo_manutencao IN (${typeMaintenance.join(',')})`
      : '';

    const query = `
      SELECT 
        f.familia AS Familia,
        COUNT(a.id) AS Paradas,
        SUM(TIMESTAMPDIFF(MINUTE, a.data_hora_stop, a.data_hora_start)) AS tempo_corretiva,
        SUM(TIME_TO_SEC(TIMEDIFF(et.termino, et.inicio))/60) AS tempo_prev
      FROM cadastro_de_familias_de_equipamento f
      JOIN cadastro_de_equipamentos e ON e.id_familia = f.id
      JOIN sofman_apontamento_paradas a ON a.id_equipamento = e.id
      JOIN controle_de_ordens_de_servico o ON o.id = a.id_ordem_servico
      JOIN sofman_prospect_escala_trabalho et ON et.id_equipamento = e.id
      WHERE f.id_cliente = 405
        AND DATE(a.data_hora_stop) BETWEEN ? AND ?
        ${typesCondition}
      GROUP BY f.familia;
    `;

    

    const result: any[] = await this.prisma.$queryRawUnsafe(query, startDate, endDate);


    return result.map((r: any) => {
      const tempoPrev = Number(r.tempo_prev) || 0;
      const tempoCorretiva = Number(r.tempo_corretiva) || 0;
      const paradas = Number(r.Paradas) || 0;

      const DF = tempoPrev > 0 ? ((tempoPrev - tempoCorretiva) / tempoPrev) * 100 : 0;
      const MTBF = paradas > 0 ? tempoPrev / paradas : 0;
      const MTTR = paradas > 0 ? tempoCorretiva / paradas : 0;

      return {
        Familia: r.Familia,
        DF: Number(DF.toFixed(2)),
        MTBF: Number(MTBF.toFixed(2)),
        MTTR: Number(MTTR.toFixed(2)),
        Paradas: paradas,
        tempo_prev: tempoPrev,
        tempo_corretiva: tempoCorretiva,
      };
    });
  }
}
