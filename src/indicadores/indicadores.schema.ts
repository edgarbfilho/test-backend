import { z } from 'zod'

export const IndicadoresQuerySchema = z.object({
  id_cliente: z.string(),
  data_inicio: z.string(),
  data_fim: z.string(),
})

export type IndicadoresQueryDTO = z.infer<typeof IndicadoresQuerySchema>
