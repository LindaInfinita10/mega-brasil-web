import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { App } from './app';

describe('Quote submission', () => {
  let app: App;
  let open: ReturnType<typeof vi.spyOn>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
    app = TestBed.createComponent(App).componentInstance;
    app['form'] = { name: 'João D’Ávila', phone: '+55 (21) 98765-4321', email: 'joao+obra@example.com', company: 'Aço & Cia', budget: 'Porta 90 × 210\nObra #2 & acesso + instalação', deadline: '', consent: true };
    app['addProduct']('MegaShield P90');
    open = vi.spyOn(window, 'open').mockImplementation(() => null);
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  });
  afterEach(() => { vi.restoreAllMocks(); document.body.classList.remove('quote-open'); window.history.replaceState(null, '', '/'); });

  it('shows the final quote step and returns home only when requested', () => {
    app['quotePage'].set(true);
    app['selectedDoor'].set('P120');
    document.body.classList.add('quote-open');
    app['sendQuote']();
    expect(app['selectedCount']()).toBe(0);
    expect(app['quotePage']()).toBe(true);
    expect(app['selectedDoor']()).toBeNull();
    expect(document.body.classList.contains('quote-open')).toBe(true);
    expect(window.location.hash).not.toBe('#inicio');
    expect(window.scrollTo).not.toHaveBeenCalled();
    expect(app['form'].name).toBe('');
    expect(app['form'].consent).toBe(false);
    expect(app['feedback']()).toContain('Confirme o envio');
    expect(app['quoteWhatsappUrl']()).toBe(open.mock.calls[0][0]);
    app['sendQuote']();
    expect(open).toHaveBeenCalledTimes(1);
    app['finishQuote']();
    expect(app['quotePage']()).toBe(false);
    expect(document.body.classList.contains('quote-open')).toBe(false);
    expect(window.location.hash).toBe('#inicio');
    expect(window.scrollTo).toHaveBeenLastCalledWith({ top: 0, behavior: 'instant' });
    expect(app['feedback']()).toBe('');
    expect(app['quoteWhatsappUrl']()).toBe('');
  });

  it('renders the completion inside the quote page instead of the form or floating tray', async () => {
    const fixture = TestBed.createComponent(App);
    const instance = fixture.componentInstance;
    instance['form'] = { ...app['form'] };
    instance['addProduct']('MegaShield P120');
    fixture.detectChanges();
    await fixture.whenStable();
    instance['sendQuote']();
    fixture.detectChanges();
    await fixture.whenStable();
    const page: HTMLElement = fixture.nativeElement;
    expect(page.querySelector('.quote-page .quote-completion h1')?.textContent).toContain('Seu pedido está preparado');
    expect(page.querySelector('.customer-form')).toBeNull();
    expect(page.querySelector('.selection-tray')).toBeNull();
    expect(page.querySelector('.quote-feedback')).toBeNull();
    (page.querySelector('.quote-completion button') as HTMLButtonElement).click();
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
  it('preserves accents, punctuation and line breaks in the encoded WhatsApp message', () => {
    app['addProduct']('MegaShield P90'); app['addProduct']('MegaShield P120'); app['sendQuote']();
    expect(open).toHaveBeenCalledTimes(1);
    const url = new URL(open.mock.calls[0][0] as string);
    expect(url.origin + url.pathname).toBe('https://wa.me/5521978715555');
    expect([...url.searchParams.keys()]).toEqual(['text']);
    const text = url.searchParams.get('text')!;
    expect(text).toContain('João D’Ávila'); expect(text).toContain('joao+obra@example.com');
    expect(text).toContain('Aço & Cia'); expect(text).toContain('Porta 90 × 210\nObra #2 & acesso + instalação');
    expect(text).toContain('MegaShield P90: 2 unidade(s)'); expect(text).toContain('MegaShield P120: 1 unidade(s)');
  });
  it('removes the product at zero and never adds hidden products', () => {
    app['changeProduct']('MegaShield P90', -1); app['addProduct']('MegaHose');
    expect(app['selectedCount']()).toBe(0);
  });
  it.each([0, -1, 1.5, NaN, Infinity])('blocks corrupt cart quantity %s', quantity => {
    app['cart'].set([{ name: 'MegaShield P90', quantity }]); app['sendQuote']();
    expect(open).not.toHaveBeenCalled();
  });
  it('blocks hidden products in a manipulated cart', () => {
    app['cart'].set([{ name: 'MegaHose', quantity: 1 }]); app['sendQuote']();
    expect(open).not.toHaveBeenCalled();
  });
  it('keeps P60 unavailable in the catalog and blocks direct additions', () => {
    expect(app['contactProducts'].map(product => product.name)).toEqual(['MegaShield P90', 'MegaShield P120']);
    app['addProduct']('MegaShield P60');
    expect(app['productQuantity']('MegaShield P60')).toBe(0);
  });
  it('blocks a P60 quote even if the cart is manipulated', () => {
    app['cart'].set([{ name: 'MegaShield P60', quantity: 1 }]);
    app['sendQuote']();
    expect(open).not.toHaveBeenCalled();
  });
  it('ignores invalid quantity changes', () => {
    app['changeProduct']('MegaShield P90', NaN); app['changeProduct']('MegaShield P90', 0.5);
    expect(app['productQuantity']('MegaShield P90')).toBe(1);
  });
  it('trims customer values before preparing the quote', () => {
    app['form'].name = '  João  D’Ávila  '; app['form'].email = ' joao+obra@example.com ';
    app['sendQuote']();
    const message = new URL(open.mock.calls[0][0] as string).searchParams.get('text');
    expect(message).toContain('*Nome:* João D’Ávila\n');
    expect(message).toContain('*E-mail:* joao+obra@example.com\n');
  });
});
