import { readFile, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export function siteOrigin(value) {
  if (!value?.trim()) return null;
  const url = new URL(value.trim());
  if (url.protocol !== 'https:' || url.username || url.password || url.port ||
      url.pathname !== '/' || url.search || url.hash || !url.hostname.includes('.') ||
      /(^|\.)(localhost|local|test|invalid)$/.test(url.hostname) || /^[\d.]+$/.test(url.hostname)) {
    throw new Error('SITE_URL deve ser a origem HTTPS do domínio definitivo, sem caminho, porta ou parâmetros.');
  }
  return url.origin;
}

export function generateSeo(html, value) {
  const origin = siteOrigin(value);
  html = html.replace(/\s*<!-- generated-seo:start -->[\s\S]*?<!-- generated-seo:end -->\n?/g, '');
  html = html.replace(/<meta name="robots" content="[^"]*"\s*\/?>/, `<meta name="robots" content="${origin ? 'index, follow, max-image-preview:large' : 'noindex, nofollow'}">`);
  if (!origin) return { html, robots: 'User-agent: *\nAllow: /\n', sitemap: null, origin: null };

  const canonical = `${origin}/`;
  const image = `${origin}/images/mega-brasil-social.jpg`;
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization', '@id': `${canonical}#organization`, name: 'Mega Brasil Indústria',
        url: canonical, logo: `${origin}/assets/images/hero/hero.transp.webp`,
        description: 'Fabricação, comercialização e instalação de portas corta-fogo e soluções para proteção contra incêndio.',
        email: 'comercial@megabrasilindustria.net', telephone: '+55-21-3514-2414',
        address: { '@type': 'PostalAddress', streetAddress: 'Rua Teixeira de Souza, 116 — Vila Maria Helena', addressLocality: 'Duque de Caxias', addressRegion: 'RJ', addressCountry: 'BR' },
        contactPoint: { '@type': 'ContactPoint', telephone: '+55-21-97871-5555', contactType: 'sales', availableLanguage: 'pt-BR', areaServed: 'BR' },
        sameAs: ['https://www.instagram.com/megabrasil_industria', 'https://www.linkedin.com/company/grupo-mega-brasil/', 'https://www.facebook.com/share/18PdYGjxpk/'],
      },
      { '@type': 'WebSite', '@id': `${canonical}#website`, url: canonical, name: 'Mega Brasil Indústria', inLanguage: 'pt-BR', publisher: { '@id': `${canonical}#organization` } },
      { '@type': 'WebPage', '@id': `${canonical}#webpage`, url: canonical, name: 'Mega Brasil Indústria | Portas corta-fogo MegaShield', description: 'Conheça as portas corta-fogo MegaShield P90 e P120, consulte os memoriais técnicos e solicite um orçamento.', inLanguage: 'pt-BR', isPartOf: { '@id': `${canonical}#website` }, about: { '@id': `${canonical}#organization` }, primaryImageOfPage: { '@type': 'ImageObject', url: image, width: 1200, height: 630 } },
    ],
  };
  const tags = `\n<!-- generated-seo:start -->
  <link rel="canonical" href="${canonical}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${image}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Mega Brasil Indústria — Portas corta-fogo MegaShield P90 e P120">
  <meta name="twitter:image" content="${image}">
  <meta name="twitter:image:alt" content="Portas corta-fogo MegaShield da Mega Brasil Indústria">
  <script type="application/ld+json">${JSON.stringify(graph).replaceAll('<', '\\u003c')}</script>
  <!-- generated-seo:end -->\n`;
  return {
    html: html.replace('</head>', `${tags}</head>`), origin,
    robots: `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`,
    sitemap: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${canonical}</loc></url></urlset>\n`,
  };
}

async function main() {
  const output = path.resolve('dist/mega-brasil-web/browser');
  const htmlPath = path.join(output, 'index.html');
  const result = generateSeo(await readFile(htmlPath, 'utf8'), process.env.SITE_URL);
  if (!result.html.includes('Onde o fogo') || !result.html.includes('Classificação pretendida P120')) {
    throw new Error('O HTML de produção não contém o conteúdo pré-renderizado esperado.');
  }
  await writeFile(htmlPath, result.html);
  await writeFile(path.join(output, 'robots.txt'), result.robots);
  if (result.sitemap) await writeFile(path.join(output, 'sitemap.xml'), result.sitemap);
  else await rm(path.join(output, 'sitemap.xml'), { force: true });
  console.log(result.origin ? `SEO de produção configurado para ${result.origin}` : 'Build de revisão: noindex. Defina SITE_URL com o domínio aprovado para gerar canonical, sitemap e dados estruturados.');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
