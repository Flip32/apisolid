import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  // const { user } = request

  // return reply.send({ user })
  return reply.status(200).send()
}
