// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Configuração Otimizada para Testes de Cadastro
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Diretório de testes
  testDir: './tests',
  
  // Padrões de arquivo de teste
  testMatch: '**/*.spec.js',
  
  // Ignorar padrões
  testIgnore: ['**/skip.spec.js'],
  
  // Timeout global (ms)
  timeout: 30 * 1000,
  
  // Timeout para expect (ms)
  expect: {
    timeout: 5 * 1000,
  },
  
  // Executar testes em paralelo
  fullyParallel: true,
  
  // Falhar na build se houver test.only
  forbidOnly: !!process.env.CI,
  
  // Número de tentativas (retries)
  retries: process.env.CI ? 2 : 0,
  
  // Número de workers (paralelo)
  workers: process.env.CI ? 1 : undefined,
  
  // Reporters (outputters)
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
    ['list'] // Terminal output
  ],
  
  // Configurações globais
  use: {
    // URL base para navegação
    baseURL: 'https://automationpratice.com.br',
    
    // Screenshots e videos
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    
    // Trace (debugging)
    trace: 'on-first-retry',
    
    // Action timeout
    actionTimeout: 10 * 1000,
    
    // Navigation timeout
    navigationTimeout: 30 * 1000,
  },

  // Web server configuration
  webServer: {
    // Descomente se necessário rodar um servidor local
    // command: 'npm run start',
    // url: 'http://localhost:3000',
    // reuseExistingServer: !process.env.CI,
  },

  // Projetos (navegadores e configurações)
  projects: [
    // Desktop browsers
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // Opções específicas do Chrome
        launchArgs: ['--no-sandbox'],
      },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Mobile browsers
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },

    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    // Tablet
    {
      name: 'iPad',
      use: { ...devices['iPad Pro'] },
    },
  ],

  // Relatório de compatibilidade entre browsers
  outputFolder: 'test-results/',
});
