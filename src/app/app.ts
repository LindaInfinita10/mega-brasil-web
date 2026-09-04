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
  protected quotePage = signal(false);
  protected selectedDoor = signal<'P60' | 'P90' | 'P120' | null>(null);
  protected readonly doorDetails = {
    P60: { minutes: 60, use: 'Indicada para rotas de fuga, escadas e corredores.', image: '/assets/images/hero/megashield-red.png' },
    P90: { minutes: 90, use: 'Ideal para locais com maior exigência de segurança.', image: '/assets/images/hero/megashield-red.png' },
    P120: { minutes: 120, use: 'Indicada para áreas industriais e ambientes de alto risco.', image: '/assets/images/hero/megashield-red.png' },
  };
  protected readonly contactProducts = [
    { name: 'MegaShield P60', title: 'Porta corta-fogo · 60 min', image: '/assets/images/hero/megashield-red.png' },
    { name: 'MegaShield P90', title: 'Porta corta-fogo · 90 min', image: '/assets/images/hero/megashield-red.png' },
    { name: 'MegaShield P120', title: 'Porta corta-fogo · 120 min', image: '/assets/images/hero/megashield-red.png' },
    { name: 'MegaHose', title: 'Mangueira de incêndio', image: '/assets/images/products/megahose-hd.png' },
    { name: 'MegaPump', title: 'Casa de máquinas', image: '/assets/images/products/megapump-hd.png' },
    { name: 'MegaSensor', title: 'Detecção e alarme', image: '/assets/images/products/megasensor-hd.png' },
    { name: 'MegaVolt', title: 'Painéis elétricos', image: '/assets/images/products/megavolt-hd.png' },
    { name: 'MegaTherm', title: 'Tinta intumescente', image: '/assets/images/products/megatherm-hd.png' },
    { name: 'MegaFoam', title: 'Gerador de espuma', image: '/assets/images/products/megafoam-hd.png' },
    { name: 'MegaSprink', title: 'Sprinklers', image: '/assets/images/products/megasprink-hd.png' },
  ];
  protected readonly doorComponents = [
    { title: 'Folha metálica reforçada', text: 'Chapa de aço de alta resistência que garante integridade estrutural e proteção ao fogo.', x: 52, y: 35, zoom: '54% 38%' },
    { title: 'Batente de aço', text: 'Estrutura robusta que assegura alinhamento, fixação e vedação eficiente da porta.', x: 78, y: 20, zoom: '78% 22%' },
    { title: 'Dobradiças de alto desempenho', text: 'Projetadas para suportar uso intenso e garantir abertura suave e segura por longos períodos.', x: 73, y: 31, zoom: '74% 31%' },
    { title: 'Barra antipânico', text: 'Dispositivo de abertura rápida e segura, em conformidade com as normas técnicas.', x: 52, y: 58, zoom: '52% 58%' },
    { title: 'Fechadura e acessórios', text: 'Conjunto de fechadura, cilindro e acessórios de alta qualidade para segurança e confiabilidade.', x: 27, y: 58, zoom: '30% 58%' },
    { title: 'Vedação e acabamento', text: 'Vedações intumescentes e acabamentos que garantem estanqueidade e proteção eficaz.', x: 74, y: 74, zoom: '75% 74%' },
    { title: 'Sinalização', text: 'Identificação clara e conforme as normas para orientação e segurança dos usuários.', x: 52, y: 44, zoom: '52% 44%' },
    { title: 'Fixação e instalação técnica', text: 'Sistema de fixação seguro e orientações técnicas para instalação correta e duradoura.', x: 76, y: 88, zoom: '76% 88%' },
  ];
  protected selectedComponent = signal(0);

  protected selectComponent(index: number): void {
    this.selectedComponent.set(index);
  }

  protected openDoorDetail(model: 'P60' | 'P90' | 'P120'): void {
    this.selectedDoor.set(model);
    this.selectedComponent.set(0);
    document.body.classList.add('quote-open');
  }

  protected closeDoorDetail(): void {
    this.selectedDoor.set(null);
    document.body.classList.remove('quote-open');
  }

  protected selectedCount(): number {
    return this.cart().reduce((total, item) => total + item.quantity, 0);
  }

  protected productQuantity(name: string): number {
    return this.cart().find((item) => item.name === name)?.quantity ?? 0;
  }

  protected openQuotePage(): void {
    if (!this.cart().length) return;
    this.quotePage.set(true);
    document.body.classList.add('quote-open');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  protected closeQuotePage(): void {
    this.quotePage.set(false);
    document.body.classList.remove('quote-open');
  }

  protected backToProducts(): void {
    this.closeQuotePage();
    window.setTimeout(() => {
      document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', '#produtos');
    });
  }

  protected backToMegaShield(): void {
    this.closeDoorDetail();
    window.setTimeout(() => {
      document.getElementById('megashield')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', '#megashield');
    });
  }
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
    if (!this.form.consent || !this.form.name || !this.form.phone || !this.form.email) return;
    const items = this.cart()
      .map((item) => `• ${item.name}: ${item.quantity} unidade(s)`)
      .join('\n');
    const message = `*Pedido de orçamento — Mega Brasil*\n\n*Produtos selecionados:*\n${items}\n\n*Nome:* ${this.form.name}\n*Empresa:* ${this.form.company || 'Não informada'}\n*Telefone:* ${this.form.phone}\n*E-mail:* ${this.form.email}\n*Mensagem:* ${this.form.budget || 'Sem observações'}\n*Prazo:* ${this.form.deadline || 'A definir'}\n\n*Consentimento:* o cliente aceitou a Política de Privacidade e autorizou o tratamento dos dados para atendimento deste orçamento.`;
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
