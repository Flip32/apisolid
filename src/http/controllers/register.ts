import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { RegisterUseCase } from '@/use-cases/register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsErros } from '@/use-cases/erros/user-already-exists-erros'
// import { InMemoryUsersRepository } from '@/repositories/in-memory-users-repository'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const prismaUserRepository = new PrismaUsersRepository()
    // const prismaUserRepository = new InMemoryUsersRepository() // Usando o princípio da inversão de dependência (SOLID), podemos trocar a implementação do repositório sem alterar o código do controller
    const registerUseCase = new RegisterUseCase(prismaUserRepository)
    await registerUseCase.execute({ name, email, password })
  } catch (e) {
    if (e instanceof UserAlreadyExistsErros) {
      return reply.status(409).send({ message: e.message })
    }

    return reply.status(500).send() // TODO: Implementar um erro genérico
  }

  return reply.status(201).send()
}
