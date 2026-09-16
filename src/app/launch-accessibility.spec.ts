import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { App } from './app';

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

  it('moves focus into details, isolates the background and restores the opener', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement;
    const opener = root.querySelectorAll<HTMLButtonElement>('.mega-door-options .door-detail-link')[2];
    opener.focus();
    opener.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(document.activeElement?.id).toBe('door-title');
    expect(root.querySelector('main')?.hasAttribute('inert')).toBe(true);
    expect(root.querySelector('[role="dialog"]')?.getAttribute('aria-modal')).toBe('true');
    // Close directly to keep this regression independent of scrolling timers.
    fixture.componentInstance['closeDoorDetail']();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(root.querySelector('main')?.hasAttribute('inert')).toBe(false);
    expect(document.activeElement).toBe(opener);
  });

  it('wraps keyboard focus inside the panel and closes with Escape', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    fixture.componentInstance['openDoorDetail']('P90');
    fixture.detectChanges();
    await fixture.whenStable();
    vi.spyOn(HTMLElement.prototype, 'getClientRects').mockReturnValue([{ width: 20, height: 20 }] as unknown as DOMRectList);
    const panel: HTMLElement = fixture.nativeElement.querySelector('.door-page');
    const controls = Array.from(panel.querySelectorAll<HTMLElement>('a[href], button, [tabindex="0"]')).filter(el => !el.matches(':disabled, [tabindex="-1"]'));
    controls.at(-1)!.focus();
    controls.at(-1)!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }));
    expect(document.activeElement).toBe(controls[0]);
    controls[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true }));
    expect(document.activeElement).toBe(controls.at(-1));
    panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance['selectedDoor']()).toBeNull();
  });

  it('changes the selected component with arrow keys and keeps one tab stop', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.componentInstance['openDoorDetail']('P120');
    fixture.detectChanges();
    await fixture.whenStable();
    const root: HTMLElement = fixture.nativeElement;
    root.querySelector('#component-tab-0')!.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    fixture.detectChanges();
    expect(document.activeElement?.id).toBe('component-tab-1');
    expect(root.querySelectorAll('[role="tab"][tabindex="0"]')).toHaveLength(1);
    expect(root.querySelector('[role="tabpanel"]')?.getAttribute('aria-labelledby')).toBe('component-tab-1');
  });

  it('offers the same policy in both forms and opens it from consent', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.componentInstance['addProduct']('MegaShield P90');
    fixture.componentInstance['openQuotePage']();
    fixture.detectChanges();
    await fixture.whenStable();
    const root: HTMLElement = fixture.nativeElement;
    expect(root.querySelector('#contact-privacy')?.textContent).toBe(root.querySelector('#quote-privacy')?.textContent);
    root.querySelector<HTMLAnchorElement>('.consent-field a')!.click();
    expect(root.querySelector<HTMLDetailsElement>('#quote-privacy')?.open).toBe(true);
    expect(document.activeElement).toBe(root.querySelector('#quote-privacy summary'));
    expect(fixture.componentInstance['form'].consent).toBe(false);
  });
});
