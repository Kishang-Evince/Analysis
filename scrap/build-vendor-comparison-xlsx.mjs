#!/usr/bin/env node
/**
 * Build the Tier 3 Vendor Comparison workbook for one tool from this
 * project's V2 research corpus.
 *
 * Reads:
 *   Glean/Combined/<section>/V2/<field>.md          research doc (Sr No | <label> | Source | Detail)
 *   test/Glean/<section>/V2/<field>.md              paired test guide (has a "Notes" column somewhere)
 *   Glean/Combined/<section>/Overview.md            field order per section (may be stale — see below)
 *
 * Writes:
 *   Glean/Combined/_Comparison Sheets/<Tool>.xlsx
 *
 * Layout mirrors Tier3_Vendor_Comparison_FORMAT_V3.xlsx (colors/fonts copied
 * from that file's styles.xml) minus the "Tool" column — this workbook is
 * single-tool, so the tool name lives in the filename instead of a column.
 *
 * Per field table columns (renamed 2026-09-14 for client clarity, each header also carries an
 * Excel cell-comment description on hover — see HEADER_NOTES below):
 *   Sr No | <label> | Source | Confirmation Detail | Confirmation Notes | Check Required
 *   - <label> is whatever that field's own doc calls column 2 (Claim/Feature/Finding/etc.) — read
 *     dynamically per file, not assumed.
 *   - Confirmation Detail = the old "Detail" column: exact evidence backing the claim.
 *   - Confirmation Notes = the old "Test Guide Notes" column (renamed - "Test Guide" read as
 *     internal jargon): the "Notes" cell from the SAME Sr No row in the paired test guide, if that
 *     guide's table shape has a Notes column at all (some don't — left blank there, not fabricated).
 *   - Check Required (renamed from "Physical Test Required") = "Yes" by default for every claim,
 *     even Doc-Verified ones — see needsPhysicalTest() below for the full rule and why Doc-Verified
 *     alone no longer implies "No" (revised 2026-09-14: a doc saying a feature works doesn't prove
 *     it works in this tenant).
 *
 * Field order: this section's Overview.md's own "Field N: <name>" list, for whichever of those names
 * still exist as a V2 file — then any V2 files NOT mentioned in Overview.md are appended afterward
 * (alphabetically). This makes stale Overview.md files (4.9.1 currently lists 3 of its 8 real V2 fields)
 * safe by construction: nothing gets silently dropped, the listed ones just keep priority ordering.
 *
 * Usage:
 *   cd scrap && node build-vendor-comparison-xlsx.mjs
 *   node build-vendor-comparison-xlsx.mjs --verbose     # print per-field row counts while building
 */

import ExcelJS from 'exceljs';
import fs from 'node:fs';
import path from 'node:path';

const VERBOSE = process.argv.includes('--verbose');
const log = (...a) => VERBOSE && console.log(...a);

const ROOT = path.resolve(import.meta.dirname, '..');
const COMBINED_DIR = path.join(ROOT, 'Glean', 'Combined');
const TESTGUIDE_DIR = path.join(ROOT, 'test', 'Glean');
const OUT_DIR = path.join(COMBINED_DIR, '_Comparison Sheets');
const OUT_FILE = path.join(OUT_DIR, 'Glean.xlsx');

const SECTIONS = [
  '4.9.1 Functional Capabilities',
  '4.9.2 Agent & Workflow Builder',
  '4.9.3 AI Architecture & Models',
  '4.9.4 Integration & Technical',
  '4.9.5 Compliance & Regulatory',
  '4.9.6 Adoption & Readiness',
  '4.9.7 Pricing & TCO',
  '4.9.8 Partner & Channel Program',
  '4.9.9 Competitive Positioning',
  '4.9.10 Use Case Library',
  '4.9.11 Client-Facing Explainability',
  '4.9.12 Vendor Maturity & Trajectory',
];

/**
 * Which claims need a real physical/tenant test, vs. which are genuinely
 * settled by the doc alone with nothing to go run in app.glean for.
 *
 * Rule (revised 2026-09-14 per client-facing feedback): "Doc-Verified" on its
 * own is NOT enough to skip physical test. A doc saying a feature works
 * doesn't prove it works in Perimeter's own tenant - e.g. an agent-automation
 * claim needs an actual portal run before confidence is real, even though the
 * underlying research is Doc-Verified. So the default is now YES (physical
 * test required), for every tier.
 *
 * "No" is reserved for two narrow cases where there is nothing to physically
 * test in app.glean:
 *   1. Tier is hands-on "Tested" already - the physical test already happened.
 *   2. Tier is "Doc-Verified" AND the claim itself is a static, non-behavioral
 *      fact with no in-tenant action to run: a published certification/badge
 *      (SOC 2, ISO, HIPAA, GDPR, TX-RAMP, VPAT/ACR), a published pricing/cost
 *      figure, a partner/legal registration-status fact, a third-party/
 *      non-Glean market-context note, or a claim explicitly flagged in this
 *      project's own research as an unverified vendor marketing statement
 *      (nothing to run in a tenant to confirm someone else's benchmark).
 *
 * Everything else - every functional/behavioral claim, no matter how solid
 * the doc sourcing is - defaults to YES, because building real client
 * confidence on this phase means watching it happen in the tenant.
 */
const STATIC_FACT_PATTERN =
  /\bSOC\s*2\b|\bISO\s*27001\b|\bISO\s*42001\b|\bTX-RAMP\b|\bVPAT\b|Accessibility Conformance Report|\bACR\b|HIPAA.*badge|GDPR.*badge|badge shown on public security page|\$[\d,]+\s*(per|\/)|pricing page|list price|cost per\s*1M|Partner Agreement|Registration Status|non-Glean source|Third-party.*(competitor|market analysis)|unverified.*vendor marketing|flagged.*unverified|methodology-undisclosed|self-reported benchmark/i;

function needsPhysicalTest(tier, rawClaim, rawSource, rawDetail) {
  const t = (tier || '').toLowerCase();
  if (t.includes('tested')) return false; // already physically done
  if (t.includes('doc-verified')) {
    const combined = `${rawClaim} ${rawSource} ${rawDetail}`;
    if (STATIC_FACT_PATTERN.test(combined)) return false; // static fact, nothing to run in-tenant
  }
  return true; // default: yes, needs a real portal run to build confidence
}

// --- markdown table parsing --------------------------------------------------

function splitRow(line) {
  let l = line.trim();
  if (l.startsWith('|')) l = l.slice(1);
  if (l.endsWith('|')) l = l.slice(0, -1);
  return l.split('|').map((c) => c.trim());
}

/** Every markdown table in `text` whose header's first cell is "Sr No" (case-insensitive). */
function findSrNoTables(text) {
  const lines = text.split('\n');
  const tables = [];
  for (let i = 0; i < lines.length; i++) {
    if (!lines[i].trim().startsWith('|')) continue;
    const header = splitRow(lines[i]);
    if (!header.length || !/^sr\s*no$/i.test(header[0])) continue;
    const sepLine = lines[i + 1];
    if (!sepLine || !/^\s*\|?\s*-+/.test(sepLine)) continue;

    const rows = [];
    let j = i + 2;
    while (j < lines.length && lines[j].trim().startsWith('|')) {
      rows.push(splitRow(lines[j]));
      j++;
    }
    tables.push({ header, rows });
    i = j - 1;
  }
  return tables;
}

function findColumn(header, pattern) {
  return header.findIndex((h) => pattern.test(h));
}

/** Text of the first "## <heading>" section matching `headingRe`, up to the next "##" or "---". */
function extractSection(text, headingRe) {
  const lines = text.split('\n');
  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    if (headingRe.test(lines[i])) {
      start = i + 1;
      break;
    }
  }
  if (start < 0) return '';
  let end = lines.length;
  for (let i = start; i < lines.length; i++) {
    if (/^##\s/.test(lines[i]) || /^---/.test(lines[i])) {
      end = i;
      break;
    }
  }
  return lines.slice(start, end).join('\n');
}

/**
 * Parses a research doc's "## Confidence" prose into a per-Sr-No tier map.
 * Handles the two shapes seen across this corpus:
 *   "**Doc-Verified** for claims 1 (blog), 2, 3, 4 (partners page)..." -> per-claim breakdown
 *   "**Doc-Verified**, 2 independent first-party sources..."           -> one tier, applies to every claim
 * @returns {{ perClaim: Map<number,string>, fallbackTier: string|null }}
 */
function parseConfidenceTiers(text) {
  const section = extractSection(text, /^##\s*Confidence\b/);
  const perClaim = new Map();
  let fallbackTier = null;
  let sawAnyForClaim = false;

  const tierRe = /\*\*([^*]+)\*\*([^*]*)/g;
  let m;
  while ((m = tierRe.exec(section))) {
    const tier = m[1].trim();
    if (fallbackTier === null) fallbackTier = tier; // first bold phrase, used if nothing is per-claim
    const seg = m[2];
    const forIdx = seg.search(/for\s+claims?\b/i);
    if (forIdx < 0) continue;

    sawAnyForClaim = true;
    const rest = seg.slice(forIdx).replace(/\([^)]*\)/g, ''); // drop parentheticals before hunting numbers
    const tokens = rest.match(/\d+(?:-\d+)?/g) || [];
    for (const tok of tokens) {
      if (tok.includes('-')) {
        const [a, b] = tok.split('-').map(Number);
        for (let n = a; n <= b; n++) perClaim.set(n, tier);
      } else {
        perClaim.set(Number(tok), tier);
      }
    }
  }
  return { perClaim, fallbackTier: sawAnyForClaim ? null : fallbackTier };
}

/**
 * Converts this corpus's markdown into either a plain string (no emphasis found)
 * or an ExcelJS rich-text value ({ richText: [...] }) with **bold** and *italic*
 * spans rendered as actual bold runs — never left as literal asterisk characters
 * in the cell, which is what a plain mdToRichText()-style pass used to do.
 */
function mdToRichText(s) {
  if (!s) return '';
  const flattened = s
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '$1 ($2)') // [text](url) -> text (url)
    .replace(/`([^`]+)`/g, '$1') // `code`
    .replace(/^>\s?/, '') // leading blockquote marker
    .trim();

  const emphasisRe = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  const runs = [];
  let last = 0;
  let m;
  while ((m = emphasisRe.exec(flattened))) {
    if (m.index > last) runs.push({ text: flattened.slice(last, m.index), bold: false });
    runs.push({ text: m[1] !== undefined ? m[1] : m[2], bold: true });
    last = emphasisRe.lastIndex;
  }
  if (last < flattened.length) runs.push({ text: flattened.slice(last), bold: false });

  if (runs.length === 0) return '';
  if (runs.length === 1 && !runs[0].bold) return runs[0].text; // no emphasis at all — plain string is fine

  return {
    richText: runs
      .filter((r) => r.text.length > 0)
      .map((r) => ({ text: r.text, font: { size: 9, bold: r.bold } })),
  };
}

/**
 * Same cleanup as mdToRichText, but when the source text contains a real
 * markdown link ([text](https://...)) the cell becomes an actual clickable
 * ExcelJS hyperlink instead of "text (url)" as inert display text. xlsx only
 * supports one hyperlink target per cell, so if a cell cites multiple links,
 * the first is the clickable target and every link's text+url still appears
 * in the visible cell text (nothing is hidden, only the first is clickable).
 * Bold emphasis is not preserved on a hyperlink cell (ExcelJS hyperlink
 * values can't carry rich-text runs) - link cells are rare enough alongside
 * bold emphasis that this tradeoff is acceptable.
 */
function mdToHyperlinkCell(s) {
  if (!s) return '';
  const linkRe = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  const links = [...s.matchAll(linkRe)];
  if (links.length === 0) return mdToRichText(s);

  const displayText = s
    .replace(linkRe, '$1 ($2)')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/^>\s?/, '')
    .trim();

  return { text: displayText, hyperlink: links[0][2] };
}

/**
 * @returns {{ label: string, rows: Array<{srNo:number, claim, source, detail, tier:string|null, physicalTestRequired:boolean}> }}
 */
function parseResearchDoc(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const tables = findSrNoTables(text);
  const { perClaim, fallbackTier } = parseConfidenceTiers(text);
  let label = 'Claim';
  const rows = [];

  for (const { header, rows: tRows } of tables) {
    if (header[1]) label = header[1]; // column 2 is always the "what is this row" label
    const sourceIdx = findColumn(header, /source/i);
    const detailIdx = findColumn(header, /detail/i);

    for (const cells of tRows) {
      const srNo = parseInt(cells[0], 10);
      if (!Number.isFinite(srNo)) continue; // separator/malformed row, skip
      const tier = perClaim.get(srNo) ?? fallbackTier ?? null;
      const rawClaim = cells[1] ?? '';
      const rawSource = sourceIdx >= 0 ? cells[sourceIdx] ?? '' : '';
      const rawDetail = detailIdx >= 0 ? cells[detailIdx] ?? '' : '';
      rows.push({
        srNo,
        claim: mdToHyperlinkCell(rawClaim),
        source: mdToHyperlinkCell(rawSource),
        detail: mdToHyperlinkCell(rawDetail),
        tier,
        physicalTestRequired: needsPhysicalTest(tier, rawClaim, rawSource, rawDetail),
      });
    }
  }
  rows.sort((a, b) => a.srNo - b.srNo);
  return { label, rows };
}

/** @returns {Map<number,string>} Sr No -> that row's "Notes" cell text, wherever a Notes column exists. */
function parseTestGuideNotes(filePath) {
  const notes = new Map();
  if (!fs.existsSync(filePath)) return notes;

  const text = fs.readFileSync(filePath, 'utf8');
  const tables = findSrNoTables(text);

  for (const { header, rows } of tables) {
    const notesIdx = findColumn(header, /^notes$/i);
    if (notesIdx < 0) continue; // this table's shape has no Notes column — leave those Sr Nos blank
    for (const cells of rows) {
      const srNo = parseInt(cells[0], 10);
      if (!Number.isFinite(srNo)) continue;
      const val = mdToHyperlinkCell(cells[notesIdx] ?? '');
      if (val) notes.set(srNo, val);
    }
  }
  return notes;
}

// --- field discovery / ordering ----------------------------------------------

function listV2Fields(sectionName) {
  const v2Dir = path.join(COMBINED_DIR, sectionName, 'V2');
  return fs
    .readdirSync(v2Dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.slice(0, -3));
}

/** Overview.md's own "- [Field N: Name](Name.md)" list, name normalized for loose matching. */
function overviewFieldOrder(sectionName) {
  const overviewPath = path.join(COMBINED_DIR, sectionName, 'Overview.md');
  if (!fs.existsSync(overviewPath)) return [];
  const text = fs.readFileSync(overviewPath, 'utf8');
  const names = [];
  const re = /^-\s*\[Field\s+\d+:\s*([^\]]+?)\]\(/gm;
  let m;
  while ((m = re.exec(text))) names.push(m[1].trim());
  return names;
}

const normalize = (s) =>
  s
    .replace(/\s*\([^)]*\)\s*$/, '') // drop a trailing "(...)" suffix
    .replace(/[\/-]/g, ' ') // treat "/" and "-" as the same separator (Overview.md vs V2 filenames disagree on this)
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

/**
 * Ordered list of V2 field basenames for a section: Overview.md's order first
 * (matched loosely so a stale parenthetical suffix doesn't break the match),
 * then any remaining V2 files not mentioned there, appended alphabetically.
 */
function fieldOrder(sectionName) {
  const v2Fields = listV2Fields(sectionName);
  const overviewNames = overviewFieldOrder(sectionName);

  const used = new Set();
  const ordered = [];

  for (const oName of overviewNames) {
    const match = v2Fields.find((f) => !used.has(f) && normalize(f) === normalize(oName));
    if (match) {
      ordered.push(match);
      used.add(match);
    } else {
      log(`  (Overview.md lists "${oName}" but no matching V2 file found — skipping)`);
    }
  }

  const remaining = v2Fields.filter((f) => !used.has(f)).sort((a, b) => a.localeCompare(b));
  if (remaining.length) log(`  +${remaining.length} field(s) not in Overview.md, appended: ${remaining.join(', ')}`);

  return [...ordered, ...remaining];
}

// --- styling (copied from Tier3_Vendor_Comparison_FORMAT_V3.xlsx styles.xml) -

const FILL_SECTION = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2E5395' } };
const FILL_FIELD = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9E1F2' } };
const FILL_HEADER = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F3864' } };

const FONT_SECTION = { bold: true, size: 14, color: { argb: 'FFFFFFFF' } };
const FONT_FIELD = { bold: true, size: 11, color: { argb: 'FF1F3864' } };
const FONT_HEADER = { bold: true, size: 10, color: { argb: 'FFFFFFFF' } };
const FONT_DATA = { size: 9 };

const COL_WIDTHS = [7, 36, 30, 55, 36, 14]; // Sr No | label | Source | Confirmation Detail | Confirmation Notes | Check Required

// One short description per header, shown as an Excel cell comment (hover) on every field's header row.
const HEADER_NOTES = {
  'Sr No': 'Row number - matches the same claim in the companion test guide.',
  label: 'The specific capability, feature, or finding being evaluated in this row.',
  Source: 'Where this was verified. Click the cell to open the cited Glean page.',
  'Confirmation Detail': 'Exact evidence (quotes, figures) backing the claim, as found in Glean\'s own documentation.',
  'Confirmation Notes': 'How to verify this in a live Glean tenant - step-by-step guidance from the test guide.',
  'Check Required': 'Yes = must be confirmed with a live portal run before client-facing use. No = already settled by documentation alone (certification, published pricing, etc.) - nothing to physically test.',
};

// --- workbook assembly --------------------------------------------------------

function buildSectionSheet(workbook, sectionName) {
  const sheetName = sectionName.length > 31 ? sectionName.slice(0, 31) : sectionName;
  const sheet = workbook.addWorksheet(sheetName, { views: [{ state: 'frozen', ySplit: 0 }] });
  COL_WIDTHS.forEach((w, i) => (sheet.getColumn(i + 1).width = w));

  // section title bar
  sheet.mergeCells(1, 1, 1, 6);
  const titleCell = sheet.getCell(1, 1);
  titleCell.value = sectionName;
  titleCell.fill = FILL_SECTION;
  titleCell.font = FONT_SECTION;
  titleCell.alignment = { vertical: 'middle' };
  sheet.getRow(1).height = 24;

  let totalRows = 0;
  const order = fieldOrder(sectionName);
  log(`\n${sectionName}: ${order.length} field(s)`);

  order.forEach((fieldName, idx) => {
    const fieldNum = idx + 1;
    const researchPath = path.join(COMBINED_DIR, sectionName, 'V2', `${fieldName}.md`);
    const testGuidePath = path.join(TESTGUIDE_DIR, sectionName, 'V2', `${fieldName}.md`);

    const { label, rows } = parseResearchDoc(researchPath);
    const notes = parseTestGuideNotes(testGuidePath);
    log(`  Field ${fieldNum}: ${fieldName} — ${rows.length} row(s)${notes.size ? `, ${notes.size} with test-guide notes` : ''}`);

    // field name bar
    const fieldRowNum = sheet.lastRow.number + 1;
    sheet.mergeCells(fieldRowNum, 1, fieldRowNum, 6);
    const fieldCell = sheet.getCell(fieldRowNum, 1);
    fieldCell.value = `Field ${fieldNum}: ${fieldName}`;
    fieldCell.fill = FILL_FIELD;
    fieldCell.font = FONT_FIELD;
    fieldCell.alignment = { vertical: 'middle' };

    // column header row
    const headerRowNum = fieldRowNum + 1;
    const headerLabels = ['Sr No', label, 'Source', 'Confirmation Detail', 'Confirmation Notes', 'Check Required'];
    const headerRow = sheet.getRow(headerRowNum);
    headerLabels.forEach((text, i) => {
      const cell = headerRow.getCell(i + 1);
      cell.value = text;
      cell.fill = FILL_HEADER;
      cell.font = FONT_HEADER;
      cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      const noteText = HEADER_NOTES[text] ?? HEADER_NOTES[i === 1 ? 'label' : text];
      if (noteText) cell.note = noteText;
    });

    // data rows
    for (const r of rows) {
      const physicalTestRequired = r.physicalTestRequired ? 'Yes' : 'No';
      const values = [r.srNo, r.claim, r.source, r.detail, notes.get(r.srNo) ?? '', physicalTestRequired];
      const dataRow = sheet.addRow(values);
      values.forEach((val, idx) => {
        const colNum = idx + 1;
        const cell = dataRow.getCell(colNum);
        // Rich-text cells (bold runs from **/*emphasis*) carry their own per-run
        // font — setting cell.font on top of that would clobber the bold runs,
        // so only apply the plain data font to genuinely plain-string/number cells.
        const isRichText = val && typeof val === 'object' && Array.isArray(val.richText);
        const isHyperlink = val && typeof val === 'object' && typeof val.hyperlink === 'string';
        if (isHyperlink) {
          cell.font = { size: 9, color: { argb: 'FF0563C1' }, underline: true };
        } else if (!isRichText) {
          cell.font = FONT_DATA;
        }
        cell.alignment = {
          vertical: 'top',
          wrapText: true,
          horizontal: colNum === 1 || colNum === 6 ? 'center' : 'left',
        };
      });
      totalRows++;
    }
  });

  return totalRows;
}

function buildReadmeSheet(workbook, stats) {
  const sheet = workbook.addWorksheet('README');
  sheet.getColumn(1).width = 100;

  const lines = [
    ['Tier 3 Vendor Comparison — Glean', true, 14],
    [''],
    ['One sheet per SOW section (4.9.1, 4.9.2, ...). This workbook covers Glean only —', false],
    ['a separate workbook is built per tool, so there is no "Tool" column here.', false],
    [''],
    ['Each field = one table. First column = Sr No, matching the Sr No used in both the', false],
    ['underlying research doc and its paired hands-on test guide (Glean/Combined/<section>/V2/', false],
    ['and test/Glean/<section>/V2/ in the source project).', false],
    [''],
    ['Column headers, left to right:', true],
    ['  Sr No               row number, same Sr No in the paired test guide', false],
    ['  Claim / Feature / Finding   whatever that specific field calls its own second column —', false],
    ['                       not the same word in every table on purpose', false],
    ['  Source              click to open the cited Glean page directly (real hyperlink, not text)', false],
    ['  Confirmation Detail  exact evidence (quotes, figures) backing the claim, from Glean\'s own docs', false],
    ['  Confirmation Notes   how to verify this in a live tenant — guidance copied from the matching', false],
    ['                       Sr No row in that field\'s test guide; left blank where the guide has no', false],
    ['                       Notes column for that row — never invented', false],
    ['  Check Required       Yes/No — see rule below', false],
    [''],
    ['Check Required rule: defaults to Yes for every claim, even Doc-Verified ones — a doc saying', false],
    ['a feature works does not prove it works in this tenant (e.g. agent automation needs an actual', false],
    ['portal run before real confidence exists). No is reserved for claims with nothing to run in', false],
    ['app.glean at all: already hands-on Tested, or a static Doc-Verified fact (certification/badge,', false],
    ['published pricing figure, partner/legal status, third-party market context, or a claim this', false],
    [`project itself flags as unverified vendor marketing). ${stats.noTestNeededCount} of ${stats.totalRows}`, false],
    ['rows are currently No; the rest are Yes and are exactly what the paired test guides (test/Glean/<section>/V2/) walk through step by step.', false],
    [''],
    ['Color key:', true],
    ['  Dark blue bar   = SOW section title (sheet-level, appears once at top)', false],
    ['  Light blue bar  = Field name', false],
    ['  Navy header row = Column headers for that field\'s table', false],
    ['  White rows      = Data', false],
    [''],
    [`Generated: ${new Date().toISOString().slice(0, 10)}    Sections: ${stats.sectionCount}    Fields: ${stats.fieldCount}    Total claim rows: ${stats.totalRows}`, false],
  ];

  lines.forEach(([text, bold, size]) => {
    const row = sheet.addRow([text]);
    row.getCell(1).font = { bold: !!bold, size: size ?? 10 };
    row.getCell(1).alignment = { wrapText: true };
  });
}

// --- main ---------------------------------------------------------------------

/** Cheap pre-pass: count fields/rows per section without writing any sheet, so the
 * README (written first, so it appears first in the workbook) can report real totals. */
function countSection(sectionName) {
  const order = fieldOrder(sectionName);
  let rows = 0;
  let noTestNeeded = 0;
  for (const fieldName of order) {
    const researchPath = path.join(COMBINED_DIR, sectionName, 'V2', `${fieldName}.md`);
    const parsed = parseResearchDoc(researchPath).rows;
    rows += parsed.length;
    noTestNeeded += parsed.filter((r) => !r.physicalTestRequired).length;
  }
  return { fields: order.length, rows, noTestNeeded };
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Stratos Engineering — Tier 3 Vendor Evaluation';
  workbook.created = new Date();

  let totalRows = 0;
  let fieldCount = 0;
  let noTestNeededCount = 0;
  for (const section of SECTIONS) {
    const c = countSection(section);
    totalRows += c.rows;
    fieldCount += c.fields;
    noTestNeededCount += c.noTestNeeded;
  }

  // README first, so it's the first sheet in the saved workbook.
  buildReadmeSheet(workbook, {
    sectionCount: SECTIONS.length,
    fieldCount,
    totalRows,
    noTestNeededCount,
  });

  for (const section of SECTIONS) {
    buildSectionSheet(workbook, section);
  }

  await workbook.xlsx.writeFile(OUT_FILE);

  console.log(`\nWrote ${OUT_FILE}`);
  console.log(`Sections: ${SECTIONS.length}   Fields: ${fieldCount}   Total claim rows: ${totalRows}`);
}

main().catch((e) => {
  console.error('FAILED:', e);
  process.exit(1);
});
