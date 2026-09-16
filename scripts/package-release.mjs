import { readFile, writeFile, readdir, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import JSZip from 'jszip';

const preview = process.argv.includes('--preview') || process.argv.includes('-Preview');
const root = path.resolve('dist/mega-brasil-web/browser');
const html = await readFile(path.join(root, 'index.html'), 'utf8');
if (!preview && (/content="noindex, nofollow"/.test(html) || !html.includes('rel="canonical"'))) {
  throw new Error('Build de revisão. Configure SITE_URL e gere o build novamente, ou use --preview.');
}
const required = ['index.html', 'robots.txt', '404.html', 'images/mega-brasil-social.jpg', 'documents/memorial-descritivo-p90.pdf', 'documents/memorial-descritivo-p120.pdf'];
if (!preview) required.push('sitemap.xml');
for (const name of required) await access(path.join(root, name));
const zip = new JSZip();
const files = [];
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
async function addDirectory(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) await addDirectory(absolute);
    else if (entry.isFile()) {
      const name = path.relative(root, absolute).replaceAll('\\', '/');
      const bytes = await readFile(absolute);
      zip.file(name, bytes);
      files.push({ path: name, sha256: hash(bytes) });
    }
  }
}
await addDirectory(root);
const bytes = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE', compressionOptions: { level: 9 } });
const verified = await JSZip.loadAsync(bytes, { checkCRC32: true });
for (const file of files) {
  const entry = verified.file(file.path);
  if (!entry || hash(await entry.async('nodebuffer')) !== file.sha256) throw new Error(`ZIP divergente: ${file.path}`);
}
const packageName = preview ? 'mega-brasil-preview' : 'mega-brasil-site';
const manifest = {
  package: `${packageName}.zip`, generatedAt: new Date().toISOString(),
  baseCommit: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(),
  uncommittedChanges: Boolean(execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' }).trim()),
  preview, sha256: hash(bytes), files,
};
await writeFile(`dist/${packageName}.zip`, bytes);
await writeFile(`dist/${packageName}.manifest.json`, JSON.stringify(manifest, null, 2) + '\n');
console.log(`Pacote verificado: dist/${packageName}.zip (${bytes.length} bytes, ${files.length} arquivos)\nSHA256: ${manifest.sha256}`);
