import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly commercialWhatsapp = '5521978715555';
  protected readonly feedback = signal('');
  protected form = {
    name: '',
    company: '',
    phone: '',
    email: '',
    budget: '',
    deadline: '',
    consent: false,
  };
  protected cart = signal<{ name: string; quantity: number }[]>([]);
  protected addProduct(name: string): void {
    const found = this.cart().find((item) => item.name === name);
    this.cart.set(
      found
        ? this.cart().map((item) =>
            item.name === name ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [...this.cart(), { name, quantity: 1 }],
    );
  }
  protected changeProduct(name: string, amount: number): void {
    this.cart.set(
      this.cart().flatMap((item) =>
        item.name === name && item.quantity + amount <= 0
          ? []
          : [item.name === name ? { ...item, quantity: item.quantity + amount } : item],
      ),
    );
  }
  protected sendQuote(): void {
    if (!this.form.consent) return;
    const items = this.cart()
      .map((item) => `• ${item.name}: ${item.quantity} unidade(s)`)
      .join('\n');
    const message = `*Pedido de orçamento — Mega Brasil*\n\n${items}\n\n*Nome:* ${this.form.name}\n*Empresa:* ${this.form.company}\n*Telefone:* ${this.form.phone}\n*E-mail:* ${this.form.email}\n*Medidas/observações:* ${this.form.budget || 'A definir'}\n*Prazo:* ${this.form.deadline || 'A definir'}\n*Consentimento LGPD:* aceito`;
    window.open(
      `https://wa.me/${this.commercialWhatsapp}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer',
    );
  }

  protected sendToWhatsapp(): void {
    const message = [
      '*Novo pedido de orçamento — Mega Brasil*',
      '',
      `*Nome:* ${this.form.name}`,
      `*Empresa:* ${this.form.company}`,
      `*Telefone:* ${this.form.phone}`,
      `*E-mail:* ${this.form.email}`,
      `*Orçamento / necessidade:* ${this.form.budget}`,
    ].join('\n');
    window.open(
      `https://wa.me/${this.commercialWhatsapp}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer',
    );
    this.feedback.set('Abrindo o WhatsApp com os dados do seu orçamento.');
  }
}
