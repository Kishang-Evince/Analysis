# 4.9.5 Data Processing Agreements - Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Data Processing Agreements.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/V2/Data%20Processing%20Agreements.md). The research behind this field is unusually strong - it's built on a full, direct, page-by-page reading of Glean's actual DPA PDF. This guide's job is to independently confirm the same clauses in your own copy of the document, and to resolve the one open question: is the public subprocessor list actually the DPA's formal Appendix 2? Written so someone with no prior context on this project can pick it up and run it - entirely document review and account-team questions, no developer access needed.

**Tenant entry:** A normal web browser · `www.glean.com/legal` · your organization's legal/procurement contact
**Companion research doc:** [V2/Data Processing Agreements.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/V2/Data%20Processing%20Agreements.md)
**Base field doc (untouched, original):** [../Data Processing Agreements.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/Data%20Processing%20Agreements.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- A normal web browser and the ability to download/open PDF files.
- If your organization has already signed a DPA with Glean: access to that actual signed copy is more valuable than the public template, since it reflects your organization's real terms.

**Sr No mapping:** Sr No 1-10 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Data Processing Agreements.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/V2/Data%20Processing%20Agreements.md#claims-sr-no-1-10-mapped-to-test-guide) - same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you found. "Pass" means you personally confirmed it - not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag - `Easy` (routine document read, quick to judge) or `Hard` (needs a written account-team/legal clarification) - so you can plan which rows to tackle first.

---

## Section 1 - Confirming the core structure and CCPA-specific language - Sr No 1-3

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | The DPA clearly establishes Customer as Controller and Glean as Processor, with processing bound to your instructions | 1. Download the DPA from `www.glean.com/legal`.<br>2. Find Section 2 and confirm the Controller/Processor language matches research. | You independently confirm the exact roles and scope language. | | | ~15 min, Easy |
| 2 | "Data Protection Laws" is explicitly defined to cover GDPR, UK GDPR, Swiss law, and CCPA by name | 1. Find Section 1.3 (Definitions) and confirm all four jurisdictions/laws are named, including CCPA specifically. | You independently confirm the multi-jurisdiction definition. | | | ~10 min, Easy |
| 3 | A specific CCPA no-sale / no-data-combination certification exists, not just generic privacy language | 1. Find Section 11 (Certifications) and confirm the specific CCPA "sell" language and data-combination restriction match research. | You independently confirm the exact CCPA-specific commitments. | | | ~15 min, Easy |

## Section 2 - Confirming subprocessor governance has real teeth - Sr No 4-5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 4 | The 30-day subprocessor notice period and the objection-to-termination remedy are real, specific clauses | 1. Find Section 9 (Subprocessors) and confirm the 30-day notice, objection right, and termination-remedy language match research. | You independently confirm this clause gives customers a genuine, actionable right - not just a notification with no recourse. | | | ~15 min, Easy |
| 5 | Subprocessors are bound to the same substantive obligations, and Glean stays fully responsible for their compliance | 1. In the same section (or the SCCs' Clause 9), confirm the flow-down and full-responsibility language. | You independently confirm this accountability structure. | | | ~10 min, Easy |

## Section 3 - Confirming the cross-border transfer mechanisms - Sr No 6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 6 | The DPA includes EU SCCs (Module 2), a separate UK Addendum, and specific Swiss-law provisions - not just one generic transfer clause | 1. Confirm Section 10 and the Exhibit A/B structure match research (SCCs for EEA, UK Addendum for UK, FDPIC reference for Switzerland).<br>2. If your organization transfers data from any of these specific jurisdictions, confirm with legal/procurement that the correct mechanism applies to your situation. | You independently confirm all three transfer mechanisms exist as described, and (if relevant) confirm which one applies to your organization's actual data flows. | | | ~15 min, Easy |

## Section 4 - Confirming the audit rights and law-enforcement clause - Sr No 7-9

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 7 | The 72-hour breach notification SLA is present in this document too (cross-check against the Data Retention & Disposal field's finding) | 1. Confirm Section 4's 72-hour language. | You confirm consistency with the earlier field's finding - same document, same clause. | | | ~5 min, Easy |
| 8 | A real annual third-party audit right exists, with a report available to you on written request | 1. Confirm Section 6.1's exact audit-frequency, standard (SOC 2 or equivalent), and report-request language.<br>2. If your organization has never requested this report, consider whether you should - it's a right you may not be using. | You confirm the clause, and reflect on whether your organization is actually exercising this right. | | | ~15 min, Easy |
| 9 | The anti-backdoor / law-enforcement-access certification is a real, specific commitment worth citing directly | 1. Confirm Section 13's exact language on redirecting law enforcement requests and the three anti-backdoor certifications. | You independently confirm this specific, strong language. | | | ~10 min, Easy |

## Section 5 - Closing the one open question: is the public subprocessor list the actual Appendix 2? - Sr No 10

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 10 | The DPA is self-service signable via DocuSign (like the BAA), and the public subprocessor list's exact relationship to the DPA's formal Appendix 2 needs a direct answer | 1. Confirm the DPA PDF's final page has the same "review only, sign via PowerForm" language as the BAA.<br>2. Ask your Glean account team or legal contact directly, in writing: *"Is the subprocessor list at glean.com/legal/subprocessors the same document referenced as Appendix 2 in our DPA, or a separate disclosure? How will we be notified of updates to it specifically?"* | You confirm the self-service signing pattern, and get a clear written answer resolving whether the public list and the DPA's Appendix 2 are the same document. | | This closes research's one flagged open question | ~10 min doc check + ~10 min active/wait for reply, Hard |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Data Processing Agreements.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/V2/Data%20Processing%20Agreements.md), and specifically record the account team's written answer from Sr No 10.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Core structure + CCPA-specific language | 3 | | | | |
| 2. Subprocessor governance teeth | 2 | | | | |
| 3. Cross-border transfer mechanisms | 1 | | | | |
| 4. Audit rights + law-enforcement clause | 3 | | | | |
| 5. Subprocessor list / Appendix 2 relationship (closes open question) | 1 | | | | |
