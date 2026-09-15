# 4.9.4 Data Residency Validation - Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Data Residency Validation.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Data%20Residency%20Validation.md). The core finding there is precise: the standard "Glean Hosted" deployment defaults to North America (`us-central1`) unless a customer proactively requests a different region - and Glean's marketing GDPR/HIPAA badges don't communicate this. This guide's job is to confirm your own tenant's actual region and close that gap for your organization specifically. Written so someone with no prior context on this project can pick it up and run it - no developer access needed, this is entirely document review plus direct questions to your Glean account team.

**Tenant entry:** Admin Console → About Glean (for your tenant's actual region, if shown) · your Glean account/contract team for anything not visible in the console
**Companion research doc:** [V2/Data Residency Validation.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Data%20Residency%20Validation.md)
**Base field doc (untouched, original):** [../Data Residency Validation.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/Data%20Residency%20Validation.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- Admin access to the Glean Admin Console (to check what's visible there).
- Access to your organization's Glean account/contract contact, for anything the console doesn't show - most rows in this guide end with a direct written question to them, which is normal and doesn't require any technical setup.

**Sr No mapping:** Sr No 1-7 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Data Residency Validation.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Data%20Residency%20Validation.md#claims-sr-no-1-7-mapped-to-test-guide) - same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you found or what answer you got. "Pass" means you personally confirmed it - not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag - `Easy` (routine document read or console check, quick to judge) or `Hard` (needs a written account-team answer) - so you can plan which rows to tackle first.

---

## Section 1 - Confirming the default region claim, and finding out your own tenant's actual region - Sr No 1-2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Glean's own documentation states the default region for standard-hosted tenants is North America (`us-central1`) | 1. Open the supported-GCP-regions documentation page yourself.<br>2. Find and quote the exact default-region sentence. | You independently confirm the exact quote from the research doc. | | | ~10 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 2 | Getting a different region requires you to proactively ask Glean - it's not a self-service choice during normal signup | 1. Log in to Admin Console → About Glean and check whether your tenant's actual region/data center is shown anywhere.<br>2. If not shown, ask your Glean account team directly, in writing: *"What region is our tenant currently hosted in, and did we request that region specifically, or is it the default?"* | You get a clear, specific answer - either from the console directly, or in writing from your account team - telling you exactly which region your organization's data is actually in today, and whether that was a deliberate choice. | | This is the single most valuable row in this guide - it turns an abstract finding into a concrete fact about your own organization's data | ~10 min active + wait for account-team reply if needed, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

## Section 2 - Confirming the GCP-only default, and the AWS/Customer-Hosted alternative - Sr No 3, 6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | If your organization wants AWS specifically (not GCP), that requires the separate Customer Hosted deployment model, not the standard SaaS default | 1. Ask your Glean account team, in writing: *"Is the standard Glean Hosted plan GCP-only, or is AWS also available as a standard hosting option?"*<br>2. If your organization specifically needs/prefers AWS, ask what the path to that would be. | Your account team confirms whether AWS is available under standard hosting or only via Customer Hosted, matching (or correcting) the research finding. | | | ~10 min active + wait for reply, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 6 | Customer Hosted AWS deployments support a wider range of regions than the Glean-Hosted default | 1. If your organization uses (or is considering) Customer Hosted on AWS, ask your account team to confirm which specific AWS region your deployment uses or could use. | You get a specific, confirmed region for your actual (or prospective) Customer Hosted AWS deployment. | | If not using Customer Hosted AWS, mark `Blocked (not applicable to this tenant)` | ~10 min active + wait for reply, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

## Section 3 - Confirming the marketing-page gap directly - Sr No 4-5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 4 | Glean's public security/marketing page shows GDPR and HIPAA badges without elaborating on data residency specifics | 1. Open `www.glean.com/platform/security` yourself.<br>2. Read the GDPR and HIPAA sections/badges.<br>3. Confirm whether any region-specific residency commitment is stated there, or just the certification badge itself. | You confirm the badges are shown without a specific residency guarantee attached - matching the research finding (or you find residency language that should update the research). | | | ~10 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 5 | This means a GDPR badge alone does not tell a buyer whether their specific data defaults to EU or US hosting | 1. Reflect on Sr No 1, 2, and 4 together: does seeing the GDPR badge on the marketing page, by itself, tell you which region your data would default to?<br>2. Write a one-sentence plain-English answer to: "If I only look at the GDPR badge, do I know where my data will be stored?" | Your one-sentence answer correctly concludes "no" - the badge alone doesn't tell you the default region; you have to check separately (as done in Sr No 1-2). | | This is a synthesis/communication check, not a new technical test | ~5 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

## Section 4 - Connecting this to the Tenancy Model field's findings - Sr No 7

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 7 | This field's region-default finding is consistent with, and adds detail to, the Tenancy Model field's "dedicated instance per customer" finding | 1. Re-read the Tenancy Model V2 research doc's headline finding.<br>2. Confirm this Data Residency Validation doc's findings (dedicated instance, defaulting to one specific region) fit together logically rather than conflicting. | You confirm the two findings combine sensibly: your organization gets its own dedicated instance, and that instance defaults to a specific region unless you ask otherwise. | | Consistency check across two fields' research, not a new technical test | ~5 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Data Residency Validation.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Data%20Residency%20Validation.md), and specifically record your own tenant's actual confirmed region from Sr No 2 - that's the most concrete, organization-specific output this guide can produce.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Default region + your own tenant's actual region | 2 | | | | |
| 2. GCP-only default + AWS/Customer Hosted alternative | 2 | | | | |
| 3. Marketing-badge gap confirmed | 2 | | | | |
| 4. Consistency with Tenancy Model field | 1 | | | | |
