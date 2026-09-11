import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuoteFieldDirective } from './quote-field.directive';
import { normalizeQuoteField, quoteFieldError, quoteFields } from './quote-validation';

@Component({
  selector: 'app-root',
  imports: [FormsModule, QuoteFieldDirective],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly commercialWhatsapp = '5521978715555';
  protected readonly feedback = signal('');
  protected readonly mobileMenuOpen = signal(false);
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

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen.update((isOpen) => !isOpen);
  }

  protected closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
  protected readonly doorDetails = {
    P60: { minutes: 60, use: 'Indicada para casas de máquinas, com fechadura de maçaneta e opção de barra conforme o projeto.', image: '/assets/images/hero/megashield-macaneta.png' },
    P90: { minutes: 90, use: 'Ideal para locais com maior exigência de segurança.', image: '/assets/images/hero/megashield-red.png' },
    P120: { minutes: 120, use: 'Indicada para áreas industriais e ambientes de alto risco.', image: '/assets/images/hero/megashield-red.png' },
  };
  protected readonly allContactProducts = [
    { name: 'MegaShield P60', title: 'Porta corta-fogo · 60 min', image: '/assets/images/hero/megashield-macaneta.png' },
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
  protected readonly contactProducts = this.allContactProducts.filter(product => product.name.startsWith('MegaShield '));
  protected readonly showFullCatalog = false;
  protected readonly baseDoorComponents: { title: string; text: string; x: number; y: number; zoom: string; image?: string; size?: string }[] = [
    { title: 'Folha metálica reforçada', text: 'Chapa de aço de alta resistência que garante integridade estrutural e proteção ao fogo.', x: 52, y: 18, zoom: '52% 18%', size: '600%' },
    { title: 'Batente de aço', text: 'Estrutura robusta que assegura alinhamento, fixação e vedação eficiente da porta.', x: 78, y: 20, zoom: '78% 22%' },
    { title: 'Dobradiças de alto desempenho', text: 'Projetadas para suportar uso intenso e garantir abertura suave e segura por longos períodos.', x: 73, y: 31, zoom: '74% 31%' },
    { title: 'Barra antipânico', text: 'O cliente pode escolher o tipo de barra antipânico conforme a aplicação e as especificações do projeto.', x: 52, y: 58, zoom: '52% 58%' },
    { title: 'Fechadura com maçaneta', text: 'Fechadura com maçaneta tipo alavanca para portas de casa de máquinas. O cliente pode optar por barra antipânico e escolher o tipo conforme as especificações do projeto.', x: 30, y: 52, zoom: '23% 56%', image: '/assets/images/hero/megashield-macaneta.png', size: '280%' },
    { title: 'Vedação e acabamento', text: 'Vedações intumescentes e acabamentos que garantem estanqueidade e proteção eficaz.', x: 74, y: 74, zoom: '75% 74%' },
    { title: 'Sinalização', text: 'Placa de identificação: PORTA CORTA-FOGO — MANTENHA FECHADA. Orienta os usuários a manter a porta fechada.', x: 50, y: 35, zoom: 'center', image: '/assets/images/products/sinalizacao-porta.svg', size: '92%' },
    { title: 'Fixação e instalação técnica', text: 'Sistema de fixação seguro e orientações técnicas para instalação correta e duradoura.', x: 76, y: 88, zoom: '76% 88%' },
  ];
  protected get doorComponents() {
    if (this.selectedDoor() === 'P60') return this.baseDoorComponents;
    return this.baseDoorComponents.map((component, index) => index === 4
      ? { title: 'Fechadura e acessórios', text: 'Conjunto de fechamento e acessórios compatíveis com a barra antipânico dos modelos P90 e P120.', x: 27, y: 58, zoom: '30% 58%', image: '/assets/images/hero/megashield-red.png', size: '330%' }
      : component);
  }

  protected componentDoorImage(): string {
    return this.selectedDoor() === 'P60' && this.selectedComponent() !== 3
      ? '/assets/images/hero/megashield-macaneta.png'
      : '/assets/images/hero/megashield-red.png';
  }

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
      document.getElementById('megashield')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', '#megashield');
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
    if (!this.contactProducts.some(product => product.name === name)) return;
    const found = this.cart().find((item) => item.name === name);
    if (found && !Number.isSafeInteger(found.quantity + 1)) return;
    this.cart.set(
      found
        ? this.cart().map((item) =>
            item.name === name ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [...this.cart(), { name, quantity: 1 }],
    );
  }
  protected changeProduct(name: string, amount: number): void {
    if (amount !== 1 && amount !== -1) return;
    const current = this.productQuantity(name);
    if (!Number.isSafeInteger(current + amount)) return;
    this.cart.set(
      this.cart().flatMap((item) =>
        item.name === name && item.quantity + amount <= 0
          ? []
          : [item.name === name ? { ...item, quantity: item.quantity + amount } : item],
      ),
    );
  }
  protected sendQuote(): void {
    if (!this.form.consent || quoteFields.some(field => quoteFieldError(field, this.form[field])) ||
      !this.cart().length || this.cart().some(item => !Number.isSafeInteger(item.quantity) || item.quantity <= 0 ||
        !this.contactProducts.some(product => product.name === item.name))) return;
    for (const field of quoteFields) this.form[field] = normalizeQuoteField(field, this.form[field]);
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

}
