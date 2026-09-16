# 4.9.8 Partner Support & Enablement - Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Partner Support & Enablement.md](../../../../Glean/Combined/4.9.8%20Partner%20&%20Channel%20Program/V2/Partner%20Support%20&%20Enablement.md). The key finding there resolves an apparent tension between two fields in this evaluation: a real, partner-specific "Agent Building Competency" credential exists (issued via Credsverse), separate from the customer-facing Glean Academy program that this project's Training Infrastructure field found carries no certificate. This guide's job is to confirm that credential directly (automated fetch failed with a 404) and get real answers on sandbox provisioning timing. Written so someone with no prior context on this project can pick it up and run it - mostly document downloads and a partner-manager conversation, no developer access needed.

**Tenant entry:** `glean.com/partners/referral` · `glean.com/partner-get-a-demo` · Credsverse credential page · Glean Partner Portal (post-approval)
**Companion research doc:** [V2/Partner Support & Enablement.md](../../../../Glean/Combined/4.9.8%20Partner%20&%20Channel%20Program/V2/Partner%20Support%20&%20Enablement.md)
**Base field doc (untouched, original):** [../Partner Support & Enablement.md](../../../../Glean/Combined/4.9.8%20Partner%20&%20Channel%20Program/Partner%20Support%20&%20Enablement.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- Ability to download files from the referral page.
- Progress on the partner application (from the Partner Program Details field) for the sandbox-provisioning timing check.

**Sr No mapping:** Sr No 1-6 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Partner Support & Enablement.md](../../../../Glean/Combined/4.9.8%20Partner%20&%20Channel%20Program/V2/Partner%20Support%20&%20Enablement.md#claims-sr-no-1-6-mapped-to-test-guide) - same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you found. "Pass" means you personally confirmed it - not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag - `Easy` (a quick page/download check) or `Hard` (needs real portal access or a written vendor answer) - so you can plan which rows to tackle first.

---

## Section 1 - Confirming enablement content and downloading the real asset library - Sr No 1-2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | The enablement-session content areas match research, and no scheduling SLA exists | 1. Open `glean.com/partner-get-a-demo` and confirm the four content areas.<br>2. Submit the request form and time how long it actually takes to hear back and get a session scheduled. | You confirm the content, and get a real, measured turnaround time where the page itself gives none. | | | ~10 min + wait for response, Hard [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 2 | All six named co-branded assets are real, downloadable, and of reasonable quality for an intro pitch | Download all six items (2-pager, slide deck, 3-min video, Knowledge Graph blog link, Security FAQ, Referral Program 1-pager) and do a quick quality review of each. | You confirm all six are real, accessible, and usable, and form a quality judgment (1-5) for each. | | | ~30 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

## Section 2 - Confirming the Agent Building Competency credential directly - Sr No 3-4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | The Agent Building Competency credential is real and its requirements match the search-summary description - automated fetch of the specific Credsverse page failed (404) and needs a live-browser check | 1. Open the Credsverse credential link directly in a real browser (or search Credsverse/Glean's own site for the current, correct URL if this one has moved).<br>2. Confirm what earning this credential actually requires. | You get the real, current credential page content, closing research's flagged unconfirmed gap. | | This closes research's one explicitly flagged low-confidence claim | ~15 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 4 | Custom Connectors and Embedded Experiences competencies follow a similar credential model | Search for these two competencies' own Credsverse (or equivalent) credential pages and confirm they exist in a comparable form. | You confirm (or find a different structure for) the other two competencies. | | | ~15 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

## Section 3 - Confirming sandbox provisioning timing and the eval-vs-partner-sandbox distinction - Sr No 5-6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | Sandbox/demo-instance provisioning has no published SLA - get a real timing measurement once approved | Once Stratos's partner application is approved, request sandbox/demo provisioning and time how long it actually takes to receive access. | You get a real, measured provisioning time, closing this confirmed gap with first-party data. | | Depends on Partner Program Details field's application approval | ~ongoing tracking post-approval, Hard |
| 6 | Confirm the existing `app.glean.com` evaluation tenant is genuinely separate from whatever partner sandbox gets provisioned | Once partner sandbox access is granted, confirm it's a distinct environment/tenant from the customer eval tenant already in use for this project's own research. | You confirm the two are separate, avoiding any confusion about which environment is being used for what purpose going forward. | | | ~10 min (post-provisioning), Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Partner Support & Enablement.md](../../../../Glean/Combined/4.9.8%20Partner%20&%20Channel%20Program/V2/Partner%20Support%20&%20Enablement.md), and specifically record the confirmed Agent Building Competency requirements (Sr No 3) and the real sandbox-provisioning timing (Sr No 5).

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Enablement content + asset library | 2 | | | | |
| 2. Agent Building Competency confirmed live | 2 | | | | |
| 3. Sandbox timing + environment distinction | 2 | | | | |
