import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { App } from './app';
import { DOOR_COMPONENTS, COMPONENT_GROUPS, quoteItemText, validConfiguration } from './door-configuration';
import { quoteFieldError } from './quote-validation';

describe('Configured door cart', () => {
  let app: App;
  beforeEach(async () => {
    localStorage.clear();
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
    expect(app['configurationText'](app['cart']()[1])).toContain('95 × 210 cm');
  });
  it('uses production opening dimensions and updates them when changing model', () => {
    app['changeDoorModel']('P120'); app['saveDoor']();
    expect(app['cart']()[0].configuration).toMatchObject({ width: 80, height: 210 });
    app['changeDoorModel']('P90');
    expect(app['draft']).toMatchObject({ width: 80, height: 210 });
  });
  it('edits one variant without changing another, and removes by configuration', () => {
    app['saveDoor']();
    app['changeDoorSize']('custom'); app['draft'].width = 95; app['saveDoor']();
    app['editDoor'](app['cart']()[0]); app['draft'].quantity = 3; app['saveDoor']();
    expect(app['cart']().find(item => item.configuration?.size === 'nominal')?.quantity).toBe(3);
    expect(app['cart']().find(item => item.configuration?.size === 'custom')?.quantity).toBe(1);
    app['removeDoor'](app['itemKey'](app['cart']()[0])); expect(app['cart']()).toHaveLength(1);
  });
  it('blocks incomplete, fractional and invalid configurations', () => {
    app['draft'].components = ['Componente inexistente']; app['saveDoor'](); expect(app['cart']()).toHaveLength(0);
    app['changeDoorHardware']('Fechadura de sobrepor'); app['draft'].quantity = 1.5; app['saveDoor']();
    expect(app['cart']()).toHaveLength(0);
    expect(validConfiguration({model:'P90',size:'standard',width:90,height:210,hardware:'Fechadura de sobrepor',components:DOOR_COMPONENTS['Fechadura de sobrepor']})).toBe(false);
  });
  it('adds the current selection when finalizing and does not duplicate it on reopening', () => {
    app['toggleComponent']('Barra simples c/ chave');
    app['changeDoorNominalSize']('100x210');
    app['finalizeOrder']();
    expect(app['cart']()).toHaveLength(1);
    expect(app['cart']()[0].configuration).toMatchObject({width:100, components:['Barra simples c/ chave']});
    expect(app['quotePage']()).toBe(true);
    app['closeQuotePage']();
    app['finalizeOrder']();
    expect(app['selectedCount']()).toBe(1);
  });
  it('uses components to distinguish configurations in the shared cart', () => {
    app['toggleComponent']('Fechadura sobrepor simples');
    app['saveDoor']();
    app['toggleComponent']('Fechadura sobrepor simples');
    app['toggleComponent']('Barra simples c/ chave');
    app['saveDoor']();
    expect(app['cart']()).toHaveLength(2);
    expect(app['cart']()[1].configuration?.actuation).toBeUndefined();
    expect(app['configurationText'](app['cart']()[1])).toContain('Barra simples c/ chave');
    expect(app['configurationText'](app['cart']()[1])).not.toContain('fechadura manual');
    app['editDoor'](app['cart']()[0]);
    expect(app['draft'].components).toEqual(['Fechadura sobrepor simples']);
    app['draft'].quantity = 3;
    app['saveDoor']();
    expect(app['cart']()).toHaveLength(2);
    expect(app['cart']().find(item => item.quantity === 3)?.configuration?.components).toEqual(['Fechadura sobrepor simples']);
  });
  it('allows another identical door through the explicit add-another action', () => {
    app['finalizeOrder']();
    app['addAnotherDoor']();
    app['draft'].quantity = 2;
    app['finalizeOrder']();
    expect(app['cart']()).toHaveLength(1);
    expect(app['cart']()[0].quantity).toBe(3);
    app['closeQuotePage'](); app['finalizeOrder']();
    expect(app['cart']()[0].quantity).toBe(3);
  });
  it('offers only the four commercial component categories', () => {
    expect(COMPONENT_GROUPS).toEqual(['Dobradiças', 'Fechaduras', 'Molas aéreas', 'Barras antipânico']);
  });
  it('uses the changed quantity at checkout without duplicating the saved door', () => {
    app['saveDoor']();
    app['draft'].quantity = 4;
    app['finalizeOrder']();
    expect(app['cart']()).toHaveLength(1);
    expect(app['cart']()[0].quantity).toBe(4);
  });
  it('allows explicitly finalizing the current configuration again after removal', () => {
    app['saveDoor']();
    app['removeDoor'](app['itemKey'](app['cart']()[0]));
    app['finalizeOrder']();
    expect(app['cart']()).toHaveLength(1);
    expect(app['quotePage']()).toBe(true);
  });
  it('keeps saved components independent from an unsaved draft', () => {
    app['toggleComponent']('Dobradiça de mola');
    app['saveDoor']();
    app['draft'].components.push('Barra simples c/ chave');
    expect(app['cart']()[0].configuration?.components).toEqual(['Dobradiça de mola']);
  });
  it('serializes only selected components after editing, merging and removal', () => {
    app['toggleComponent']('Dobradiça de mola'); app['saveDoor']();
    app['toggleComponent']('Dobradiça de mola');
    app['toggleComponent']('Fechadura sobrepor c/ chave'); app['saveDoor']();
    app['editDoor'](app['cart']()[0]);
    app['toggleComponent']('Dobradiça de mola');
    app['toggleComponent']('Fechadura sobrepor c/ chave');
    app['draft'].quantity = 3; app['saveDoor']();
    expect(app['cart']()).toHaveLength(1);
    expect(app['cart']()[0].quantity).toBe(4);
    const text = quoteItemText(app['cart']()[0]);
    expect(text).toContain('• Fechadura sobrepor c/ chave');
    expect(text).not.toMatch(/Dobradiça|Acabamento|Galvanizado|pintura/);
    expect(localStorage.getItem('mega-brasil-cart')).toBeNull();
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
