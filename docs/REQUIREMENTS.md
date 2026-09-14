# Requisitos do site Mega Brasil Indústria

Data da revisão: 11/09/2026. Base inicial: commit `492e18b`. Escopo atualizado com os memoriais P90/P120 e suspensão de produção de P60; ver docs/CONTENT.md.

Este documento reúne o escopo atual, os critérios de aceitação e as verificações pendentes para a primeira publicação. Os critérios ainda não verificados são uma proposta de aceite; não representam aprovação da empresa nem certificação de qualidade.

## Objetivo e escopo

Apresentar a Mega Brasil Indústria e seus canais comerciais, permitir a consulta dos modelos MegaShield e preparar solicitações de orçamento pelo WhatsApp. Nesta etapa, somente MegaShield P90 e P120 ficam disponíveis para orçamento. P60 permanece visível, fora de produção e com inclusão no orçamento bloqueada. Os demais produtos permanecem no código para futura reativação.

Não fazem parte do escopo atual: pagamento on-line, cadastro de clientes, painel administrativo, controle automático de estoque, banco de dados de pedidos ou envio automático de e-mail. O visitante confirma o envio da mensagem no WhatsApp; abrir o aplicativo não comprova a entrega do pedido. A seleção e o formulário não têm persistência garantida após recarregar a página.

## Como interpretar os estados

- **Implementado:** comportamento presente no código, ainda sujeito ao aceite manual indicado.
- **Testado:** há evidência automatizada para o critério descrito; não substitui a validação em produção.
- **Pendente:** depende de verificação, configuração ou decisão antes de ser considerado atendido.

## Requisitos funcionais

| ID | Requisito | Critério de aceitação | Estado e verificação pendente |
| --- | --- | --- | --- |
| RF-01 | Apresentar a empresa e suas unidades. | Exibir apresentação, imagens e os endereços das três unidades, com dados aprovados pela empresa. | Implementado; aprovação comercial pendente. |
| RF-02 | Limitar a oferta aos modelos MegaShield. | Exibir P90 e P120 com memoriais técnicos em PDF; manter P60 visível como fora de produção, com botões desabilitados e bloqueio na lógica do orçamento. Ocultar os demais produtos e impedir sua inclusão no orçamento. Preservar o catálogo completo no código. | Implementado; bloqueio de produtos ocultos testado; conferir apresentação manualmente. |
| RF-03 | Consultar detalhes e componentes das portas. | Em P90 e P120, “Ver ficha técnica (PDF)” abre diretamente o PDF correspondente em outra aba. Manter acesso separado a detalhes e componentes, com imagem, alternância de componentes e retorno à seção MegaShield, sem bloco de documentação técnica na página. | Implementado; revisão visual e aprovação das especificações pendentes. |
| RF-04 | Montar o orçamento. | Adicionar modelos disponíveis, incrementar e reduzir quantidades, remover o item ao chegar a zero e atualizar a contagem. Impedir quantidades inválidas e orçamento vazio no envio. | Regras testadas; conferir interação em celular e computador. |
| RF-05 | Coletar e validar os dados de contato. | Exigir nome, telefone e e-mail válidos segundo as regras abaixo; apresentar erros e impedir a preparação do pedido com dados inválidos. | Validação e bloqueio de envio testados; conferir mensagens e foco na interface. |
| RF-06 | Solicitar consentimento. | Disponibilizar o texto de privacidade no fluxo de orçamento e impedir o envio sem a confirmação do usuário. | Bloqueio testado; conteúdo e apresentação final pendentes de aprovação. |
| RF-07 | Preparar a mensagem para o WhatsApp comercial. | Abrir o número comercial configurado com dados do cliente, itens e quantidades, preservando acentos, pontuação e quebras de linha. O usuário conclui o envio no WhatsApp. | Construção da mensagem testada; envio e recebimento reais pendentes. |
| RF-08 | Disponibilizar canais de atendimento. | Links de telefone, e-mail, Instagram, LinkedIn, Facebook e mapas devem abrir os destinos oficiais aprovados. O link de e-mail abre o aplicativo de e-mail do visitante. | Implementado; validar todos os destinos manualmente. |
| RF-09 | Permitir navegação entre as seções. | Menu, menu móvel e botões de retorno devem levar à seção esperada, permitindo continuar a consulta e o orçamento. | Implementado; validação manual pendente. |

### Regras atuais dos campos

Referência: `src/app/quote-validation.ts`.

- Nome obrigatório: pelo menos duas letras, até 120 caracteres; aceita acentos, espaços, pontos, hífens e apóstrofos.
- Telefone obrigatório: 10 ou 11 dígitos no formato nacional; formato internacional iniciado por `+`, com 8 a 15 dígitos. A validação de formato não confirma que o número existe.
- E-mail obrigatório: formato validado, até 254 caracteres. Não há verificação de existência ou de propriedade da caixa postal.
- Empresa opcional: até 160 caracteres; mensagem opcional: até 2.000 caracteres. O campo interno de prazo, quando utilizado, aceita até 120 caracteres.
- Rejeitar caracteres de controle e determinados caracteres invisíveis; normalizar espaços conforme o campo antes de preparar a mensagem.

## Requisitos não funcionais

| ID | Requisito | Critério de aceitação | Estado e verificação pendente |
| --- | --- | --- | --- |
| RNF-01 | Responsividade. | Nas resoluções listadas em [Publicação e entrega](DEPLOYMENT.md), conteúdo legível, sem sobreposição ou rolagem horizontal indevida; menu, fichas e orçamento utilizáveis. | Estilos implementados; revisão visual da versão final pendente. |
| RNF-02 | Compatibilidade. | Completar consulta de modelos e preparação do orçamento em Chrome e Edge no computador e nos navegadores móveis acordados com a empresa. Registrar navegador, versão e dispositivo utilizados. | Matriz final de navegadores e execução manual pendentes. |
| RNF-03 | Desempenho. | Respeitar os limites de build de `angular.json`; medir a página hospedada, registrando ferramenta, dispositivo e condições de rede. Definir e aprovar metas de carregamento antes do aceite deste requisito. | Build aprovado; medição em hospedagem e metas de carregamento pendentes. Tamanho do bundle não comprova velocidade da página. |
| RNF-04 | Acessibilidade. | Executar o fluxo principal por teclado, com foco visível, rótulos nos campos, erros compreensíveis e alternativas textuais nas imagens relevantes; verificar contraste e foco ao abrir e fechar painéis. | Revisão pendente; não há declaração de conformidade com um padrão de acessibilidade. |
| RNF-05 | Transporte e configuração seguros. | Domínio definitivo com HTTPS válido, recursos sem conteúdo misto e ausência de credenciais nos arquivos publicados. | Configuração e inspeção da hospedagem pendentes. |
| RNF-06 | Tratamento dos dados do formulário. | Manter o fluxo sem banco de dados próprio de clientes; encaminhar os dados ao WhatsApp somente por ação do usuário e com consentimento. Revisar o texto de privacidade e os serviços externos usados, incluindo mapa e WhatsApp. | Fluxo implementado; revisão e aprovação da empresa pendentes. Não constitui declaração de conformidade legal. |
| RNF-07 | Build e manutenção. | Gerar a versão de produção com `npm run build`, executar `npm test -- --watch=false` sem falhas e manter código e instruções de publicação versionados. | Verificado em 11/09/2026: build concluído e 73 testes aprovados, em 3 arquivos de teste. Revalidar quando houver alterações de código. |
| RNF-08 | Disponibilidade. | Definir com o responsável pela hospedagem a disponibilidade esperada, o canal de suporte e o procedimento de resposta a falhas. Verificar domínio e recursos após publicar. | Hospedagem, responsáveis e metas ainda não definidos. |
| RNF-09 | Recuperação de publicação. | Identificar o commit publicado e conservar uma versão anterior recuperável; documentar e testar como republicá-la no provedor escolhido. | Histórico disponível no GitHub; procedimento no provedor e teste de reversão pendentes. |

## Evidências e limites da verificação

- `src/app/app.spec.ts`: criação da aplicação e conteúdo do título principal.
- `src/app/quote-validation.spec.ts`: regras de validação dos campos.
- `src/app/quote-flow.spec.ts`: bloqueios de envio, consentimento, carrinho e conteúdo da mensagem; a abertura de janela é simulada e não envia mensagens reais.
- Build de produção e 73 testes aprovados em 11/09/2026 para a implementação registrada no commit `492e18b`.

Essas evidências não confirmam recebimento no WhatsApp, aprovação dos produtos, acessibilidade, desempenho em rede móvel, compatibilidade completa ou disponibilidade em produção.

## Aceite da primeira publicação

Usar também o checklist de [Publicação e entrega](DEPLOYMENT.md). Registrar cada verificação com ID do requisito, versão/commit, ambiente, data, resultado e responsável. Registrar falhas e sua correção antes de marcar um requisito como aceito.

| Decisão ou verificação | Responsável a confirmar | Situação |
| --- | --- | --- |
| Aprovar conteúdo, imagens, modelos e especificações. | Representante da Mega Brasil. | Pendente. |
| Confirmar contatos oficiais e texto de privacidade. | Representante da Mega Brasil. | Pendente. |
| Confirmar domínio, hospedagem, acesso e preservação do e-mail corporativo. | Empresa e administrador do domínio. | Pendente. |
| Executar revisão visual, navegação, acessibilidade e envio real do orçamento. | Desenvolvimento e representante comercial. | Pendente. |
| Acordar navegadores, metas de desempenho e disponibilidade. | Empresa e responsável técnico. | Pendente. |
| Aprovar a versão e registrar o commit de produção. | Empresa e responsável pela publicação. | Pendente. |

## Controle de alterações

Ao alterar o escopo, atualizar os requisitos afetados, seus critérios, evidências e pendências. Uma futura reativação de produtos exige revisar RF-02, RF-04 e RF-07, além da aprovação comercial. Este documento deve acompanhar a versão do código; a aprovação final ainda não foi registrada.
