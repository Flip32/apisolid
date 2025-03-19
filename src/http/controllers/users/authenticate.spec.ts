import request from 'supertest'
import { app } from '@/app'
import { describe, expect, beforeAll, afterAll, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to login', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toBe(200)
    // expect(response.body).toHaveProperty('token')
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
