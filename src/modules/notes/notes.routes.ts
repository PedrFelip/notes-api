import type { FastifyInstance, FastifyRequest } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'
import { 
  type createNoteDTO, 
  createNoteSchema, 
  idParamSchema, 
  readNote, 
  type readNoteDTO,
  type updateNoteDTO,
  updateNoteSchema
} from './dto/notes.schema.ts'
import { NoteController } from './note.controller.ts'
import { log } from 'node:console'

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

  app.get<{ Params: { id: any } }>(
    '/notes/read/:id',
    async (request, reply) => {
      try {
        const note = await controller.read(request.params)
        reply.status(200).send(note)
      } catch (error) {
        reply.status(500).send(error)
      }
    }
  )

  app.patch<{ Params: { id: any }; Body: updateNoteDTO }>(
    '/notes/update/:id',
    {
      schema: {
        body: updateNoteSchema
      }
    },
    async (request, reply) => {
      const { id } = idParamSchema.parse(request.params)
      const update = request.body

      try {
        const note = await controller.update(id, update)
        reply.status(200).send(note)
      } catch (error) {
        reply.status(500).send(error)
      }
    }
  )

  app.delete<{ Params: { id: string } }>(
    '/notes/delete/:id',
    {
      schema: {
        params: idParamSchema
      }
    },
    async (request, reply) => {
      const { id } = request.params

      try {
        await controller.delete(id)
        reply.status(204).send()
      } catch (error) {
        reply.status(404).send({
          message: error,
        })
      }
    }
  )
}