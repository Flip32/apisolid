import { beforeEach, expect, describe, it, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from '@/use-cases/check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { Decimal } from '@prisma/client/runtime/client'
import { MaxDistanceError } from '@/use-cases/errors/max-distance-error'
import { MaxNumberOfCheckInsError } from '@/use-cases/errors/max-number-of-check-ins-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'Academia 01',
      description: 'Melhor academia de bairro',
      phone: '123456789',
      latitude: new Decimal(-15.8000152),
      longitude: new Decimal(-47.8667287),
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
      userLatitude: -15.8000152,
      userLongitude: -47.8667287,
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
      userLatitude: -15.8000152,
      userLongitude: -47.8667287,
    })

    vi.setSystemTime(new Date(2025, 0, 20, 9, 0, 0))

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -15.8000152,
        userLongitude: -47.8667287,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -15.8000152,
      userLongitude: -47.8667287,
    })

    vi.setSystemTime(new Date(2025, 0, 21, 8, 0, 0))
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -15.8000152,
      userLongitude: -47.8667287,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    // -15.8000152,-47.8667287
    // -15.7946674,-47.8950178

    await gymsRepository.create({
      id: 'gym-02',
      title: 'Academia 01',
      description: 'Melhor academia de bairro',
      phone: '123456789',
      latitude: new Decimal(-15.8000152),
      longitude: new Decimal(-47.8667287),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLongitude: -15.7946674,
        userLatitude: -47.8950178,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
