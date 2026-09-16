# 4.9.5 Certifications Validated - Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Certifications Validated.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/V2/Certifications%20Validated.md). The most important finding there is a genuine sourcing trap: **"Glean.ai" is a completely different company from "Glean" (glean.com)** - its SOC 2 press coverage must never be cited as evidence for glean.com. This guide's job is to make sure that mistake never happens in this evaluation, and to actually get into the Trust Portal to pull the real certificate details (scope, dates, auditor) that public pages don't show. Written so someone with no prior context on this project can pick it up and run it - no developer access needed, just a normal browser and your work email for the Trust Portal request.

**Tenant entry:** A normal web browser · `trust.glean.com` · your organization's Glean account team (for expediting Trust Portal access if needed)
**Companion research doc:** [V2/Certifications Validated.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/V2/Certifications%20Validated.md)
**Base field doc (untouched, original):** [../Certifications Validated.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/Certifications%20Validated.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- A normal web browser (the Trust Portal appears to be a JavaScript-rendered site - a real browser is needed, not just a quick automated fetch).
- Your organization's work email, for requesting access to any NDA-gated documents on the Trust Portal.
- Nothing else - this is entirely a documentation/portal review guide.

**Sr No mapping:** Sr No 1-6 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Certifications Validated.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/V2/Certifications%20Validated.md#claims-sr-no-1-6-mapped-to-test-guide) - same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you found. "Pass" means you personally confirmed it - not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag - `Easy` (routine browsing, quick to judge) or `Hard` (needs a Trust Portal access request and waiting for approval) - so you can plan which rows to tackle first.

---

## Section 1 - Confirming the certifications, and avoiding the company-confusion trap - Sr No 1-2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Glean (glean.com) holds SOC 2 Type II, ISO 27001, and ISO 42001:2023 | 1. Open `www.glean.com/platform/security` (or `www.glean.com/security`) in your browser.<br>2. Confirm the three certification badges/mentions appear, with ISO 42001 specifically noted as the 2023 version if stated. | You confirm all three certifications on Glean's own site. | | | ~10 min, Easy |
| 2 | Before citing ANY external SOC 2 press coverage for Glean, confirm it's actually about glean.com and not the unrelated company "Glean.ai" | 1. Search online for "Glean SOC 2" and look at the first several results.<br>2. For each result, check whether it's from `glean.com`/`docs.glean.com` (the right company) or `glean.ai` (a different, unrelated accounts-payable/spend-management company).<br>3. Make a clear personal note of which domain is which, so this mistake doesn't happen later in the evaluation. | You can clearly distinguish the two companies in search results, and you don't end up citing any glean.ai content as if it were about glean.com. | | This is the most important row in this guide - a real, easy-to-make mistake this checks against | ~10 min, Easy |

## Section 2 - Confirming the Agent Sandbox scope statement - Sr No 3

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | Glean's docs explicitly state its certifications extend to the Agent Sandbox feature specifically, not just the platform in generic terms | 1. Open `docs.glean.com/security/agent-sandbox-ptc` yourself.<br>2. Find and quote the exact sentence listing which certifications extend to Agent Sandbox. | You independently confirm the exact quote from the research doc. | | | ~10 min, Easy |

## Section 3 - Getting into the actual Trust Portal, and pulling the real details public pages don't show - Sr No 4-6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 4 | The Trust Portal (`trust.glean.com`) requires real browser interaction - a document list and NDA-gated content exist, but aren't visible from a simple page load | 1. Open `trust.glean.com` in a real browser and actually browse it (click around, don't just look at the landing page).<br>2. Confirm you can see a resource/document list once you're actually interacting with the site (as opposed to what a quick automated page-scrape would show, which was just a blank title). | You find real content once browsing interactively - a list of documents, some marked as requiring a request/NDA. | | | ~15 min, Easy |
| 5 | Some documents (like the actual SOC 2 report) require requesting access, likely with your work email and possibly an NDA | 1. Find the SOC 2 report (or ISO certificate) listing in the portal.<br>2. Start the request-access flow using your work email.<br>3. Note what's required (just an email, an NDA click-through, approval wait, etc). | You successfully start (and ideally complete) a real access request, and you document exactly what the process required. | | | ~15 min active + possible wait for approval, Hard |
| 6 | Once you have real access, the report will show specific dates, the auditor's name, and the exact audit period - information not available on any public page | 1. Once your access request is approved, open the actual SOC 2 report (or ISO certificate).<br>2. Record the exact audit period covered, the auditor/firm name, and the certificate's issue/expiration dates. | You obtain the real dates and auditor name, closing the gap the public documentation couldn't answer. | | This is the field's most valuable possible output - real, current certification data for your own records | ~15 min, Hard (depends on approval timing from Sr No 5) |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Certifications Validated.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/V2/Certifications%20Validated.md), and specifically record the real audit dates/auditor name from Sr No 6 if obtained.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Certifications confirmed + company-confusion check | 2 | | | | |
| 2. Agent Sandbox scope statement confirmed | 1 | | | | |
| 3. Real Trust Portal access + report details | 3 | | | | |
