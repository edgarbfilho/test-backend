"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndicadoresService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let IndicadoresService = class IndicadoresService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async obterIndicadores(params) {
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
        const result = await this.prisma.$queryRawUnsafe(query, startDate, endDate);
        return result.map((r) => {
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
};
exports.IndicadoresService = IndicadoresService;
exports.IndicadoresService = IndicadoresService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], IndicadoresService);
//# sourceMappingURL=indicadores.service.js.map