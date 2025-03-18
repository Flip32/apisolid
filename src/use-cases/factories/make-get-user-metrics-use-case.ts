import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { GetUserMetricsUse } from '@/use-cases/get-user-metrics'

/*
 * Factory Pattern
 */
export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  return new GetUserMetricsUse(checkInsRepository)
}
