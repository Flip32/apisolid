import { Environment } from 'vitest'

const prismaEnvironment: Environment = {
  name: 'prisma',
  async setup() {
    console.log('Setting up Prisma test environment...')

    return {
      async teardown() {
        console.log('Tearing down Prisma test environment...')
      },
    }
  },
  transformMode: 'ssr',
}

export default prismaEnvironment
