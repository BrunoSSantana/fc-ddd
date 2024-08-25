import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  "./vitest.unit.config.mts",
  "./vitest.config.mts",
  "./vitest.e2e.config.mts"
])
