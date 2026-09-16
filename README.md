# Mega Brasil Indústria — Site institucional

Site institucional e catálogo comercial desenvolvido em Angular para apresentar a empresa, a linha MegaShield, produtos, fichas técnicas e canais de atendimento.

## Funcionalidades

- Catálogo responsivo MegaShield P90/P120; P60 visível e indisponível para orçamento.
- Seleção de produtos e controle de quantidades.
- Fichas técnicas MegaShield P60, P90 e P120.
- Explorador visual dos componentes da porta corta-fogo.
- Formulário comercial com consentimento para tratamento de dados.
- Geração do pedido para o WhatsApp comercial.
- Mapa, endereços, redes sociais e canais de atendimento.
- Layout para celular, tablet, desktop, Full HD e televisores 4K.
- HTML estático pré-renderizado, imagens WebP e configuração SEO por domínio.
- Política de privacidade compartilhada entre formulários e navegação dos painéis por teclado.

## Tecnologias

- Angular 21
- TypeScript 5.9
- Angular Forms
- CSS responsivo
- Vitest

## Execução local

```bash
npm install
npm start
```

A aplicação ficará disponível em `http://localhost:4200`.

## Build de produção

```bash
npm run build
```

Os arquivos otimizados são gerados em `dist/mega-brasil-web/browser`.

Sem a variável `SITE_URL`, o build é uma versão de revisão com `noindex`. Para o lançamento, configurar a origem HTTPS aprovada e seguir [SEO e publicação](docs/SEO.md). Não é necessário executar um servidor Node em produção.

## Verificação e pacote

```bash
npm test -- --watch=false
npm run test:seo
npm run verify:site
```

`npm run package:release -- --preview` gera o ZIP de revisão após o build. `npm run package:release` exige um build com domínio configurado. Os pacotes acompanham manifesto com hashes e identificação do estado do código.

## Estrutura

```text
src/
├── app/
│   ├── app.ts        # estado, produtos e orçamento
│   ├── app.html      # páginas e seções
│   └── app.css       # sistema visual e responsividade
├── assets/images/    # imagens institucionais e produtos
├── main.ts
└── styles.css        # estilos globais
```

## Fluxo do orçamento

1. O visitante seleciona produtos e quantidades.
2. Informa seus dados e aceita o tratamento de dados.
3. A aplicação abre o WhatsApp comercial com o pedido preenchido.

O site não armazena os dados do formulário em banco de dados.

## Documentação

- [Backlog de lançamento](docs/BACKLOG.md)
- [Histórias de usuário](docs/USER_STORIES.md)
- [Fluxo develop → main e contribuição](CONTRIBUTING.md)
- [Índice preparado para a Wiki](docs/wiki/Home.md)
- [Roadmap e revisão de lançamento](docs/ROADMAP.md)
- [SEO e configuração do domínio](docs/SEO.md)
- [Requisitos funcionais e não funcionais](docs/REQUIREMENTS.md)
- [Publicação e entrega](docs/DEPLOYMENT.md)
- [Conteúdo e manutenção](docs/CONTENT.md)
- [Histórico de alterações](CHANGELOG.md)

## Observação legal

Os textos de privacidade precisam ser aprovados pela empresa ou por um profissional responsável antes da publicação definitiva.

## Autoria

Desenvolvido por Pilar Molina.
