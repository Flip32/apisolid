import '@fastify/jwt'

// This is a declaration file for the Fastify JWT plugin (Serve para nao dar erro na tipagem do sub)
declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: { sub: number }
  }
}
