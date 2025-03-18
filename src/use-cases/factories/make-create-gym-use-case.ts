import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CreateGymUseCase } from '@/use-cases/create-gym'

/*
 * Factory Pattern
 */
export function makeCreateGymUseCase() {
  const gymRepository = new PrismaGymsRepository()
  return new CreateGymUseCase(gymRepository)
}
