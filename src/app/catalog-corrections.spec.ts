import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { App } from './app';
import { configurationText, quoteItemText, itemKey } from './door-configuration';

describe('Requested catalog corrections', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    HTMLElement.prototype.scrollIntoView = vi.fn();
  });
  afterEach(() => { vi.restoreAllMocks(); document.body.classList.remove('quote-open'); });

  it.each(['Barra simples c/ chave', 'Barra dupla c/ chave'])('keeps both key choices for %s distinct, editable and in WhatsApp', label => {
    const app = TestBed.createComponent(App).componentInstance;
    app['changeDoorModel']('P60');
    app['toggleComponent'](label);
    for (const key of ['Com chave', 'Sem chave'] as const) {
      app['setBarKey'](label, key, 'manual');
      app['saveDoor']();
    }
    expect(app['cart']()).toHaveLength(2);
    const [withKey, withoutKey] = app['cart']();
    expect(itemKey(withKey)).not.toBe(itemKey(withoutKey));
    const base = label.replace('Barra ', 'Barra antipânico ').replace(' c/ chave', '');
    expect(configurationText(withKey)).toContain(`${base} — Com chave`);
    expect(quoteItemText(withoutKey)).toContain(`${base} — Sem chave`);
    app['editDoor'](withKey);
    expect(app['draft'].panicBarKeys?.[label]).toBe('Com chave');
    app['setBarKey'](label, 'Sem chave', 'manual');
    expect(withKey.configuration?.panicBarKeys?.[label]).toBe('Com chave');
    app['saveDoor']();
    expect(app['cart']()).toHaveLength(1);
    expect(app['cart']()[0].quantity).toBe(2);
    app['form'] = { name: 'João Silva', company: 'Empresa', cnpj: '11.222.333/0001-81', phone: '21987654321', email: 'joao@example.com', budget: '', deadline: '', consent: true };
    const open = vi.spyOn(window, 'open').mockImplementation(() => null);
    app['sendQuote']();
    expect(new URL(open.mock.calls[0][0] as string).searchParams.get('text')).toContain(`${base} — Sem chave`);
  });

  it('keeps painting variants independent and rejects empty custom colors through checkout', () => {
    const app = TestBed.createComponent(App).componentInstance;
    app['draft'].painting = 'Outra cor';
    for (const color of ['', '   ']) {
      app['draft'].customColor = color;
      app['finalizeOrder']();
      expect(app['cart']()).toHaveLength(0);
      expect(app['quotePage']()).toBe(false);
    }
    for (const color of [' Azul ', 'Preto']) {
      app['draft'].customColor = color;
      app['saveDoor']();
    }
    for (const painting of ['Cor vermelha', 'Tinta intumescente'] as const) {
      app['draft'].painting = painting;
      app['saveDoor']();
    }
    expect(app['cart']()).toHaveLength(4);
    expect(new Set(app['cart']().map(itemKey)).size).toBe(4);
    const blue = app['cart']()[0];
    expect(blue.configuration?.customColor).toBe('Azul');
    expect(configurationText(blue)).toContain('Pintura: Outra cor — Azul');
    app['editDoor'](blue);
    expect(app['draft'].painting).toBe('Outra cor');
    expect(app['draft'].customColor).toBe('Azul');
    app['form'] = { name: 'João Silva', company: 'Empresa', cnpj: '11.222.333/0001-81', phone: '21987654321', email: 'joao@example.com', budget: '', deadline: '', consent: true };
    const open = vi.spyOn(window, 'open').mockImplementation(() => null);
    app['sendQuote']();
    const message = new URL(open.mock.calls[0][0] as string).searchParams.get('text');
    for (const value of ['Outra cor — Azul', 'Outra cor — Preto', 'Cor vermelha', 'Tinta intumescente']) expect(message).toContain(`Pintura: ${value}`);
    expect(app['draft'].painting).toBeUndefined();
  });

  it('renders conditional controls and preserves the footer contacts and legal URL', async () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    fixture.detectChanges(); await fixture.whenStable();
    const root: HTMLElement = fixture.nativeElement;
    const model = root.querySelector<HTMLOptionElement>('option[value="P60"]')!;
    expect(model.disabled).toBe(false);
    expect(model.textContent).toContain('Somente sob encomenda');
    const checkboxes = root.querySelectorAll<HTMLInputElement>('.component-option:not(.painting-option) input[type="checkbox"]');
    expect(checkboxes).toHaveLength(8);
    for (const checkbox of Array.from(checkboxes).slice(-2)) checkbox.click();
    fixture.detectChanges(); await fixture.whenStable();
    const keySelects = root.querySelectorAll<HTMLSelectElement>('.component-inline-options select');
    expect(keySelects).toHaveLength(2);
    for (const select of keySelects) {
      expect(Array.from(select.options).map(option => option.text)).toEqual(['Com chave', 'Sem chave']);
      select.value = 'Sem chave'; select.dispatchEvent(new Event('change'));
    }
    fixture.detectChanges(); await fixture.whenStable();
    expect(Object.values(app['draft'].panicBarKeys!)).toEqual(['Sem chave', 'Sem chave']);
    const paintings = root.querySelectorAll<HTMLInputElement>('.painting-option input[type="checkbox"]');
    expect(Array.from(paintings).map(input => input.closest("label")?.textContent?.trim())).toEqual(['Cor vermelha', 'Outra cor', 'Tinta intumescente']);
    expect(root.querySelector('input[placeholder="Especifique a cor desejada"]')).toBeNull();
    paintings[1].click(); fixture.detectChanges(); await fixture.whenStable();
    const color = root.querySelector<HTMLInputElement>('input[placeholder="Especifique a cor desejada"]')!;
    expect(color).not.toBeNull();
    expect(root.querySelector<HTMLButtonElement>('.cart-checkout')!.disabled).toBe(true);
    color.value = 'Azul'; color.dispatchEvent(new Event('input'));
    fixture.detectChanges(); await fixture.whenStable();
    expect(app['draft'].customColor).toBe('Azul');
    expect(root.querySelector<HTMLButtonElement>('.cart-checkout')!.disabled).toBe(false);
    app['configurationStarted'].set(true); fixture.detectChanges();
    expect(root.querySelector('.draft-order-summary')?.textContent).toContain('Pintura: Outra cor — Azul');
    paintings[0].click(); fixture.detectChanges(); await fixture.whenStable();
    expect(root.querySelector('input[placeholder="Especifique a cor desejada"]')).toBeNull();
    paintings[1].click(); fixture.detectChanges(); await fixture.whenStable();
    expect(root.querySelectorAll('.painting-swatch')).toHaveLength(3);
    expect(root.querySelector('.painting-option')?.closest('fieldset')?.querySelector('button')).toBeNull();
    paintings[1].click(); fixture.detectChanges(); await fixture.whenStable();
    expect(app['draft'].painting).toBeUndefined();
    expect(root.querySelector('input[placeholder="Especifique a cor desejada"]')).toBeNull();
    paintings[1].click(); fixture.detectChanges(); await fixture.whenStable();
    root.querySelector<HTMLButtonElement>('.cart-checkout')!.click();
    fixture.detectChanges(); await fixture.whenStable();
    expect(root.querySelector('.quote-page')?.textContent).toContain('Pintura: Outra cor — Azul');
    app['closeQuotePage'](); fixture.detectChanges();
    const footer = root.querySelector('footer')!;
    expect(footer.textContent).not.toMatch(/Unidade 3|Juscelino|The City|São Paulo/);
    expect(footer.textContent).toContain('Unidade 1 · Matriz');
    expect(footer.textContent).toContain('Unidade 2 · Área administrativa');
    expect(footer.querySelector('a[href="mailto:comercial@megabrasil.net"]')?.textContent).toBe('comercial@megabrasil.net');
    expect(footer.querySelector('a[href="https://www.cbmerj.rj.gov.br/notas-tecnicas/"]')?.textContent).toBe('Segurança contra incêndio e pânico — Legislação RJ');
  });
});
