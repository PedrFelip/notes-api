import { fastify } from 'fastify'
import { notesRoutes } from './modules/notes/notes.routes.ts'

const app = fastify()

app.get('/', async () => {
  return { status: 'check' }
})

app.register(notesRoutes, {
  prefix: '/api',
})

app.listen({ port: 3000, host: '0.0.0.0'}, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  } 
  console.log(`server iniciado porta 3000 em ${address}`)
})