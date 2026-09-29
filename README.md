# Mega Brasil Indústria — Site institucional

Site institucional e catálogo comercial desenvolvido em Angular para apresentar a empresa, a linha MegaShield, produtos, fichas técnicas e canais de atendimento.

## Funcionalidades

- Configurador MegaShield P60/P90/P120; P60 disponível como “Somente sob encomenda”.
- Medidas nominais de catálogo, medida sob consulta e controle de quantidade.
- Seleção dos 8 componentes existentes, com Com chave/Sem chave para cada barra antipânico, e Pintura opcional: Cor vermelha, Outra cor personalizada ou Tinta intumescente. Sem preços.
- Lista do pedido com edição, remoção e agrupamento; inicia vazia e é reiniciada ao abrir WhatsApp.
- Formulário comercial com consentimento para tratamento de dados.
- Geração do pedido para o WhatsApp comercial.
- Mapa, endereços, redes sociais e canais de atendimento.
- Layout responsivo para celular, tablet, desktop, Full HD e telas 4K, revisado em navegador com viewports simulados.
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

O build atual pode emitir um warning de orçamento de CSS; isso não impede a compilação e não foi tratado como erro funcional.

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

1. O visitante seleciona o modelo, a medida, os componentes e a quantidade.
2. Clica em Finalizar pedido para salvar a seleção e revisar; nessa tela pode editar, remover ou adicionar outra porta.
3. Informa seus dados e aceita o tratamento de dados.
4. A aplicação abre o WhatsApp comercial com o pedido preenchido.

O site não armazena os dados do formulário em banco de dados. O carrinho existe somente em memória: abrir ou recarregar inicia em zero, inclusive pedidos ainda não enviados.

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
- [Estado atual do configurador MegaShield](docs/DOOR-CONFIGURATOR.md)

## Observação legal

Os textos de privacidade precisam ser aprovados pela empresa ou por um profissional responsável antes da publicação definitiva.

## Autoria

Desenvolvido por Pilar Molina.

- [Regras de negócio](docs/BUSINESS-RULES.md)
- [Dados de hospedagem para publicação](docs/HOSTING-HANDOFF.md)

- [Entrega ao proprietário após publicação](docs/OWNER-HANDOFF.md)
- [Instruções simples de upload](ENTREGA-HOSTING.md)
