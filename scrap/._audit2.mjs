import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const CRAWL_ROOT = path.join(ROOT, 'scrap/glean');
const COMBINED_DIR = path.join(ROOT, 'Glean', 'Combined');

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith('.md')) out.push(full);
  }
  return out;
}
function frontmatter(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return null;
  const fm = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*"?(.*?)"?$/);
    if (kv) fm[kv[1]] = kv[2];
  }
  return fm;
}

const crawled = [];
for (const f of walk(CRAWL_ROOT)) {
  const fm = frontmatter(f);
  if (fm && fm.url) crawled.push({ file: f, url: fm.url.replace(/\/$/, ''), title: fm.title || '', description: fm.description || '' });
}

const citedUrls = new Set();
for (const f of walk(COMBINED_DIR)) {
  const text = fs.readFileSync(f, 'utf8');
  const urls = text.match(/https?:\/\/[^\s)"'\]]+/g) || [];
  for (let u of urls) {
    u = u.replace(/[.,;)\]]+$/, '').replace(/\/$/, '');
    citedUrls.add(u);
  }
}
function isCited(url) {
  const norm = url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  for (const c of citedUrls) {
    if (c.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') === norm) return true;
  }
  return false;
}
function domainOf(url) {
  const m = url.match(/^https?:\/\/([^/]+)/);
  return m ? m[1] : 'unknown';
}

const uncited = crawled.filter((c) => !isCited(c.url));
const byDomain = {};
for (const c of crawled) { const d = domainOf(c.url); byDomain[d] = byDomain[d] || {total:0, uncited:0}; byDomain[d].total++; }
for (const c of uncited) { const d = domainOf(c.url); byDomain[d].uncited++; }

console.log('Total crawled (entire scrap/glean):', crawled.length);
console.log('Total cited URLs in V2 corpus:', citedUrls.size);
console.log('Total uncited:', uncited.length);
console.log('\nBy domain (total / uncited):');
for (const [d, s] of Object.entries(byDomain)) console.log(' ', d, s.total, '/', s.uncited);

fs.writeFileSync('._uncited_all.json', JSON.stringify(uncited.map(({url,title,description})=>({url,title,description})), null, 2));
console.log('\nWritten ._uncited_all.json');
