import { normalizeQuoteField, quoteFieldError } from './quote-validation';

describe('Customer data validation', () => {
  it.each(['João da Conceição', 'Ana-María D’Ávila', "O'Connor", 'José A. Silva', '李明', 'Jose\u0301 Silva'])('accepts name %s', name => {
    expect(quoteFieldError('name', name)).toBeNull();
  });
  it.each(['', '  ', '1234', 'João 123', '👋 João', 'João\nEmpresa: Outra', 'João\u200BSilva', 'A', 'a'.repeat(121)])('rejects invalid name %s', name => {
    expect(quoteFieldError('name', name)).not.toBeNull();
  });
  it.each(['(21) 98765-4321', '(21) 3514-2414', '+55 (21) 98765-4321', '+54 11 5555-1234', '+1 202 555 0123'])('accepts phone %s', phone => {
    expect(quoteFieldError('phone', phone)).toBeNull();
  });
  it.each(['abc', '12345', '00000000000', '+1234567890123456', '21-99999-ABCD', '21+987654321'])('rejects phone %s', phone => {
    expect(quoteFieldError('phone', phone)).not.toBeNull();
  });
  it.each(['joao+obra@example.com.br', 'ANA.SILVA@example.com', "o'connor@example.com", '  teste@example.com  ', 'user@sub.example.com', 'user@xn--exmple-cua.com'])('accepts email %s', email => {
    expect(quoteFieldError('email', email)).toBeNull();
  });
  it.each(['nome', '@example.com', 'nome@', 'nome@example', '.nome@example.com', 'nome.@example.com', 'a..b@example.com', 'a b@example.com', 'a@@example.com', 'a@-example.com', 'a@example-.com', 'a@example..com', 'a@example.123', 'a'.repeat(65)+'@example.com', 'a@example.com\nBcc:other@example.com'])('rejects email %s', email => {
    expect(quoteFieldError('email', email)).not.toBeNull();
  });
  it('normalizes spaces and Unicode without losing accents or email case', () => {
    expect(normalizeQuoteField('name', '  Jose\u0301  D’Ávila  ')).toBe('José D’Ávila');
    expect(normalizeQuoteField('email', '  Ana+obra@example.com ')).toBe('Ana+obra@example.com');
  });
  it('keeps optional company and message empty, and allows natural punctuation', () => {
    expect(quoteFieldError('company', '')).toBeNull();
    expect(quoteFieldError('budget', '')).toBeNull();
    expect(quoteFieldError('company', 'Aço & Filhos, Ltda. — Unidade #2')).toBeNull();
    expect(quoteFieldError('budget', 'Porta 90 × 210\nSão Paulo; orçamento + instalação: R$ 2.000')).toBeNull();
    expect(quoteFieldError('company', 'x'.repeat(161))).not.toBeNull();
    expect(quoteFieldError('budget', 'x'.repeat(2001))).not.toBeNull();
  });
});
