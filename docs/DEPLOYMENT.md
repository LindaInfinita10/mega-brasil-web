# Publicação e entrega

Atualizado em 29/09/2026. Primeira publicação; não há site anterior a substituir. Domínio informado: https://megabrasil.ind.br. Hosting, DNS, HTTPS e aceites empresariais ainda pendentes.

## Preparar a versão

Código segue develop → revisão/testes → main. Guardar o commit aprovado e executar na raiz, em PowerShell:

```powershell
npm ci
npm test -- --watch=false
npm run test:seo
$env:SITE_URL = 'https://megabrasil.ind.br'
npm run build
npm run verify:site
npm run package:release
```

Interromper se qualquer comando falhar. Gerar o pacote após o commit, com árvore limpa, para o manifesto identificar a versão. Build sozinho não atualiza ZIP. Sem SITE_URL o resultado é revisão/noindex.

Validação local: 117 testes Angular, 3 SEO, build e 30 recursos verificados. Warning CSS de 48,81 kB ante limite de aviso de 45 kB, abaixo do limite de erro de 50 kB. Ver [VALIDATION.md](VALIDATION.md).

## Upload manual

1. Confirmar pasta pública do domínio com o provedor (exemplo: public_html).
2. Extrair **o conteúdo** de dist/mega-brasil-site.zip nessa pasta. Alternativamente copiar **todos os arquivos e subpastas dentro de** dist/mega-brasil-web/browser.
3. index.html deve ficar diretamente na pasta pública, sem uma pasta browser intermediária.
4. Ativar HTTPS e redirecionamento HTTP/www para a origem oficial. Alterar somente DNS necessário ao site; preservar registros de e-mail.
5. Configurar 404.html com status HTTP 404 para endereços inexistentes. As seções usam âncoras e não precisam de fallback universal.
6. Guardar ZIP e manifesto SHA256 desta publicação. Nas próximas atualizações, guardar também a versão anterior para restauração.

Não publicar node_modules, .git, código-fonte ou documentos internos. Não usar ng serve em produção. O site é estático, sem banco de dados ou Node no hosting. Instalação em subpasta requer revisão de caminhos e base URL.

## Testes após publicação

- [ ] HTTPS, origem preferida, respostas 200/404 e imagens/PDFs.
- [ ] Chrome, Edge, celular físico; telas de 360, 768, 1366, 1920, 2560 e 3840 px conforme matriz acordada.
- [ ] Menu Contato chega à seção de contatos; telefone, mapa, redes e e-mail.
- [ ] Montar pedido P90/P120, editar/remover e validar consentimento.
- [ ] Encaminhar ao WhatsApp: carrinho e formulário limpam imediatamente; confirmar envio no WhatsApp e recebimento com o comercial. A página não detecta entrega.
- [ ] Reabrir mensagem pela etapa final, concluir, voltar e recarregar: carrinho vazio.
- [ ] Canonical, robots, sitemap e dados estruturados no domínio; verificar Search Console.
- [ ] Registrar data, commit, aprovador e responsável por suporte em [OWNER-HANDOFF.md](OWNER-HANDOFF.md).

## Restauração

Guardar pacote, manifesto e commit em local controlado pela empresa. Em falha de atualização, republicar o último pacote aprovado e repetir o smoke test. Como esta é a primeira publicação, ainda não existe versão anterior em produção. Testar o procedimento com o provedor antes de considerar LAN-07 concluída.

A documentação e o build não comprovam publicação ou aprovação empresarial. Pendências em [BACKLOG.md](BACKLOG.md).
