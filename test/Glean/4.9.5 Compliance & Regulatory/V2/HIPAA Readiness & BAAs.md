# 4.9.5 HIPAA Readiness & BAAs - Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/HIPAA Readiness & BAAs.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/V2/HIPAA%20Readiness%20&%20BAAs.md). The research pass this guide checks was unusually strong - it read the actual BAA and Security Standard PDFs directly, not just search summaries - and found a real discrepancy: the Security Standard document doesn't name AES-256/TLS 1.2+ specifically, even though those terms are confirmed elsewhere. This guide's job is to confirm the real documents match what was found, and to actually test the self-service signing flow. Written so someone with no prior context on this project can pick it up and run it - no developer access needed, just a browser and (for the signing test) your organization's actual authority to execute a BAA.

**Tenant entry:** A normal web browser · `www.glean.com/legal` · your organization's legal/procurement contact (only needed if you want to actually execute the BAA, not just review it)
**Companion research doc:** [V2/HIPAA Readiness & BAAs.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/V2/HIPAA%20Readiness%20&%20BAAs.md)
**Base field doc (untouched, original):** [../HIPAA Readiness & BAAs.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/HIPAA%20Readiness%20&%20BAAs.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- A normal web browser and the ability to download/open PDF files.
- **Do not actually complete/submit the DocuSign signature** unless your organization genuinely intends to execute the BAA and you have the authority to do so - Sr No 1-2 only need you to reach the identity-verification step, not finish signing. Treat this as an irreversible action requiring real authorization, per your organization's normal contract-signing process.
- No developer access needed anywhere in this guide.

**Sr No mapping:** Sr No 1-10 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/HIPAA Readiness & BAAs.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/V2/HIPAA%20Readiness%20&%20BAAs.md#claims-sr-no-1-10-mapped-to-test-guide) - same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you found. "Pass" means you personally confirmed it - not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag - `Easy` (routine document read, quick to judge) or `Hard` (needs legal/procurement involvement, or careful document comparison) - so you can plan which rows to tackle first.

---

## Section 1 - Confirming the self-service signing flow (without actually signing) - Sr No 1-2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | The BAA is reachable and signable via a public link on Glean's legal page, with no sales contact required to reach the signing step | 1. Open `www.glean.com/legal` in your browser.<br>2. Find and click through to the BAA page and its "Sign BAA" link.<br>3. Confirm you reach an identity-verification step (email verification) without needing to first contact sales or account management. | You reach the DocuSign identity-verification step directly from the public legal page, with no gatekeeping contact required first. | | **Do not complete the signature** unless your organization actually intends to execute it | ~10 min, Easy |
| 2 | The downloadable BAA PDF is explicitly marked as review-only, distinct from the actual signing document | 1. Download the BAA PDF linked from the legal page.<br>2. Read the final page and confirm the "review only" / PowerForm language matches research. | You confirm the exact review-only disclaimer and PowerForm reference. | | | ~10 min, Easy |

## Section 2 - Confirming the specific numeric SLAs in the BAA text - Sr No 3-4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | The BAA text contains the specific business-day windows quoted in research (5 days for breach reporting and PHI access, 10 days for amendment and disclosure accounting) | 1. In the downloaded BAA PDF, find Sections 4 (Reporting), 7 (Access to PHI), 8 (Amendment of PHI), and 9 (Accounting of Disclosures).<br>2. Confirm each numeric window matches research. | You independently confirm all four numeric SLAs, exactly as quoted. | | | ~15 min, Easy |
| 4 | Subcontractor PHI obligations and post-termination return/destroy requirements are real, specific clauses in the BAA | 1. Find Sections 6 (Agreement with Subcontractor) and 12.3 (termination) in the BAA PDF.<br>2. Confirm the subcontractor flow-down language and the no-retention-on-termination language match research. | You independently confirm both clauses. | | | ~10 min, Easy |

## Section 3 - Confirming the Security Standard document's actual content, including the encryption-language discrepancy - Sr No 5-9

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | The Security Standard document describes two architecture options with "virtually identical" security controls, matching the single-tenant finding from the Tenancy Model field | 1. Find and download Glean's Security Standard document (search `glean.com` or ask your account team for the current version if the link has changed).<br>2. Confirm the "Managed Service" vs. "Hosted solution" language and the single-tenant description. | You independently confirm this section matches research. | | | ~15 min, Easy |
| 6 | **The core test:** the Security Standard document does NOT name AES-256, FIPS 140-2, or TLS 1.2+ specifically - only generic "industry-standard" encryption language | 1. In the Security Standard document, find the "Data encryption" section (At rest / In transit).<br>2. Read it carefully and confirm whether specific standard names (AES-256, FIPS 140-2, TLS version) appear, or only generic language.<br>3. Separately, ask your Glean account team directly: *"Can you confirm in writing the specific encryption standards (e.g. AES-256, TLS version) used for data at rest and in transit? The Security Standard document itself doesn't name them specifically."* | You confirm the document's actual wording (matching or correcting research), and - more importantly - get the specific standard names confirmed directly in writing from your account team, since the document itself doesn't state them. | | This is the most important row in this guide - it closes a real, flagged discrepancy with an authoritative written answer | ~15 min doc check + ~10 min active/wait for account-team reply, Hard |
| 7 | SOC 2 Type II reports are request-based, not self-serve, per this document too - a second independent confirmation of the Trust Portal finding | 1. Find the "SOC2 Type 2 Audit complete" line in the Security Standard document.<br>2. Confirm it says "upon request," not "available for download." | You confirm the exact wording matches research. | | | ~5 min, Easy |
| 8 | Internal access-control specifics (no default engineer access, quarterly reviews, unique IDs, MFA/SSH/OTP) are real, documented commitments | 1. Find the "Access controls" and "Data Access Policy" sections.<br>2. Confirm each specific control mentioned in research appears in the actual document. | You confirm all the specific controls listed in research. | | | ~10 min, Easy |
| 9 | Deleting data in production automatically cascades to Glean's index copies, with a customer-configurable delay | 1. Find the "Data Retention Policy" section.<br>2. Confirm the exact cascade-deletion language and the "configurable by the customer" detail.<br>3. If your organization is live on Glean, ask your admin whether this configurable delay setting has actually been reviewed/set to your organization's preference. | You confirm the documented mechanism, and find out whether your own organization has actually configured this setting deliberately or is running on a default. | | | ~10 min, Easy + optional admin follow-up |

## Section 4 - A quick sanity check on the version-date gap and the name-confusion risk - Sr No 10

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 10 | The BAA (April 2026) and Security Standard (September 2024) documents are roughly 19 months apart in vintage - worth confirming the Security Standard is still current, and being alert to name-confusion with unrelated companies like "Glean.ai" or "Gleanin" | 1. Ask your Glean account team, in writing, whether a more recent version of the Security Standard document exists beyond the September 2024 one found in research.<br>2. While researching this field online, note any search results referencing "Glean.ai" or "Gleanin" and confirm you're not accidentally citing either as if they were glean.com. | You get a current-version confirmation (or the same Sep 2024 document confirmed as still current), and confirm no name-confusion crept into your own notes. | | | ~10 min active + wait for reply, Easy |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/HIPAA Readiness & BAAs.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/V2/HIPAA%20Readiness%20&%20BAAs.md), and specifically add your account team's written encryption-standard confirmation from Sr No 6 - that closes this field's most important gap.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Self-service signing flow confirmed | 2 | | | | |
| 2. Numeric BAA SLAs confirmed | 2 | | | | |
| 3. Security Standard content + encryption discrepancy | 5 | | | | |
| 4. Version currency + name-confusion check | 1 | | | | |
