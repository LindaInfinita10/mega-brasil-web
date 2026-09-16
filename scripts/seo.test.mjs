import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateSeo, siteOrigin } from './seo.mjs';

const html = '<html><head><meta name="robots" content="noindex, nofollow"></head><body>Conteúdo</body></html>';
test('unconfigured builds stay noindex without a fabricated canonical or sitemap', () => {
  const result = generateSeo(html, '');
  assert.match(result.html, /noindex, nofollow/);
  assert.doesNotMatch(result.html, /canonical|application\/ld\+json/);
  assert.equal(result.sitemap, null);
});
test('production SEO uses one consistent origin and retains content', () => {
  const result = generateSeo(html, 'https://example.com/');
  assert.match(result.html, /index, follow, max-image-preview:large/);
  assert.match(result.html, /rel="canonical" href="https:\/\/example.com\/"/);
  assert.match(result.sitemap, /<loc>https:\/\/example.com\/<\/loc>/);
  assert.match(result.robots, /Sitemap: https:\/\/example.com\/sitemap.xml/);
  const graph = JSON.parse(result.html.match(/application\/ld\+json">(.*?)<\/script>/s)[1]);
  assert.equal(graph['@graph'][0].url, 'https://example.com/');
  assert.match(result.html, /<body>Conteúdo<\/body>/);
  assert.equal(generateSeo(result.html, 'https://example.com').html, result.html);
});
test('rejects insecure, local, credentialed and subdirectory origins', () => {
  for (const origin of ['http://example.com', 'https://localhost', 'https://127.0.0.1', 'https://example.com/site', 'https://user:password@example.com', 'https://example.com?x=1', 'https://example.com#x', 'https://example.com:8080']) {
    assert.throws(() => siteOrigin(origin), undefined, origin);
  }
});
