export type DoorModel = 'P90' | 'P120';
export type DoorHardware = 'Barra antipânico' | 'Fechadura de sobrepor';
export interface DoorComponents {
  lock: string;
  hinges: string;
}
export interface DoorConfiguration {
  model: DoorModel;
  size: 'standard' | 'custom';
  width: number;
  height: number;
  hardware: DoorHardware;
  components: DoorComponents;
}
export interface CartItem {
  name: string;
  quantity: number;
  configuration?: DoorConfiguration;
}
// Memorials, section 08: production clear opening (width × height), in cm.
// Do not substitute section 02 test dimensions or leaf dimensions.
export const DOOR_SIZES = { P90: { width: 84, height: 209 }, P120: { width: 91, height: 212 } } as const;
export const HARDWARE: DoorHardware[] = ['Barra antipânico', 'Fechadura de sobrepor'];
export const DOOR_COMPONENTS: Record<DoorHardware, DoorComponents> = {
  'Barra antipânico': {
    lock: 'Não especificado na ficha técnica',
    hinges: 'Não especificado na ficha técnica',
  },
  'Fechadura de sobrepor': {
    lock: 'Fechadura de sobrepor DISAFE',
    hinges: '3 dobradiças de mola G SARDOU',
  },
};
export function componentsForHardware(hardware: DoorHardware): DoorComponents {
  return DOOR_COMPONENTS[hardware];
}
export function validConfiguration(c: DoorConfiguration | undefined): c is DoorConfiguration {
  if (!c || !Object.hasOwn(DOOR_SIZES, c.model) || !HARDWARE.includes(c.hardware) ||
    c.components?.lock !== DOOR_COMPONENTS[c.hardware].lock || c.components?.hinges !== DOOR_COMPONENTS[c.hardware].hinges) return false;
  if (![c.width, c.height].every(n => Number.isFinite(n) && n > 0 && n <= 1000)) return false;
  return c.size === 'custom' || (c.size === 'standard' && c.width === DOOR_SIZES[c.model].width && c.height === DOOR_SIZES[c.model].height);
}
export function itemKey(item: CartItem): string {
  const c = item.configuration;
  return c ? `${item.name}|${c.size}|${c.width}|${c.height}|${c.hardware}` : item.name;
}
export function configurationText(item: CartItem): string {
  const c = item.configuration;
  if (!c) return '';
  return `Vão livre (L × A): ${c.width} × ${c.height} cm · ${c.size === 'standard' ? 'Padrão do modelo' : 'Medida sob consulta'} · ${c.hardware} · Componentes: ${c.components.lock}; ${c.components.hinges}`;
}
