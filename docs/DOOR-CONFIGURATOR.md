# Carrito de puertas

El configurador agrega líneas por modelo, tipo de medida, ancho, alto y accionamiento. Configuraciones iguales suman cantidades; configuraciones distintas permanecen separadas. Editar, eliminar y cambiar cantidades actúa sobre una sola configuración. El envío incluye todas las líneas, acabado, cantidad, datos del cliente y CNPJ.

Medidas del vano libre de fabricación, ancho × alto, tomadas de la sección 08 de los memoriales en `public/documents`:

- P90: 84 × 209 cm.
- P120: 91 × 212 cm.

Ambos documentos indican una hoja de 90 × 210 cm. El P120 contiene una aparente inconsistencia entre hoja y vano; se conserva la información del documento y se indica confirmación técnica de instalación. Las medidas de ensayo no se ofrecen como variantes comerciales. Otras medidas y barra antipánico se solicitan bajo consulta. P60 continúa fuera de producción.

El CNPJ es obligatorio en ambos formularios y se vuelve a validar antes de preparar WhatsApp. Se aceptan los formatos numérico y alfanumérico, con o sin puntuación y letras normalizadas a mayúsculas. Se valida formato y módulo 11 con valores ASCII menos 48; no se consulta el estado registral ni la identidad del solicitante.

Referencia: [manual de cálculo de la Receita Federal](https://www.gov.br/receitafederal/pt-br/centrais-de-conteudo/publicacoes/documentos-tecnicos/cnpj/manual-dv-cnpj.pdf).

Validación: pruebas unitarias de variantes, edición, cantidades, CNPJ y presupuesto; recorrido en navegador a 390, 1440 y 3840 píxeles con WhatsApp interceptado (sin enviar mensajes).
