import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { App } from './app';
import { DOOR_COMPONENTS, validConfiguration } from './door-configuration';
import { quoteFieldError } from './quote-validation';

describe('Configured door cart', () => {
  let app: App;
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
    app = TestBed.createComponent(App).componentInstance;
    app['changeDoorHardware']('Fechadura de sobrepor');
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  });
  afterEach(() => { vi.restoreAllMocks(); document.body.classList.remove('quote-open'); });
  it('separates hardware and custom sizes but merges identical configurations', () => {
    app['saveDoor'](); app['saveDoor']();
    app['changeDoorSize']('custom'); app['draft'].width = 95; app['saveDoor']();
    expect(app['cart']().map(item => item.quantity)).toEqual([2, 1]);
    expect(app['selectedCount']()).toBe(3);
    expect(app['configurationText'](app['cart']()[1])).toContain('95 × 209 cm');
  });
  it('uses production opening dimensions and updates them when changing model', () => {
    app['changeDoorModel']('P120'); app['saveDoor']();
    expect(app['cart']()[0].configuration).toMatchObject({ width: 91, height: 212 });
    app['changeDoorModel']('P90');
    expect(app['draft']).toMatchObject({ width: 84, height: 209 });
  });
  it('edits one variant without changing another, and removes by configuration', () => {
    app['saveDoor']();
    app['changeDoorSize']('custom'); app['draft'].width = 95; app['saveDoor']();
    app['editDoor'](app['cart']()[0]); app['draft'].quantity = 3; app['saveDoor']();
    expect(app['cart']().find(item => item.configuration?.size === 'standard')?.quantity).toBe(3);
    expect(app['cart']().find(item => item.configuration?.size === 'custom')?.quantity).toBe(1);
    app['removeDoor'](app['itemKey'](app['cart']()[0])); expect(app['cart']()).toHaveLength(1);
  });
  it('blocks incomplete, fractional and invalid configurations', () => {
    app['draft'].hardware = ''; app['saveDoor'](); expect(app['cart']()).toHaveLength(0);
    app['changeDoorHardware']('Fechadura de sobrepor'); app['draft'].quantity = 1.5; app['saveDoor']();
    expect(app['cart']()).toHaveLength(0);
    expect(validConfiguration({model:'P90',size:'standard',width:90,height:210,hardware:'Fechadura de sobrepor',components:DOOR_COMPONENTS['Fechadura de sobrepor']})).toBe(false);
  });
  it.each(['', '11.222.333/0001-80', '00000000000000'])('blocks WhatsApp with invalid CNPJ %s', cnpj => {
    app['saveDoor']();
    app['form'] = {name:'João Silva', phone:'21987654321', email:'joao@example.com',company:'Empresa',cnpj,budget:'',deadline:'',consent:true};
    const open=vi.spyOn(window,'open').mockImplementation(()=>null);
    app['sendQuote'](); expect(open).not.toHaveBeenCalled();
  });
});

describe('CNPJ validation', () => {
  it.each(['11.222.333/0001-81', '11222333000181', '00.000.000/E08G-12', '00.000.000/e08g-12'])('accepts valid numeric or alphanumeric %s', value => {
    expect(quoteFieldError('cnpj', value)).toBeNull();
  });
  it.each(['', '123456789', '11.222.333/0001-80', '00.000.000/E08G-13', '00000000000000', '11222333000181<script>', '11/222333000181'])('rejects %s', value => {
    expect(quoteFieldError('cnpj',value)).not.toBeNull();
  });
});
