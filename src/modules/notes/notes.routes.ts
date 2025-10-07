import type { FastifyInstance, FastifyRequest } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'
import { 
  type createNoteDTO, 
  createNoteSchema, 
  readNote, 
  type readNoteDTO,
  type updateNoteDTO,
  updateNoteSchema
} from './dto/notes.schema.ts'
import { NoteController } from './note.controller.ts'
import { request } from 'http'

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

  app.post<{ Body: readNoteDTO }>(
    '/notes/read',
    {
      schema: {
        body: readNote
      }
    },
    async (request, reply) => {
      try {
        const note = await controller.read(request.body)
        reply.status(200).send(note)
      } catch (error) {
        reply.status(500).send(error)
      }
    }
  )

  app.post<{ Params: { id: any }; Body: updateNoteDTO }>(
    '/notes/update/:id',
    {
      schema: {
        body: updateNoteSchema
      }
    },
    async (request, reply) => {
      const { id } = request.params
      const update = request.body

      try {
        const note = await controller.update(id, update)
        reply.status(200).send(note)
      } catch (error) {
        reply.status(500).send(error)
      }
    }
  )
}