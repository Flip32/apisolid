import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '@/use-cases/register'
// import { InMemoryUsersRepository } from '@/repositories/in-memory-users-repository'

/*
 * Factory Pattern
 */
export function makeRegisterUseCase() {
  const prismaUserRepository = new PrismaUsersRepository()
  // const prismaUserRepository = new InMemoryUsersRepository() // Usando o princípio da inversão de dependência (SOLID), podemos trocar a implementação do repositório sem alterar o código do controller
  const registerUseCase = new RegisterUseCase(prismaUserRepository)

  return registerUseCase
}
