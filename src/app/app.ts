import { Component, ElementRef, QueryList, ViewChild, ViewChildren, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
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
  protected readonly quoteWhatsappUrl = signal('');
  @ViewChildren(NgForm) private quoteForms!: QueryList<NgForm>;
  @ViewChild('quoteCompletion') private set completionHeading(heading: ElementRef<HTMLElement> | undefined) {
    if (!heading) return;
    heading.nativeElement.focus();
    const page = heading.nativeElement.closest('.quote-page');
    if (page) page.scrollTop = 0;
  }

  protected finishQuote(): void {
    this.closeQuotePage();
    window.history.replaceState(null, '', '#inicio');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  protected dismissFeedback(): void {
    this.feedback.set('');
    this.quoteWhatsappUrl.set('');
  }
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
    P60: { minutes: 60, use: 'Modelo fora de produção no momento. Indisponível para orçamento.', image: '/assets/images/hero/megashield-macaneta.png' },
    P90: { minutes: 90, use: 'Conjunto simples com folha galvanizada e núcleo de fibra cerâmica, conforme memorial MD 01 PF 90.', image: '/assets/images/hero/megashield-red.png' },
    P120: { minutes: 120, use: 'Conjunto simples com folha galvanizada sem pintura e núcleo de fibra cerâmica, conforme memorial MD 01 PF 120.', image: '/assets/images/hero/megashield-red.png' },
  };
  protected readonly doorMemorials = {
    P90: {
      url: '/documents/memorial-descritivo-p90.pdf', project: 'P 90_01/25 — 01/02/2025',
      insulation: 'Fibra cerâmica refratária Unifrax Brasil FD2000, densidade de 145 kg/m³.',
      frame: 'Chapa galvanizada #18; batente para ensaio: 99 × 216 cm.',
      testOpening: 'Altura 210 cm × largura 90 cm', productionOpening: 'Altura 209 cm × largura 84 cm',
      finish: 'Galvanizado',
    },
    P120: {
      url: '/documents/memorial-descritivo-p120.pdf', project: 'P 120_01/26 — 31/03/2026',
      insulation: 'Fibra cerâmica refratária Unifrax Brasil FD2000 (P120), densidade de 160 kg/m³ e espessura nominal de 50 mm, conforme seção 04.',
      frame: 'Tipo I para paredes de alvenaria; chapa galvanizada #18, 1,25 mm, Z100; batente para ensaio: 100 × 216 cm.',
      testOpening: 'Altura 212 cm × largura 91 cm', productionOpening: 'Altura 212 cm × largura 91 cm',
      finish: 'Galvanizado sem pintura; Z100 — 100 g/m²',
    },
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
  protected readonly contactProducts = this.allContactProducts.filter(product => ['MegaShield P90', 'MegaShield P120'].includes(product.name));
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
    const memorial = this.doorMemorials[this.selectedDoor() === 'P120' ? 'P120' : 'P90'];
    const texts = [
      'Chapa galvanizada #24, espessura de 0,65 mm. Bandejas rebitadas e soldadas. Folha para ensaio: 90 × 210 × 5 cm; massa de 48,7 kg, ou 50,5 kg com acessórios (seção 03a).',
      memorial.frame + ' Recobrimento pela folha: 50 mm.',
      'Três dobradiças de mola G SARDOU, fixadas por parafusos, conforme seção 06 do memorial.',
      'A barra mostrada é ilustrativa. O memorial especifica fechadura de sobrepor DISAFE e não define barra antipânico; confirmar a configuração com a equipe técnica.',
      'Fechadura de sobrepor DISAFE. Mola aérea (DHFA): não aplicável no memorial. A imagem dos acessórios é ilustrativa.',
      memorial.finish + '. Folgas: 5 mm com o marco e 10 mm com a soleira. O memorial não especifica vedação intumescente.',
      'Sinalização ilustrativa. Confirmar a identificação e as marcações com a equipe técnica; o desenho citado no memorial não integra os PDFs recebidos.',
      'Reforços das dobradiças: 20 × 3,5 × 0,265 cm. Consultar o memorial e confirmar o projeto de instalação com a equipe técnica.',
    ];
    // Percentages refer to the actual 1086 × 1448 image, excluding panel padding.
    const points = [
      { x: 50, y: 30 }, { x: 79, y: 12 }, { x: 76.2, y: 19.6 },
      { x: 48, y: 53 }, { x: 26.8, y: 53 }, { x: 50, y: 88.7 },
      { x: 50, y: 40 }, { x: 79.5, y: 78 },
    ];
    return this.baseDoorComponents.map((component, index) => {
      const point = points[index];
      const scale = index === 0 ? 6 : 3.3;
      const verticalScale = scale * 1448 / 1086;
      // CSS background-position percentages align edges, not the focal point.
      const zoom = `${(scale * point.x - 50) / (scale - 1)}% ${(verticalScale * point.y - 50) / (verticalScale - 1)}%`;
      return { ...component, ...point, text: texts[index],
        zoom: index === 6 ? 'center' : zoom,
        ...(index === 4 ? { title: 'Fechadura de sobrepor', image: '/assets/images/hero/megashield-red.png', size: '330%' } : {}),
        ...(index === 5 ? { title: 'Acabamento e folgas' } : {}),
      };
    });
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
    this.dismissFeedback();
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
    this.dismissFeedback();
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
    const url = `https://wa.me/${this.commercialWhatsapp}?text=${encodeURIComponent(message)}`;
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      this.feedback.set('Não foi possível abrir o WhatsApp. Seu pedido foi mantido. Tente novamente.');
      return;
    }
    // Opening a wa.me link cannot confirm delivery. Keep a retry link because
    // noopener may return null even when the browser successfully opens the tab.
    this.quoteWhatsappUrl.set(url);
    this.feedback.set('Pedido preparado! Confirme o envio da mensagem no WhatsApp para concluir sua solicitação.');
    this.cart.set([]);
    this.closeDoorDetail();
    this.closeMobileMenu();
    this.quotePage.set(true);
    document.body.classList.add('quote-open');
    this.form = { name: '', company: '', phone: '', email: '', budget: '', deadline: '', consent: false };
    this.quoteForms?.forEach(form => form.resetForm(this.form));
  }

}
