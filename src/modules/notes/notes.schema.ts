import { z } from 'zod'

const createNoteSchema = z.object({
  titulo: z.string().min(2).max(100),
  conteudo: z.string().min(10).max(1000),
})

const noteSchema = z.object({
  id: z.string().uuid(),
  titulo: z.string().min(2).max(100),
  conteudo: z.string().min(10).max(1000),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
})

export type Note = z.infer<typeof noteSchema>
export type CreateNoteInput = z.infer<typeof createNoteSchema>