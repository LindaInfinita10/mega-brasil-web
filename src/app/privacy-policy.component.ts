import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  template: `
    <details [id]="policyId">
      <summary>Política de Privacidade e tratamento de dados</summary>
      <p>A Mega Brasil Indústria utiliza nome, telefone, e-mail, empresa e mensagem informados para responder à solicitação, elaborar o orçamento e dar continuidade ao atendimento comercial.</p>
      <p>Ao escolher enviar pelo WhatsApp, esses dados e os produtos selecionados são incluídos em um link para o WhatsApp. Você confirma o envio da mensagem nesse serviço, que possui suas próprias regras de privacidade.</p>
      <p>Este site não salva o formulário em um banco de dados próprio nem garante sua recuperação após atualizar a página. A mensagem recebida pelo atendimento comercial passa a ser tratada pela empresa e pelo serviço de mensagens.</p>
      <p>O site também utiliza Google Maps para exibir a localização e Google Fonts para carregar fontes. Ao carregar recursos externos, seu navegador pode transmitir informações técnicas, como endereço IP, aos respectivos provedores.</p>
      <p>Para dúvidas sobre o uso dos dados ou solicitações de acesso, correção e exclusão, entre em contato pelo e-mail <a href="mailto:comercial@megabrasilindustria.net">comercial&#64;megabrasilindustria.net</a>.</p>
    </details>
  `,
  styles: `
    :host { display: block; margin: 0 0 16px; }
    details { padding: 14px; border: 1px solid currentColor; border-radius: 5px; font-size: 14px; line-height: 1.6; }
    summary { cursor: pointer; font-weight: 700; }
    p { margin: 12px 0 0; }
    a { color: inherit; overflow-wrap: anywhere; text-decoration: underline; }
  `,
})
export class PrivacyPolicyComponent {
  @Input({ required: true }) policyId!: string;
}
