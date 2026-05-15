# mc-6-playwright-web

Projeto de automação de testes web com Playwright, integrado ao Claude Code via MCP do Playwright.

## Stack

- **[Playwright Test](https://playwright.dev/)** — automação e testes E2E
- **[@playwright/mcp](https://github.com/microsoft/playwright-mcp)** — MCP server do Playwright para uso com Claude
- **[Claude Code](https://claude.ai/code)** — IA assistindo a automação via MCP

## Estrutura

```
.
├── tests/
│   ├── login.spec.js           # Testes de login
│   ├── register.spec.js        # Testes de cadastro
│   └── register-advanced.spec.js # Testes avançados de cadastro
├── auth/
│   └── storageState.json       # Estado de sessão do browser (cookies/login)
├── .mcp.json                   # Configuração do MCP do Playwright para Claude Code
├── .claude/
│   └── settings.json           # Configurações do Claude Code
├── .vscode/
│   └── mcp.json                # Configuração do MCP para extensão VSCode do Claude
├── playwright.config.js        # Configuração do Playwright
└── package.json
```

## Instalação

```bash
npm install
npx playwright install
```

## Rodando os testes

```bash
# Todos os testes
npm test

# Com interface visual
npx playwright test --ui

# Relatório HTML após execução
npx playwright show-report
```

## Browsers configurados

| Browser | Dispositivo |
|---|---|
| Chromium | Desktop Chrome |
| Firefox | Desktop Firefox |
| WebKit | Desktop Safari |
| Mobile Chrome | Pixel 5 |

## Integração com Claude Code (MCP)

Este projeto usa o **MCP do Playwright** para permitir que o Claude Code controle o browser diretamente durante a conversa — navegando, clicando, tirando screenshots e inspecionando elementos em tempo real.

### Como funciona

O arquivo [`.mcp.json`](.mcp.json) registra o servidor MCP do Playwright no Claude Code:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest", "--isolated", "--storage-state=auth/storageState.json"]
    }
  }
}
```

- `--isolated` — cada sessão MCP usa um browser isolado
- `--storage-state` — persiste cookies/sessão entre interações com o Claude

### Ativando no Claude Code

O arquivo [`.claude/settings.json`](.claude/settings.json) habilita automaticamente os MCPs do projeto:

```json
{
  "enableAllProjectMcpServers": true
}
```

Após clonar o projeto, reinicie o Claude Code para que o MCP seja carregado. Com ele ativo, você pode pedir ao Claude para abrir páginas, preencher formulários, tirar screenshots e levantar escopos de teste — tudo com o browser real.

## Site alvo

[https://automationpratice.com.br](https://automationpratice.com.br) — e-commerce de prática da Qazando.
