import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { GetUserMetricsUseCase } from '@/use-cases/get-user-metrics'

/*
 * Factory Pattern
 */
export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  return new GetUserMetricsUseCase(checkInsRepository)
}
