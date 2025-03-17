import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

export class InMemoryGymRepository implements GymsRepository {
  public items: Gym[] = []

  async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find((user) => user.id === id)

    return gym || null
  }
}
