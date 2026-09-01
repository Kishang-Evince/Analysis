#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';
import pLimit from 'p-limit';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Default configuration.
 */
const DEFAULTS = {
  concurrency: 5,
  delay: 200,
  timeout: 15_000,
  retries: 3,
  userAgent:
    'Mozilla/5.0 (compatible; SitemapContentExtractor/1.0; +https://example.com/bot)',
};

/**
 * Parse CLI arguments.
 *
 * @param {string[]} argv
 * @returns {{
 *   input: string|null,
 *   output: string|null,
 *   concurrency: number,
 *   delay: number,
 *   timeout: number,
 *   userAgent: string,
 *   limit: number|null,
 *   retries: number
 * }}
 */
function parseArgs(argv) {
  const args = {
    input: null,
    output: null,
    concurrency: DEFAULTS.concurrency,
    delay: DEFAULTS.delay,
    timeout: DEFAULTS.timeout,
    userAgent: DEFAULTS.userAgent,
    limit: null,
    retries: DEFAULTS.retries,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    switch (arg) {
      case '--input':
        args.input = argv[++i];
        break;

      case '--output':
        args.output = argv[++i];
        break;

      case '--concurrency':
        args.concurrency = parsePositiveInteger(argv[++i], '--concurrency');
        break;

      case '--delay':
        args.delay = parseNonNegativeInteger(argv[++i], '--delay');
        break;

      case '--timeout':
        args.timeout = parsePositiveInteger(argv[++i], '--timeout');
        break;

      case '--user-agent':
        args.userAgent = argv[++i];

        if (!args.userAgent) {
          throw new Error('--user-agent requires a value');
        }

        break;

      case '--limit':
        args.limit = parsePositiveInteger(argv[++i], '--limit');
        break;

      case '--retries':
        args.retries = parseNonNegativeInteger(argv[++i], '--retries');
        break;

      case '--help':
      case '-h':
        printHelp();
        process.exit(0);

      default:
        if (arg.startsWith('--')) {
          throw new Error(`Unknown flag: ${arg}`);
        }

        throw new Error(`Unexpected argument: ${arg}`);
    }
  }

  if (!args.input || !args.output) {
    throw new Error('--input and --output are required');
  }

  return args;
}

function parsePositiveInteger(value, flag) {
  const parsed = Number.parseInt(value, 10);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error(`${flag} must be a positive integer`);
  }

  return parsed;
}

function parseNonNegativeInteger(value, flag) {
  const parsed = Number.parseInt(value, 10);

  if (!Number.isInteger(parsed) || parsed < 0) {
    throw new Error(`${flag} must be a non-negative integer`);
  }

  return parsed;
}

function printHelp() {
  console.log(`
Usage:
  node extract-content.mjs --input <sitemap.xml> --output <directory> [options]

Required:
  --input <path>          Path to sitemap XML file
  --output <directory>    Output directory

Options:
  --concurrency <n>       Maximum parallel requests (default: ${DEFAULTS.concurrency})
  --delay <ms>            Minimum delay between requests to the same host (default: ${DEFAULTS.delay})
  --timeout <ms>          Request timeout (default: ${DEFAULTS.timeout})
  --user-agent <string>   HTTP User-Agent
  --limit <n>             Process only the first N URLs
  --retries <n>           Retries for 429/5xx/network failures (default: ${DEFAULTS.retries})
  --help, -h              Show this help

Example:
  node extract-content.mjs \\
    --input ./sitemap.xml \\
    --output ./content \\
    --concurrency 5 \\
    --delay 200
`);
}

/**
 * Extract URLs from a sitemap XML.
 *
 * This intentionally handles basic XML entities such as:
 * &amp; -> &
 *
 * @param {string} xml
 * @returns {string[]}
 */
function extractUrls(xml) {
  const $ = cheerio.load(xml, {
    xmlMode: true,
  });

  const urls = new Set();

  $('url loc, loc').each((_, element) => {
    const value = $(element).text().trim();

    if (!value) {
      return;
    }

    try {
      const url = new URL(value);

      if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        return;
      }

      urls.add(url.toString());
    } catch {
      console.warn(`Skipping invalid URL in sitemap: ${value}`);
    }
  });

  return [...urls];
}

/**
 * Convert URL to a deterministic Markdown file path.
 *
 * Example:
 * https://example.com/docs/getting-started
 *
 * becomes:
 * output/
 *   example.com/
 *     docs/
 *       getting-started.md
 *
 * @param {string} url
 * @param {string} outputDirectory
 * @returns {string}
 */
function urlToFilePath(url, outputDirectory) {
  const parsed = new URL(url);

  const hostDirectory = sanitizePathSegment(parsed.host);

  let pathname = decodeURIComponent(parsed.pathname || '/');

  if (pathname.endsWith('/')) {
    pathname += 'index';
  }

  pathname = pathname.replace(/^\/+/, '');

  if (!pathname) {
    pathname = 'index';
  }

  const segments = pathname
    .split('/')
    .filter(Boolean)
    .map(sanitizePathSegment)
    .filter(Boolean);

  if (segments.length === 0) {
    segments.push('index');
  }

  let filename = segments.pop();

  if (!filename.toLowerCase().endsWith('.md')) {
    filename += '.md';
  }

  return path.join(
    outputDirectory,
    hostDirectory,
    ...segments,
    filename,
  );
}

/**
 * Prevent URL path components from escaping the output directory.
 *
 * @param {string} value
 * @returns {string}
 */
function sanitizePathSegment(value) {
  return value
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, '_')
    .replace(/\.\.+/g, '_')
    .trim() || '_';
}

/**
 * Select the most likely main content element.
 *
 * @param {cheerio.CheerioAPI} $
 * @returns {cheerio.Cheerio<any>}
 */
function pickMain($) {
  const selectors = [
    'main article',
    'article',
    'main',
    '[role="main"]',
    '.post-content',
    '.article-content',
    '.entry-content',
    '.content',
    '#content',
    'body',
  ];

  for (const selector of selectors) {
    const element = $(selector).first();

    if (element.length > 0 && element.text().trim().length > 200) {
      return element;
    }
  }

  return $('body').first();
}

/**
 * Read a meta tag.
 *
 * @param {cheerio.CheerioAPI} $
 * @param {string[]} names
 * @returns {string|null}
 */
function getMeta($, names) {
  for (const name of names) {
    const value =
      $(`meta[property="${name}"]`).attr('content') ||
      $(`meta[name="${name}"]`).attr('content');

    if (value?.trim()) {
      return value.trim();
    }
  }

  return null;
}

/**
 * Normalize a URL relative to the current page.
 *
 * @param {string} value
 * @param {string} baseUrl
 * @returns {string}
 */
function resolveUrl(value, baseUrl) {
  try {
    return new URL(value, baseUrl).toString();
  } catch {
    return value;
  }
}

/**
 * Convert HTML to Markdown.
 *
 * @param {string} html
 * @param {string} url
 * @returns {string}
 */
function htmlToMarkdown(html, url) {
  const $ = cheerio.load(html);

  // Remove content that generally should not be included in documentation.
  $(
    [
      'script',
      'style',
      'noscript',
      'template',
      'nav',
      'footer',
      'header',
      'aside',
      '[role="navigation"]',
      '[role="banner"]',
      '[role="contentinfo"]',
      '.cookie-banner',
      '.cookie-consent',
      '.advertisement',
      '.ads',
      '.sidebar',
      '.comments',
    ].join(', '),
  ).remove();

  const main = pickMain($);

  const title =
    getMeta($, ['og:title', 'twitter:title']) ||
    $('h1').first().text().trim() ||
    $('title').first().text().trim() ||
    url;

  const description =
    getMeta($, [
      'og:description',
      'twitter:description',
      'description',
    ]) || '';

  const canonical =
    $('link[rel="canonical"]').attr('href') || url;

  const canonicalUrl = resolveUrl(canonical, url);

  const turndown = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    emDelimiter: '*',
    strongDelimiter: '**',
    linkStyle: 'inlined',
  });

  turndown.use(gfm);

  turndown.addRule('removeEmptyLinks', {
    filter: (node) =>
      node.nodeName === 'A' &&
      !node.textContent?.trim(),

    replacement: () => '',
  });

  turndown.addRule('removeEmptyParagraphs', {
    filter: (node) =>
      node.nodeName === 'P' &&
      !node.textContent?.trim(),

    replacement: () => '',
  });

  const markdown = turndown.turndown(main.html() || '').trim();

  const frontmatter = [
    '---',
    `url: ${JSON.stringify(url)}`,
    `canonical: ${JSON.stringify(canonicalUrl)}`,
    `title: ${JSON.stringify(title)}`,
    ...(description
      ? [`description: ${JSON.stringify(description)}`]
      : []),
    `fetched_at: ${JSON.stringify(new Date().toISOString())}`,
    '---',
    '',
  ].join('\n');

  return `${frontmatter}${markdown}\n`;
}

/**
 * Sleep helper.
 *
 * @param {number} ms
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch a URL with retry handling.
 *
 * Retries:
 * - 429
 * - 500–599
 * - Network failures
 * - Timeout / AbortError
 *
 * @param {string} url
 * @param {{
 *   timeout: number,
 *   userAgent: string,
 *   retries: number
 * }} options
 * @returns {Promise<import('node-fetch').Response>}
 */
async function fetchWithRetry(
  url,
  {
    timeout,
    userAgent,
    retries,
  },
) {
  let lastError = null;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const controller = new AbortController();

    const timer = setTimeout(() => {
      controller.abort();
    }, timeout);

    try {
      const response = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        headers: {
          'User-Agent': userAgent,
          Accept: 'text/html,application/xhtml+xml',
        },
        signal: controller.signal,
      });

      clearTimeout(timer);

      const shouldRetry =
        response.status === 429 ||
        (response.status >= 500 && response.status <= 599);

      if (!shouldRetry || attempt >= retries) {
        return response;
      }

      const retryAfter = getRetryAfterMs(response);

      const exponentialBackoff = Math.min(
        1_000 * 2 ** attempt,
        15_000,
      );

      const wait = retryAfter ?? exponentialBackoff;

      console.warn(
        `[retry ${attempt + 1}/${retries}] ${response.status} ${url} - waiting ${wait}ms`,
      );

      await sleep(wait);
    } catch (error) {
      clearTimeout(timer);

      lastError = error;

      if (attempt >= retries) {
        break;
      }

      const wait = Math.min(
        1_000 * 2 ** attempt,
        10_000,
      );

      console.warn(
        `[retry ${attempt + 1}/${retries}] ${error.message} ${url} - waiting ${wait}ms`,
      );

      await sleep(wait);
    }
  }

  throw lastError || new Error('Request failed');
}

/**
 * Parse Retry-After.
 *
 * Supports:
 * - Retry-After: 5
 * - Retry-After: Wed, 21 Oct 2015 07:28:00 GMT
 *
 * @param {import('node-fetch').Response} response
 * @returns {number|null}
 */
function getRetryAfterMs(response) {
  const value = response.headers.get('retry-after');

  if (!value) {
    return null;
  }

  const seconds = Number(value);

  if (Number.isFinite(seconds)) {
    return Math.max(0, seconds * 1_000);
  }

  const timestamp = Date.parse(value);

  if (!Number.isNaN(timestamp)) {
    return Math.max(0, timestamp - Date.now());
  }

  return null;
}

/**
 * Process a single URL.
 *
 * @param {string} url
 * @param {{
 *   outDir: string,
 *   args: object,
 *   hostLastRequest: Map<string, number>
 * }} options
 */
async function processUrl(
  url,
  {
    outDir,
    args,
    hostLastRequest,
  },
) {
  const filePath = urlToFilePath(url, outDir);
  const host = new URL(url).host;

  await fs.mkdir(path.dirname(filePath), {
    recursive: true,
  });

  // Per-host throttling.
  const lastRequest = hostLastRequest.get(host) || 0;
  const elapsed = Date.now() - lastRequest;
  const remainingDelay = Math.max(0, args.delay - elapsed);

  if (remainingDelay > 0) {
    await sleep(remainingDelay);
  }

  hostLastRequest.set(host, Date.now());

  try {
    const response = await fetchWithRetry(url, args);

    if (!response.ok) {
      return {
        url,
        ok: false,
        status: response.status,
        reason: response.statusText || 'HTTP error',
        file: filePath,
      };
    }

    const contentType =
      response.headers.get('content-type') || '';

    const isHtml =
      contentType.includes('text/html') ||
      contentType.includes('application/xhtml+xml');

    if (!isHtml) {
      return {
        url,
        ok: false,
        status: response.status,
        reason: `non-html (${contentType || 'unknown content type'})`,
        file: filePath,
      };
    }

    const html = await response.text();

    if (!html.trim()) {
      return {
        url,
        ok: false,
        status: response.status,
        reason: 'empty response body',
        file: filePath,
      };
    }

    const markdown = htmlToMarkdown(html, url);

    await fs.writeFile(
      filePath,
      markdown,
      'utf8',
    );

    return {
      url,
      ok: true,
      status: response.status,
      file: filePath,
      bytes: Buffer.byteLength(markdown, 'utf8'),
    };
  } catch (error) {
    return {
      url,
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : String(error),
      file: filePath,
    };
  }
}

/**
 * Write extraction report.
 *
 * @param {string} outputDirectory
 * @param {object} report
 */
async function writeReport(outputDirectory, report) {
  const reportPath = path.join(
    outputDirectory,
    '_report.json',
  );

  await fs.writeFile(
    reportPath,
    JSON.stringify(report, null, 2),
    'utf8',
  );

  return reportPath;
}

/**
 * Main application.
 */
async function main() {
  const args = parseArgs(process.argv.slice(2));

  const inputPath = path.resolve(args.input);
  const outputDirectory = path.resolve(args.output);

  await fs.mkdir(outputDirectory, {
    recursive: true,
  });

  const xml = await fs.readFile(
    inputPath,
    'utf8',
  );

  let urls = extractUrls(xml);

  if (args.limit !== null) {
    urls = urls.slice(0, args.limit);
  }

  console.log(
    `Found ${urls.length} URL(s) in ${args.input}`,
  );

  if (urls.length === 0) {
    console.warn('No valid HTTP/HTTPS URLs found.');
  }

  const limiter = pLimit(args.concurrency);
  const hostLastRequest = new Map();

  let completed = 0;

  const results = await Promise.all(
    urls.map((url) =>
      limiter(async () => {
        const result = await processUrl(url, {
          outDir: outputDirectory,
          args,
          hostLastRequest,
        });

        completed += 1;

        const status = result.ok
          ? 'OK'
          : 'FAILED';

        console.log(
          `[${completed}/${urls.length}] ${status} ${url}`,
        );

        return result;
      }),
    ),
  );

  const successful = results.filter(
    (result) => result.ok,
  );

  const failed = results.filter(
    (result) => !result.ok,
  );

  const report = {
    input: inputPath,
    output: outputDirectory,
    total: urls.length,
    success: successful.length,
    failed: failed.length,
    failures: failed,
    ran_at: new Date().toISOString(),
  };

  const reportPath = await writeReport(
    outputDirectory,
    report,
  );

  console.log('');
  console.log('Extraction complete.');
  console.log(`Success: ${successful.length}`);
  console.log(`Failed:  ${failed.length}`);
  console.log(`Report:  ${reportPath}`);

  if (failed.length > 0) {
    console.log('');
    console.log('Failures:');

    for (const failure of failed) {
      const reason =
        failure.status ||
        failure.error ||
        failure.reason ||
        'unknown error';

      console.log(`  [${reason}] ${failure.url}`);
    }
  }

  // Non-zero exit code makes this suitable for CI.
  if (failed.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(
    'Fatal error:',
    error instanceof Error
      ? error.message
      : error,
  );

  process.exitCode = 1;
});

