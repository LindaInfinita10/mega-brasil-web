# Dados necessários para publicar

Domínio informado em 24/09/2026: `megabrasil.ind.br` (ind de indústria). Os acessos ao hosting e DNS ainda não foram fornecidos. O domínio do e-mail comercial é diferente e deve ser preservado.

## Mensagem para o responsável

Para publicar o site, preciso do domínio exato e do nome do registrador; do provedor de hospedagem e acesso delegado ao painel; e de saber quem administra o DNS. Se ainda não houver hospedagem, confirmar isso. Se o upload for por SFTP, o administrador deve compartilhar servidor, porta, usuário e diretório público por canal seguro. Confirmar também se já há site e e-mail corporativo ativos para fazer backup e preservar o serviço. Uma apresentação ao administrador atual pode resolver esses acessos sem compartilhar a senha principal.

## Entrega técnica ao administrador

- Site estático: sem banco de dados e sem servidor Node em produção.
- Conteúdo a publicar: arquivos de `dist/mega-brasil-web/browser`, diretamente na raiz pública do domínio.
- Confirmar domínio preferido com ou sem www, HTTPS, redirecionamentos, pasta pública e página de erro com status 404.
- Preservar MX, SPF, DKIM e DMARC do e-mail; alterar apenas os registros necessários ao site.
- Guardar backup da versão atual e identificar o responsável por reversão.
- Não publicar código fonte, `node_modules`, `.git`, `tmp`, documentos internos ou pacote de revisão.
- O pacote definitivo usa `https://megabrasil.ind.br`. Gerar `mega-brasil-site.zip` conforme [SEO](SEO.md); usar somente o pacote da última compilação validada.
- Após upload, validar navegação, fotos, HTTPS, robots, sitemap, canonical, página 404 e orçamento; confirmar uma mensagem de teste com o comercial.
- Acesso à propriedade do Search Console pode ser concedido separadamente para verificação e envio do sitemap.

Não registrar senhas neste repositório. O lançamento e as verificações no servidor dependem desses acessos.
