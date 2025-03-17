import { Gym, Prisma } from '@prisma/client'

export interface GymsRepository {
  // create(data: Prisma.GymCreateWithoutCheckInsInput): Promise<Gym>
  findById(id: string): Promise<Gym | null>
}
