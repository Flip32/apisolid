import 'dotenv/config'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import { Environment } from 'vitest'
import * as process from 'node:process'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined.')
  }
  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schema)
  return url.toString()
}

const prismaEnvironment: Environment = {
  name: 'prisma',
  async setup() {
    console.log('Setting up Prisma test environment...')
    const schema = randomUUID()
    const databaseURL = generateDatabaseURL(schema)
    console.log(`url: ${databaseURL}`)

    process.env.DATABASE_URL = databaseURL

    execSync(`npx prisma migrate deploy`)

    return {
      async teardown() {
        console.log('Tearing down Prisma test environment...')
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
        await prisma.$disconnect()
      },
    }
  },
  transformMode: 'ssr',
}

export default prismaEnvironment
