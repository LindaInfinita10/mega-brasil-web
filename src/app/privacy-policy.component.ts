import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  template: `
    <details [id]="policyId" [open]="expanded">
      <summary><span>Política de Privacidade</span><small>Saiba como seus dados são utilizados no atendimento.</small></summary>
      <p>A Mega Brasil Indústria utiliza nome, telefone, e-mail, empresa, CNPJ e mensagem informados para responder à solicitação, elaborar o orçamento e dar continuidade ao atendimento comercial.</p>
      <p>Ao escolher enviar pelo WhatsApp, esses dados e as portas e suas configurações selecionadas são incluídos em um link para o WhatsApp. Você confirma o envio da mensagem nesse serviço, que possui suas próprias regras de privacidade.</p>
      <p>Este site não salva o formulário em um banco de dados próprio nem garante sua recuperação após atualizar a página. A mensagem recebida pelo atendimento comercial passa a ser tratada pela empresa e pelo serviço de mensagens.</p>
      <p>O site também utiliza Google Maps para exibir a localização e Google Fonts para carregar fontes. Ao carregar recursos externos, seu navegador pode transmitir informações técnicas, como endereço IP, aos respectivos provedores.</p>
      <p>Para dúvidas sobre o uso dos dados ou solicitações de acesso, correção e exclusão, entre em contato pelo e-mail <a href="mailto:comercial@megabrasilindustria.net">comercial&#64;megabrasilindustria.net</a>.</p>
    </details>
  `,
  styles: `
    :host { display: block; margin: 0 0 16px; }
    details { padding: 0 24px; border: 1px solid #d6d3cc; border-top: 3px solid #f45100; border-radius: 8px; color: #333; background: #fff; font-size: 15px; line-height: 1.7; }
    summary { position: relative; padding: 20px 36px 20px 0; cursor: pointer; list-style: none; }
    summary::-webkit-details-marker { display: none; }
    summary span { display: block; color: #a63700; font-family: var(--font-display); font-size: 25px; line-height: 1.2; font-weight: 700; text-transform: uppercase; }
    summary small { display: block; margin-top: 7px; color: #555; font-size: 14px; font-weight: 400; }
    summary::after { content: '+'; position: absolute; right: 0; top: 20px; color: #a63700; font-size: 26px; }
    details[open] summary::after { content: '−'; }
    details[open] summary { border-bottom: 1px solid #e4e1da; }
    summary:focus-visible { outline: 2px solid #a63700; outline-offset: 3px; }
    p { max-width: 100ch; margin: 16px 0; }
    p:last-child { margin-bottom: 24px; }
    a { color: #a63700; overflow-wrap: anywhere; text-decoration: underline; }
    @media (max-width: 540px) { details { padding: 0 18px; } }
  `,
})
export class PrivacyPolicyComponent {
  @Input() expanded = false;
  @Input({ required: true }) policyId!: string;
}
