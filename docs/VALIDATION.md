# Validação final — 25/09/2026

Estado: candidato local à primeira publicação; hosting, DNS, HTTPS e aceite empresarial ainda pendentes. A versão entregue é identificada pelo commit e hashes do manifesto gerado depois do commit.

## Verificações técnicas

- Angular/Vitest: 113 testes em 5 arquivos, cobrindo configurações, quantidades, validação, consentimento, fluxo e reset do pedido.
- SEO: 3 testes do gerador.
- Build com SITE_URL=https://megabrasil.ind.br e 1 rota pré-renderizada.
- verify:site: HTML, idioma, títulos, âncoras, 30 recursos locais, PDFs e SEO de produção.
- ZIP verificado por CRC e comparação SHA256 de cada arquivo; pacote com 38 arquivos.
- Aviso não bloqueante: CSS do componente aproximadamente 48 kB, acima do orçamento de aviso de 45 kB e abaixo do limite de erro de 50 kB.

## Carrito e fluxo

- Carrinho somente em memória; cada abertura/recarga começa vazia e remove a chave herdada mega-brasil-cart sem lê-la.
- Ao abrir a solicitação no WhatsApp, reinicia carrinho, configuração e formulário; mantém o link na etapa final para reabrir a mensagem.
- Voltar ao início também reinicia o pedido; restaurar página pelo cache de navegação reinicia o estado.
- Pedido não enviado também é descartado ao recarregar, por decisão da cliente.
- Navegador integrado: adicionar porta abre checkout com 1 produto; recarregar mostra 0 porta(s) no carrinho e Seu carrinho está vazio, sem porta prearmada no resumo.
- Cobertos por regressão: pedido legado válido, remoção de storage bloqueada, bfcache, envio inválido, erro ao abrir WhatsApp e recriação de configuração removida.

## Navegador e WhatsApp real

- Navegador integrado em Windows: configuração, checkout, e-mail inválido bloqueado, dados válidos habilitados, remoção/recriação, pedido vazio, contato e retorno.
- Contato e footer inspecionados em desktop e viewport móvel; não equivalem a testes em aparelhos físicos.
- Envio de teste autorizado pela cliente. Em 25/09/2026, mensagem P90 com 1 unidade, 80 × 210 cm, dobradiça de mola e fechadura sobrepor simples observada no chat +55 21 97871-5555 com estado Entregado às 11:05. Conteúdo completo, títulos, acentos, lista e observação de teste conferidos. Nenhuma mensagem duplicada enviada.
- P120, múltiplas quantidades e codificação cobertos pelos testes automatizados; não se afirma um segundo envio real P120 nem confirmação verbal do destinatário.
- A prova real de WhatsApp ocorreu antes da última simplificação da persistência; o texto e o destino não mudaram. Reset final coberto por regressões e navegação local.

## Limites e pendências

- Não há publicação nem verificação no domínio, TLS, cabeçalhos, redirects, 404 do hosting ou indexação.
- Chrome da captura da cliente não estava acessível à automação. O navegador integrado possui armazenamento independente. A versão final deixa de restaurar pedidos em qualquer navegador.
- Matriz Chrome/Edge/aparelhos reais, leitor de tela, contraste completo e desempenho em rede móvel continuam em LAN-04.
- mailto depende de aplicativo configurado; não há confirmação de entrega de e-mail ou chamada telefônica.
- Aprovações comercial/técnica e de privacidade continuam em LAN-02/LAN-03.
- Evidência cadastral do CNPJ em CONTENT.md; confirmar dados com a empresa antes da publicação.

## Limpeza do projeto

Removidos scripts temporários de edição, capturas e extrações de PDFs da pasta tmp, além dos ZIPs de revisão antigos. A lista de 41 recursos obsoletos removidos anteriormente está em ASSET-CLEANUP.json; os originais permanecem recuperáveis pelo histórico Git. As imagens restantes possuem referências no código, incluindo mapas dinâmicos. Mantidos dependências, cache de desenvolvimento, testes, documentação e pacote final necessários ao trabalho. Dependências/cache e dist são ignorados pelo Git.
