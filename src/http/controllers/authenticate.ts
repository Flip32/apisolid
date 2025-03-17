import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { InvalidCredentialsError } from '@/use-cases/erros/invalid-credentials-error'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const prismaUserRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(prismaUserRepository)
    await authenticateUseCase.execute({ email, password })
  } catch (e) {
    if (e instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: e.message })
    }

    throw e
  }

  return reply.status(200).send()
}
