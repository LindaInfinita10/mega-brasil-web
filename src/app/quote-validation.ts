export type QuoteField = 'name' | 'phone' | 'email' | 'company' | 'budget' | 'deadline';
export const quoteFields: QuoteField[] = ['name', 'phone', 'email', 'company', 'budget', 'deadline'];

export function normalizeQuoteField(field: QuoteField, value: string): string {
  const text = value.normalize('NFC').trim();
  return field === 'name' || field === 'company' ? text.replace(/ +/g, ' ') : text;
}

export function quoteFieldError(field: QuoteField, raw: unknown): string | null {
  const rawText = typeof raw === 'string' ? raw : '';
  // Reject hidden control characters instead of silently altering the customer's data.
  const controls = field === 'budget' ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/ : /[\u0000-\u001F\u007F]/;
  if (controls.test(rawText) || /[\u200B-\u200F\u202A-\u202E\u2066-\u2069]/.test(rawText)) {
    return 'Remova os caracteres de controle ou invisíveis deste campo.';
  }
  const text = normalizeQuoteField(field, rawText);
  if (field === 'name') {
    if (!text) return 'Informe seu nome completo.';
    if (text.length > 120) return 'Use no máximo 120 caracteres no nome.';
    if (!/^[\p{L}\p{M} .’'\-]+$/u.test(text) || (text.match(/\p{L}/gu)?.length ?? 0) < 2) {
      return 'Use letras no nome; acentos, espaços, hífens e apóstrofos são aceitos.';
    }
  } else if (field === 'phone') {
    if (!text) return 'Informe seu telefone com DDD.';
    const digits = text.replace(/\D/g, '');
    const validLength = text.startsWith('+') ? digits.length >= 8 && digits.length <= 15 : digits.length === 10 || digits.length === 11;
    if (text.length > 30 || !/^\+?[\d ().-]+$/.test(text) || !validLength || /^(\d)\1+$/.test(digits)) {
      return 'Informe DDD + telefone (10 ou 11 dígitos). Para outro país, comece com + e o código do país.';
    }
  } else if (field === 'email') {
    if (!text) return 'Informe seu e-mail.';
    const parts = text.split('@');
    const local = parts[0];
    const domain = parts[1] ?? '';
    const labels = domain.split('.');
    if (text.length > 254 || parts.length !== 2 || !local || local.length > 64 ||
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local) || local.startsWith('.') || local.endsWith('.') || local.includes('..') ||
      labels.length < 2 || !labels.every(label => /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/.test(label)) ||
      !/^(?:[a-zA-Z]{2,63}|xn--[a-zA-Z0-9-]+)$/.test(labels.at(-1) ?? '')) {
      return 'Informe um e-mail válido, como nome@empresa.com.br, sem espaços.';
    }
  } else {
    const max = field === 'budget' ? 2000 : field === 'company' ? 160 : 120;
    if (text.length > max) return `Use no máximo ${max} caracteres neste campo.`;
  }
  return null;
}
