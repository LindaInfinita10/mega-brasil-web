# Dados necessários para publicar

Domínio informado: megabrasil.ind.br. Primeira publicação, sem site anterior. Hosting e acesso ao DNS ainda não fornecidos.

## Pedir ao proprietário

- Nome do provedor de hospedagem, endereço do painel e convite individual para a pessoa responsável pela publicação.
- Empresa onde o domínio está registrado e quem administra seus registros DNS.
- Permissão delegada para upload e configuração do site; se necessário o administrador pode ajustar o DNS.
- Pasta pública correta, configuração de HTTPS e renovação automática.
- Se usar SFTP: servidor, porta, usuário e diretório por canal seguro.
- Responsável pelo pagamento e datas de renovação de domínio e hosting.

DNS conecta o nome do domínio ao servidor do site. Não é necessário compartilhar a senha principal: o proprietário pode criar um usuário ou fazer os ajustes solicitados pelo provedor. Nunca registrar credenciais no Git ou em issues.

## Entrega técnica

Site estático, sem banco de dados ou servidor Node. Publicar o conteúdo de dist/mega-brasil-web/browser diretamente na pasta pública, ou extrair mega-brasil-site.zip nela. Preservar MX, SPF, DKIM e DMARC; o domínio do e-mail comercial é diferente do domínio do site.

Seguir [DEPLOYMENT.md](DEPLOYMENT.md) e preencher [OWNER-HANDOFF.md](OWNER-HANDOFF.md) após publicar. Guardar ZIP e manifesto desta primeira versão para manutenção e restauração futuras.
