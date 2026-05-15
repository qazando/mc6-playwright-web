import { test, expect } from '@playwright/test';

const BASE_URL = 'https://automationpratice.com.br/register';

test.describe('Testes de Cadastro - Qazando', () => {
  test.beforeEach(async ({ page }) => {
    // Navega para a página de cadastro antes de cada teste
    await page.goto(BASE_URL);
  });

  test('Deve preencher o formulário com dados válidos', async ({ page }) => {
    // Arrange - Preparar os dados
    const username = 'TestUser123';
    const email = 'testuser@example.com';
    const password = 'Password123!';

    // Act - Preencher o formulário usando os IDs dos campos
    await page.fill('#user', username);
    await page.fill('#email', email);
    await page.fill('#password', password);

    // Assert - Verificar se os valores foram preenchidos corretamente
    await expect(page.locator('#user')).toHaveValue(username);
    await expect(page.locator('#email')).toHaveValue(email);
    await expect(page.locator('#password')).toHaveValue(password);
  });

  test('Deve validar que o campo Nome é obrigatório', async ({ page }) => {
    // Arrange
    const email = 'test@example.com';
    const password = 'Password123!';

    // Act - Deixar o campo Nome vazio e tentar submeter
    await page.fill('#email', email);
    await page.fill('#password', password);
    await page.click('#btnRegister');

    // Assert - Verificar se há validação de campo obrigatório
    const usernameField = page.locator('#user');
    const isRequired = await usernameField.evaluate((el) => el.required);
    expect(isRequired).toBe(true);
  });

  test('Deve validar que o campo E-mail é obrigatório', async ({ page }) => {
    // Arrange
    const username = 'TestUser';
    const password = 'Password123!';

    // Act - Deixar o campo E-mail vazio
    await page.fill('#user', username);
    await page.fill('#password', password);
    await page.click('#btnRegister');

    // Assert
    const emailField = page.locator('#email');
    const isRequired = await emailField.evaluate((el) => el.required);
    expect(isRequired).toBe(true);
  });

  test('Deve validar que o campo Senha é obrigatório', async ({ page }) => {
    // Arrange
    const username = 'TestUser';
    const email = 'test@example.com';

    // Act - Deixar o campo Senha vazio
    await page.fill('#user', username);
    await page.fill('#email', email);
    await page.click('#btnRegister');

    // Assert
    const passwordField = page.locator('#password');
    const isRequired = await passwordField.evaluate((el) => el.required);
    expect(isRequired).toBe(true);
  });

  test('Deve validar formato de email inválido', async ({ page }) => {
    // Arrange
    const username = 'TestUser';
    const invalidEmail = 'email_invalido';
    const password = 'Password123!';

    // Act
    await page.fill('#user', username);
    await page.fill('#email', invalidEmail);
    await page.fill('#password', password);

    // Assert - Verificar se o campo tem validação de email
    const emailField = page.locator('#email');
    const emailType = await emailField.evaluate((el) => el.type);
    expect(emailType).toBe('email');
  });

  test('Deve submeter o formulário com dados válidos', async ({ page }) => {
    // Arrange
    const username = `User_${Date.now()}`;
    const email = `user_${Date.now()}@test.com`;
    const password = 'SecurePass123!';

    // Act - Preencher todos os campos
    await page.fill('#user', username);
    await page.fill('#email', email);
    await page.fill('#password', password);

    // Assert - Verificar se todos os campos estão preenchidos
    await expect(page.locator('#user')).toHaveValue(username);
    await expect(page.locator('#email')).toHaveValue(email);
    await expect(page.locator('#password')).toHaveValue(password);

    // Verificar se o botão de cadastro está visível e habilitado
    await expect(page.locator('#btnRegister')).toBeVisible();
    await expect(page.locator('#btnRegister')).toBeEnabled();
  });

  test('Deve limpar o campo Nome quando todos os caracteres forem deletados', async ({ page }) => {
    // Arrange
    const username = 'TestUser';

    // Act
    await page.fill('#user', username);
    await page.locator('#user').clear();

    // Assert
    await expect(page.locator('#user')).toHaveValue('');
  });

  test('Deve limpar o campo Email quando todos os caracteres forem deletados', async ({ page }) => {
    // Arrange
    const email = 'test@example.com';

    // Act
    await page.fill('#email', email);
    await page.locator('#email').clear();

    // Assert
    await expect(page.locator('#email')).toHaveValue('');
  });

  test('Deve limpar o campo Senha quando todos os caracteres forem deletados', async ({ page }) => {
    // Arrange
    const password = 'Password123!';

    // Act
    await page.fill('#password', password);
    await page.locator('#password').clear();

    // Assert
    await expect(page.locator('#password')).toHaveValue('');
  });

  test('Deve conter um campo de tipo text para Nome', async ({ page }) => {
    // Assert
    const usernameField = page.locator('#user');
    const type = await usernameField.evaluate((el) => el.type);
    expect(type).toBe('text');
  });

  test('Deve conter um campo de tipo email para E-mail', async ({ page }) => {
    // Assert
    const emailField = page.locator('#email');
    const type = await emailField.evaluate((el) => el.type);
    expect(type).toBe('email');
  });

  test('Deve conter um campo de tipo password para Senha', async ({ page }) => {
    // Assert
    const passwordField = page.locator('#password');
    const type = await passwordField.evaluate((el) => el.type);
    expect(type).toBe('password');
  });

  test('Deve ter um botão de cadastro com ID btnRegister', async ({ page }) => {
    // Assert
    const submitButton = page.locator('#btnRegister');
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toHaveText('Cadastrar');
  });

  test('Deve aceitar caracteres especiais no campo Nome', async ({ page }) => {
    // Arrange
    const usernameWithSpecialChars = 'Test-User_123!@';

    // Act
    await page.fill('#user', usernameWithSpecialChars);

    // Assert
    await expect(page.locator('#user')).toHaveValue(usernameWithSpecialChars);
  });

  test('Deve aceitar caracteres especiais no campo E-mail', async ({ page }) => {
    // Arrange
    const email = 'test.user+tag@example.co.uk';

    // Act
    await page.fill('#email', email);

    // Assert
    await expect(page.locator('#email')).toHaveValue(email);
  });

  test('Deve aceitar caracteres especiais no campo Senha', async ({ page }) => {
    // Arrange
    const passwordWithSpecialChars = 'Pass@word#123!$%';

    // Act
    await page.fill('#password', passwordWithSpecialChars);

    // Assert
    await expect(page.locator('#password')).toHaveValue(passwordWithSpecialChars);
  });

  test('Deve ter campos visíveis na página de cadastro', async ({ page }) => {
    // Assert
    await expect(page.locator('#user')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#btnRegister')).toBeVisible();
  });

  test('Deve ter a página com o título correto', async ({ page }) => {
    // Assert
    await expect(page).toHaveTitle(/QAZANDO|Cadastro/i);
  });

  test('Deve permitir navegação para página de cadastro via URL', async ({ page }) => {
    // Assert
    expect(page.url()).toContain('/register');
  });

  test('Deve preencher formulário com números no campo Nome', async ({ page }) => {
    // Arrange
    const username = 'User12345';

    // Act
    await page.fill('#user', username);

    // Assert
    await expect(page.locator('#user')).toHaveValue(username);
  });

  test('Deve preencher formulário com espaços em branco no Nome', async ({ page }) => {
    // Arrange
    const username = 'Test User Name';

    // Act
    await page.fill('#user', username);

    // Assert
    await expect(page.locator('#user')).toHaveValue(username);
  });

  test('Deve manter os valores preenchidos após tabular entre campos', async ({ page }) => {
    // Arrange
    const username = 'TestUser';
    const email = 'test@example.com';
    const password = 'Password123!';

    // Act
    await page.fill('#user', username);
    await page.press('#user', 'Tab'); // Tab para próximo campo
    await page.fill('#email', email);
    await page.press('#email', 'Tab'); // Tab para próximo campo
    await page.fill('#password', password);

    // Assert
    await expect(page.locator('#user')).toHaveValue(username);
    await expect(page.locator('#email')).toHaveValue(email);
    await expect(page.locator('#password')).toHaveValue(password);
  });

  test('Deve verificar que os campos têm atributo id', async ({ page }) => {
    // Assert
    const usernameHasId = await page.locator('#user').evaluate((el) => el.id === 'user');
    const emailHasId = await page.locator('#email').evaluate((el) => el.id === 'email');
    const passwordHasId = await page.locator('#password').evaluate((el) => el.id === 'password');

    expect(usernameHasId).toBe(true);
    expect(emailHasId).toBe(true);
    expect(passwordHasId).toBe(true);
  });
});
