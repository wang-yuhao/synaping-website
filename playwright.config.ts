import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: 'tests/e2e',
  snapshotPathTemplate: 'tests/visual/{arg}-{projectName}{ext}',
  use: { baseURL: 'http://localhost:4321', launchOptions: { executablePath: process.env.PW_CHROMIUM_PATH || undefined } },
  webServer: { command: 'python3 -m http.server 4321 --directory dist', port: 4321, reuseExistingServer: true },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
});
