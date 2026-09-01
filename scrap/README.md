# Sitemap Content Extractor

Fetches every URL listed in a sitemap `.xml` (e.g. `Glean/glean-sitemap.xml`) and writes
per-URL Markdown files with YAML front matter.

## Setup

```bash
cd scrap
npm install
```

## Usage

```bash
node extract-content.mjs \
  --input "../Glean/developer-sitemap.xml" \
  --output "../Glean/developer" \
  --concurrency 5 \
  --delay 250
```

### Flags

| Flag | Default | Description |
|---|---|---|
| `--input <path>` | required | Sitemap `.xml` file (parses `<loc>` URLs) |
| `--output <dir>` | required | Output directory |
| `--concurrency <n>` | 5 | Parallel requests |
| `--delay <ms>` | 200 | Per-host delay between requests |
| `--timeout <ms>` | 15000 | Request timeout |
| `--user-agent <str>` | polite UA | UA header |
| `--limit <n>` | - | Process only first N URLs (debug) |
| `--retries <n>` | 3 | Retries on 429/5xx |

## Output layout

```
<output>/
  www.glean.com/
    about.md
    platform/
      api.md
  _report.json
```

Each `.md` has:

```yaml
---
url: https://www.glean.com/platform/api
canonical: ...
title: "..."
description: "..."
fetched_at: 2026-09-01T...
---
<markdown body extracted from <main>/<article>>
```

## Notes

- Selector priority: `main article` → `article` → `main` → `[role=main]` → `.post-content` → `.content` → `body`.
- Strips `script, style, noscript, nav, footer, header, aside`.
- HTML → Markdown via Turndown + GFM plugin.
- Backoff retries on 429/5xx.
- A summary JSON report is written to `<output>/_report.json`.

```bash
node extract-content.mjs --input ../Glean/docs-sitemap.xml --output ./glean
```