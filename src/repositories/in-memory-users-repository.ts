import { Prisma } from '@prisma/client'

/* Repository Pattern */
export class InMemoryUsersRepository {
  public users: Prisma.UserCreateInput[] = []

  async create(data: Prisma.UserCreateInput) {
    this.users.push(data)
  }
}
