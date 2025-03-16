import { expect, describe, it } from 'vitest'
import { compare } from 'bcryptjs'
import { RegisterUseCase } from '@/use-cases/register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsErros } from '@/use-cases/erros/user-already-exists-erros'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const userRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(userRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndow@example.com',
      password: '123456',
    })

    // expect(user.id).toBeDefined()
    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const userRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(userRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndow@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not allow two users with the same email', async () => {
    const userRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(userRepository)

    const email = 'johndow@example.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsErros)
  })
})
