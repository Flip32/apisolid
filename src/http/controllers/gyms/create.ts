import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { title, latitude, phone, description, longitude } =
    createGymBodySchema.parse(request.body)

  const registerUseCase = makeCreateGymUseCase()
  await registerUseCase.execute({
    title,
    latitude,
    phone,
    description,
    longitude,
  })

  return reply.status(201).send()
}
