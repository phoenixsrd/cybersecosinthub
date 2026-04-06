# 🔐 CyberSec & OSINT Hub — Hardened Edition

Portal educacional sobre Cybersegurança e OSINT (Open Source Intelligence) com proteções avançadas contra CVEs.

## 🚀 Deploy na Vercel

1. Crie um repositório no GitHub com estes arquivos
2. Acesse [vercel.com](https://vercel.com)
3. Clique em **"New Project"** e importe o repositório
4. Clique em **"Deploy"** — pronto!

## 🛡️ Segurança Implementada

### Headers HTTP

| Header | Proteção | CVE Mitigado |
|--------|----------|--------------|
| **CSP (Nonce-based)** | Restringe scripts a nonces aleatórios — elimina `unsafe-inline` | CVE-2019-11730, CVE-2020-15654, CVE-2021-42762 |
| **CSP Report-Only** | Monitora violações CSP em tempo real | — |
| **HSTS (2 anos)** | Força HTTPS com preload | CVE-2011-3389 (BEAST/SSL Strip) |
| **X-Frame-Options: DENY** | Previne clickjacking | CVE-2020-5159 |
| **X-Content-Type-Options** | Previne MIME sniffing | CVE-2019-11730 |
| **Referrer-Policy** | Controle de informações de referrer | CVE-2020-8277 |
| **Permissions-Policy** | Bloqueia câmera, microfone, geolocalização, USB, BT, FLoC | CVE-2019-11477 |
| **COOP/CORP/COEP** | Isolamento cross-origin completo (Spectre/Meltdown) | CVE-2017-5754 |
| **X-DNS-Prefetch-Control** | Previne DNS rebinding | CVE-2020-8277 |
| **X-Permitted-Cross-Domain-Policies** | Bloqueia Flash/PDF cross-domain | CVE-2019-8075 |
| **Cache-Control: no-store** | Previne cache de dados sensíveis | CVE-2019-5418 |

### Proteções JavaScript

| Proteção | Descrição |
|----------|-----------|
| **Input Sanitization** | `textContent`-based (nunca `innerHTML` com dados do usuário) |
| **CSRF Token** | Token criptograficamente aleatório gerado via `crypto.getRandomValues` |
| **Honeypot** | Campo oculto para detecção de bots |
| **Rate Limiting** | 5s cooldown entre submissões de formulário |
| **Validation** | Regex patterns + length limits em todos os campos |
| **Storage Key Validation** | Previne injection via localStorage keys |
| **Safe DOM Insertion** | Terminal output via DOM API (não innerHTML) |
| **Performance** | `requestAnimationFrame` throttling + visibility-based pause |
| **`setInterval` cleanup** | Prevenção de memory leak DoS |
| **`prefers-reduced-motion`** | Respeita preferência de acessibilidade |

### Removido

| Item | Razão |
|------|-------|
| **`X-XSS-Protection`** | Deprecated — pode introduzir vulnerabilidades em navegadores antigos |
| **Console Easter Egg** | Vetor de self-XSS |
| **`unsafe-inline` em script-src** | Derrota o propósito do CSP |

## 📁 Estrutura do Projeto

```
├── index.html      # HTML hardend com ARIA, CSP nonce, validação
├── style.css       # CSS com prefers-reduced-motion, pointer-events
├── script.js       # JS com sanitização, CSRF, rate limiting
├── vercel.json     # Headers de segurança avançados
└── readme.md       # Este arquivo
```

## ✨ Features

- 🟢 **Matrix Rain** animado com cleanup automático
- ⌨️ **Terminal interativo** com inserção DOM segura
- 🔧 **Filtro de ferramentas** por categoria com ARIA
- ✅ **Checklist de segurança** com persistência local validada
- 📱 **Design responsivo** com `prefers-reduced-motion`
- 🎨 **Tema hacker** com glitch effects e scanlines
- 🛡️ **Painel CVE** mostrando todas as mitigações ativas
- ♿ **Acessibilidade** ARIA roles, labels, keyboard navigation

## ⚠️ Disclaimer

Este site é **apenas educacional**. Todo conhecimento deve ser utilizado de forma **ética e legal**, apenas em sistemas onde você tem **autorização explícita**.

**Built with ❤️ and 🛡️ for the cybersecurity community**