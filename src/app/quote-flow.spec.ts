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
    app['addProduct']('MegaShield P60');
    open = vi.spyOn(window, 'open').mockImplementation(() => null);
  });
  afterEach(() => { vi.restoreAllMocks(); document.body.classList.remove('quote-open'); });

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
    app['addProduct']('MegaShield P60'); app['addProduct']('MegaShield P90'); app['sendQuote']();
    expect(open).toHaveBeenCalledTimes(1);
    const url = new URL(open.mock.calls[0][0] as string);
    expect(url.origin + url.pathname).toBe('https://wa.me/5521978715555');
    expect([...url.searchParams.keys()]).toEqual(['text']);
    const text = url.searchParams.get('text')!;
    expect(text).toContain('João D’Ávila'); expect(text).toContain('joao+obra@example.com');
    expect(text).toContain('Aço & Cia'); expect(text).toContain('Porta 90 × 210\nObra #2 & acesso + instalação');
    expect(text).toContain('MegaShield P60: 2 unidade(s)'); expect(text).toContain('MegaShield P90: 1 unidade(s)');
  });
  it('removes the product at zero and never adds hidden products', () => {
    app['changeProduct']('MegaShield P60', -1); app['addProduct']('MegaHose');
    expect(app['selectedCount']()).toBe(0);
  });
  it.each([0, -1, 1.5, NaN, Infinity])('blocks corrupt cart quantity %s', quantity => {
    app['cart'].set([{ name: 'MegaShield P60', quantity }]); app['sendQuote']();
    expect(open).not.toHaveBeenCalled();
  });
  it('blocks hidden products in a manipulated cart', () => {
    app['cart'].set([{ name: 'MegaHose', quantity: 1 }]); app['sendQuote']();
    expect(open).not.toHaveBeenCalled();
  });
  it('ignores invalid quantity changes', () => {
    app['changeProduct']('MegaShield P60', NaN); app['changeProduct']('MegaShield P60', 0.5);
    expect(app['productQuantity']('MegaShield P60')).toBe(1);
  });
  it('trims customer values before preparing the quote', () => {
    app['form'].name = '  João  D’Ávila  '; app['form'].email = ' joao+obra@example.com ';
    app['sendQuote']();
    const message = new URL(open.mock.calls[0][0] as string).searchParams.get('text');
    expect(message).toContain('*Nome:* João D’Ávila\n');
    expect(message).toContain('*E-mail:* joao+obra@example.com\n');
  });
});
