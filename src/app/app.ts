import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({ selector: 'app-root', imports: [FormsModule], templateUrl: './app.html', styleUrl: './app.css' })
export class App {
  readonly commercialWhatsapp = '5521978715555';
  protected readonly feedback = signal('');
  protected form = { name: '', company: '', phone: '', email: '', budget: '' };

  protected sendToWhatsapp(): void {
    const message = [
      '*Novo pedido de orçamento — Mega Brasil*', '',
      `*Nome:* ${this.form.name}`,
      `*Empresa:* ${this.form.company}`,
      `*Telefone:* ${this.form.phone}`,
      `*E-mail:* ${this.form.email}`,
      `*Orçamento / necessidade:* ${this.form.budget}`,
    ].join('\n');
    window.open(`https://wa.me/${this.commercialWhatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    this.feedback.set('Abrindo o WhatsApp com os dados do seu orçamento.');
  }
}
