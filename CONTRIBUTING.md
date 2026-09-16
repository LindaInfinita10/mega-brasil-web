# Fluxo de trabalho

## Branches

1. Registrar o trabalho em uma issue ou identificar a história/requisito afetado.
2. Implementar primeiro em `develop` (ou branch de trabalho que será integrada a `develop`).
3. Revisar alterações e executar verificações proporcionais ao trabalho.
4. Abrir pull request **de `develop` para `main`** quando a versão estiver pronta para revisão final.
5. Integrar em `main` somente após revisão, verificações e aceite correspondente.

Não usar push direto em `main` como fluxo normal. Sincronizar branches não publica o site automaticamente. Não há proteção de branches configurada por este documento.

## Issues e histórias

- Uma issue deve ter objetivo, critérios de aceite, prioridade, dependências e evidência de conclusão.
- Responsáveis e prazos só devem ser atribuídos quando confirmados; não publicar credenciais ou dados pessoais reais.
- Histórias existentes: [USER_STORIES.md](docs/USER_STORIES.md). Pendências ativas: [BACKLOG.md](docs/BACKLOG.md).
- Não fechar uma issue apenas porque existe código: registrar os testes e aceites que seu critério exige.

## Verificações

Para alterações de aplicação, executar `npm run build` e `npm test -- --watch=false`; quando afetar SEO/pacote, executar também `npm run test:seo` e `npm run verify:site`. Mudanças visuais exigem revisão das telas afetadas.

Para documentação e templates, conferir links, formato, coerência e `git diff --check`; não é necessário repetir testes da aplicação se o código não mudou.

Seguir [SEO.md](docs/SEO.md) e [DEPLOYMENT.md](docs/DEPLOYMENT.md) para gerar/publicar a versão definitiva. Sem domínio configurado, o build é de revisão e mantém noindex.

## Documentação e Wiki

`README.md` e `docs/` são as fontes versionadas. A Wiki é um índice com links; não duplicar lá requisitos, roadmaps ou resultados que possam ficar divergentes. A origem da página inicial fica em `docs/wiki/Home.md`.
