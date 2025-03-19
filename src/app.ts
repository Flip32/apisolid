import fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'
import { ZodError } from 'zod'
import { env } from '@/env'
import fastifyJwt from '@fastify/jwt'
import { userRoutes } from '@/http/controllers/users/routes'
import { gymsRoutes } from '@/http/controllers/gyms/routes'
import { checkInsRoutes } from '@/http/controllers/check-ins/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(userRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
    return reply.status(500).send({ message: error.message })
  } else {
    // TODO: Fazer um log externo para armazenar os erros DataDog/Sentry/NewRelic
  }

  reply.status(500).send({ message: 'Internal server error' })
})
