# Publicação e entrega

Consultar os [requisitos funcionais e não funcionais](REQUIREMENTS.md) para os critérios de aceitação, evidências e verificações pendentes. Este checklist deve ser preenchido para a versão que será publicada.

## Pré-requisitos

- Domínio e provedor de DNS confirmados.
- Hospedagem definida.
- Dados comerciais e textos legais aprovados.
- Acesso autorizado ao DNS, sem salvar senhas no repositório.

## Processo de publicação

1. Usar a versão aprovada da branch `main` e executar `npm ci`.
2. Executar `npm run build`.
3. Publicar `dist/mega-brasil-web/browser`.
4. Configurar o domínio e HTTPS.
5. Configurar fallback para `index.html` em rotas da aplicação.

## Configuração do provedor

- Branch de produção: `main`. Continuar o desenvolvimento em `develop` e integrar somente versões revisadas.
- Diretório do projeto: raiz do repositório.
- Instalação: `npm ci`.
- Build: `npm run build`.
- Diretório a publicar: `dist/mega-brasil-web/browser`.
- Hospedagem estática; não executar `ng serve` em produção nem publicar `node_modules` ou a pasta `.git`.
- A configuração atual considera o site na raiz do domínio. Publicação em subpasta exige revisar os caminhos das imagens e a base da aplicação.

A presença da branch `main` no GitHub não publica o site automaticamente. O provedor e o domínio ainda precisam ser configurados, e as verificações manuais abaixo continuam pendentes até seu registro.

## Upload manual no domínio

O pacote local `dist/mega-brasil-site.zip` contém os arquivos de produção na raiz do ZIP, incluindo imagens e os dois PDFs. Ele é gerado após o build e não é versionado no Git.

1. Fazer backup dos arquivos existentes na pasta pública do domínio.
2. Enviar e extrair o ZIP na pasta pública indicada pelo provedor (por exemplo, `public_html`). O `index.html` deve ficar diretamente nessa pasta, sem uma pasta `browser` intermediária.
3. Ativar HTTPS no provedor. Preservar registros de e-mail (MX/TXT) ao configurar o DNS.
4. Conferir a página inicial, `#megashield`, os detalhes de P90/P120 e os links `/documents/memorial-descritivo-p90.pdf` e `/documents/memorial-descritivo-p120.pdf`.
5. Testar o formulário e o retorno aos modelos. A navegação atual usa âncoras; não requer regras de reescrita para essas seções.

O pacote considera instalação na raiz do domínio. Domínio, provedor, DNS e HTTPS ainda dependem dos dados da hospedagem; não estão configurados por este preparo.

Verificação local em 14/09/2026: build de produção e 75 testes aprovados; marcadores P90/P120 ajustados à imagem, com revisão visual de P120 em desktop e celular. Essa verificação não substitui o teste no domínio após o upload.

## Checklist funcional

- [ ] Build concluído sem erros.
- [ ] Produtos e especificações aprovados.
- [ ] Formulário e consentimento testados.
- [ ] Mensagem recebida no WhatsApp correto.
- [ ] Telefone, e-mail, redes sociais e mapas testados.
- [ ] Navegação e botões de retorno testados.
- [ ] Política de Privacidade aprovada.

## Telas para validação

- 360 × 800 — celular.
- 768 × 1024 — tablet.
- 1366 × 768 — notebook.
- 1920 × 1080 — Full HD.
- 2560 × 1440 — QHD.
- 3840 × 2160 — televisão 4K.

## Pós-publicação

- [ ] Verificar HTTPS e domínio.
- [ ] Confirmar carregamento de imagens e mapa.
- [ ] Testar Chrome, Edge e navegador móvel.
- [ ] Cadastrar o domínio no Google Search Console.
- [ ] Enviar o sitemap quando disponível.

## Segurança e reversão

Nunca salvar senhas ou tokens no Git. Antes de publicar, criar um commit estável. Se houver problema, republicar o último commit aprovado.
