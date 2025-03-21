import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckInUseCase } from '@/use-cases/validate-check-in'

/*
 * Factory Pattern
 */
export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  return new ValidateCheckInUseCase(checkInsRepository)
}
