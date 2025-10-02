import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'
import { type createNoteDTO, createNoteSchema} from './dto/notes.schema.ts'
import { NoteController } from './note.controller.ts'

const controller = new NoteController()

export async function notesRoutes(server: FastifyInstance) {

  const app = server.withTypeProvider<ZodTypeProvider>()

  app.post<{ Body: createNoteDTO }>(
    '/notes',
    {
      schema: {
        body: createNoteSchema
      }
    }, 
  async (request, reply) => {
    try {
      const note = await controller.create(request.body)
      reply.status(201).send(note)
    } catch (error) {
      reply.status(500).send(error)
    }
  })
}