import { z } from 'zod'

// Schema de validação para os parâmetros de consulta de indicadores.
// Garante o formato esperado antes de processar a requisição.
export const IndicadoresQuerySchema = z.object({
  // Identificador do cliente.
  id_cliente: z.string(),
  // Data inicial do período consultado.
  data_inicio: z.string(),
  // Data final do período consultado.
  data_fim: z.string(),
})

// Tipo TypeScript inferido automaticamente a partir do schema do Zod.
export type IndicadoresQueryDTO = z.infer<typeof IndicadoresQuerySchema>
