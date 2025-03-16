import { defineConfig } from 'vitest/config'
// import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(async () => {
  const tsconfigPaths = await import('vite-tsconfig-paths').then(
    (m) => m.default || m,
  )

  return {
    plugins: [tsconfigPaths()],
  }
})
