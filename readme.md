# 🔐 CyberSec & OSINT Hub

Portal educacional em português sobre **cibersegurança, OSINT, segurança ofensiva, defesa cibernética e privacidade digital**. O projeto reúne conceitos, ferramentas, técnicas, referências e um checklist interativo em uma única interface com estética de terminal/hacker.

> **Uso responsável:** todo conteúdo deve ser usado apenas para estudo, defesa e testes autorizados. Não utilize técnicas contra sistemas sem permissão explícita.

## Conteúdo do portal

- Fundamentos de defesa cibernética, segurança ofensiva, inteligência e criptografia.
- Metodologia OSINT: planejamento, coleta, processamento, análise, disseminação e feedback.
- Categorias de investigação: usernames e e-mails, domínios e IPs, redes sociais, geolocalização, dark web e documentos.
- Arsenal filtrável de ferramentas como Nmap, Maltego, Metasploit, Burp Suite, Recon-ng, Autopsy, Subfinder, SpiderFoot, Nikto e Volatility.
- Exemplos educacionais de Google Dorking, enumeração de subdomínios, reconhecimento de e-mails, Shodan, análise de imagens e arquivos históricos.
- Boas práticas para autenticação, rede, privacidade, hardening e segurança web.
- Lista de certificações, plataformas de treino, frameworks e comunidades.
- Checklist pessoal salvo localmente no navegador.

## Segurança e acessibilidade

O projeto foi construído como um site estático com foco em hardening no cliente:

- CSP, `X-Content-Type-Options`, `X-Frame-Options`, Referrer Policy, Permissions Policy, HSTS e cabeçalhos Cross-Origin (COOP, CORP e COEP).
- `vercel.json` com esses headers para deploy na Vercel, além de cache de um ano para `style.css` e `script.js`.
- Inserção de texto com `textContent`, validação de campos e limites de tamanho.
- Token CSRF gerado no navegador, honeypot e limitação de submissões do formulário.
- Validação de chaves do `localStorage`.
- Controle de animações, limpeza de observers/intervalos e respeito a `prefers-reduced-motion`.
- Navegação com ARIA, suporte a teclado e layout responsivo.

Essas medidas reduzem riscos comuns em uma página estática, mas não substituem uma revisão de segurança, um backend real ou uma política de proteção de dados. O formulário atual simula o envio localmente; ele não entrega mensagens a um servidor.

### Pontos de atenção no `vercel.json`

- O cabeçalho `Content-Security-Policy-Report-Only` envia relatórios para `/api/csp-report`, endpoint que não existe neste repositório.
- A CSP usa `'nonce-${NONCE}'`, mas a Vercel não substitui esse placeholder em sites estáticos. Na prática, só scripts do próprio domínio (`'self'`) são permitidos; scripts inline seriam bloqueados.
- Após o deploy, abra o console do navegador e confira se há violações de CSP ou recursos bloqueados.

## Arquivos

```text
index.html   # Estrutura, conteúdo, navegação e seções educacionais
style.css    # Tema visual, layout responsivo e animações
script.js    # Interações, filtros, checklist, terminal e validações
vercel.json  # Headers e configurações para hospedagem na Vercel
```

## Executar localmente

Não há build nem dependências de backend. Para visualizar:

```bash
git clone https://github.com/phoenixsrd/cybersecosinthub.git
cd cybersecosinthub
python3 -m http.server 8080
```

Abra `http://localhost:8080`. Os headers de `vercel.json` só valem no deploy, não no servidor local.

## Deploy na Vercel

1. Importe o repositório em [vercel.com](https://vercel.com).
2. Selecione o projeto como site estático, sem comando de build.
3. Publique e verifique se os headers de `vercel.json` estão ativos.

## Licença e responsabilidade

Consulte o arquivo `license`. O projeto é educacional e não oferece autorização para realizar reconhecimento, exploração ou coleta de dados contra terceiros.
