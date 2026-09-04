# Publicação e entrega

## Pré-requisitos

- Domínio e provedor de DNS confirmados.
- Hospedagem definida.
- Dados comerciais e textos legais aprovados.
- Acesso autorizado ao DNS, sem salvar senhas no repositório.

## Processo de publicação

1. Executar `npm install`.
2. Executar `npm run build`.
3. Publicar `dist/mega-brasil-web/browser`.
4. Configurar o domínio e HTTPS.
5. Configurar fallback para `index.html` em rotas da aplicação.

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
