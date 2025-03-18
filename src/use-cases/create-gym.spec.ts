import { beforeEach, expect, describe, it } from 'vitest'
import { CreateGymUseCase } from '@/use-cases/create-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'

let gymsRepository: InMemoryGymsRepository
let createGymUseCase: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    createGymUseCase = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create a gym', async () => {
    const { gym } = await createGymUseCase.execute({
      title: 'Academia 1',
      latitude: -23.588068,
      longitude: -46.656419,
      phone: '11999999999',
      description: 'Academia 1',
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
