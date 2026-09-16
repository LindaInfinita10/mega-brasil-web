import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, OnDestroy, Output } from '@angular/core';

/** Keyboard navigation for the full-screen detail and quote panels. */
@Directive({ selector: '[panelFocus]', host: { role: 'dialog', 'aria-modal': 'true' } })
export class PanelFocusDirective implements AfterViewInit, OnDestroy {
  @Output() panelClose = new EventEmitter<void>();
  private readonly previousFocus = document.activeElement as HTMLElement | null;
  private destroyed = false;

  constructor(private readonly element: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    queueMicrotask(() => {
      if (this.destroyed) return;
      this.element.nativeElement.querySelector<HTMLElement>('h1')?.focus({ preventScroll: true });
    });
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.panelClose.emit();
      return;
    }
    if (event.key !== 'Tab') return;
    const controls = Array.from(this.element.nativeElement.querySelectorAll<HTMLElement>(
      'a[href], button, input, textarea, select, summary, [tabindex="0"]',
    )).filter(el => !el.matches(':disabled, [tabindex="-1"]') && el.getClientRects().length > 0);
    const first = controls[0];
    const last = controls.at(-1);
    if (!first || !last) { event.preventDefault(); return; }
    if (event.shiftKey && (document.activeElement === first || !controls.includes(document.activeElement as HTMLElement))) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    queueMicrotask(() => {
      // A replacement panel (e.g. quote confirmation) owns its own focus.
      if (document.querySelector('[panelFocus]')) return;
      const target = this.previousFocus?.isConnected && !this.previousFocus.closest('[inert]')
        ? this.previousFocus : document.querySelector<HTMLElement>('#megashield h2');
      target?.focus({ preventScroll: true });
    });
  }
}
