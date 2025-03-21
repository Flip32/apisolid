import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  countByUserId(userId: string): Promise<number>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  findById(checkInId: string): Promise<CheckIn | null>
  save(checkIn: CheckIn): Promise<CheckIn>
}
