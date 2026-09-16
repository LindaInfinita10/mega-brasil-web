# [LAN-03] Aprovar a política de privacidade compartilhada

## Objetivo

Como solicitante de orçamento, quero entender como meus dados são usados antes de autorizar o contato comercial.

## Estado atual

Componente único e bloqueio de consentimento implementados. A revisão de código não equivale a aprovação da política.

## Prioridade e responsável

- Prioridade: Alta — bloqueia o aceite do formulário.
- Responsável proposto (a confirmar): Representante da empresa responsável pelo tratamento de dados.

## Critérios de aceite

- [ ] Revisar o texto de src/app/privacy-policy.component.ts e confirmar que corresponde às práticas da empresa.
- [ ] Confirmar finalidade, canal de solicitações, práticas de guarda/exclusão e atendimento após receber mensagens.
- [ ] Revisar os serviços externos citados: WhatsApp, Google Maps e Google Fonts.
- [ ] Confirmar que ambos os formulários e o rodapé oferecem acesso à mesma política.
- [ ] Registrar aprovação ou correções e revalidar o bloqueio de envio sem consentimento.

## Referências

- Requisitos e histórias: RF-06, RNF-06; HU-04.
- [Documentação de referência](https://github.com/LindaInfinita10/mega-brasil-web/blob/develop/docs/CONTENT.md).
- [Histórias de usuário](https://github.com/LindaInfinita10/mega-brasil-web/blob/develop/docs/USER_STORIES.md).
- [Roadmap](https://github.com/LindaInfinita10/mega-brasil-web/blob/develop/docs/ROADMAP.md).

Fechar somente com os critérios atendidos e evidência registrada. Alterações de código/documentação seguem develop → revisão/testes → main.
