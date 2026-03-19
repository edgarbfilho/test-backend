import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

// Service responsável pela lógica de cálculo dos indicadores de performance.
@Injectable()
export class IndicadoresService {
  // Injeta o PrismaService para executar consultas no banco.
  constructor(private readonly prisma: PrismaService) {}

  // Obtém os indicadores por intervalo de datas e, opcionalmente, por tipo de manutenção.
  async obterIndicadores(params: {
    startDate: string;
    endDate: string;
    typeMaintenance?: number[];
  }) {
    // Extrai os parâmetros de entrada para facilitar o uso.
    const { startDate, endDate, typeMaintenance } = params;

    // Monta condição SQL dinâmica para filtrar os tipos de manutenção (quando informado).
    const typesCondition = typeMaintenance && typeMaintenance.length
      ? `AND o.tipo_manutencao IN (${typeMaintenance.join(',')})`
      : '';

    // Query principal que agrega dados por família de equipamento.
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

    // Executa a consulta SQL bruta com bind dos parâmetros de data.
    const result: any[] = await this.prisma.$queryRawUnsafe(query, startDate, endDate);

    // Normaliza os resultados e calcula DF, MTBF e MTTR por família.
    return result.map((r: any) => {
      const tempoPrev = Number(r.tempo_prev) || 0;
      const tempoCorretiva = Number(r.tempo_corretiva) || 0;
      const paradas = Number(r.Paradas) || 0;

      // DF: Disponibilidade Física.
      const DF = tempoPrev > 0 ? ((tempoPrev - tempoCorretiva) / tempoPrev) * 100 : 0;
      // MTBF: Mean Time Between Failures.
      const MTBF = paradas > 0 ? tempoPrev / paradas : 0;
      // MTTR: Mean Time To Repair.
      const MTTR = paradas > 0 ? tempoCorretiva / paradas : 0;

      // Retorna o objeto final já com valores arredondados para 2 casas decimais.
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
