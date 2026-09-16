import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

const output = path.resolve('dist/mega-brasil-web/browser');
const html = await readFile(path.join(output, 'index.html'), 'utf8');
const dom = new JSDOM(html);
const doc = dom.window.document;
assert.equal(doc.documentElement.lang, 'pt-BR');
assert.equal(doc.querySelectorAll('h1').length, 1, 'A homepage precisa de um título principal.');
for (const content of ['MegaShield P90', 'MegaShield P120', 'comercial@megabrasilindustria.net', 'Política de Privacidade']) {
  assert.ok(doc.body.textContent.includes(content), `Conteúdo ausente no HTML estático: ${content}`);
}
assert.ok(doc.querySelector('meta[name="description"]')?.content);
const localPaths = new Set();
for (const element of doc.querySelectorAll('[src], [href]')) {
  const url = element.getAttribute('src') || element.getAttribute('href');
  if (!url || /^(https?:|mailto:|tel:|data:|\/\/)/.test(url)) continue;
  if (url.startsWith('#')) {
    if (!element.hasAttribute('hidden')) assert.ok(doc.getElementById(url.slice(1)), `Âncora inexistente: ${url}`);
    continue;
  }
  if (url === '/') continue;
  localPaths.add(url.replace(/^\//, '').split('?')[0]);
}
for (const file of localPaths) await access(path.join(output, file));
const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href');
const robots = doc.querySelector('meta[name="robots"]')?.content;
if (canonical) {
  assert.equal(doc.querySelectorAll('link[rel="canonical"]').length, 1);
  assert.ok(!robots.includes('noindex'));
  const sitemap = await readFile(path.join(output, 'sitemap.xml'), 'utf8');
  assert.ok(sitemap.includes(`<loc>${canonical}</loc>`));
  const graph = JSON.parse(doc.querySelector('script[type="application/ld+json"]').textContent);
  assert.equal(graph['@graph'][0].url, canonical);
} else {
  assert.ok(robots.includes('noindex'), 'Sem domínio, o build deve permanecer em revisão.');
}
for (const pdf of ['p90', 'p120']) {
  const bytes = await readFile(path.join(output, `documents/memorial-descritivo-${pdf}.pdf`));
  assert.equal(bytes.subarray(0, 5).toString(), '%PDF-');
}
console.log(`HTML estático, idioma, títulos, âncoras, ${localPaths.size} recursos, PDFs e SEO verificados (${canonical ? 'produção' : 'revisão'}).`);
dom.window.close();
