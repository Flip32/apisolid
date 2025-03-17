import { expect, describe, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { InvalidCredentialsError } from '@/use-cases/erros/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const userRepository = new InMemoryUsersRepository()
    // System Under Test (Convenção de nomenclatura usada bastante em Test-Driven Development (TDD))
    const sut = new AuthenticateUseCase(userRepository)

    await userRepository.create({
      name: 'John Doe',
      email: 'johndow@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'johndow@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const userRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(userRepository)

    await userRepository.create({
      name: 'John Doe',
      email: 'johndow@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'wrong@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const userRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(userRepository)

    await userRepository.create({
      name: 'John Doe',
      email: 'johndow@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'johndow@example.com',
        password: 'wrong_password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
