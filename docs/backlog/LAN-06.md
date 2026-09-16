# [LAN-06] Ativar SEO no domínio definitivo e verificar indexação

## Objetivo

Como pessoa que procura portas corta-fogo, quero encontrar a página oficial da Mega Brasil com informações e endereço corretos.

## Estado atual

Gerador SEO e HTML estático implementados. O pacote atual é de revisão, com noindex; não deve ser usado como lançamento.

## Prioridade e responsável

- Prioridade: Alta — configuração de lançamento; acompanhamento após publicação.
- Responsável proposto (a confirmar): Responsável técnico e administrador da conta da empresa.

## Critérios de aceite

- [ ] Após confirmar o domínio, configurar SITE_URL com a origem HTTPS aprovada e gerar um novo build.
- [ ] Conferir canonical, sitemap.xml, robots.txt, JSON-LD, Open Graph e imagem social com a mesma origem.
- [ ] Confirmar ausência de noindex no HTML de produção e nos cabeçalhos do provedor.
- [ ] Configurar redirecionamento de HTTP e domínio alternativo para a origem oficial; URLs inexistentes devem devolver 404.
- [ ] Verificar propriedade no Search Console, enviar sitemap e inspecionar a URL publicada.
- [ ] Validar dados estruturados e compartilhamento no domínio real; registrar eventuais limitações.
- [ ] Definir responsável por acompanhar indexação e desempenho; não prometer posição nem prazo de indexação.

## Referências

- Requisitos e histórias: RNF-03, RNF-05; HU-07.
- [Documentação de referência](https://github.com/LindaInfinita10/mega-brasil-web/blob/develop/docs/SEO.md).
- [Histórias de usuário](https://github.com/LindaInfinita10/mega-brasil-web/blob/develop/docs/USER_STORIES.md).
- [Roadmap](https://github.com/LindaInfinita10/mega-brasil-web/blob/develop/docs/ROADMAP.md).

Fechar somente com os critérios atendidos e evidência registrada. Alterações de código/documentação seguem develop → revisão/testes → main.
