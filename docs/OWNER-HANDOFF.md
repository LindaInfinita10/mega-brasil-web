# Entrega ao proprietário — Mega Brasil

Preparado em 25/09/2026. **Publicação ainda pendente.** Preencher os campos abaixo depois de publicar; este documento não comprova que o domínio está no ar.

## O que será entregue

- Site institucional e configurador de portas P90/P120 em https://megabrasil.ind.br.
- Solicitação de orçamento pelo WhatsApp comercial +55 21 97871-5555.
- Contatos, localização, política de privacidade e identificação empresarial no rodapé.
- Código-fonte e documentação: https://github.com/LindaInfinita10/mega-brasil-web.
- Arquivos publicáveis: conteúdo de dist/mega-brasil-web/browser ou ZIP mega-brasil-site.zip. Guardar também o manifesto SHA256 correspondente.
- Instruções técnicas: DEPLOYMENT.md e, na raiz do repositório, ENTREGA-HOSTING.md.

## Registro da publicação — preencher na entrega

| Informação | Valor |
| --- | --- |
| Endereço público | https://megabrasil.ind.br — verificar depois do upload |
| Data da publicação | Pendente |
| Commit/versão publicada | Pendente: copiar o commit do manifesto do pacote efetivamente publicado |
| Nome e SHA256 do ZIP | Pendente: copiar de mega-brasil-site.manifest.json |
| Provedor e link do painel do hosting | Pendente |
| Pasta pública do site | Confirmar com o provedor; frequentemente public_html |
| Registrador do domínio e painel DNS | Pendente |
| Titular e responsável pela renovação do domínio | Proprietário — confirmar conta e vencimento |
| Renovação do hosting e forma de cobrança | Pendente |
| Certificado HTTPS e renovação automática | Confirmar após configurar o hosting |
| Responsável pela manutenção e canal de contato | Acordar com Pilar Molina |
| Acesso ao repositório e ao Search Console | Confirmar convite e propriedade da empresa |

O proprietário deve conservar controle das contas de domínio e hosting, contatos de recuperação e autenticação em dois fatores. Conceder acesso individual a quem mantém o site. Compartilhar credenciais somente por canal seguro; não colocar senhas, códigos de recuperação ou tokens no Git, neste documento ou em issues.

## Como funciona o orçamento

O visitante configura as portas, informa nome, telefone, e-mail e CNPJ e autoriza o atendimento. O site abre uma mensagem pronta no WhatsApp; o visitante ainda precisa tocar em Enviar dentro do WhatsApp.

O carrinho e o formulário são limpos ao abrir a solicitação no WhatsApp. O link da mesma solicitação continua disponível na etapa final para reabrir. Cada abertura ou recarga do site começa com carrinho vazio, inclusive pedidos não enviados. Não há cadastro, pagamento, banco de pedidos ou painel administrativo; a empresa deve acompanhar e organizar as mensagens recebidas no WhatsApp.

O link de e-mail usa o aplicativo de correio configurado no dispositivo. O site não envia e-mails automaticamente.

## Conferência junto ao proprietário após publicar

- [ ] Abrir o domínio com HTTPS em computador e celular.
- [ ] Conferir nome empresarial, CNPJ, telefones, e-mail, endereços e redes sociais.
- [ ] Aprovar textos comerciais, especificações, imagens e política de privacidade.
- [ ] Fazer um pedido identificado como teste pelo domínio publicado; conferir recebimento no WhatsApp, dados e configuração.
- [ ] Voltar ao site e confirmar zero no carrinho; recarregar e repetir a conferência.
- [ ] Conferir imagens, mapa, links de contato, PDFs e página de erro.
- [ ] Confirmar que o e-mail corporativo continua funcionando.
- [ ] Guardar ZIP, manifesto e identificação da versão publicada em pasta da empresa.
- [ ] Confirmar acessos do proprietário, responsável por suporte e prazo de atendimento combinado.
- [ ] Registrar aceite, nome do responsável e data; acompanhar Search Console e sitemap.

## Manutenção

Revisar periodicamente contatos, produtos, política, funcionamento de WhatsApp e e-mail, HTTPS e vencimentos do domínio/hosting. Alterações de conteúdo são feitas no código, testadas e publicadas como novo pacote. Não editar JavaScript compilado diretamente no hosting.

Antes de cada atualização futura, guardar o pacote que está no ar e registrar a nova versão. Se a atualização falhar, restaurar o último pacote funcional. Nesta primeira publicação não há site anterior para substituir; se o lançamento inicial falhar, retirar a versão com problema ou usar a página temporária do provedor até corrigir.

## Mensagem de entrega — enviar somente depois de publicar

“Olá! O site da Mega Brasil foi publicado em [URL verificada], em [data]. Seguem a versão publicada [commit], o pacote de backup e manifesto, a documentação de manutenção e os dados dos painéis de domínio e hospedagem. O orçamento foi testado no WhatsApp comercial e os acessos do proprietário foram conferidos. Para alterações ou problemas, o contato combinado é [responsável/canal]. As renovações de domínio e hospedagem vencem em [datas]. Pendências acordadas: [listar ou informar nenhuma somente se concluídas].”
