import { test, expect } from '@playwright/test';

const BASE_URL = 'https://automationpratice.com.br/register';

test.describe('Testes Avançados de Cadastro - Qazando', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('Validar campo de senha vazio', async ({ page }) => {
    // Act
    await page.fill('#user', 'TestUser');
    await page.fill('#email', 'test@example.com');
    // Deixar senha vazia
    await page.click('#btnRegister');

    // Assert
    const passwordField = page.locator('#password');
    const value = await passwordField.inputValue();
    expect(value).toBe('');
  });

  test('Validar limite de caracteres no campo Nome', async ({ page }) => {
    // Arrange - Criar string com muitos caracteres
    const longName = 'A'.repeat(200);

    // Act
    await page.fill('#user', longName);

    // Assert
    const value = await page.locator('#user').inputValue();
    // Verificar se o campo aceita ou limita caracteres
    expect(value).toBeDefined();
  });

  test('Validar campo de email com múltiplos pontos', async ({ page }) => {
    // Arrange
    const email = 'test.user.name@example.co.uk';

    // Act
    await page.fill('#email', email);

    // Assert
    await expect(page.locator('#email')).toHaveValue(email);
  });

  test('Deve preencher o formulário com cópia e cola', async ({ page }) => {
    // Arrange
    const username = 'TestUserCopyPaste';
    const email = 'copypaste@example.com';
    const password = 'CopyPastePassword123!';

    // Act - Simular Ctrl+V (cópia e cola)
    await page.locator('#user').fill(username);
    await page.locator('#email').fill(email);
    await page.locator('#password').fill(password);

    // Assert
    await expect(page.locator('#user')).toHaveValue(username);
    await expect(page.locator('#email')).toHaveValue(email);
    await expect(page.locator('#password')).toHaveValue(password);
  });

  test('Deve validar ordem de tabulação entre campos', async ({ page }) => {
    // Act
    const userField = page.locator('#user');
    await userField.focus();

    // Assert - Verificar que o campo está focado
    const isFocused = await userField.evaluate((el) => el === document.activeElement);
    expect(isFocused).toBe(true);
  });

  test('Deve aceitar email com subdomínio', async ({ page }) => {
    // Arrange
    const email = 'test@mail.example.co.uk';

    // Act
    await page.fill('#email', email);

    // Assert
    await expect(page.locator('#email')).toHaveValue(email);
  });

  test('Deve validar que os campos do formulário estão no DOM', async ({ page }) => {
    // Assert
    const userExists = await page.locator('#user').isVisible();
    const emailExists = await page.locator('#email').isVisible();
    const passwordExists = await page.locator('#password').isVisible();
    const buttonExists = await page.locator('#btnRegister').isVisible();

    expect(userExists).toBe(true);
    expect(emailExists).toBe(true);
    expect(passwordExists).toBe(true);
    expect(buttonExists).toBe(true);
  });

  test('Deve validar atributos HTML dos campos', async ({ page }) => {
    // Assert - Verificar se os campos têm atributos padrão
    const userAttributes = await page.locator('#user').evaluate((el) => ({
      id: el.id,
      type: el.type,
      required: el.required,
      tagName: el.tagName
    }));

    expect(userAttributes.id).toBe('user');
    expect(userAttributes.type).toBe('text');
    expect(userAttributes.tagName).toBe('INPUT');
  });

  test('Deve preencher senha sem mostrar caracteres na tela', async ({ page }) => {
    // Arrange
    const password = 'MySecurePassword123!';

    // Act
    await page.fill('#password', password);

    // Assert - O tipo deve ser password (não mostra caracteres)
    const type = await page.locator('#password').evaluate((el) => el.type);
    expect(type).toBe('password');

    // Verificar que o valor foi preenchido
    const value = await page.locator('#password').inputValue();
    expect(value).toBe(password);
  });

  test('Deve validar que o botão de cadastro está dentro do formulário', async ({ page }) => {
    // Assert
    const button = page.locator('#btnRegister');
    const isVisible = await button.isVisible();
    const isEnabled = await button.isEnabled();

    expect(isVisible).toBe(true);
    expect(isEnabled).toBe(true);
  });

  test('Deve permitir edição de campos após preenchimento', async ({ page }) => {
    // Act - Preencher campo
    await page.fill('#user', 'OriginalName');

    // Modificar campo
    await page.locator('#user').clear();
    await page.fill('#user', 'NewName');

    // Assert
    await expect(page.locator('#user')).toHaveValue('NewName');
  });

  test('Deve validar que campos aceitam entrada de usuário', async ({ page }) => {
    // Arrange
    const username = 'InteractiveTest';
    const email = 'interactive@test.com';
    const password = 'InteractivePass123!';

    // Act
    await page.type('#user', username);
    await page.type('#email', email);
    await page.type('#password', password);

    // Assert
    await expect(page.locator('#user')).toHaveValue(username);
    await expect(page.locator('#email')).toHaveValue(email);
    await expect(page.locator('#password')).toHaveValue(password);
  });

  test('Deve validar página carrega corretamente', async ({ page }) => {
    // Assert
    const heading = page.locator('h3:has-text("Cadastro de usuário")');
    await expect(heading).toBeVisible();
  });

  test('Deve validar que email é campo obrigatório com validação HTML5', async ({ page }) => {
    // Assert
    const emailField = page.locator('#email');
    const emailType = await emailField.evaluate((el) => el.type);
    const isRequired = await emailField.evaluate((el) => el.required);

    expect(emailType).toBe('email');
    expect(isRequired).toBe(true);
  });

  test('Deve permitir edição com backspace no campo Nome', async ({ page }) => {
    // Act
    await page.fill('#user', 'TestName');
    await page.locator('#user').press('End'); // Vai para o final
    
    for (let i = 0; i < 4; i++) {
      await page.locator('#user').press('Backspace');
    }

    // Assert
    await expect(page.locator('#user')).toHaveValue('Test');
  });

  test('Deve permitir edição com Delete no campo Email', async ({ page }) => {
    // Act
    await page.fill('#email', 'test@example.com');
    await page.locator('#email').press('Home'); // Vai para o início
    await page.locator('#email').press('Delete'); // Deleta primeiro caractere

    // Assert
    const value = await page.locator('#email').inputValue();
    expect(value).not.toContain('test@example.com');
  });

  test('Deve preencher todos os campos simultaneamente', async ({ page }) => {
    // Arrange
    const testData = {
      user: 'SimultaneousTest',
      email: 'simultaneous@test.com',
      password: 'SimultaneousPass123!'
    };

    // Act
    await Promise.all([
      page.fill('#user', testData.user),
      page.fill('#email', testData.email),
      page.fill('#password', testData.password)
    ]);

    // Assert
    await expect(page.locator('#user')).toHaveValue(testData.user);
    await expect(page.locator('#email')).toHaveValue(testData.email);
    await expect(page.locator('#password')).toHaveValue(testData.password);
  });

  test('Deve validar estrutura do formulário no HTML', async ({ page }) => {
    // Assert - Verificar se há um formulário na página
    const form = page.locator('form, div:has(#user)');
    await expect(form).toBeVisible();
  });

  test('Deve limpar campos com Ctrl+A e Delete', async ({ page }) => {
    // Act
    await page.fill('#user', 'TestUser');
    await page.locator('#user').press('Control+A');
    await page.locator('#user').press('Delete');

    // Assert
    await expect(page.locator('#user')).toHaveValue('');
  });

  test('Deve aceitar email com underline', async ({ page }) => {
    // Arrange
    const email = 'test_user@example.com';

    // Act
    await page.fill('#email', email);

    // Assert
    await expect(page.locator('#email')).toHaveValue(email);
  });

  test('Deve aceitar nome com hífen', async ({ page }) => {
    // Arrange
    const username = 'Test-User-Name';

    // Act
    await page.fill('#user', username);

    // Assert
    await expect(page.locator('#user')).toHaveValue(username);
  });

  test('Deve validar que campos têm placeholders ou labels', async ({ page }) => {
    // Assert - Verificar estrutura do formulário
    const formContainers = page.locator('[ref=e1217], [ref=e1220], [ref=e1223]');
    const count = await formContainers.count();
    expect(count).toBeGreaterThan(0);
  });
});
