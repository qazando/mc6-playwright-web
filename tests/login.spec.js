import { test, expect } from '@playwright/test';

const BASE_URL = 'https://automationpratice.com.br/';
const LOGIN_URL = 'https://automationpratice.com.br/login';
const MY_ACCOUNT_URL = 'https://automationpratice.com.br/my-account';

test('Teste de login com sucesso', async ({ page }) => {
  // Abrir o site da qazando
  await page.goto(BASE_URL);

  // Clicar em login
  await page.click('a[href="/login"]');

  // Verificar que foi redirecionado para a página de login
  expect(page.url()).toContain('/login');

  // Digitar o e-mail: qazandonovo@gmail.com
  await page.fill('#user', 'qazandonovo@gmail.com');

  // Digitar a senha: 123456
  await page.fill('#password', '123456');

  // Clicar em login
  await page.click('#btnLogin');

  // Validar se o usuário está logado verificando se foi encaminhado para: https://automationpratice.com.br/my-account
  expect(page.url()).toBe(MY_ACCOUNT_URL);
});
