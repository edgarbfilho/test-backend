"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndicadoresQuerySchema = void 0;
const zod_1 = require("zod");
exports.IndicadoresQuerySchema = zod_1.z.object({
    id_cliente: zod_1.z.string(),
    data_inicio: zod_1.z.string(),
    data_fim: zod_1.z.string(),
});
//# sourceMappingURL=indicadores.schema.js.map