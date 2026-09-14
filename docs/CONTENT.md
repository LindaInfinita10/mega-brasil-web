# Conteúdo e manutenção

## Dados comerciais atuais

- WhatsApp: `+55 21 97871-5555`
- Telefone: `+55 21 3514-2414`
- E-mail: `comercial@megabrasilindustria.net`
- Matriz: Rua Teixeira de Souza, 116 — Vila Maria Helena — Duque de Caxias/RJ
- Unidade 2 — Área administrativa: Avenida das Américas, 12.900 — Américas Avenue Business Square — Ala Brasil — Salas 212, 213, 214 e 215 — Barra da Tijuca/RJ
- Unidade 3: Avenida Juscelino Kubitscheck, 1.455 — Edifício The City — São Paulo/SP

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

O formulário solicita nome, telefone, e-mail, empresa e mensagem. Os dados são encaminhados ao WhatsApp e não são persistidos pela aplicação. A empresa deve aprovar a Política de Privacidade, a finalidade do tratamento e o canal para solicitações relacionadas à LGPD.

## Fluxo recomendado

1. Alterar o conteúdo.
2. Executar `npm run build`.
3. Revisar as páginas afetadas.
4. Criar um commit descritivo.
5. Publicar somente versões aprovadas.

## Produção e memoriais técnicos

- P60: fora de produção no momento. Continua visível, mas não pode ser adicionada nem enviada no orçamento. Reativação exige aprovação comercial e alteração da lista de produtos disponíveis em `app.ts`.
- P90 e P120: disponíveis para orçamento. PDFs originais em `public/documents/memorial-descritivo-p90.pdf` e `public/documents/memorial-descritivo-p120.pdf`, preservados sem alteração.
- O botão “Ver ficha técnica (PDF)” de P90 e P120 abre diretamente o respectivo PDF em outra aba. “Ver detalhes e componentes” mantém a apresentação visual, sem o bloco de documentação técnica entre a porta e seus componentes.
- Os memoriais MD 01, revisão 00, informam **classificação pretendida**. Não tratar esses documentos como certificados de resistência ao fogo do conjunto.
- P90: projeto P 90_01/25, 01/02/2025. Vão de ensaio 210 × 90 cm (altura × largura); fabricação 209 × 84 cm. Núcleo de fibra cerâmica: 145 kg/m³.
- P120: projeto P 120_01/26, 31/03/2026. Vão de ensaio e fabricação 212 × 91 cm (altura × largura); núcleo de fibra cerâmica: 160 kg/m³, espessura nominal de 50 mm conforme seção 04. O cabeçalho do documento mantém emissão 01/02/25.
- Ambos: folha para ensaio 90 × 210 × 5 cm; chapa galvanizada #24, 0,65 mm; 48,7 kg sem acessórios e 50,5 kg com acessórios na seção 03a; fechadura de sobrepor DISAFE e três dobradiças de mola G SARDOU.
- Acabamento galvanizado; P120 explicita sem pintura, Z100. As imagens vermelhas e a barra antipânico são ilustrativas, não especificações de fornecimento.

### Pontos a confirmar com a equipe técnica

Os PDFs recebidos têm duas páginas cada e citam desenhos anexos que não estão incluídos. Confirmar esses desenhos, as dimensões finais de instalação e eventuais opções de acessórios. No P120, a seção 04 traz a designação 27x1000x2100 mm e também espessura nominal de 50 mm; confirmar a composição do isolante. A massa na seção 08 está em branco, por isso o resumo usa o valor da seção 03a com sua origem identificada. A documentação não especifica barra antipânico nem vedação intumescente: não prometer esses itens com base nas ilustrações.
