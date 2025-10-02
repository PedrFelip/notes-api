import type { FastifyInstance } from 'fastify'

export async function notesRoutes(app: FastifyInstance) {
  app.get('/notes', async (request, reply) => {
    return { notes: [] }
  })
}