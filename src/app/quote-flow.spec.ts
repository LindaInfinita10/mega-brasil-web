import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { App } from './app';
import { DOOR_COMPONENT_OPTIONS, componentText } from './door-configuration';

function addDoor(app: App, model: 'P90' | 'P120' = 'P90') {
  app['changeDoorModel'](model);
  app['draft'].components = ['Dobradiça de mola'];
  app['saveDoor']();
}


describe('Quote submission', () => {
  let app: App;
  let open: ReturnType<typeof vi.spyOn>;
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
    app = TestBed.createComponent(App).componentInstance;
    app['form'] = { name: 'João D’Ávila', phone: '+55 (21) 98765-4321', email: 'joao+obra@example.com', company: 'Aço & Cia', cnpj: '11.222.333/0001-81', budget: 'Porta 90 × 210\nObra #2 & acesso + instalação', deadline: '', consent: true };
    addDoor(app, 'P90');
    open = vi.spyOn(window, 'open').mockImplementation(() => null);
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  });
  afterEach(() => { vi.restoreAllMocks(); document.body.classList.remove('quote-open'); window.history.replaceState(null, '', '/'); });

  it('shows the final quote step and returns home after completion', () => {
    app['quotePage'].set(true);
    document.body.classList.add('quote-open');
    app['sendQuote']();
    expect(app['selectedCount']()).toBe(0);
    expect(localStorage.getItem('mega-brasil-cart')).toBeNull();
    expect(TestBed.createComponent(App).componentInstance['selectedCount']()).toBe(0);
    expect(app['quotePage']()).toBe(true);
    expect(document.body.classList.contains('quote-open')).toBe(true);
    expect(window.location.hash).not.toBe('#inicio');
    expect(window.scrollTo).not.toHaveBeenCalled();
    expect(app['form'].name).toBe('');
    expect(app['form'].consent).toBe(false);
    expect(app['feedback']()).toContain('Confirme o envio');
    expect(app['quoteWhatsappUrl']()).toBe(open.mock.calls[0][0]);
    app['sendQuote']();
    expect(open).toHaveBeenCalledTimes(1);
    app['confirmWhatsappSent']();
    expect(app['quotePage']()).toBe(false);
    expect(document.body.classList.contains('quote-open')).toBe(false);
    expect(window.location.hash).toBe('#inicio');
    expect(window.scrollTo).toHaveBeenLastCalledWith({ top: 0, behavior: 'instant' });
    expect(app['selectedCount']()).toBe(0);
    expect(app['form'].name).toBe('');
    expect(app['feedback']()).toContain('Envio confirmado por você');
    expect(app['quoteWhatsappUrl']()).toBe('');
  });

  it('renders the completion inside the quote page instead of the form or floating tray', async () => {
    const fixture = TestBed.createComponent(App);
    const instance = fixture.componentInstance;
    instance['form'] = { ...app['form'] };
    addDoor(instance, 'P120');
    fixture.detectChanges();
    await fixture.whenStable();
    instance['sendQuote']();
    fixture.detectChanges();
    await fixture.whenStable();
    const page: HTMLElement = fixture.nativeElement;
    expect(page.querySelector('.quote-page .quote-completion h1')?.textContent).toContain('Seu pedido está pronto no WhatsApp');
    expect(page.querySelector('.customer-form')).toBeNull();
    expect(page.querySelector('.selection-tray')).toBeNull();
    expect(page.querySelector('.quote-feedback')).toBeNull();
    instance['finishQuote']();
    fixture.detectChanges();
    expect(page.querySelector('.quote-page')).toBeNull();
    expect(page.querySelector('.selection-tray')).toBeNull();
    expect(window.location.hash).toBe('#inicio');
  });

  it('preserves the request if opening WhatsApp throws', () => {
    app['quotePage'].set(true);
    open.mockImplementation(() => { throw new Error('Browser refused'); });
    app['sendQuote']();
    expect(app['selectedCount']()).toBe(1);
    expect(app['quotePage']()).toBe(true);
    expect(app['form'].name).toContain('João');
    expect(app['feedback']()).toContain('Seu pedido foi mantido');
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it('starts empty even when a previous version left a valid order in storage', () => {
    localStorage.setItem('mega-brasil-cart', JSON.stringify(app['cart']()));
    const fresh = TestBed.createComponent(App).componentInstance;
    expect(fresh['selectedCount']()).toBe(0);
    expect(localStorage.getItem('mega-brasil-cart')).toBeNull();
    expect(fresh['draft'].components).toEqual([]);
  });

  it('never restores an old order even when legacy storage cannot be removed', () => {
    localStorage.setItem('mega-brasil-cart', JSON.stringify(app['cart']()));
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => { throw new Error('Storage unavailable'); });
    const fresh = TestBed.createComponent(App).componentInstance;
    expect(fresh['selectedCount']()).toBe(0);
    app['sendQuote']();
    expect(app['selectedCount']()).toBe(0);
    expect(app['form'].name).toBe('');
  });

  it('clears a page restored from the browser back-forward cache', () => {
    app['resetRestoredPage']({ persisted: true } as PageTransitionEvent);
    expect(app['selectedCount']()).toBe(0);
    expect(app['form'].name).toBe('');
    expect(app['quotePage']()).toBe(false);
  });

  it.each([
    ['name', '   '], ['name', 'João123'], ['name', '<script>'],
    ['phone', 'abcdefghijk'], ['phone', '123'],
    ['email', 'joao'], ['email', 'joao@'], ['email', 'joao@example'],
    ['email', 'joao..silva@example.com'], ['email', 'joao @example.com'],
  ])('blocks invalid %s: %s even on direct submission', (field, value) => {
    Object.assign(app['form'], { [field]: value });
    app['sendQuote']();
    expect(open).not.toHaveBeenCalled();
  });
  it('blocks submission without consent', () => {
    app['form'].consent = false; app['sendQuote'](); expect(open).not.toHaveBeenCalled();
  });
  it('blocks an empty cart', () => {
    app['cart'].set([]); app['sendQuote'](); expect(open).not.toHaveBeenCalled();
  });
  it('can finalize the same configuration after removing its saved cart item', () => {
    app['removeDoor'](app['itemKey'](app['cart']()[0]));
    app['finalizeOrder']();
    expect(app['selectedCount']()).toBe(1);
    expect(app['quotePage']()).toBe(true);
  });
  it('preserves accents, punctuation and line breaks in the encoded WhatsApp message', () => {
    addDoor(app, 'P90'); addDoor(app, 'P120'); app['sendQuote']();
    expect(open).toHaveBeenCalledTimes(1);
    const url = new URL(open.mock.calls[0][0] as string);
    expect(url.origin + url.pathname).toBe('https://wa.me/5521978715555');
    expect([...url.searchParams.keys()]).toEqual(['text']);
    const text = url.searchParams.get('text')!;
    expect(text).toContain('João D’Ávila'); expect(text).toContain('joao+obra@example.com');
    expect(text).toContain('Aço & Cia'); expect(text).toContain('Porta 90 × 210\nObra #2 & acesso + instalação');
    expect(text).not.toMatch(/PORTA \d|Acabamento|Galvanizado|pintura|Manta|Chapa|Rebite|Parafuso/);
    expect(text).toContain('*MegaShield P90*\nQuantidade: 2 unidade(s)');
    expect(text).toContain('*MegaShield P120*\nQuantidade: 1 unidade(s)');
    expect(text).toContain('Componentes solicitados:\n• Dobradiça de mola');
    expect(text).not.toContain('Tipo de acionamento:'); expect(text).toContain('Dobradiça de mola');
  });
  it('removes the product at zero and never adds hidden products', () => {
    app['changeProduct'](app['itemKey'](app['cart']()[0]), -1); app['addProduct']('MegaHose');
    expect(app['selectedCount']()).toBe(0);
  });
  it('includes every selected component, dimensions and customer data without claiming delivery', () => {
    app['cart'].set([]);
    app['changeDoorModel']('P120');
    app['changeDoorNominalSize']('100x210');
    app['draft'].components = DOOR_COMPONENT_OPTIONS.map(option => option.label);
    const customer = { ...app['form'] };
    app['draft'].quantity = 12;
    app['finalizeOrder']();
    app['sendQuote']();
    const text = new URL(open.mock.calls[0][0] as string).searchParams.get('text')!;
    expect(text).toContain('*MegaShield P120*\nQuantidade: 12 unidade(s)');
    expect(text).toContain('100 × 210 cm');
    for (const option of DOOR_COMPONENT_OPTIONS) expect(text).toContain(`• ${componentText(app['draft'], option.label)}`);
    for (const value of [customer.name, customer.cnpj, customer.phone, customer.email, customer.company, customer.budget]) expect(text).toContain(value);
    expect(app['feedback']()).not.toContain('enviado com sucesso');
    expect(localStorage.getItem('mega-brasil-cart')).toBeNull();
    expect(app['draft'].model).toBe('P90');
    expect(app['draft'].width).toBe(80);
    expect(app['draft'].quantity).toBe(1);
    expect(app['editingKey']).toBeNull();
    app['confirmWhatsappSent']();
    expect(window.location.hash).toBe('#inicio');
    expect(localStorage.getItem('mega-brasil-cart')).toBeNull();
  });
  it.each([0, -1, 1.5, NaN, Infinity])('blocks corrupt cart quantity %s', quantity => {
    app['cart'].set([{ name: 'MegaShield P90', quantity }]); app['sendQuote']();
    expect(open).not.toHaveBeenCalled();
  });
  it('blocks hidden products in a manipulated cart', () => {
    app['cart'].set([{ name: 'MegaHose', quantity: 1 }]); app['sendQuote']();
    expect(open).not.toHaveBeenCalled();
  });
  it('allows P60 to be selected and requested from the catalog', () => {
    expect(app['contactProducts'].map(product => product.name)).toEqual(['MegaShield P60', 'MegaShield P90', 'MegaShield P120']);
    app['addProduct']('MegaShield P60');
    expect(app['draft'].model).toBe('P60');
    app['saveDoor']();
    expect(app['productQuantity']('MegaShield P60')).toBe(1);
    app['sendQuote']();
    expect(new URL(open.mock.calls[0][0] as string).searchParams.get('text')).toContain('*MegaShield P60*');
  });
  it('blocks a P60 quote without a configuration', () => {
    app['cart'].set([{ name: 'MegaShield P60', quantity: 1 }]);
    app['sendQuote']();
    expect(open).not.toHaveBeenCalled();
  });
  it('ignores invalid quantity changes', () => {
    app['cart'].set([{ ...app['cart']()[0], quantity: 1 }]);
    app['changeProduct'](app['itemKey'](app['cart']()[0]), NaN); app['changeProduct'](app['itemKey'](app['cart']()[0]), 0.5);
    expect(app['productQuantity']('MegaShield P90')).toBe(1);
  });
  it('trims customer values before preparing the quote', () => {
    app['form'].name = '  João  D’Ávila  '; app['form'].email = ' joao+obra@example.com ';
    app['sendQuote']();
    const message = new URL(open.mock.calls[0][0] as string).searchParams.get('text');
    expect(message).toContain('Nome: João D’Ávila\n');
    expect(message).toContain('E-mail: joao+obra@example.com\n');
  });
});
