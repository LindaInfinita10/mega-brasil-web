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
    expect(root.querySelectorAll('input[name=doorHardware]')).toHaveLength(2);
    expect(root.querySelector('[role="tablist"]')).toBeNull();
    expect(root.querySelector('a[href$=".pdf"]')).toBeNull();
    expect(root.textContent).not.toContain('Ver ficha técnica');
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
