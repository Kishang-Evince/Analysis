#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';
import pLimit from 'p-limit';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function parseArgs(argv) {
  const args = {
    input: null,
    output: null,
    concurrency: 5,
    delay: 200,
    timeout: 15000,
    userAgent:
      'Mozilla/5.0 (compatible; SitemapContentExtractor/1.0; +https://example.com/bot)',
    limit: null,
    retries: 3,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    switch (a) {
      case '--input': args.input = argv[++i]; break;
      case '--output': args.output = argv[++i]; break;
      case '--concurrency': args.concurrency = parseInt(argv[++i], 10); break;
      case '--delay': args.delay = parseInt(argv[++i], 10); break;
      case '--timeout': args.timeout = parseInt(argv[++i], 10); break;
      case '--user-agent': args.userAgent = argv[++i]; break;
      case '--limit': args.limit = parseInt(argv[++i], 10); break;
      case '--retries': args.retries = parseInt(argv[++i], 10); break;
      case '--help': case '-h': printHelp(); process.exit(0);
      default:
        if (a.startsWith('--')) {
          console.error(`Unknown flag: ${a}`);
          process.exit(2);
        }
    }
  }
  if (!args.input || !args.output) {
    console.error('Error: --input and --output are required');
    printHelp();
    process.exit(2);
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node extract-content.mjs --input <sitemap.md> --output <dir> [flags]

Flags:
  --input <path>        Path to sitemap .xml (required)
  --output <dir>        Output directory (required)
  --concurrency <n>     Parallel requests (default 5)
  --delay <ms>          Per-host delay between requests (default 200)
  --timeout <ms>        Request timeout (default 15000)
  --user-agent <str>    UA header
  --limit <n>           Process only first N URLs (debug)
  --retries <n>         Retries on 429/5xx (default 3)
`);
}

function extractUrls(xml) {
  const urls = [];
  const re = /<loc>\s*(https?:\/\/[^<]+?)\s*<\/loc>/gi;
  let m;
  while ((m = re.exec(xml)) !== null) {
    const u = m[1].trim();
    if (!urls.includes(u)) urls.push(u);
  }
  return urls;
}

function urlToFilePath(url, outDir) {
  const u = new URL(url);
  let p = decodeURIComponent(u.pathname);
  if (p.endsWith('/')) p += 'index';
  let name = p.replace(/^\/+/, '').replace(/\//g, path.sep);
  if (!name) name = 'index';
  if (!name.endsWith('.md')) name += '.md';
  const hostDir = path.join(outDir, u.host.replace(/[^a-z0-9.-]/gi, '_'));
  return path.join(hostDir, name);
}

function pickMain($) {
  const selectors = ['main article', 'article', 'main', '[role="main"]', '.post-content', '.content', 'body'];
  for (const sel of selectors) {
    const el = $(sel).first();
    if (el && el.text().trim().length > 200) return el;
  }
  return $('body');
}

function getMeta($, names) {
  for (const n of names) {
    const v = $(`meta[property="${n}"]`).attr('content')
      || $(`meta[name="${n}"]`).attr('content');
    if (v) return v;
  }
  return null;
}

async function fetchWithRetry(url, { timeout, userAgent, retries }) {
  let lastErr;
  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    try {
      const res = await fetch(url, {
        redirect: 'follow',
        headers: { 'User-Agent': userAgent, 'Accept': 'text/html,application/xhtml+xml' },
        signal: controller.signal,
      });
      clearTimeout(timer);
      if (res.status === 429 || (res.status >= 500 && res.status < 600)) {
        const wait = Math.min(2000 * 2 ** attempt, 15000);
        await new Promise(r => setTimeout(r, wait));
        continue;
      }
      return res;
    } catch (e) {
      clearTimeout(timer);
      lastErr = e;
      const wait = Math.min(1000 * 2 ** attempt, 10000);
      await new Promise(r => setTimeout(r, wait));
    }
  }
  throw lastErr || new Error('fetch failed');
}

function htmlToMarkdown(html, url) {
  const $ = cheerio.load(html);
  $('script, style, noscript, nav, footer, header, aside, [role="navigation"]').remove();
  const main = pickMain($);
  const title =
    getMeta($, ['og:title', 'twitter:title']) ||
    $('h1').first().text().trim() ||
    $('title').first().text().trim() ||
    url;
  const description =
    getMeta($, ['og:description', 'twitter:description', 'description']) || '';
  const canonical = $('link[rel="canonical"]').attr('href') || url;

  const td = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced', bulletListMarker: '-' });
  td.use(gfm);
  td.addRule('removeEmptyLinks', {
    filter: node => node.tagName === 'A' && !node.textContent.trim(),
    replacement: () => '',
  });
  const body = td.turndown($.html(main)).trim();

  const fm = [
    '---',
    `url: ${url}`,
    `canonical: ${canonical}`,
    `title: ${JSON.stringify(title)}`,
    description ? `description: ${JSON.stringify(description)}` : null,
    `fetched_at: ${new Date().toISOString()}`,
    '---',
    '',
  ].filter(Boolean).join('\n');

  return `${fm}${body}\n`;
}

async function processUrl(url, { outDir, args, hostLast }) {
  const filePath = urlToFilePath(url, outDir);
  await fs.mkdir(path.dirname(filePath), { recursive: true });

  const host = new URL(url).host;
  const last = hostLast.get(host) || 0;
  const wait = args.delay - (Date.now() - last);
  if (wait > 0) await new Promise(r => setTimeout(r, wait));
  hostLast.set(host, Date.now());

  try {
    const res = await fetchWithRetry(url, args);
    if (!res.ok) {
      return { url, ok: false, status: res.status, file: filePath };
    }
    const ct = res.headers.get('content-type') || '';
    if (!ct.includes('text/html') && !ct.includes('application/xhtml')) {
      return { url, ok: false, status: res.status, reason: `non-html (${ct})`, file: filePath };
    }
    const html = await res.text();
    const md = htmlToMarkdown(html, url);
    await fs.writeFile(filePath, md, 'utf8');
    return { url, ok: true, file: filePath, bytes: md.length };
  } catch (e) {
    return { url, ok: false, error: e.message, file: filePath };
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const inputAbs = path.resolve(args.input);
  const outDir = path.resolve(args.output);
  await fs.mkdir(outDir, { recursive: true });

  const raw = await fs.readFile(inputAbs, 'utf8');
  let urls = extractUrls(raw);
  if (args.limit) urls = urls.slice(0, args.limit);
  console.log(`Found ${urls.length} URLs in ${args.input} (xml)`);

  const limit = pLimit(args.concurrency);
  const hostLast = new Map();
  const results = await Promise.all(
    urls.map(url => limit(() => processUrl(url, { outDir, args, hostLast })))
  );

  const ok = results.filter(r => r.ok);
  const fail = results.filter(r => !r.ok);
  console.log(`\nDone. Success: ${ok.length}, Failed: ${fail.length}`);
  if (fail.length) {
    console.log('\nFailures:');
    for (const f of fail) {
      console.log(`  [${f.status || f.error || 'err'}] ${f.url}`);
    }
  }
  const report = {
    input: inputAbs, output: outDir, total: urls.length,
    success: ok.length, failed: fail.length, failures: fail,
    ran_at: new Date().toISOString(),
  };
  await fs.writeFile(path.join(outDir, '_report.json'), JSON.stringify(report, null, 2));
}

main().catch(err => { console.error(err); process.exit(1); });