# Validação local — 22/09/2026

Versão: estado local atual do repositório. Sem commit de lançamento e sem publicação em domínio.

## Verificações executadas

- `npm test -- --watch=false`: **103/103 testes aprovados** em 5 arquivos de teste.
- `npm run build`: concluído com sucesso; uma rota foi pré-renderizada e a etapa SEO foi executada.
- O build pode emitir um warning de orçamento de CSS. Esse warning não impediu a compilação e não foi tratado como erro funcional.

## Funcionalidades verificadas

- P60 aparece no seletor como fora de produção, desabilitado e bloqueado pela validação.
- P90 e P120 permanecem disponíveis.
- As medidas nominais `80 × 210 cm`, `90 × 210 cm` e `100 × 210 cm` são aceitas para os dois modelos.
- Medida personalizada sob consulta, largura, altura e quantidade são validadas.
- As 8 opções de componentes aparecem sem seleção padrão e podem ser selecionadas ou removidas individualmente.
- Configurações iguais são agrupadas; configurações diferentes permanecem separadas.
- Editar, remover, alterar quantidade e restaurar o pedido após recarregar usam o `localStorage` do navegador.
- A tela de finalização valida dados do cliente, CNPJ, consentimento e pedido não vazio.
- A mensagem do orçamento é preparada para o WhatsApp comercial com modelo, dimensão, componentes, quantidade e dados do cliente.
- A abertura do WhatsApp é simulada nos testes; não houve envio ou recebimento real.
- A etapa final permite confirmar o envio, limpar o pedido e retornar à página inicial.

## Revisão visual no navegador

A revisão foi feita no navegador integrado com viewports simulados de:

- 390 px — mobile.
- 644 px — largura intermediária.
- 768 px — tablet.
- 1440 px — desktop.
- 1920 px — Full HD.
- 3840 px — tela 4K simulada.

Também foi verificado zoom de 200% em viewport móvel e ausência de rolagem horizontal indevida. Não foi usado telefone, tablet, televisão ou outro dispositivo físico. A revisão não certifica compatibilidade com Chrome, Edge, Safari ou navegadores específicos de Smart TV.

## Acessibilidade verificada

- Foco visível nos controles.
- Rótulos associados aos campos.
- `aria-label` para ações de quantidade, edição e remoção.
- Estados de formulário e mensagens de erro.
- Foco na tela de conclusão do pedido.
- Navegação de painéis e do fluxo de orçamento coberta pelos testes existentes.

Isso não constitui declaração de conformidade WCAG nem substitui auditoria com leitor de tela, contraste e dispositivos reais.

## Limites e pendências

- O envio e o recebimento reais no WhatsApp continuam pendentes de coordenação com o comercial.
- Domínio, HTTPS, hospedagem, Search Console, backups e reversão não foram validados nesta revisão.
- A distinção entre fechadura manual e barra antipânico é visual no panorama; o campo de acionamento não é preservado atualmente como parte separada da configuração persistida ou da mensagem enviada. Ver [DOOR-CONFIGURATOR.md](DOOR-CONFIGURATOR.md).
- As imagens dos componentes são ilustrações identificadas como ilustrativas, não fotografias ou certificações dos modelos comerciais.
