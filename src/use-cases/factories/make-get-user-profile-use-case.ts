import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '@/use-cases/get-user-profile'

/*
 * Factory Pattern
 */
export function makeGetUserProfileUseCase() {
  const prismaUserRepository = new PrismaUsersRepository()
  return new GetUserProfileUseCase(prismaUserRepository)
}
