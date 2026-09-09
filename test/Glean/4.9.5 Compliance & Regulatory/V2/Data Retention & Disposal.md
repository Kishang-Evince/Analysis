# 4.9.5 Data Retention & Disposal — Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Data Retention & Disposal.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/V2/Data%20Retention%20&%20Disposal.md). The core finding there is a real legal nuance: the Terms of Service says post-termination data deletion is automatic, while the DPA says deletion of "Customer Personal Data" specifically requires a written request — two different triggers for overlapping data categories. This guide's job is to get that reconciled in writing for your own organization, and to confirm there's no bulk-purge tool hiding somewhere in the Admin panel. Written so someone with no prior context on this project can pick it up and run it — entirely document review and account-team questions, no developer access needed.

**Tenant entry:** A normal web browser · `www.glean.com/legal` · Admin Console → Glean Protect (to check for a purge tool) · your organization's Glean account team
**Companion research doc:** [V2/Data Retention & Disposal.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/V2/Data%20Retention%20&%20Disposal.md)
**Base field doc (untouched, original):** [../Data Retention & Disposal.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/Data%20Retention%20&%20Disposal.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- A normal web browser and the ability to download/open PDF files.
- Admin access to the Glean Admin Console, for the purge-tool check.
- Access to your organization's Glean account/legal contact, for the written clarification rows.

**Sr No mapping:** Sr No 1-9 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Data Retention & Disposal.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/V2/Data%20Retention%20&%20Disposal.md#claims-sr-no-1-9-mapped-to-test-guide) — same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you found. "Pass" means you personally confirmed it — not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag — `Easy` (routine document read, quick to judge) or `Hard` (needs a written account-team clarification) — so you can plan which rows to tackle first.

---

## Section 1 — Confirming the two termination clauses, and the tension between them — Sr No 1-4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | The Terms of Service's Section 12.3 states automatic Customer Data deletion upon termination, no request required | 1. Download Glean's current Terms of Service from `www.glean.com/legal`.<br>2. Find Section 12.3 ("Effect of Termination") and confirm the exact wording matches research. | You independently confirm the automatic-deletion language. | | | ~15 min, Easy |
| 2 | The DPA's Section 7 states Customer Personal Data deletion is request-based | 1. Download Glean's current DPA from `www.glean.com/legal`.<br>2. Find Section 7 ("Data Erasure") and confirm the exact wording matches research. | You independently confirm the request-based language. | | | ~15 min, Easy |
| 3 | This is a real tension worth resolving for your organization specifically — get it clarified in writing | 1. Ask your Glean account team or legal contact, in writing: *"Your Terms of Service says Customer Data is automatically deleted upon termination, but your DPA says Customer Personal Data deletion requires our written request. Which governs in practice — will our data be deleted automatically, or do we need to submit a formal request?"* | You get a clear, specific written answer resolving the apparent tension for your organization. | | This is the single most important row in this guide — it turns a flagged legal ambiguity into a real, actionable answer | ~10 min active + wait for reply, Hard |
| 4 | Neither document gives a specific deletion timeframe — ask for one directly | 1. In the same or a follow-up message, ask: *"How many days after termination (or after a written erasure request) does actual data deletion typically complete?"* | You get a specific number or range, closing the field's flagged timeframe gap. | | | ~5 min active + wait for reply, Hard |

## Section 2 — Confirming there's no hidden bulk-purge tool in the Admin panel — Sr No 5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | No automated bulk-purge or retention-scheduling tool exists in the Admin Console | 1. Go to **Admin Console → Glean Protect** and look through every section for anything resembling "retention policy," "bulk purge," or "scheduled deletion."<br>2. Check other Admin Console areas (Management, Platform) for the same. | You find no such tool anywhere in the console, matching the research finding — or you find one, which would be a significant update to report. | | | ~15 min, Easy |

## Section 3 — Confirming the day-to-day cascade-deletion mechanism actually works — Sr No 6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 6 | Deleting a test document at the source system genuinely removes it from Glean's index, without any manual purge step on Glean's side | 1. Create a test document in a connected source (e.g. a test Google Doc or Notion page).<br>2. Confirm it becomes searchable in Glean.<br>3. Delete the source document.<br>4. Wait for the next crawl cycle and confirm it disappears from Glean's search results without you doing anything extra on the Glean side. | The document disappears from Glean search after source deletion, with no manual purge action needed. | | | ~20 min active + wait for next crawl cycle, Hard |

## Section 4 — Confirming the breach-notification and subprocessor-notice SLAs — Sr No 7-8

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 7 | The DPA's 72-hour breach-notification commitment is present in your organization's actual signed DPA (not just the public template) | 1. If your organization has a signed DPA on file, check it (or ask legal/procurement) for the exact breach-notification timeframe.<br>2. Confirm it matches the 72-hour figure from the public template. | Your organization's actual signed DPA matches the public template's 72-hour commitment. | | If you don't have access to the signed copy, mark `Blocked (no access to signed DPA)` | ~15 min, Easy (or Blocked) |
| 8 | Subprocessor list changes require 30 days' advance notice, with a real objection mechanism — confirm your organization has actually received such a notice before | 1. Ask your Glean account team or whoever manages the relationship whether your organization has received a subprocessor-change notice in the past, and how much advance notice it actually gave. | You get confirmation the 30-day notice process is real and has been followed in practice, or you learn it hasn't come up yet for your organization. | | | ~10 min active + wait for reply, Easy |

## Section 5 — Closing the one unconfirmed claim from research — Sr No 9

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 9 | A "12-month" user-account permanent-deletion policy exists — this needs to be found in an actual document, since research couldn't locate it in the Terms of Service directly | 1. Open Glean's Privacy Policy (`www.glean.com/privacy`) and search for "12 months" or account-deletion language.<br>2. If not found there, ask your Glean account team directly: *"Is there a policy that permanently deletes a user's account/data 12 months after their access is terminated or expires? If so, which document governs this?"* | You find the actual clause (in the Privacy Policy or wherever it lives) and confirm the 12-month figure, or get written confirmation of the correct figure/document if different. | | This closes research's one flagged, unconfirmed finding | ~15 min doc search + ~10 min active/wait for reply if needed, Easy |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Data Retention & Disposal.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/V2/Data%20Retention%20&%20Disposal.md), and specifically record your account team's written answers from Sr No 3-4 — those resolve the field's central legal ambiguity for your organization.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Termination-clause tension resolved in writing | 4 | | | | |
| 2. No hidden bulk-purge tool | 1 | | | | |
| 3. Cascade-deletion mechanism confirmed live | 1 | | | | |
| 4. Breach-notification + subprocessor-notice SLAs | 2 | | | | |
| 5. 12-month account-deletion claim closed | 1 | | | | |
