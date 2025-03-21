import { hash } from 'bcryptjs'
import { UsersRepository } from '@/repositories/users.repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { User } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}
// SOLID
// D - Dependency Inversion Principle

export class RegisterUseCase {
  /*
   *  O usersRepository é uma dependência do RegisterUseCase criada para lidar com a persistência de dados.
   * Assim além de desacoplar a lógica de negócio da lógica de persistência, também facilita a substituição por uma nova tecnologia.
   * Além de facilitar os Testes Unitários, pois podemos criar um Mock do UsersRepository para simular o comportamento do banco de dados.
   * */
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    password,
    email,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    // const prismaUserRepository = new PrismaUsersRepository()
    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return {
      user,
    }
  }
}
