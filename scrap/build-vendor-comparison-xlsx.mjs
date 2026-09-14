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
 * Per field table columns: Sr No | <label> | Source | Detail | Test Guide Notes | Physical Test Required
 *   - <label> is whatever that field's own doc calls column 2 (Claim/Feature/Finding/etc.) — read
 *     dynamically per file, not assumed.
 *   - Test Guide Notes = the "Notes" cell from the SAME Sr No row in the paired test guide, if that
 *     guide's table shape has a Notes column at all (some don't — left blank there, not fabricated).
 *   - Physical Test Required = "No" when that claim's own "## Confidence" tier (parsed straight out of
 *     the research doc's prose — see parseConfidenceTiers/tierSkipsPhysicalTest) is Doc-Verified or
 *     hands-on Tested, i.e. settled just by reading the cited page again. "Yes" for every other tier
 *     (Search-corroborated, Cross-referenced, Absence-check, Partially Confirmed, Press-reported, ...) —
 *     those genuinely need a live-tenant check or a direct vendor question, not just a re-read.
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
];

/**
 * Which claims need a real physical/tenant test, vs. which are settled just by
 * reading the cited doc. Driven by each claim's own "## Confidence" tier,
 * parsed out of the research doc's prose (see parseConfidenceTiers below) —
 * not hardcoded per field. A tier counts as "already settled, no physical test
 * needed" when its bolded name contains "doc-verified" or "tested"
 * (case-insensitive) — everything else (Search-corroborated, Cross-referenced,
 * Absence-check, Press-reported, Partially Confirmed, Unverifiable, ...) still
 * needs a live-tenant check or a direct vendor question.
 */
function tierSkipsPhysicalTest(tier) {
  if (!tier) return false; // unknown tier -> stay safe, default to "Yes"
  const t = tier.toLowerCase();
  return t.includes('doc-verified') || t.includes('tested');
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
      rows.push({
        srNo,
        claim: mdToRichText(cells[1] ?? ''),
        source: mdToRichText(sourceIdx >= 0 ? cells[sourceIdx] ?? '' : ''),
        detail: mdToRichText(detailIdx >= 0 ? cells[detailIdx] ?? '' : ''),
        tier,
        physicalTestRequired: !tierSkipsPhysicalTest(tier),
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
      const val = mdToRichText(cells[notesIdx] ?? '');
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

const COL_WIDTHS = [7, 36, 30, 60, 36, 16]; // Sr No | label | Source | Detail | Test Guide Notes | Physical Test Required

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
    const headerLabels = ['Sr No', label, 'Source', 'Detail', 'Test Guide Notes', 'Physical Test Required'];
    const headerRow = sheet.getRow(headerRowNum);
    headerLabels.forEach((text, i) => {
      const cell = headerRow.getCell(i + 1);
      cell.value = text;
      cell.fill = FILL_HEADER;
      cell.font = FONT_HEADER;
      cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
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
        if (!isRichText) cell.font = FONT_DATA;
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
    ['Column 2\'s header (Claim / Feature / Finding / etc.) is whatever that specific field', false],
    ['calls its own second column — it is not the same word in every table on purpose.', false],
    [''],
    ['Test Guide Notes = guidance copied from the matching Sr No row in that field\'s test', false],
    ['guide. Left blank where that guide\'s table has no Notes column for a given row —', false],
    ['never invented.', false],
    [''],
['Physical Test Required = No when that specific claim\'s own Confidence tier is Doc-Verified or', false],
    ['already hands-on Tested — settled just by re-reading the cited page, no tenant needed. Yes for', false],
    ['every other tier (Search-corroborated, Cross-referenced, Absence-check, Partially Confirmed, ...)', false],
    [`— those genuinely need a live-tenant check or a direct vendor question. ${stats.noTestNeededCount} of`, false],
    [`${stats.totalRows} rows are currently No; the rest are Yes and are exactly what the paired test`, false],
    ['guides (test/Glean/<section>/V2/) walk through step by step.', false],
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
