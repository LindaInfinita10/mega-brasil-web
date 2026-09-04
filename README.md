# Mega Brasil Indústria — Site institucional

Site institucional e catálogo comercial desenvolvido em Angular para apresentar a empresa, a linha MegaShield, produtos, fichas técnicas e canais de atendimento.

## Funcionalidades

- Catálogo responsivo com fotografias dos produtos.
- Seleção de produtos e controle de quantidades.
- Fichas técnicas MegaShield P60, P90 e P120.
- Explorador visual dos componentes da porta corta-fogo.
- Formulário comercial com consentimento para tratamento de dados.
- Geração do pedido para o WhatsApp comercial.
- Mapa, endereços, redes sociais e canais de atendimento.
- Layout para celular, tablet, desktop, Full HD e televisores 4K.

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

- [Publicação e entrega](docs/DEPLOYMENT.md)
- [Conteúdo e manutenção](docs/CONTENT.md)
- [Histórico de alterações](CHANGELOG.md)

## Observação legal

Os textos de privacidade precisam ser aprovados pela empresa ou por um profissional responsável antes da publicação definitiva.

## Autoria

Desenvolvido por Pilar Molina.
