import request from 'supertest'
import { app } from '@/app'
import { describe, expect, beforeAll, afterAll, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Fetch Gyms Nearby (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Academia do Zé',
        description: 'A melhor academia do bairro',
        phone: '123456789',
        latitude: -23.55052,
        longitude: -46.63331,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Academia da Maria',
        description: 'A melhor academia do bairro',
        phone: '123456789',
        latitude: -23.51052,
        longitude: -46.63331,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Academia 5km',
        description: 'A melhor academia do bairro',
        phone: '123456789',
        latitude: -23.51052,
        longitude: -46.63331,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Academia 11km',
        description: 'A melhor academia do bairro',
        phone: '123456789',
        latitude: -23.41159,
        longitude: -46.63331,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -23.51052,
        longitude: -46.63331,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(3)
    expect(response.body.gyms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: 'Academia do Zé' }),
        expect.objectContaining({ title: 'Academia da Maria' }),
        expect.objectContaining({ title: 'Academia 5km' }),
      ]),
    )
  })
})
