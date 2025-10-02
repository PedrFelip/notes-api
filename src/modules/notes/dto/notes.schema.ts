import { z } from 'zod'

export const createNoteSchema = z.object({
  titulo: z.string()
    .min(2, { message: 'Título deve ter pelo menos 2 caracteres' })
    .max(100, { message: 'Título deve ter no máximo 100 caracteres' }),
  conteudo: z.string()
    .min(10, { message: 'Conteúdo deve ter pelo menos 10 caracteres' })
    .max(1000, { message: 'Conteúdo deve ter no máximo 1000 caracteres' }),
})

const noteSchema = z.object({
  id: z.string().uuid(),
  titulo: z.string().min(2).max(100),
  conteudo: z.string().min(10).max(1000),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
})

export type Note = z.infer<typeof noteSchema>
export type createNoteDTO = z.infer<typeof createNoteSchema>