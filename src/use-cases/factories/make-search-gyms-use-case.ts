import { SearchGymUseCase } from '@/use-cases/search-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

/*
 * Factory Pattern
 */
export function makeSearchGymsUseCase() {
  const gymRepository = new PrismaGymsRepository()
  return new SearchGymUseCase(gymRepository)
}
