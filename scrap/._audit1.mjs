import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const CRAWL_DIRS = [
  path.join(ROOT, 'scrap/glean/docs.glean.com/user-guide'),
  path.join(ROOT, 'scrap/glean/docs.glean.com/administration'),
];
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

// 1. every crawled page's url + title + description
const crawled = [];
for (const dir of CRAWL_DIRS) {
  for (const f of walk(dir)) {
    const fm = frontmatter(f);
    if (fm && fm.url) crawled.push({ file: f, url: fm.url.replace(/\/$/, ''), title: fm.title || '', description: fm.description || '' });
  }
}
console.log('Total crawled pages in scope:', crawled.length);

// 2. every URL already cited anywhere in the V2 research corpus
const citedUrls = new Set();
function walkAll(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkAll(full, out);
    else if (entry.name.endsWith('.md')) out.push(full);
  }
  return out;
}
for (const f of walkAll(COMBINED_DIR)) {
  const text = fs.readFileSync(f, 'utf8');
  const urls = text.match(/https?:\/\/[^\s)"'\]]+/g) || [];
  for (let u of urls) {
    u = u.replace(/[.,;)\]]+$/, '').replace(/\/$/, '');
    citedUrls.add(u);
  }
}
console.log('Total unique URLs cited across all V2 docs:', citedUrls.size);

// 3. does a crawled URL (or a same-path variant) appear, even loosely, in the cited set?
function isCited(url) {
  if (citedUrls.has(url)) return true;
  // loose match: same path ignoring protocol/www and trailing slash differences
  const norm = url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  for (const c of citedUrls) {
    const cNorm = c.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
    if (cNorm === norm) return true;
  }
  return false;
}

const uncited = crawled.filter((c) => !isCited(c.url));
console.log('Crawled pages with NO citation anywhere in the V2 corpus:', uncited.length);

fs.writeFileSync(
  '._uncited.json',
  JSON.stringify(uncited.map(({ url, title, description }) => ({ url, title, description })), null, 2)
);
console.log('Written ._uncited.json');
