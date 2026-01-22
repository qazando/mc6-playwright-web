// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});


test('Teste de login qazando', async ({ page }) => {
  await page.goto('https://automationpratice.com.br/register');
  await page.locator('#user').fill('qazando')
  await page.locator('#email').fill('qazando@gmail.com')
  await page.locator('#password').fill('qazando123')
  await page.getByRole('button', { name: 'Cadastrar' }).click();
  await expect(page.getByRole('heading', { name: 'Cadastro realizado!' })).toBeVisible({ timeout: 10000 });

});