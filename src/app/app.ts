import { NgTemplateOutlet } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChild, ViewChildren, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { QuoteFieldDirective } from './quote-field.directive';
import { PanelFocusDirective } from './panel-focus.directive';
import { PrivacyPolicyComponent } from './privacy-policy.component';
import { normalizeQuoteField, quoteFieldError, quoteFields } from './quote-validation';
import { CartItem, DoorConfiguration, DoorHardware, DoorModel, DOOR_COMPONENTS, DOOR_SIZES, HARDWARE, componentsForHardware, itemKey, configurationText, validConfiguration } from './door-configuration';

@Component({
  selector: 'app-root',
  imports: [NgTemplateOutlet, FormsModule, QuoteFieldDirective, PanelFocusDirective, PrivacyPolicyComponent],
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
    cnpj: '',
    phone: '',
    email: '',
    budget: '',
    deadline: '',
    consent: false,
  };
  protected cart = signal<CartItem[]>([]);
  protected readonly doorSizes = DOOR_SIZES;
  protected readonly hardwareOptions = HARDWARE;
  protected readonly itemKey = itemKey;
  protected readonly configurationText = configurationText;
  protected draft = { model: 'P90' as DoorModel, size: 'standard' as 'standard' | 'custom', width: 84, height: 209, hardware: '' as DoorHardware | '', components: DOOR_COMPONENTS['Fechadura de sobrepor'], quantity: 1 };
  protected editingKey: string | null = null;
  protected cartNotice = signal('');

  protected changeDoorModel(model: DoorModel): void {
    this.draft.model = model;
    if (this.draft.size === 'standard') Object.assign(this.draft, DOOR_SIZES[model]);
  }
  protected changeDoorSize(size: 'standard' | 'custom'): void {
    this.draft.size = size;
    if (size === 'standard') Object.assign(this.draft, DOOR_SIZES[this.draft.model]);
  }
  protected changeDoorHardware(hardware: DoorHardware): void {
    this.draft.hardware = hardware;
    this.draft.components = componentsForHardware(hardware);
  }
  protected draftValid(): boolean {
    return validConfiguration(this.draft as DoorConfiguration) && Number.isSafeInteger(this.draft.quantity) && this.draft.quantity > 0 && this.draft.quantity <= 999;
  }
  protected saveDoor(): void {
    if (!this.draftValid()) return;
    const { quantity, ...configuration } = this.draft;
    const item: CartItem = { name: `MegaShield ${configuration.model}`, quantity, configuration: configuration as DoorConfiguration };
    const remaining = this.cart().filter(row => itemKey(row) !== this.editingKey);
    const match = remaining.find(row => itemKey(row) === itemKey(item));
    if (match && match.quantity + quantity > 999) { this.cartNotice.set('Limite de 999 unidades por configuração.'); return; }
    this.dismissFeedback();
    this.cart.set(match ? remaining.map(row => row === match ? { ...row, quantity: row.quantity + quantity } : row) : [...remaining, item]);
    this.cartNotice.set(this.editingKey ? 'Configuração atualizada no carrinho.' : 'Porta adicionada. Configure outra porta ou finalize seu orçamento.');
    this.editingKey = null;
  }
  protected editDoor(item: CartItem): void {
    if (!item.configuration) return;
    this.draft = { ...item.configuration, quantity: item.quantity };
    this.editingKey = itemKey(item);
    this.closeQuotePage();
    this.focusConfigurator();
  }
  protected cancelDoorEdit(): void { this.editingKey = null; this.cartNotice.set(''); }
  protected removeDoor(key: string): void {
    this.cart.set(this.cart().filter(item => itemKey(item) !== key));
    if (this.editingKey === key) this.cancelDoorEdit();
  }
  protected focusConfigurator(): void {
    window.setTimeout(() => {
      document.getElementById('door-configurator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      document.getElementById('door-model')?.focus({ preventScroll: true });
    });
  }
  protected quotePage = signal(false);

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen.update((isOpen) => !isOpen);
  }

  protected closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
  protected readonly allContactProducts = [
    { name: 'MegaShield P60', title: 'Porta corta-fogo · 60 min', image: '/assets/images/hero/megashield-macaneta-sem-placa.webp' },
    { name: 'MegaShield P90', title: 'Classificação pretendida P90', image: '/assets/images/hero/megashield-red.webp' },
    { name: 'MegaShield P120', title: 'Classificação pretendida P120', image: '/assets/images/hero/megashield-red.webp' },
    { name: 'MegaHose', title: 'Mangueira de incêndio', image: '/assets/images/products/megahose-hd.webp' },
    { name: 'MegaPump', title: 'Casa de máquinas', image: '/assets/images/products/megapump-hd.webp' },
    { name: 'MegaSensor', title: 'Detecção e alarme', image: '/assets/images/products/megasensor-hd.webp' },
    { name: 'MegaVolt', title: 'Painéis elétricos', image: '/assets/images/products/megavolt-hd.webp' },
    { name: 'MegaTherm', title: 'Tinta intumescente', image: '/assets/images/products/megatherm-hd.webp' },
    { name: 'MegaFoam', title: 'Gerador de espuma', image: '/assets/images/products/megafoam-hd.webp' },
    { name: 'MegaSprink', title: 'Sprinklers', image: '/assets/images/products/megasprink-hd.webp' },
  ];
  protected readonly contactProducts = this.allContactProducts.filter(product => ['MegaShield P90', 'MegaShield P120'].includes(product.name));
  protected readonly showFullCatalog = false;
  protected startDoorQuote(model: 'P90' | 'P120'): void {
    this.editingKey = null;
    this.changeDoorModel(model);
    this.closeQuotePage();
    this.focusConfigurator();
  }
  protected showPrivacy(event: Event, id: string): void {
    event.preventDefault();
    const policy = document.getElementById(id) as HTMLDetailsElement | null;
    if (!policy) return;
    policy.open = true;
    policy.querySelector('summary')?.focus();
    policy.scrollIntoView({ behavior: 'auto', block: 'nearest' });
  }

  protected selectedCount(): number {
    return this.cart().reduce((total, item) => total + item.quantity, 0);
  }

  protected productQuantity(name: string): number {
    return this.cart().filter(item => item.name === name).reduce((total, item) => total + item.quantity, 0);
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

  protected addProduct(name: string): void {
    if (!this.contactProducts.some(product => product.name === name)) return;
    this.startDoorQuote(name.endsWith('P120') ? 'P120' : 'P90');
  }
  protected changeProduct(name: string, amount: number): void {
    if (amount !== 1 && amount !== -1) return;
    const target = this.cart().find(item => itemKey(item) === name);
    if (!target || target.quantity + amount > 999) return;
    this.cart.set(
      this.cart().flatMap((item) =>
        itemKey(item) === name && item.quantity + amount <= 0
          ? []
          : [itemKey(item) === name ? { ...item, quantity: item.quantity + amount } : item],
      ),
    );
  }
  protected sendQuote(): void {
    if (!this.form.consent || quoteFields.some(field => quoteFieldError(field, this.form[field])) ||
      !this.cart().length || this.cart().some(item => !Number.isSafeInteger(item.quantity) || item.quantity <= 0 || item.quantity > 999 ||
        !validConfiguration(item.configuration) || item.name !== `MegaShield ${item.configuration.model}`)) return;
    for (const field of quoteFields) this.form[field] = normalizeQuoteField(field, this.form[field]);
    const message = `*SOLICITAÇÃO DE ORÇAMENTO — MEGASHIELD*\n\n*DADOS DO CLIENTE*\nNome: ${this.form.name}\nEmpresa: ${this.form.company || 'Não informada'}\nCNPJ: ${this.form.cnpj}\nTelefone: ${this.form.phone}\nE-mail: ${this.form.email}\nMensagem/observações: ${this.form.budget || 'Sem observações'}\n\n*DETALHES DO PEDIDO*\n${this.cart().map((item, index) => `*PORTA ${index + 1}*\nModelo: ${item.name}\nQuantidade: ${item.quantity}\n${configurationText(item)}\nAcabamento: ${item.configuration?.model === 'P120' ? 'Galvanizado sem pintura' : 'Galvanizado'}`).join('\n\n')}\n\nConsentimento: o cliente aceitou a Política de Privacidade e autorizou o tratamento dos dados para atendimento deste orçamento.`;
    const url = `https://wa.me/${this.commercialWhatsapp}?text=${encodeURIComponent(message)}`;
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      this.feedback.set('Não foi possível abrir o WhatsApp. Seu pedido foi mantido. Tente novamente.');
      return;
    }
    this.quoteWhatsappUrl.set(url);
    this.feedback.set('Seu orçamento foi enviado com sucesso!');
    this.cart.set([]);
    this.closeMobileMenu();
    this.quotePage.set(true);
    document.body.classList.add('quote-open');
    this.form = { name: '', company: '', cnpj: '', phone: '', email: '', budget: '', deadline: '', consent: false };
    this.quoteForms?.forEach(form => {
      if (form.controls['contactName'] || form.controls['quoteName']) form.resetForm(this.form);
    });
    window.setTimeout(() => this.finishQuote(), 3500);
  }

}
