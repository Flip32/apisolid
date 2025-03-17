import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'

/*
 * Factory Pattern
 */
export function makeRegisterUseCase() {
  const prismaUserRepository = new PrismaUsersRepository()
  return new AuthenticateUseCase(prismaUserRepository)
}
