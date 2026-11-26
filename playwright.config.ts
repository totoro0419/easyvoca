import {defineConfig,devices} from '@playwright/test';
export default defineConfig({
  testDir:'./e2e',
  timeout:90000,
  expect:{timeout:15000},
  retries:process.env.CI?1:0,
  use:{...devices['Desktop Chrome'],baseURL:process.env.PLAYWRIGHT_BASE_URL||'http://127.0.0.1:4173/easyvoca/'},
  webServer:process.env.PLAYWRIGHT_BASE_URL?undefined:{
    command:'npm run preview -- --host 127.0.0.1 --port 4173 --strictPort',
    url:'http://127.0.0.1:4173/easyvoca/',
    timeout:120000,
    reuseExistingServer:!process.env.CI
  }
});
