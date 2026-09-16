# [LAN-07] Publicar versão aprovada com backup e plano de reversão

## Objetivo

Como responsável pelo site, quero publicar uma versão aprovada e recuperável para manter o atendimento disponível.

## Estado atual

Publicação não autorizada por esta issue sozinha: ela registra o trabalho e o aceite necessário. Hospedagem, domínio e aprovação final permanecem pendentes.

## Prioridade e responsável

- Prioridade: Alta — entrega final.
- Responsável proposto (a confirmar): Responsável pela publicação e representante da empresa.

## Critérios de aceite

- [ ] Fechar os aceites de conteúdo, privacidade e validação; confirmar domínio e hosting.
- [ ] Integrar alterações primeiro em develop; revisar/testar e abrir PR develop → main para a versão candidata.
- [ ] Registrar commit aprovado; executar instalação, build, testes Angular, testes SEO e verify:site com SITE_URL correto.
- [ ] Gerar pacote definitivo e manifesto; verificar arquivos, hashes e ausência de alterações não aprovadas.
- [ ] Fazer backup do site anterior e documentar/testar restauração no provedor.
- [ ] Publicar na pasta correta, configurar HTTPS e preservar os registros de e-mail.
- [ ] Executar smoke test no domínio: homepage, imagens, PDFs, mapa, formulários, WhatsApp e respostas 200/404.
- [ ] Registrar aceite final, responsável pelo suporte e procedimento de resposta a falhas; acompanhar os passos pós-publicação de SEO.

## Referências

- Requisitos e histórias: RNF-05, RNF-07 a RNF-09; HU-08.
- [Documentação de referência](https://github.com/LindaInfinita10/mega-brasil-web/blob/develop/docs/DEPLOYMENT.md).
- [Histórias de usuário](https://github.com/LindaInfinita10/mega-brasil-web/blob/develop/docs/USER_STORIES.md).
- [Roadmap](https://github.com/LindaInfinita10/mega-brasil-web/blob/develop/docs/ROADMAP.md).

Fechar somente com os critérios atendidos e evidência registrada. Alterações de código/documentação seguem develop → revisão/testes → main.
