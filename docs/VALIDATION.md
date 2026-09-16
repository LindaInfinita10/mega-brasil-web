# Validação local — 16/09/2026

Versão: alterações locais sobre `290bedbd0c2f87a9c3eae35a94a1a3c8cbcaf00a`. Sem commit de lançamento e sem publicação.

## Verificações executadas

- `npm ci`: instalação limpa concluída após reiniciar o servidor de desenvolvimento que mantinha esbuild bloqueado no Windows. A biblioteca de empacotamento JSZip foi adicionada depois, com lockfile atualizado; npm reportou zero vulnerabilidades conhecidas.
- `npm run build`: produção aprovada, uma rota pré-renderizada; JS/CSS iniciais 429,89 kB, estimativa comprimida 102,97 kB. Esses valores não incluem imagens/PDFs.
- `npm test -- --watch=false`: 82 testes em 4 arquivos. A última alteração de aplicação posterior a esses testes foi CSS para limitar a largura do orçamento, verificada em navegador e novo build.
- `npm run test:seo`: 3 testes, incluindo domínio fictício apenas em memória para testar canonical, sitemap e JSON-LD. Nenhum domínio fictício foi aplicado ao pacote.
- `npm run verify:site`: HTML pré-renderizado, idioma, título principal, conteúdo comercial, âncoras, 13 recursos locais presentes no HTML e assinatura dos PDFs aprovados.
- Conversão de 15 imagens: 29.715.376 → 2.285.094 bytes. Resolução de cada arquivo conferida durante conversão; nenhuma dimensão alterada. Arte social revisada visualmente.

## Navegador

Ambiente: navegador integrado do Codex, build de produção servido em `http://127.0.0.1:4300`, Windows. Sem simulação de velocidade de rede e sem dispositivo físico. Não equivale a certificação de Chrome, Edge ou Safari.

Homepage e painel de orçamento: largura rolável igual à largura disponível em 360×800, 768×1024, 1366×768, 1920×1080, 2560×1440 e 3840×2160. Detectados e corrigidos os desbordes do título MegaShield e da coluna do orçamento. Revisão visual pontual em celular e notebook; a medição das seis larguras não comprova todas as possíveis sobreposições.

Interações verificadas:

- Menu móvel abre e navega à seção MegaShield.
- P60 aparece indisponível; P90 pode ser selecionada e abre o orçamento.
- Detalhes P120 abrem com foco no título, fundo inerte e retorno por Escape ao botão de origem.
- Navegação por seta move o foco entre componentes; seleção e vínculo do painel também cobertos por teste automatizado.
- Orçamento abre com foco no título e trava a rolagem de fundo.
- Política é acessível pelo consentimento e abre o texto completo.
- Dados fictícios válidos habilitam envio; e-mail inválido mantém o envio desabilitado e apresenta mensagem.
- Não foram observados erros nos logs do navegador durante a revisão.

O botão de envio real não foi acionado nesta revisão. Construção da mensagem, consentimento, falha de abertura, reabertura e conclusão são verificados pelos testes com `window.open` simulado. O envio e recebimento reais dependem de coordenação com o comercial.

## Pacote de revisão

`dist/mega-brasil-preview.zip`: 2.703.648 bytes, 26 arquivos, todos extraídos em memória e comparados por SHA256 com o build. Hash do ZIP: `3fcdde6b6f7c0d9412778569b682e3248697d072b46321d640b5faa4cb52514d`.

O comando de pacote definitivo foi testado sem domínio e recusou corretamente o build de revisão. O ZIP antigo foi preservado como `dist/mega-brasil-site.before-review-20260916.zip`; ele não representa a versão atual. O servidor de desenvolvimento foi reiniciado após a instalação.

## Aceite externo pendente

Permanecem pendentes: aprovação dos dados e textos, links/contas oficiais, conteúdo técnico dos PDFs, desempenho no domínio e rede móvel, teste completo de contraste/leitor de tela, navegadores e dispositivos físicos, domínio/HTTPS/DNS, status HTTP da 404 no provedor, Search Console, backups e reversão. Os painéis não possuem URLs próprias; avaliar o comportamento desejado do botão Voltar do navegador antes do aceite final.
