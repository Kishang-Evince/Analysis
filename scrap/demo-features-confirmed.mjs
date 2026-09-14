#!/usr/bin/env node
/**
 * Quick demo: parse 4.9.1 — Functional Capabilities, Field 16 "Features Confirmed"
 * from Glean's tier3-analysis-report.md + features-Confirmed.docx.md
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE = path.resolve(__dirname, '..');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function readUtf8(filePath) {
  return fs.readFile(filePath, 'utf8').catch(() => '');
}

// ---------------------------------------------------------------------------
// Parse master schema for ONE field
// ---------------------------------------------------------------------------
function parseFieldFromReport(text, targetSection, targetCategory, targetNumber) {
  const lines = text.split(/\r?\n/);
  let currentSection = null;
  let currentCategory = null;
  let inTable = false;

  for (const raw of lines) {
    const line = raw.trim();

    const sectionMatch = line.match(/^##\s+(\d+\.\d+\.\d+)\s+[—–-]\s+(.+)$/);
    if (sectionMatch) {
      currentSection = sectionMatch[1];
      currentCategory = sectionMatch[2].trim();
      inTable = false;
      continue;
    }

    const categoryMatch = line.match(/^###\s+(.+)$/);
    if (categoryMatch && currentSection) {
      currentCategory = categoryMatch[1].trim();
      continue;
    }

    if (line.startsWith('| # | Field Name | Technical Definition |')) {
      inTable = true;
      continue;
    }

    if (inTable && line.startsWith('|---')) continue;

    if (inTable && line.startsWith('|')) {
      const parts = line.split('|').map((p) => p.trim()).filter((_, i, arr) => i !== 0 && i !== arr.length - 1);
      if (parts.length >= 4 && parts[0] === targetNumber) {
        if (currentSection === targetSection && currentCategory === targetCategory) {
          return {
            field_name: parts[1],
            technical_definition: parts[2],
            evaluation_methodology: parts[3],
          };
        }
      }
      continue;
    }

    if (inTable && !line.startsWith('|')) {
      inTable = false;
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Parse features table from field doc
// ---------------------------------------------------------------------------
function parseFeaturesTable(text) {
  const features = [];
  let inTable = false;

  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();

    if (line.startsWith('| # | Feature | Confirmation Detail |')) {
      inTable = true;
      continue;
    }

    if (inTable && /^\|[-:| ]+\|$/.test(line)) continue;

    if (inTable && line.startsWith('|')) {
      const parts = line.split('|').map((p) => p.trim()).filter((_, i, arr) => i !== 0 && i !== arr.length - 1);
      if (parts.length >= 3 && parts[0] && parts[0] !== '#') {
        const extractFirstUrl = (str) => {
          const m = str.match(/\[.*?\]\((https?:\/\/[^)]+)\)/);
          return m ? m[1] : null;
        };

        features.push({
          id: parts[0],
          feature: parts[1].replace(/\*\*/g, ''),
          detail: parts[2] || '',
          sourceUrl: extractFirstUrl(parts[1]) || extractFirstUrl(parts[2]) || null,
        });
      }
      continue;
    }

    if (inTable && !line.startsWith('|') && line.length > 0) {
      break;
    }
  }
  return features;
}

// ---------------------------------------------------------------------------
// Extract metadata from doc header
// ---------------------------------------------------------------------------
function extractMeta(text) {
  const out = {};
  for (const raw of text.split(/\r?\n/).slice(0, 100)) {
    const m = raw.trim().match(/^([A-Za-z][A-Za-z0-9 _/:-]*?):\s*(.+)$/);
    if (m) out[m[1].trim()] = m[2].trim();
  }
  return out;
}

// ---------------------------------------------------------------------------
// Build the single field record
// ---------------------------------------------------------------------------
async function buildFieldRecord() {
  const tier3Path = path.join(BASE, 'tier3-analysis-report.md');
  const tier3Text = await fs.readFile(tier3Path, 'utf8');

  const fieldDef = parseFieldFromReport(tier3Text, '4.9.1', 'Functional Capabilities', '1');
  if (!fieldDef) throw new Error('Field 1 not found in master schema');

  const vendorDir = path.join(BASE, 'Glean');
  const sectionDocPath = path.join(vendorDir, '4.9.1 -Functional Capabilities.md');
  const fieldDocPath = path.join(vendorDir, 'cloude', 'features-Confirmed.docx.md');

  const [sectionBody, fieldBody] = await Promise.all([
    readUtf8(sectionDocPath),
    readUtf8(fieldDocPath),
  ]);

  const sectionMeta = extractMeta(sectionBody);
  const fieldMeta = extractMeta(fieldBody);
  const features = parseFeaturesTable(fieldBody);

  return {
    vendor: 'Glean',
    sow_section: '4.9.1',
    field_category: 'Functional Capabilities',
    field_number: 16,
    field_name: fieldDef.field_name,
    technical_definition: fieldDef.technical_definition,
    evaluation_methodology: fieldDef.evaluation_methodology,
    section_doc_excerpt: sectionBody.slice(0, 4000),
    field_doc_excerpt: fieldBody.slice(0, 12000),
    core_data: {
      field_status: sectionMeta['Overall Section Status'] || 'Confirmed',
      confidence_level: fieldMeta['Confidence Level'] || 'High',
      risk: fieldMeta['Risk & Cost Impact'] || 'Low',
      validation_date: fieldMeta['Validation Date'] || new Date().toISOString().split('T')[0],
      source_url: fieldMeta['Source URL / Verification Link'] || fieldMeta['Source URL / Verification Links'] || '',
    },
    field_data: { features },
  };
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------
async function main() {
  try {
    console.log('Building field record for 4.9.1 — Functional Capabilities / Field 1...\n');
    const record = await buildFieldRecord();

    console.log('=== RECORD ===');
    console.log(JSON.stringify(record, null, 2));

    console.log('\n=== SUMMARY ===');
    console.log(`Vendor:          ${record.vendor}`);
    console.log(`Section:         ${record.sow_section}`);
    console.log(`Category:        ${record.field_category}`);
    console.log(`Field #:         ${record.field_number}`);
    console.log(`Field Name:      ${record.field_name}`);
    console.log(`Features found:  ${record.field_data.features.length}`);
    console.log(`Section excerpt: ${record.section_doc_excerpt.length} chars`);
    console.log(`Field excerpt:   ${record.field_doc_excerpt.length} chars`);

    console.log('\n=== FIRST 3 FEATURES ===');
    record.field_data.features.slice(0, 3).forEach((f, i) => {
      console.log(`${i + 1}. ${f.feature}`);
      console.log(`   Detail: ${f.detail.slice(0, 100)}...`);
      console.log(`   Source: ${f.sourceUrl || '(none)'}`);
    });
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

main();