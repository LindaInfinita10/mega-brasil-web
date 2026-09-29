export type DoorModel = 'P60' | 'P90' | 'P120';
export type DoorActuation = 'manual' | 'panic-bar';
export type DoorSize = '80 × 210 cm' | '90 × 210 cm' | '100 × 210 cm';
export type DoorComponentGroup = 'Dobradiças' | 'Fechaduras' | 'Molas aéreas' | 'Barras antipânico' | 'Pintura';
export interface DoorComponentOption { group: DoorComponentGroup; label: string; }
export interface DoorConfiguration {
  model: DoorModel;
  actuation?: DoorActuation;
  size: 'nominal' | 'standard' | 'custom';
  width: number;
  height: number;
  hardware?: string;
  panicBarKeys?: Record<string, 'Com chave' | 'Sem chave'>;
  painting?: 'Cor vermelha' | 'Outra cor' | 'Tinta intumescente';
  customColor?: string;
  components: string[] | { lock: string; hinges: string };
}
export interface CartItem {
  name: string;
  quantity: number;
  configuration?: DoorConfiguration;
}
export const NOMINAL_SIZES = [{ width: 80, height: 210 }, { width: 90, height: 210 }, { width: 100, height: 210 }] as const;
export const DOOR_SIZES = { P60: NOMINAL_SIZES, P90: NOMINAL_SIZES, P120: NOMINAL_SIZES } as const;
export const DOOR_COMPONENT_OPTIONS: DoorComponentOption[] = [
  { group: 'Dobradiças', label: 'Dobradiça de mola' },
  { group: 'Dobradiças', label: 'Dobradiça helicoidal' },
  { group: 'Fechaduras', label: 'Fechadura sobrepor simples' },
  { group: 'Fechaduras', label: 'Fechadura sobrepor c/ chave' },
  { group: 'Molas aéreas', label: 'Mola aérea PP2200 PAIZ' },
  { group: 'Molas aéreas', label: 'Mola aérea 2234 La Fonte' },
  { group: 'Barras antipânico', label: 'Barra simples c/ chave' },
  { group: 'Barras antipânico', label: 'Barra dupla c/ chave' },
];
export const COMPONENT_GROUPS: DoorComponentGroup[] = [...new Set(DOOR_COMPONENT_OPTIONS.map(component => component.group)), 'Pintura'];
export const PAINTING_OPTIONS = ['Cor vermelha', 'Outra cor', 'Tinta intumescente'] as const;
export function componentText(c: DoorConfiguration, label: string): string {
  return label.startsWith('Barra ') ? `${label.replace('Barra ', 'Barra antipânico ').replace(' c/ chave', '')} — ${c.panicBarKeys?.[label] ?? 'Com chave'}` : label;
}
export function paintingText(c: DoorConfiguration): string {
  return c.painting ? `Pintura: ${c.painting}${c.painting === 'Outra cor' ? ` — ${c.customColor?.trim() || 'Especifique a cor desejada'}` : ''}` : '';
}
function configurationLabels(c: DoorConfiguration): string[] {
  return [...componentLabels(c.components).map(label => componentText(c, label)), ...(c.painting ? [paintingText(c)] : [])];
}
export const DEFAULT_COMPONENTS: string[] = [];
export type DoorHardware = string;
export const HARDWARE: DoorHardware[] = [];
export const DOOR_COMPONENTS = { 'Fechadura de sobrepor': { lock: 'Fechadura sobrepor simples', hinges: 'Dobradiça de mola' } };
export function componentsForHardware(): string[] { return [...DEFAULT_COMPONENTS]; }
function componentLabels(components: DoorConfiguration['components']): string[] {
  return Array.isArray(components) ? components : [components.lock, components.hinges];
}
export function validConfiguration(c: DoorConfiguration | undefined): c is DoorConfiguration {
  const components = c?.components;
  if (!c || !Object.hasOwn(DOOR_SIZES, c.model) || !Array.isArray(components) ||
    components.some(component => !DOOR_COMPONENT_OPTIONS.some(option => option.label === component))) return false;
  if (components.some(label => label.startsWith('Barra ') && !['Com chave', 'Sem chave'].includes(c.panicBarKeys?.[label] ?? 'Com chave'))) return false;
  if (c.painting && !PAINTING_OPTIONS.includes(c.painting)) return false;
  if (c.painting === 'Outra cor' && (typeof c.customColor !== 'string' || !c.customColor.trim())) return false;
  if (![c.width, c.height].every(n => Number.isFinite(n) && n > 0 && n <= 1000)) return false;
  return c.size === 'custom' || ((c.size === 'nominal' || c.size === 'standard') && DOOR_SIZES[c.model].some(size => c.width === size.width && c.height === size.height));
}
export function itemKey(item: CartItem): string {
  const c = item.configuration;
  return c ? `${item.name}|${c.size}|${c.width}|${c.height}|${configurationLabels(c).sort().join('|')}` : item.name;
}
export function configurationText(item: CartItem): string {
  const c = item.configuration;
  if (!c) return '';
  return `Dimensões nominais (largura × altura): ${c.width} × ${c.height} cm · ${c.size === 'custom' ? 'Outra medida — sob consulta' : 'Catálogo'} · Componentes: ${configurationLabels(c).length ? configurationLabels(c).join('; ') : 'Nenhum componente selecionado'}`;
}

export function quoteItemText(item: CartItem): string {
  const c = item.configuration;
  if (!c) return `*${item.name}*\nQuantidade: ${item.quantity} unidade(s)`;
  const components = configurationLabels(c);
  return `*${item.name}*\nQuantidade: ${item.quantity} unidade(s)\nDimensões nominais (largura × altura): ${c.width} × ${c.height} cm${c.size === 'custom' ? ' — sob consulta' : ''}\nComponentes solicitados:\n${components.length ? components.map(label => `• ${label}`).join('\n') : '• Nenhum componente selecionado'}`;
}
