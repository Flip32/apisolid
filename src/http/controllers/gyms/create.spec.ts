import request from 'supertest'
import { app } from '@/app'
import { describe, expect, beforeAll, afterAll, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Academia do Zé',
        description: 'A melhor academia do bairro',
        phone: '123456789',
        latitude: -23.55052,
        longitude: -46.63331,
      })

    expect(response.statusCode).toBe(201)
  })
})
