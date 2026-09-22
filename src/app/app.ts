import { NgTemplateOutlet } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChild, ViewChildren, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { QuoteFieldDirective } from './quote-field.directive';
import { PanelFocusDirective } from './panel-focus.directive';
import { PrivacyPolicyComponent } from './privacy-policy.component';
import { normalizeQuoteField, quoteFieldError, quoteFields } from './quote-validation';
import { CartItem, DoorActuation, DoorConfiguration, DoorModel, COMPONENT_GROUPS, DEFAULT_COMPONENTS, DOOR_COMPONENT_OPTIONS, DOOR_SIZES, itemKey, configurationText, quoteItemText, validConfiguration } from './door-configuration';

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
  protected cart = signal<CartItem[]>(this.restoreCart());
  protected readonly doorSizes = DOOR_SIZES;
  protected readonly nominalSizes = DOOR_SIZES.P90;
  protected readonly componentGroups = COMPONENT_GROUPS;
  protected readonly componentOptions = DOOR_COMPONENT_OPTIONS;
  protected readonly doorTypes: DoorActuation[] = ['manual', 'panic-bar'];
  protected readonly doorTypeLabels: Record<DoorActuation, string> = { manual: 'Porta com fechadura manual', 'panic-bar': 'Porta com barra antipânico' };
  protected readonly doorTypeImages: Record<DoorActuation, string> = { manual: '/assets/images/hero/door-manual-3-hinges.webp', 'panic-bar': '/assets/images/hero/door-panic-3-hinges.webp' };
  protected readonly componentCategoryImages: Record<string, string> = {
    'Dobradiças': '/assets/images/components/dobradica-mola.webp',
    'Fechaduras': '/assets/images/components/fechadura-simples.webp',
    'Molas aéreas': '/assets/images/components/mola-pp2200.webp',
    'Barras antipânico': '/assets/images/components/barra-simples.webp',
    'Fixação': '/assets/images/components/parafuso.webp',
    'Mantas': '/assets/images/components/manta-p90.webp',
    'Chapas': '/assets/images/components/chapa-zc-065.webp',
  };
  protected readonly itemKey = itemKey;
  protected readonly configurationText = configurationText;
  protected drafts: Record<DoorActuation, { model: DoorModel; actuation: DoorActuation; size: 'nominal' | 'standard' | 'custom'; width: number; height: number; hardware?: string; components: string[]; quantity: number }> = {
    manual: { model: 'P90', actuation: 'manual', size: 'nominal', width: 80, height: 210, hardware: '', components: [...DEFAULT_COMPONENTS], quantity: 1 },
    'panic-bar': { model: 'P90', actuation: 'panic-bar', size: 'nominal', width: 80, height: 210, hardware: '', components: [...DEFAULT_COMPONENTS], quantity: 1 },
  };
  protected activeDoorType: DoorActuation = 'manual';
  protected draft = this.drafts.manual;
  private openGroups: Record<DoorActuation, Record<string, boolean>> = { manual: {}, 'panic-bar': {} };
  protected editingKey: string | null = null;
  protected cartNotice = signal('');

  private restoreCart(): CartItem[] {
    if (typeof localStorage === 'undefined') return [];
    try {
      const saved: unknown = JSON.parse(localStorage.getItem('mega-brasil-cart') || '[]');
      return Array.isArray(saved) ? saved.filter((item): item is CartItem => validConfiguration((item as CartItem).configuration) && Number.isSafeInteger((item as CartItem).quantity) && (item as CartItem).quantity > 0 && (item as CartItem).quantity <= 999) : [];
    } catch { return []; }
  }
  private persistCart(): void {
    if (typeof localStorage !== 'undefined') localStorage.setItem('mega-brasil-cart', JSON.stringify(this.cart()));
  }

  protected selectDoorType(type: DoorActuation): void {
    this.activeDoorType = type;
    this.draft = this.drafts[type];
  }
  protected draftFor(type: DoorActuation) { return this.drafts[type]; }
  protected chooseDoorType(type: DoorActuation): void {
    if (type === this.activeDoorType) return;
    this.cancelDoorEdit();
    this.selectDoorType(type);
  }
  protected changeDoorModel(model: DoorModel, type: DoorActuation = this.activeDoorType): void {
    if (model !== 'P90' && model !== 'P120') return;
    const draft = this.drafts[type];
    draft.model = model;
    if (draft.size === 'nominal') Object.assign(draft, DOOR_SIZES[model][0]);
    this.selectDoorType(type);
  }
  protected changeDoorSize(size: 'nominal' | 'custom', type: DoorActuation = this.activeDoorType): void {
    const draft = this.drafts[type];
    draft.size = size;
    if (size === 'nominal') Object.assign(draft, DOOR_SIZES[draft.model][0]);
  }
  protected changeDoorNominalSize(value: string, type: DoorActuation = this.activeDoorType): void {
    const draft = this.drafts[type];
    const size = DOOR_SIZES[draft.model].find(option => `${option.width}x${option.height}` === value);
    if (size) Object.assign(draft, { size: 'nominal' as const, ...size });
  }
  protected toggleComponent(component: string, type: DoorActuation = this.activeDoorType): void {
    const draft = this.drafts[type];
    draft.components = draft.components.includes(component) ? draft.components.filter(selected => selected !== component) : [...draft.components, component];
  }
  protected isComponentSelected(component: string, type: DoorActuation = this.activeDoorType): boolean {
    return this.drafts[type].components.includes(component);
  }
  protected changeDoorHardware(_legacyHardware?: string): void {
    this.draft.components = [...DEFAULT_COMPONENTS];
  }
  protected draftValid(type: DoorActuation = this.activeDoorType): boolean {
    const draft = this.drafts[type];
    return validConfiguration(draft as DoorConfiguration) && Number.isSafeInteger(draft.quantity) && draft.quantity > 0 && draft.quantity <= 999;
  }
  protected saveDoor(type: DoorActuation = this.activeDoorType): void {
    if (!this.draftValid(type)) return;
    const { quantity, actuation: _actuation, hardware: _hardware, ...configuration } = this.drafts[type];
    const item: CartItem = { name: `MegaShield ${configuration.model}`, quantity, configuration: configuration as DoorConfiguration };
    const remaining = this.cart().filter(row => itemKey(row) !== this.editingKey);
    const match = remaining.find(row => itemKey(row) === itemKey(item));
    if (match && match.quantity + quantity > 999) { this.cartNotice.set('Limite de 999 unidades por configuração.'); return; }
    this.dismissFeedback();
    this.cart.set(match ? remaining.map(row => row === match ? { ...row, quantity: row.quantity + quantity } : row) : [...remaining, item]);
    this.persistCart();
    this.cartNotice.set(this.editingKey ? 'Configuração atualizada no carrinho.' : 'Porta adicionada. Configure outra porta ou finalize seu orçamento.');
    this.editingKey = null;
  }
  protected editDoor(item: CartItem): void {
    if (!item.configuration) return;
    const components = Array.isArray(item.configuration.components) ? [...item.configuration.components] : [item.configuration.components.lock, item.configuration.components.hinges];
    const type = 'manual';
    this.drafts[type] = { ...this.drafts[type], ...item.configuration, actuation: type, components, quantity: item.quantity };
    this.selectDoorType(type);
    this.editingKey = itemKey(item);
    this.closeQuotePage();
    this.focusConfigurator();
  }
  protected cancelDoorEdit(): void { this.editingKey = null; this.cartNotice.set(''); }
  protected removeDoor(key: string): void {
    this.cart.set(this.cart().filter(item => itemKey(item) !== key));
    this.persistCart();
    if (this.editingKey === key) this.cancelDoorEdit();
  }
  protected toggleComponentGroup(type: DoorActuation, group: string): void {
    const willOpen = !this.openGroups[type][group];
    if (willOpen) {
      for (const otherGroup of this.componentGroups) this.openGroups[type][otherGroup] = false;
    }
    this.openGroups[type][group] = !this.openGroups[type][group];
  }
  protected isComponentGroupOpen(type: DoorActuation, group: string): boolean { return !!this.openGroups[type][group]; }
  protected selectedGroupSummary(type: DoorActuation, group: string): string {
    const selected = this.drafts[type].components.filter(component => this.componentOptions.some(option => option.group === group && option.label === component));
    return selected.length ? selected.join(', ') : 'Selecionar';
  }
  protected selectedGroupCount(type: DoorActuation, group: string): number {
    return this.drafts[type].components.filter(component => this.componentOptions.some(option => option.group === group && option.label === component)).length;
  }
  protected componentCover(type: DoorActuation, group: string): string {
    const selected = this.drafts[type].components.find(component => this.componentOptions.some(option => option.group === group && option.label === component));
    const option = this.componentOptions.find(candidate => candidate.label === selected && candidate.group === group);
    return option ? `/assets/images/components/${this.componentImageName(option.label)}` : this.componentCategoryImages[group];
  }
  protected componentImageName(label: string): string {
    const images: Record<string, string> = {
      'Dobradiça de mola': 'dobradica-mola.webp', 'Dobradiça helicoidal': 'dobradica-helicoidal.webp',
      'Fechadura sobrepor simples': 'fechadura-simples.webp', 'Fechadura sobrepor c/ chave': 'fechadura-chave.webp',
      'Mola aérea PP2200 PAIZ': 'mola-pp2200.webp', 'Mola aérea 2234 La Fonte': 'mola-2234.webp',
      'Barra simples c/ chave': 'barra-simples.webp', 'Barra dupla c/ chave': 'barra-dupla.webp',
      'Parafuso sextavado arruelado 6×12': 'parafuso.webp', 'Rebite': 'rebite.webp',
      'Manta P90': 'manta-p90.webp', 'Manta P120': 'manta-p120.webp',
      'Chapa ZC 0,65 × 1000 × 2100 mm': 'chapa-zc-065.webp', 'Chapa ZC 1,25 × 1200 × 2200 mm': 'chapa-zc-125.webp',
    };
    return images[label];
  }
  protected focusConfigurator(): void {
    window.setTimeout(() => {
      document.getElementById('door-configurator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      document.getElementById(`door-model-${this.activeDoorType}`)?.focus({ preventScroll: true });
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
  protected finalizeOrder(): void {
    if (!this.draftValid()) return;
    const { quantity, actuation: _actuation, hardware: _hardware, ...configuration } = this.draft;
    const key = itemKey({ name: `MegaShield ${configuration.model}`, quantity, configuration });
    if (this.editingKey || !this.cart().some(item => itemKey(item) === key)) {
      this.saveDoor();
      if (this.editingKey || !this.cart().some(item => itemKey(item) === key)) return;
    }
    this.openQuotePage();
  }
  protected confirmWhatsappSent(): void {
    if (!this.quoteWhatsappUrl()) return;
    this.cart.set([]);
    this.persistCart();
    this.draft.components = [];
    this.draft.quantity = 1;
    this.form = { name: '', company: '', cnpj: '', phone: '', email: '', budget: '', deadline: '', consent: false };
    this.quoteForms?.forEach(form => {
      if (form.controls['contactName'] || form.controls['quoteName']) form.resetForm(this.form);
    });
    this.finishQuote();
    this.feedback.set('Envio confirmado por você. Seu pedido foi enviado pelo WhatsApp. Obrigado!');
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
    this.persistCart();
  }
  protected sendQuote(): void {
    if (this.quoteWhatsappUrl()) return;
    if (!this.form.consent || quoteFields.some(field => quoteFieldError(field, this.form[field])) ||
      !this.cart().length || this.cart().some(item => !Number.isSafeInteger(item.quantity) || item.quantity <= 0 || item.quantity > 999 ||
        !validConfiguration(item.configuration) || item.name !== `MegaShield ${item.configuration.model}`)) return;
    for (const field of quoteFields) this.form[field] = normalizeQuoteField(field, this.form[field]);
    const message = `*SOLICITAÇÃO DE ORÇAMENTO — MEGASHIELD*\n\n*DADOS DO CLIENTE*\nNome: ${this.form.name}\nEmpresa: ${this.form.company || 'Não informada'}\nCNPJ: ${this.form.cnpj}\nTelefone: ${this.form.phone}\nE-mail: ${this.form.email}\nMensagem/observações: ${this.form.budget || 'Sem observações'}\n\n*DETALHES DO PEDIDO*\n${this.cart().map(item => quoteItemText(item)).join('\n\n')}\n\nConsentimento: o cliente aceitou a Política de Privacidade e autorizou o tratamento dos dados para atendimento deste orçamento.`;
    const url = `https://wa.me/${this.commercialWhatsapp}?text=${encodeURIComponent(message)}`;
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      this.feedback.set('Não foi possível abrir o WhatsApp. Seu pedido foi mantido. Tente novamente.');
      return;
    }
    this.quoteWhatsappUrl.set(url);
    this.feedback.set('Pedido preparado. Confirme o envio no WhatsApp.');
    this.closeMobileMenu();
    this.quotePage.set(true);
    document.body.classList.add('quote-open');
  }

}
