import { fastify } from 'fastify'
import { notesRoutes } from './modules/notes/notes.routes.ts'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { trace } from 'console'

const app = fastify({
  logger: {
    file: './logs/notes-api.log',
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
        colorize: true
      }
    }
  }
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

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