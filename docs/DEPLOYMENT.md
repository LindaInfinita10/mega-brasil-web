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
