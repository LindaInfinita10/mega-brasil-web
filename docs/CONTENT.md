# Conteúdo e manutenção

## Dados comerciais atuais

- WhatsApp: `+55 21 97871-5555`
- Telefone: `+55 21 3514-2414`
- E-mail: `comercial@megabrasilindustria.net`
- E-mail comercial adicional no footer: `comercial@megabrasil.net` com link mailto.
- Matriz: Rua Teixeira de Souza, 116 — Vila Maria Helena — Duque de Caxias/RJ
- Unidade 2 — Área administrativa: Avenida das Américas, 12.900 — Américas Avenue Business Square — Ala Brasil — Salas 212, 213, 214 e 215 — Barra da Tijuca/RJ

Os dados devem ser confirmados pela empresa antes da publicação.

## Redes sociais

- Instagram: `https://www.instagram.com/megabrasil_industria`
- LinkedIn: `https://www.linkedin.com/company/grupo-mega-brasil/`
- Facebook: `https://www.facebook.com/share/18PdYGjxpk/`

## Desenvolvedora

- Pilar Molina
- WhatsApp: `+55 21 99287-7821`

## Atualização de produtos

Os dados ficam em `src/app/app.ts` e as imagens em `src/assets/images/products`. Após qualquer alteração, verificar o catálogo, a seção de contato, o carrinho e a mensagem do WhatsApp.

## Privacidade

O texto compartilhado está em `src/app/privacy-policy.component.ts`. Ele descreve formulário, WhatsApp, mapa e fontes externas com base no comportamento atual; não representa aprovação da empresa. A empresa ainda precisa confirmar o canal de atendimento aos titulares e suas práticas após receber as mensagens.

O formulário solicita nome, telefone, e-mail, CNPJ, empresa e mensagem, além do consentimento. Os dados são encaminhados ao WhatsApp e não são persistidos em banco de dados pela aplicação. O carrinho não é persistido: abrir ou recarregar o site inicia um pedido vazio. A empresa deve aprovar a Política de Privacidade, a finalidade do tratamento e o canal para solicitações relacionadas à LGPD.

## Fluxo recomendado

1. Alterar o conteúdo.
2. Executar `npm run build`.
3. Revisar as páginas afetadas.
4. Criar um commit descritivo.
5. Publicar somente versões aprovadas.

## Produção e memoriais técnicos

- P60: “Somente sob encomenda”, disponível para seleção e solicitação pelo fluxo existente.
- P90 e P120: disponíveis para orçamento. PDFs originais em `public/documents/memorial-descritivo-p90.pdf` e `public/documents/memorial-descritivo-p120.pdf`, preservados sem alteração.
- O configurador também oferece as medidas nominais `80 × 210 cm`, `90 × 210 cm` e `100 × 210 cm` para P60, P90 e P120, além de outra medida sob consulta. Essas opções não substituem as medidas de vão livre dos memoriais.
- O configurador preserva os 8 acessórios em Dobradiças, Fechaduras, Molas aéreas e Barras antipânico, com Com chave/Sem chave em cada barra, e inclui Pintura com Cor vermelha, Outra cor personalizada e Tinta intumescente. A seleção é uma solicitação sujeita à confirmação técnica, sem preços.
- Os PDFs de P90/P120 são preservados em public/documents; o configurador atual não renderiza links para fichas técnicas.
- Os memoriais MD 01, revisão 00, informam **classificação pretendida**. Não tratar esses documentos como certificados de resistência ao fogo do conjunto.
- P90: projeto P 90_01/25, 01/02/2025. Vão de ensaio 210 × 90 cm (altura × largura); fabricação 209 × 84 cm. Núcleo de fibra cerâmica: 145 kg/m³.
- P120: projeto P 120_01/26, 31/03/2026. Vão de ensaio e fabricação 212 × 91 cm (altura × largura); núcleo de fibra cerâmica: 160 kg/m³, espessura nominal de 50 mm conforme seção 04. O cabeçalho do documento mantém emissão 01/02/25.
- Ambos: folha para ensaio 90 × 210 × 5 cm; chapa galvanizada #24, 0,65 mm; 48,7 kg sem acessórios e 50,5 kg com acessórios na seção 03a; fechadura de sobrepor DISAFE e três dobradiças de mola G SARDOU.
- Acabamento galvanizado; P120 explicita sem pintura, Z100. As imagens vermelhas e a barra antipânico são ilustrativas, não especificações de fornecimento.

### Pontos a confirmar com a equipe técnica

Os PDFs recebidos têm duas páginas cada e citam desenhos anexos que não estão incluídos. Confirmar esses desenhos, as dimensões finais de instalação e eventuais opções de acessórios. No P120, a seção 04 traz a designação 27x1000x2100 mm e também espessura nominal de 50 mm; confirmar a composição do isolante. A massa na seção 08 está em branco, por isso o resumo usa o valor da seção 03a com sua origem identificada. A documentação não especifica barra antipânico nem vedação intumescente: não prometer esses itens com base nas ilustrações.

## Identificação empresarial — 25/09/2026

Footer: Mega Brasil Industria Contra Incendio LTDA — CNPJ 33.113.651/0001-47. O site https://www.megabrasil.net/ confirma a matriz na Rua Teixeira de Souza, 116, Duque de Caxias. O CNPJ não aparece no conteúdo consultado do site anterior; foi encontrado em https://casadosdados.com.br/solucao/cnpj/mega-brasil-industria-contra-incendio-ltda-33113651000147 e corroborado por https://cnpj.biz/33113651000147, com nome, endereço e domínio de e-mail correspondentes. Não foi emitido comprovante oficial da Receita Federal.

## Área normativa

O texto “Segurança contra incêndio e pânico — Legislação RJ” mantém https://www.cbmerj.rj.gov.br/notas-tecnicas/, consultado em 29/09/2026 e relacionado a ambos os temas. Nenhuma norma ou certificação foi acrescentada. A seleção de pintura é uma solicitação comercial sujeita à confirmação técnica e não altera os memoriais.
