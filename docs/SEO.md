# SEO e publicação

## Implementado

- HTML da página inicial pré-renderizado durante o build com Angular SSG, mantendo hospedagem estática. Empresa, modelos, contatos e links para os PDFs ficam no HTML entregue ao visitante.
- Título, descrição, idioma pt-BR, hierarquia de títulos, textos alternativos e título principal com a identificação das portas MegaShield.
- Open Graph e Twitter Card; imagem de compartilhamento de 1200 × 630 em `public/images/mega-brasil-social.jpg`.
- Canonical absoluto, og:url, URLs absolutas de imagem e JSON-LD Organization/WebSite/WebPage gerados com o domínio configurado.
- Sitemap XML com a URL canônica da página inicial e robots.txt com a localização do sitemap.
- Imagens WebP, dimensões nas imagens estáticas, carregamento tardio abaixo da primeira tela e preload da imagem principal.
- Página 404 própria, com noindex. O provedor deve servi-la com status HTTP 404.
- Testes para evitar canonical fictício, origem inválida e divergência entre sitemap, metadados e dados estruturados.

## Configurar o domínio

Ainda não há domínio ou provedor confirmado. `SITE_URL` é uma variável de build, não uma senha. Aceita apenas a origem HTTPS na raiz, sem caminho, porta, usuário ou parâmetros. Escolher uma única forma oficial, com ou sem www.

Sem `SITE_URL`, `npm run build` gera uma versão de revisão com **noindex, nofollow**, sem canonical, sitemap ou JSON-LD vinculado a domínio. robots.txt permite a leitura para que os buscadores possam encontrar a diretiva noindex; isso não é uma proteção de acesso. Não publicar essa versão como lançamento definitivo.

Quando a empresa confirmar o domínio, no PowerShell:

```powershell
$env:SITE_URL = 'https://DOMINIO-APROVADO'
npm ci
npm run build
npm test -- --watch=false
npm run test:seo
npm run verify:site
npm run package:release
```

Substituir `DOMINIO-APROVADO` pelo domínio real. Em CI/hosting, cadastrar SITE_URL no ambiente do comando `npm run build`. O script `scripts/seo.mjs` aplica os metadados ao HTML já pré-renderizado. Não executar só `ng build` para entrega final, porque esse comando não executa a etapa SEO.

Para gerar somente um pacote de revisão:

```powershell
Remove-Item Env:SITE_URL -ErrorAction SilentlyContinue
npm run build
npm run package:release -- --preview
```

O ZIP de revisão é `dist/mega-brasil-preview.zip`; o definitivo é `dist/mega-brasil-site.zip`. O manifesto ao lado do ZIP registra hashes dos arquivos, commit base e existência de alterações locais. Um pacote com alterações locais não equivale a um commit aprovado.

## Configuração no provedor e aceite

- [ ] Domínio oficial e HTTPS válidos; redirecionar HTTP e domínio alternativo para a mesma origem canônica, sem ciclos.
- [ ] Servir `/` com HTTP 200, PDFs com application/pdf e URLs inexistentes com HTTP 404 e página personalizada. Não devolver a homepage com status 200 para qualquer URL.
- [ ] Confirmar ausência de noindex no HTML de produção e de X-Robots-Tag noindex no servidor/CDN.
- [ ] Verificar `/robots.txt`, `/sitemap.xml`, canonical, JSON-LD e imagem social no domínio real.
- [ ] Configurar compressão Brotli/gzip e cache. HTML deve poder ser atualizado rapidamente; os arquivos JS/CSS com hash podem ter cache longo. Imagens sem hash precisam de estratégia de invalidação ao serem substituídas.
- [ ] Aprovar nome, contatos, endereço e perfis oficiais usados também no JSON-LD. Alterações nesses dados exigem atualizar `scripts/seo.mjs`, a página e CONTENT.md.
- [ ] Verificar propriedade no Google Search Console; enviar o sitemap e inspecionar a URL publicada. O acesso à conta e/ou DNS ainda depende da empresa.
- [ ] Validar dados estruturados no Rich Results Test e compartilhamento nos serviços escolhidos depois da publicação.
- [ ] Medir desempenho em dispositivo/rede móvel; acompanhar LCP, INP e CLS com dados reais quando disponíveis. A redução de bytes não substitui medição em produção.
- [ ] Confirmar perfil oficial no Google Business Profile, quando aplicável, e manter os dados consistentes com o site.
- [ ] Acompanhar erros de rastreamento, páginas indexadas e consultas de pesquisa. Definir responsável e frequência.

## Decisões de escopo

O site atual tem uma página e navegação por âncoras. As âncoras e painéis de detalhe não são páginas independentes no sitemap. Não foram inventadas URLs de produto, avaliações, preços, certificações, horários, CNPJ ou ofertas. Os dados estruturados descrevem a organização e a página com informações que já aparecem no site; não prometem resultados enriquecidos nem posição no Google.

Páginas próprias e indexáveis para cada produto exigem uma ampliação de conteúdo e navegação, com textos técnicos aprovados. Não há hreflang porque existe apenas a versão em português. Analytics e publicidade não foram ativados: dependem de conta, identificadores e definição do tratamento de dados.

## Referências

- [Angular: geração estática e renderização](https://angular.dev/guide/ssr)
- [Google: SEO para JavaScript](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google: canonical](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google: sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google: dados estruturados da organização](https://developers.google.com/search/docs/appearance/structured-data/organization)
