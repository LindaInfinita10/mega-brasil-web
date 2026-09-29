# Configurador de portas MegaShield

## Estado atual

O site apresenta o configurador MegaShield na seção `#megashield`. O bloco atual usa um panorama ilustrativo com duas portas lado a lado: uma com fechadura manual e outra com barra antipânico. A configuração ativa é feita em um único formulário; o panorama não cria dois formulários independentes.

O configurador permite selecionar:

- Modelo MegaShield P60, P90 ou P120.
- P60 disponível no seletor como `MegaShield P60 — Somente sob encomenda`, aceita no carrinho e no orçamento.
- Dimensões nominais de catálogo: `80 × 210 cm`, `90 × 210 cm` e `100 × 210 cm`.
- `Outra medida — sob consulta`, com largura e altura personalizadas.
- Quantidade de portas entre 1 e 999.
- Componentes solicitados, sem preços.

O texto exibido para as medidas orienta: “Dimensões nominais. Confirmar o vão de instalação com a equipe técnica.” A aplicação não apresenta as antigas medidas de vão livre de P90/P120 como opções equivalentes às medidas nominais do catálogo.

## Componentes

Os 8 acessórios existentes e a categoria Pintura são exibidos em categorias no formulário. As seleções começam vazias e podem ser marcadas ou desmarcadas individualmente. Cada opção possui miniatura, nome completo e texto alternativo indicando que a imagem é ilustrativa.

Categorias e opções:

- **Dobradiças:** Dobradiça de mola; Dobradiça helicoidal.
- **Fechaduras:** Fechadura sobrepor simples; Fechadura sobrepor c/ chave.
- **Molas aéreas:** Mola aérea PP2200 PAIZ; Mola aérea 2234 La Fonte.
- **Barras antipânico:** Barra antipânico simples; Barra antipânico dupla. Cada barra selecionada oferece Com chave (padrão anterior) ou Sem chave, vinculada à própria barra.
- **Pintura:** Cor vermelha; Outra cor; Tinta intumescente. Uma opção por porta, com amostra visual e possibilidade de desmarcar com outro clique. Outra cor mostra “Especifique a cor desejada” e exige texto não vazio após remover espaços. Não existe Cor verde fixa nem botão adicional de remoção dentro da categoria.

O formulário informa: “Composição sujeita à confirmação técnica conforme modelo, dimensões e projeto.” Não há matriz de compatibilidade implementada; o código não filtra combinações por modelo, dimensão ou tipo de acionamento.

As imagens dos componentes ficam em `src/assets/images/components`. São ilustrações de produto identificadas como imagens ilustrativas, não fotografias ou certificações dos modelos comerciais.

## Lista do pedido e carrinho

Após a seleção, a área “Lista do pedido” mostra o modelo, dimensão, quantidade e componentes da configuração ativa. Cada componente pode ser removido diretamente dessa lista.

“Finalizar pedido” salva diretamente a configuração e abre a revisão, sem botão intermediário “Adicionar ao orçamento”. A revisão oferece “Adicionar outra porta” para incluir outra configuração. Configurações iguais são agrupadas e somam a quantidade; configurações com modelo, medida, componentes, chave ou pintura diferentes permanecem como linhas distintas. A lista permite editar ou remover cada linha. Não são exibidos preços, subtotais, totais monetários ou recargos.

O pedido existe somente em memória durante a visita. Ao abrir ou recarregar a página, começa vazio; a antiga chave `mega-brasil-cart` é removida e nunca lida. Ao abrir a solicitação no WhatsApp, carrinho, formulário e configuração são reiniciados. A quantidade é atualizada pelos controles do pedido.

### Dados do pedido

Embora o panorama diferencie visualmente fechadura manual e barra antipânico, a configuração salva remove o campo de acionamento legado. Portanto, o acionamento não é atualmente preservado como dado separado no carrinho ou na mensagem do WhatsApp. O pedido descreve os componentes efetivamente selecionados, sem inferir acionamento ou acabamento a partir da imagem.

## Finalização e WhatsApp

“Finalizar pedido” abre a tela de orçamento quando existe uma configuração válida. A tela apresenta o resumo do pedido e solicita:

- Nome completo.
- Telefone.
- E-mail.
- CNPJ da empresa.
- Empresa, opcional.
- Mensagem, opcional.
- Aceite da Política de Privacidade.

O botão “Enviar pedido pelo WhatsApp” só fica disponível com formulário válido, consentimento e pedido não vazio. A aplicação prepara uma mensagem para `+55 21 97871-5555`, abre o WhatsApp em nova aba e mostra a etapa final dentro da tela de orçamento.

O site não comprova a entrega da mensagem. O visitante precisa confirmar o envio no WhatsApp. Se a abertura for bloqueada, o pedido é mantido e pode ser reaberto. Após a confirmação do usuário, a aplicação limpa o pedido e o formulário e retorna à página inicial com “Voltar ao início”.

A tela de conclusão usa um cabeçalho próprio com a marca, navegação para Início, Empresa, MegaShield e Contato e o botão “Voltar ao início”.

## Validações e acessibilidade

- P60 permanece selecionável e válida como pedido sob encomenda.
- P60, P90 e P120 são aceitos para orçamento.
- Medidas nominais precisam corresponder às três opções de catálogo; medidas personalizadas precisam ser positivas e ter no máximo 1000 cm por dimensão.
- Quantidades precisam ser inteiras, positivas e no máximo 999.
- Nome, telefone, e-mail, CNPJ, empresa e mensagem passam por validação de formato, tamanho e caracteres de controle.
- O CNPJ aceita formato numérico ou alfanumérico e valida os dígitos verificadores.
- O teclado possui foco visível, rótulos nos controles, `aria-label` nas ações do pedido, estados de formulário e foco na tela de conclusão.

## Responsividade

O CSS usa Grid, Flexbox, `clamp()` e limites de largura para mobile, tablet, desktop, Full HD e telas grandes. O configurador e a lista do pedido reorganizam-se em uma coluna quando o espaço não comporta duas áreas. A revisão em navegador usou viewports de 390, 644, 768, 1440, 1920 e 3840 px, sem teste em televisão física ou navegador específico de Smart TV.

## Regras revisadas em 29/09/2026

Dobradiças, fechaduras, molas aéreas, barras antipânico e pintura são selecionáveis. Fixação, mantas e chapas foram retiradas. O resumo, orçamento e WhatsApp incluem chave e pintura solicitadas, inclusive “Pintura: Outra cor — Azul”; não acrescentam acabamento ou galvanização automaticamente. Dados antigos com opções retiradas são inválidos e não são restaurados; o cliente deve configurar novamente.

Ao finalizar, alterações de quantidade da última configuração salva são aplicadas sem duplicar a linha. Reabrir o pedido sem mudanças não adiciona unidades; uma linha removida não reaparece automaticamente. Alterações de componentes criam outra configuração, salvo quando o cliente usa Editar.
