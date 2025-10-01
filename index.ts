import { fastify } from 'fastify'

const app = fastify()

app.get('/', async () => {
  return { status: 'check' }
})

app.listen({ port: 3000, host: '0.0.0.0'}, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`server iniciado porta 3000 em ${address}`)
})