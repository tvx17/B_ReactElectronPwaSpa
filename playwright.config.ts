import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  use: { browserName: 'chromium', locale: 'en-US', trace: 'retain-on-failure' },
  projects: [
    { name: 'spa', testMatch: 'web.spec.ts', use: { baseURL: 'http://127.0.0.1:4173' } },
    { name: 'pwa', testMatch: /(?:web|pwa)\.spec\.ts/, use: { baseURL: 'http://127.0.0.1:4174' } },
    { name: 'electron', testMatch: 'electron.spec.ts', fullyParallel: false, timeout: 60_000 },
  ],
  webServer: [
    { command: 'npm run preview:spa -- --host 127.0.0.1', port: 4173, reuseExistingServer: false },
    { command: 'npm run preview:pwa -- --host 127.0.0.1', port: 4174, reuseExistingServer: false },
    { command: 'npm run dev:spa', port: 5173, reuseExistingServer: false },
  ],
})
