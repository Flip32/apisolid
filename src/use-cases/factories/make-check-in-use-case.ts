import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { CheckInUseCase } from '@/use-cases/check-in'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

/*
 * Factory Pattern
 */
export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const prismaGymsRepository = new PrismaGymsRepository()
  return new CheckInUseCase(checkInsRepository, prismaGymsRepository)
}
