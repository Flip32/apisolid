import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { SearchGymUseCase } from '@/use-cases/search-gyms'
import { Decimal } from '@prisma/client/runtime/client'

let gymsRepository: InMemoryGymsRepository
// System Under Test (Convenção de nomenclatura usada bastante em Test-Driven Development (TDD))
let sut: SearchGymUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymsRepository)
  })

  it('should be able to search to gyms', async () => {
    await gymsRepository.create({
      title: 'Academia 1',
      description: 'Melhor academia de bairro',
      phone: '123456789',
      latitude: new Decimal(-15.8000152),
      longitude: new Decimal(-47.8667287),
    })

    await gymsRepository.create({
      title: 'Academia 2',
      description: 'Melhor academia de bairro',
      phone: '123456789',
      latitude: new Decimal(-15.8000152),
      longitude: new Decimal(-47.8667287),
    })

    await gymsRepository.create({
      title: 'Academia 11',
      description: 'Melhor academia de bairro',
      phone: '123456789',
      latitude: new Decimal(-15.8000152),
      longitude: new Decimal(-47.8667287),
    })

    const { gyms } = await sut.execute({ query: 'Academia 1', page: 1 })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Academia 1' }),
      expect.objectContaining({ title: 'Academia 11' }),
    ])
  })

  it('should be able to fetch gyms paginated', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Academia ${i}`,
        description: 'Melhor academia de bairro',
        phone: '123456789',
        latitude: new Decimal(-15.8000152),
        longitude: new Decimal(-47.8667287),
      })
    }

    const { gyms } = await sut.execute({ query: 'Academia', page: 2 })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Academia 21' }),
      expect.objectContaining({ title: 'Academia 22' }),
    ])
  })
})
