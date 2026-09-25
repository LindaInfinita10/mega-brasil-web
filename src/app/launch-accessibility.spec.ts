import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { App } from './app';

function addDoor(app: App, model: 'P90' | 'P120' = 'P90') {
  app['changeDoorModel'](model);
  app['changeDoorHardware']('Fechadura de sobrepor');
  app['saveDoor']();
}


describe('Launch navigation and privacy', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    HTMLElement.prototype.scrollIntoView = vi.fn();
  });
  afterEach(() => {
    vi.restoreAllMocks();
    document.body.classList.remove('quote-open');
  });

  it('opens the configured cart and restores focus on close', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement;
    addDoor(fixture.componentInstance);
    fixture.detectChanges();
    const opener = root.querySelector<HTMLButtonElement>('.cart-checkout')!;
    opener.focus();
    opener.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(document.activeElement?.id).toBe('quote-title');
    expect(root.querySelector('main')?.hasAttribute('inert')).toBe(true);
    expect(root.querySelector('[role="dialog"]')?.getAttribute('aria-modal')).toBe('true');
    // Close directly to keep this regression independent of scrolling timers.
    fixture.componentInstance['closeQuotePage']();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(root.querySelector('main')?.hasAttribute('inert')).toBe(false);
    expect(document.activeElement).toBe(opener);
  });

  it('wraps keyboard focus inside the panel and closes with Escape', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    addDoor(fixture.componentInstance);
    fixture.componentInstance['openQuotePage']();
    fixture.detectChanges();
    await fixture.whenStable();
    vi.spyOn(HTMLElement.prototype, 'getClientRects').mockReturnValue([{ width: 20, height: 20 }] as unknown as DOMRectList);
    const panel: HTMLElement = fixture.nativeElement.querySelector('.quote-page');
    const controls = Array.from(panel.querySelectorAll<HTMLElement>('a[href], button, [tabindex="0"]')).filter(el => !el.matches(':disabled, [tabindex="-1"]'));
    controls.at(-1)!.focus();
    controls.at(-1)!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }));
    expect(document.activeElement).toBe(controls[0]);
    controls[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true }));
    expect(document.activeElement).toBe(controls.at(-1));
    panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance['quotePage']()).toBe(false);
  });

  it('shows all components without tabs or technical-sheet links', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement;
    expect(root.querySelector('#door-configurator')).not.toBeNull();
    expect(root.querySelectorAll('.door-type-card')).toHaveLength(1);
    expect(root.querySelectorAll('.door-panorama img')).toHaveLength(1);
    expect(root.querySelectorAll('input[name="doorActuation"]')).toHaveLength(0);
    expect(root.querySelectorAll('option[value="P60"]:disabled')).toHaveLength(1);
    expect(root.querySelectorAll('.component-store-card')).toHaveLength(4);
    expect(root.querySelectorAll('.component-inline-options input[type="checkbox"]')).toHaveLength(8);
    expect(root.querySelectorAll('.component-store-button')).toHaveLength(0);
    expect(root.querySelector('[role="tablist"]')).toBeNull();
    expect(root.querySelector('a[href$=".pdf"]')).toBeNull();
    expect(root.textContent).not.toContain('Ver ficha técnica');
    expect(root.textContent).not.toContain('Adicionar ao orçamento');
    expect(root.querySelector<HTMLDetailsElement>('#contact-privacy')?.open).toBe(true);
    expect(root.querySelector('.channel-card.whatsapp')?.getAttribute('href')).toBe('https://wa.me/5521978715555');
    expect(root.querySelector('.channel-card[href^="tel:"]')?.getAttribute('href')).toBe('tel:+552135142414');
    expect(root.querySelector('.channel-card[href^="mailto:"]')?.getAttribute('href')).toBe('mailto:comercial@megabrasilindustria.net?subject=Contato%20comercial%20-%20Mega%20Brasil');
    for (const link of root.querySelectorAll<HTMLAnchorElement>('a')) {
      if (link.textContent?.includes('Solicitar orçamento')) expect(link.getAttribute('href')).toBe('#megashield');
    }
    expect(root.querySelector('#contato')?.textContent).not.toContain('Revise as portas');
  });

  it('opens the quote policy from the final consent field', async () => {
    const fixture = TestBed.createComponent(App);
    addDoor(fixture.componentInstance, 'P90');
    fixture.componentInstance['openQuotePage']();
    fixture.detectChanges();
    await fixture.whenStable();
    const root: HTMLElement = fixture.nativeElement;
    expect(root.querySelector('#contact-privacy')).toBeNull();
    expect(root.querySelector('#quote-privacy')).not.toBeNull();
    root.querySelector<HTMLAnchorElement>('.consent-field a')!.click();
    expect(root.querySelector<HTMLDetailsElement>('#quote-privacy')?.open).toBe(true);
    expect(document.activeElement).toBe(root.querySelector('#quote-privacy summary'));
    expect(fixture.componentInstance['form'].consent).toBe(false);
  });
});
