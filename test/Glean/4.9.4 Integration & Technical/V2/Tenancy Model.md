# 4.9.4 Tenancy Model - Independent Research Test Guide

**Purpose:** Hands-on/documentary verification of every claim in the companion research doc [V2/Tenancy Model.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Tenancy%20Model.md). The core finding there is a direct vendor claim of single-tenant infrastructure even for the standard SaaS product, plus a precisely-scoped shared control-plane layer that never touches customer document content. This guide's job is to get the exact storage-engine-level mechanism confirmed, since public docs stop short of it. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** Public documentation review, plus direct written questions to your Glean account team - no admin console access strictly required for most rows
**Companion research doc:** [V2/Tenancy Model.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Tenancy%20Model.md)
**Base field doc (untouched, original):** [../Tenancy Model.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/Tenancy%20Model.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- No special access needed for Sr No 1-4 - these are direct public-document reads.
- Access to your Glean account team (or whoever manages the contract/relationship) for Sr No 5-6, which need a written technical answer beyond what's public.

**Sr No mapping:** Sr No 1-6 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Tenancy Model.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Tenancy%20Model.md#claims-sr-no-1-6-mapped-to-test-guide) - same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you found. "Pass" means you personally confirmed it - not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag - `Easy` (routine document read, quick to judge) or `Hard` (needs a written account-team answer closing a real gap) - so you can plan which rows to tackle first.

---

## Section 1 - Confirming the single-tenant claim, for both deployment types - Sr No 1

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Glean's own documentation states single-tenant infrastructure explicitly, for both "Glean Hosted" and "Customer Hosted" deployment models | 1. Open `docs.glean.com/get-started/prepare/about-deployment` yourself.<br>2. Find and quote the exact sentence about single-tenant infrastructure.<br>3. Confirm it applies to the standard/default deployment model, not only the customer-hosted option. | You independently find and confirm the exact quote from the research doc, applying to both models. | | | ~10 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

## Section 2 - Confirming what IS shared, and that it never touches your document content - Sr No 2-4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 2 | A shared "Glean Central" component exists, scoped specifically to web-app delivery, tenant discovery/routing, and analytics | 1. Open `docs.glean.com/security/architecture/shared-centralized-services` yourself.<br>2. Confirm the three named centralized functions (web app static assets, tenant discovery, analytics) match the research doc. | You independently confirm the same three functions, with no additional centralized functions found that research missed. | | | ~10 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 3 | Customer document content and search-query content never transit or reside in this shared central infrastructure | 1. On the same page, find the exact statement about where communication is directed after initial login/tenant-discovery.<br>2. Confirm it explicitly states all further traffic goes to the customer's own dedicated instance, not through central infrastructure. | You confirm the *"all future communication is directed to your company's Glean GCP instance"* statement (or equivalent) exists and applies as described. | | | ~10 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 4 | Some data does leave the dedicated tenant - anonymized, hashed analytics logs - confirm this is accurately scoped, not raw data | 1. Re-read the analytics section of the same page.<br>2. Confirm the exact hashing/anonymization language for what leaves the tenant. | You confirm logs are described as non-PII/hashed, and note exactly what fields get hashed (user IDs, document URLs, query terms, per research). | | | ~10 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

## Section 3 - Closing the real gap: what's the exact storage-level isolation mechanism? - Sr No 5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | Public documentation does not specify the exact database/storage-engine isolation mechanism (separate physical database vs. separate schema vs. something else) - get the real answer directly | 1. Ask your Glean account team, in writing: *"At the database/storage-engine level, is our tenant's data in a physically separate database instance from other customers, or logically separated within shared infrastructure (e.g. per-tenant schema)? Please be specific about the mechanism, not just 'isolated.'"*<br>2. Record their exact answer. | You get a specific, technical answer beyond what public docs provide - closing the field's real documentation gap for your own tenant. | | This is the single most valuable row in this guide - the public docs stop exactly where this question starts | ~15 min active + wait for account-team reply, Hard [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

## Section 4 - Sanity-checking the cross-reference to the Model Hosting Location field - Sr No 6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 6 | This field's single-tenant finding is consistent with, and adds precision to, the earlier Model Hosting Location field's finding that "Glean Hosted" runs on Glean's own GCP estate | 1. Re-read the Model Hosting Location V2 research doc's Sr No 1 finding (Glean Hosted = Glean's own GCP tenant).<br>2. Confirm this Tenancy Model doc's claim (dedicated instance per customer, even within that GCP estate) doesn't contradict it - it should add detail, not conflict. | You confirm the two findings fit together logically: Glean's own cloud, but one dedicated instance per customer within it - not one shared instance serving everyone. | | This is a consistency check across two fields' research, not a new technical test | ~10 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Tenancy Model.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Tenancy%20Model.md), and specifically add your account team's written answer from Sr No 5 - that's the field's real open question, now closed for your tenant.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Single-tenant claim confirmed | 1 | | | | |
| 2. Shared component scope + document-content exclusion | 3 | | | | |
| 3. Real storage-level mechanism (closes research gap) | 1 | | | | |
| 4. Cross-field consistency check | 1 | | | | |
