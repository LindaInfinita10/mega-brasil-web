# Roadmap de lançamento — Mega Brasil

## Atualização de execução — 16/09/2026

**Correções locais e SEO implementados; publicação ainda depende de domínio, hosting e aceite da empresa.** O usuário informou que ainda não dispõe desses dados. Não houve publicação nem envio de mensagens reais.

| Frente | Situação atual |
| --- | --- |
| L-02 — conteúdo de produto | Corrigidos texto compartilhado sobre pintura, classificação pretendida no contato e especificações ilustrativas de P60. Aprovação técnica continua pendente. |
| L-04 — privacidade | Componente único nos dois formulários e link no rodapé; inclui WhatsApp, Maps e Fonts. Aprovação empresarial continua pendente. |
| L-05 — teclado | Foco ao abrir/fechar, fundo inerte, ciclo de Tab, Escape e setas no explorador implementados; regressões automatizadas e interação local verificadas. |
| L-06 — imagens | WebP com dimensões preservadas: 29.715.376 → 2.285.094 bytes nas 15 imagens referenciadas (−92,3%). Originais preservados no código e excluídos do build. Desempenho em rede real continua pendente. |
| Responsividade | Corrigidos desbordes do título MegaShield e do formulário móvel; homepage e orçamento sem excesso de largura nas seis resoluções previstas, no navegador integrado. |
| SEO | HTML estático, metadados sociais, imagem de compartilhamento, página 404 e gerador de canonical/sitemap/robots/JSON-LD implementados. Domínio ausente mantém noindex; ver [SEO.md](SEO.md). |
| Instalação e build | Instalação limpa executada; build final aprovado, 1 rota pré-renderizada, bundle inicial 429,89 kB (transferência estimada 102,97 kB). Pacote publicado em potencial tem cerca de 3,18 MB de arquivos, contra 41,12 MB na auditoria anterior. |
| Testes | 82 testes Angular aprovados em 4 arquivos e 3 testes SEO aprovados. Verificação adicional do HTML, âncoras, recursos e assinatura dos PDFs aprovada. |
| Pacote | Script gera ZIP de revisão e manifesto SHA256, compara cada arquivo extraído com a origem e distingue código com alterações locais de um commit aprovado. |

### Pendências que permanecem

Critérios de aceite e dependências: [backlog de lançamento](BACKLOG.md). Escopo funcional: [histórias de usuário](USER_STORIES.md).

- [ ] Empresa aprovar contatos, conteúdo, alegação CBMERJ, especificações dos memoriais e política de privacidade (L-01/L-03 e aceites de L-02/L-04).
- [ ] Confirmar domínio/hosting; configurar SITE_URL, DNS, HTTPS, redirects, cache e página 404 com status correto.
- [ ] Testar recebimento real de orçamento com a equipe comercial; os testes locais não comprovam entrega.
- [ ] Validar links externos e contas oficiais com a empresa; executar Chrome/Edge e celulares reais, contraste completo e desempenho em rede móvel.
- [ ] Fechar avaliação do botão Voltar do navegador: os painéis atuais não são rotas independentes; seus botões próprios e Escape foram verificados.
- [ ] Configurar Search Console, enviar sitemap e validar SEO no domínio publicado.
- [ ] Registrar responsável por suporte, commit final aprovado e backup; testar reversão no provedor e concluir aceite pós-publicação.

Evidências e limitações: [validação local](VALIDATION.md). As seções abaixo preservam a auditoria inicial de 15/09 e não substituem o estado atualizado acima.

## Registro histórico — auditoria inicial

Revisão: 15/09/2026. Código auditado: `290bedbd0c2f87a9c3eae35a94a1a3c8cbcaf00a`, branch `main`.

## Decisão atual

O escopo funcional da primeira versão está implementado, mas o aceite para publicação ainda está pendente. Build aprovado não significa lançamento aprovado. Este documento consolida [requisitos](REQUIREMENTS.md), [conteúdo](CONTENT.md) e [publicação](DEPLOYMENT.md), com as lacunas encontradas na revisão do código. Responsáveis abaixo são propostos, ainda precisam ser confirmados.

## Evidências desta revisão

- Build de produção: `npm run build`, concluído sem erros ou avisos de orçamento. Bundle inicial: 383,92 kB; transferência estimada pelo Angular: 89,57 kB, sem incluir imagens e PDFs.
- Testes: `npm test -- --watch=false`, **78 aprovados em 3 arquivos**. Cobrem validação, carrinho, bloqueio de P60/produtos ocultos, mensagem e etapa final do orçamento. A abertura do WhatsApp é simulada.
- Os dois comandos inicialmente falharam por restrição de leitura do ambiente; a execução fora do isolamento concluiu com código de saída zero.
- 18 caminhos locais distintos de imagens/PDFs referenciados literalmente no código conferidos no build; nenhum ausente. Isso não valida a apresentação das imagens nem o conteúdo técnico dos PDFs.
- Diretório publicável: 27 arquivos, 41.117.387 bytes (41,12 MB). Esse total inclui recursos que podem não ser carregados na primeira visita.
- Não foram executados nesta revisão: navegação em navegador, medição de rede, teste de contraste, envio real de mensagem ou inspeção do domínio/hosting. Não há aprovação comercial registrada nos documentos revisados.

## Etapa 1 — fechar conteúdo e corrigir lacunas

| ID | Ação | Critério de conclusão | Responsável proposto |
| --- | --- | --- | --- |
| L-01 | Aprovar empresa, endereços, contatos, imagens e alegações comerciais. | Empresa confirma os dados de CONTENT.md e a afirmação “Credenciada pelo CBMERJ” em app.html. | Mega Brasil |
| L-02 | Resolver contradições nas especificações visíveis. | Revisar a faixa compartilhada “Pintura e acabamento” nos detalhes, pois P120 é descrita como sem pintura; revisar os títulos “90 min/120 min” no contato em relação à classificação pretendida; aprovar também os textos legados da ficha P60, ainda acessível. | Equipe técnica + desenvolvimento |
| L-03 | Fechar pendências dos memoriais. | Registrar decisão sobre desenhos ausentes, dimensões, isolante P120 e acessórios, conforme CONTENT.md; confirmar o que pode ser anunciado. | Equipe técnica |
| L-04 | Unificar e disponibilizar a política de privacidade nos dois formulários. | O visitante acessa a mesma política aprovada antes de consentir, inclusive pelo formulário de contato. Hoje o contato mostra uma frase resumida e a política mais extensa só existe no painel condicional de orçamento; os links do rodapé levam a leis externas. Inventariar WhatsApp, mapa Google e fontes Google presentes em styles.css. | Empresa + desenvolvimento |
| L-05 | Revisar foco e navegação por teclado dos painéis. | Ao abrir detalhes/orçamento, foco vai ao painel; controles encobertos não recebem foco; ao fechar, foco retorna a um controle útil. Hoje a página de fundo permanece no DOM sem inert, e só a conclusão do pedido recebe foco explicitamente. Verificar também teclado do explorador com role=tab. | Desenvolvimento |
| L-06 | Medir e melhorar carregamento das imagens. | Registrar desempenho em celular e rede acordados; otimizar recursos se necessário até atingir a meta aprovada. A imagem principal de fundo tem 2,08 MB, a porta vermelha 2,45 MB e as quatro fotos da empresa somam 6,83 MB; essas fotos estão sem loading=lazy. | Desenvolvimento |

L-05 é um achado da inspeção do código, ainda sem reprodução em navegador. L-06 indica risco de desempenho, não uma medição de tempo de carregamento. L-04 trata de consistência e disponibilidade do conteúdo; esta revisão não é um parecer jurídico.

## Etapa 2 — validar a versão candidata

- [ ] Executar o fluxo completo nos dois formulários: selecionar P90/P120, alterar quantidades, remover, validar campos, consentir, abrir pedido, reabrir após bloqueio de aba e voltar ao início.
- [ ] Confirmar P60 indisponível e demais produtos ocultos.
- [ ] Abrir os dois PDFs e revisar detalhes/componentes.
- [ ] Testar menu móvel, âncoras e retornos; confirmar comportamento do botão Voltar do navegador.
- [ ] Revisar 360×800, 768×1024, 1366×768, 1920×1080, 2560×1440 e 3840×2160, sem sobreposição ou rolagem horizontal indevida.
- [ ] Registrar Chrome, Edge e navegadores móveis escolhidos, com versão e dispositivo.
- [ ] Validar teclado, foco, contraste, mensagens de erro e movimento das animações.
- [ ] Validar destinos oficiais de telefone, e-mail, redes e mapas.
- [ ] Combinar com o comercial um pedido de teste e confirmar recebimento no WhatsApp correto. Abrir wa.me não comprova entrega; o teste real exige envio autorizado.
- [ ] Registrar para cada teste: requisito, commit, ambiente, data, resultado, evidência e responsável.

## Etapa 3 — preparar e publicar

- [ ] Confirmar domínio, provedor, acessos e responsável técnico; preservar registros de e-mail MX/TXT.
- [ ] Definir disponibilidade esperada, canal de suporte e responsável por falhas.
- [ ] Aprovar o commit candidato; em ambiente limpo executar npm ci, build e testes. Esta revisão usou as dependências já instaladas.
- [ ] Fazer backup do site existente e documentar/testar reversão no provedor escolhido.
- [ ] Gerar novamente o ZIP a partir do build aprovado e registrar commit/hash do pacote. O ZIP local existente não teve seu conteúdo comparado nesta revisão; npm run build não o atualiza automaticamente.
- [ ] Publicar dist/mega-brasil-web/browser na raiz do domínio; ativar HTTPS. A navegação atual usa âncoras e não necessita fallback para essas seções; revisar regras se forem introduzidas rotas reais.
- [ ] Validar domínio, HTTPS, imagens, PDFs, mapa e fluxo de orçamento no ambiente publicado; inspecionar recursos e configuração de segurança do provedor.
- [ ] Registrar aceite final da empresa e versão publicada.

## Etapa 4 — descoberta e acompanhamento

Título, descrição e idioma pt-BR já existem em src/index.html. Não foram encontrados sitemap.xml, robots.txt, canonical ou metadados Open Graph no código atual.

- [ ] Após confirmar o domínio, decidir e implementar canonical, sitemap e regras de indexação; definir imagem/texto de compartilhamento social.
- [ ] Verificar indexação no Google Search Console e enviar sitemap quando criado.
- [ ] Conferir funcionamento após publicação e definir rotina de revisão dos contatos, documentos e produtos.
- [ ] Atualizar README e CHANGELOG para refletir com precisão o catálogo restrito e as últimas alterações. REQUIREMENTS registra 73 testes, DEPLOYMENT registra 75; esta revisão registra 78, sem alterar os registros históricos.

SEO e compartilhamento podem ser uma entrega posterior acordada; conteúdo correto, fluxo comercial utilizável, aprovações e configuração de publicação devem estar resolvidos para o lançamento.

## Fora da primeira versão

Pagamento, cadastro/login, painel administrativo, estoque automático, banco de pedidos, persistência do carrinho e envio automático de e-mail continuam fora do escopo. Reativar P60 ou o catálogo completo exige nova aprovação e revisão das regras de orçamento.
