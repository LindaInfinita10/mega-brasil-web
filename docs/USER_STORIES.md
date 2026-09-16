# Histórias de usuário

Escopo: primeira publicação do site institucional Mega Brasil. Estas histórias descrevem funcionalidades existentes e seus aceites; não são um histórico fictício de entregas. Evidência técnica de referência: commit `523333b`, [VALIDATION.md](VALIDATION.md).

**Implementada** significa presente no código. **Testada localmente** não significa aprovada pela empresa nem validada no domínio. As issues de lançamento registram o trabalho restante, conforme [BACKLOG.md](BACKLOG.md).

## HU-01 — Conhecer a empresa e os canais oficiais

Como visitante, quero conhecer a empresa, suas unidades e canais de atendimento para entrar em contato com confiança.

Critérios: apresentação e três endereços visíveis; telefone, e-mail, WhatsApp, mapas e redes apontam aos destinos oficiais; textos e imagens aprovados.

Estado: implementada; aprovação de conteúdo e validação dos destinos pendentes. Requisitos: RF-01/RF-08. Acompanhamento: LAN-02/LAN-04.

## HU-02 — Consultar modelos e documentação

Como comprador, quero consultar os modelos disponíveis, seus memoriais e componentes para avaliar a adequação ao meu projeto.

Critérios: P90/P120 disponíveis; PDFs corretos abrem separadamente; componentes podem ser consultados por teclado; P60 identificada como fora de produção e bloqueada para orçamento; classificação pretendida e imagens ilustrativas não confundidas com certificação.

Estado: implementada; bloqueios testados, recursos locais conferidos. Aprovação técnica dos memoriais e aceite em dispositivos reais pendentes. Requisitos: RF-02/RF-03. Acompanhamento: LAN-02/LAN-04.

## HU-03 — Montar uma solicitação de orçamento

Como comprador, quero selecionar produtos e quantidades para solicitar um orçamento com os itens de que preciso.

Critérios: adicionar P90/P120; aumentar/reduzir quantidades; remover ao chegar a zero; atualizar contagem; bloquear produtos indisponíveis, quantidades inválidas e envio vazio.

Estado: implementada e regras testadas localmente. Aceite final do fluxo em dispositivos reais pendente. Requisito: RF-04. Acompanhamento: LAN-04/LAN-05.

## HU-04 — Informar dados e compreender o consentimento

Como solicitante, quero informar meus dados e entender seu uso para autorizar conscientemente o atendimento comercial.

Critérios: nome, telefone e e-mail válidos; erros compreensíveis; empresa/mensagem opcionais conforme REQUIREMENTS.md; mesma política acessível nos dois formulários; envio bloqueado sem consentimento.

Estado: validação, política compartilhada e bloqueios implementados/testados; aprovação empresarial da política pendente. Requisitos: RF-05/RF-06/RNF-06. Acompanhamento: LAN-03/LAN-04/LAN-05.

## HU-05 — Encaminhar o orçamento ao comercial

Como cliente, quero abrir no WhatsApp uma mensagem com meus produtos e dados para concluir a solicitação com o comercial.

Critérios: número oficial confirmado; mensagem preserva itens, quantidades, acentos e observações; visitante confirma envio no WhatsApp; site não afirma entrega; permite reabrir o pedido e voltar ao início.

Estado: preparação e conclusão testadas com abertura simulada. Recebimento real ainda não comprovado. Requisito: RF-07. Acompanhamento: LAN-05.

## HU-06 — Navegar em diferentes dispositivos

Como visitante, inclusive quem usa teclado ou tecnologia assistiva, quero navegar no site e no orçamento com conteúdo legível e controles acessíveis.

Critérios: menu e retornos funcionais; foco visível e dentro do painel ativo; fechamento por Escape; navegação dos componentes por setas; preferência de movimento reduzido respeitada; sem desbordes ou sobreposições nas telas acordadas.

Estado: melhorias implementadas e verificações locais registradas. Matriz de navegadores, dispositivos físicos, contraste completo, leitor de tela, desempenho e decisão sobre Voltar do navegador pendentes. Requisitos: RF-09/RNF-01 a RNF-04. Acompanhamento: LAN-04.

## HU-07 — Encontrar a página oficial

Como pessoa que procura portas corta-fogo, quero encontrar a página oficial da Mega Brasil nos buscadores e visualizar informações corretas ao compartilhar seu link.

Critérios: conteúdo principal em HTML estático; título/descrição e imagem social; canonical, sitemap, robots e JSON-LD coerentes com o domínio aprovado; versão de revisão permanece noindex; produção validada no domínio e no Search Console.

Estado: implementação e testes locais concluídos; ativação com domínio e verificação externa pendentes. Não há garantia de posicionamento ou indexação. Acompanhamento: LAN-01/LAN-06.

## HU-08 — Publicar e manter uma versão recuperável

Como responsável pela empresa, quero publicar uma versão aprovada, com HTTPS e possibilidade de restauração, para manter os canais de atendimento disponíveis.

Critérios: domínio/hosting/acessos confirmados; desenvolvimento em develop; revisão antes de main; testes e commit registrados; pacote verificado; backup e reversão testados; e-mail preservado; suporte definido e aceite no domínio registrado.

Estado: scripts e documentação preparados; configuração, publicação e aceite externo pendentes. Requisitos: RNF-05/RNF-07 a RNF-09. Acompanhamento: LAN-01/LAN-07.

## Fora do escopo

Pagamento online, login, banco de pedidos, painel administrativo, estoque automático e envio automático de e-mail não fazem parte desta entrega. Novas necessidades devem entrar como novas issues com critérios de aceite.
