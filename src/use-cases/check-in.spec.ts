import { beforeEach, expect, describe, it, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from '@/use-cases/check-in'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { Decimal } from '@prisma/client/runtime/client'

let userRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymRepository()
    sut = new CheckInUseCase(userRepository, gymsRepository)

    // TODO: Remover quando criar o metodo create no repositorio
    gymsRepository.items.push({
      id: 'gym-01',
      title: 'Academia 01',
      description: 'Melhor academia de bairro',
      phone: '123456789',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLongitude: 0,
      userLatitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  // Para aderirmos ao TDD (Test Driven Development), criamos primeiro o testes e depois a implementação. Seguindo a ordem
  // red, green, refactor
  it('should not be able to check in twice in same day', async () => {
    vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLongitude: 0,
      userLatitude: 0,
    })

    vi.setSystemTime(new Date(2025, 0, 20, 9, 0, 0))

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLongitude: 0,
        userLatitude: 0,
      }),
    ).rejects.toBeInstanceOf(Error) // TODO: Create a custom error (CheckInAlreadyExistsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    vi.setSystemTime(new Date(2025, 0, 21, 8, 0, 0))
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
