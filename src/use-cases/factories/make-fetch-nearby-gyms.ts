import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNearbyGymsUseCase } from '@/use-cases/fetch-nearby-gyms'

/*
 * Factory Pattern
 */
export function makeFetchNearbyGymsUseCase() {
  const gymRepository = new PrismaGymsRepository()
  return new FetchNearbyGymsUseCase(gymRepository)
}
