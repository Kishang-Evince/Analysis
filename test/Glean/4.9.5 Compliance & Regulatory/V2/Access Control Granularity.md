# 4.9.5 Access Control Granularity — Independent Research Test Guide

**Purpose:** Hands-on verification of every claim in the companion research doc [V2/Access Control Granularity.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/V2/Access%20Control%20Granularity.md). The core finding there is one of the most consequential in this entire research effort: Glean's own documentation directly admits that Salesforce Field-Level Security (FLS) is **not enforced at query time** — a user with record-level access can see FLS-restricted field content in Glean search/AI answers, unless an admin proactively excludes those fields. This guide's job is to actually prove that gap in a real tenant, and to check whether it extends beyond Salesforce. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** Admin Console → Platform → Connectors (Salesforce) · a Salesforce sandbox/test org with a field-level-security rule you control
**Companion research doc:** [V2/Access Control Granularity.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/V2/Access%20Control%20Granularity.md)
**Base field doc (untouched, original):** [../Access Control Granularity.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/Access%20Control%20Granularity.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- Salesforce admin access (test/sandbox org strongly preferred — this test deliberately creates a field-level-security gap to observe, don't do this against real sensitive data in production).
- Glean Admin Console access, with the Salesforce connector enabled and able to index your test object.
- Two Salesforce users: one with full field visibility, one with a specific field restricted via FLS but with record-level (row) access to the same record.
- If your organization doesn't use Salesforce: this guide's Section 2 (the extension check) lets you test the same question against Jira, SharePoint, or another connector with field/column-level security instead — see Sr No 5.

**Sr No mapping:** Sr No 1-10 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Access Control Granularity.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/V2/Access%20Control%20Granularity.md#claims-sr-no-1-10-mapped-to-test-guide) — same number, same claim, doc-sourced there / tenant-tested here. Sr No 8-10 added 2026-09-14 — new access-governance mechanics found via a full-corpus sweep of this project's local Glean documentation crawl, never previously tested (see scrap/GLEAN_RESEARCH_MEMORY.md).

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you observed. "Pass" means you personally saw it happen — not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag — `Easy` (routine console check, quick to judge) or `Hard` (needs Salesforce admin setup and two test users) — so you can plan which rows to tackle first.

---

## Section 1 — Confirming row-level (record) permissions work correctly — Sr No 1

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | A user with no record-level access to a Salesforce record (via profile/permission set/sharing rules) cannot see it in Glean at all | 1. As Salesforce admin, create a test record that User B (a low-privilege test user) has **no** record-level access to.<br>2. As User B, search Glean for that record's unique content — expect zero results.<br>3. As a user WHO DOES have access, search the same content — expect a hit. | User B gets no hit; the authorized user does. Confirms row-level inheritance works correctly as a baseline before testing the field-level gap. | | | ~20 min, Hard (needs Salesforce admin + 2 test users) |

## Section 2 — The core test: proving the Field-Level Security gap directly — Sr No 2-4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 2 | A user WITH record-level access, but WITHOUT Salesforce field-level access to a specific sensitive field on that record, can still see that field's content via Glean | 1. As Salesforce admin, pick a test record. Grant User B record-level (row) access to it.<br>2. Apply Salesforce Field-Level Security to restrict one specific field on that record (e.g. hide a "Notes" or "SSN"-style test field) so User B cannot see it in Salesforce's own UI.<br>3. Ensure that field is included in what Glean indexes for this object (don't apply Glean-side exclusion yet).<br>4. As User B, search Glean for content unique to that restricted field, or ask Assistant a question that would surface it. | User B **can** see the restricted field's content through Glean (in a search snippet or AI answer), even though Salesforce's own UI hides it from them — this is the documented gap made concrete. | | This is the single most important row in this guide — a real, working demonstration of a genuine security gap | ~30 min, Hard (needs careful Salesforce FLS setup) |
| 3 | Applying Glean's own recommended mitigation (excluding the sensitive field from indexing) actually closes the gap | 1. In the Glean Salesforce connector configuration, exclude/red-list the specific field you tested in Sr No 2 from indexing.<br>2. Wait for re-crawl (or trigger one).<br>3. Repeat User B's search/question from Sr No 2. | After the field exclusion takes effect, User B can no longer see that field's content via Glean — confirming the mitigation genuinely works when applied. | | | ~20 min active + wait for re-crawl, Hard |
| 4 | This is confirmed as a stated, current, documented limitation — not a bug or misconfiguration on your part | 1. Re-read the exact wording on `docs.glean.com/connectors/native/salesforce/about` regarding FLS enforcement.<br>2. Confirm your Sr No 2 observation matches what the documentation itself says should happen (i.e. you're confirming documented behavior, not discovering a surprise bug). | Your observed behavior in Sr No 2 matches the documentation's own stated limitation exactly. | | | ~10 min, Easy |

## Section 3 — Checking whether this gap extends beyond Salesforce — Sr No 5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | It's unconfirmed whether this same field-level gap applies to other connectors with column/field-level security (e.g. a restricted column in a SharePoint list, or a Jira custom field with field-level permissions) — test one other connector your organization actually uses | 1. Pick another connector your organization uses that has some form of field/column-level security (e.g. SharePoint list column permissions, Jira field-level security schemes).<br>2. Repeat a similar test to Sr No 2: grant record/item-level access but restrict one specific field, and check whether Glean respects that restriction.<br>3. Also ask your Glean account team directly, in writing: *"Does the Salesforce field-level-security limitation (FLS not enforced at query time) also apply to [your connector], or is that connector's field-level security correctly enforced?"* | You get a real answer — either confirmed via your own test or via written account-team confirmation — for at least one connector beyond Salesforce. | | This closes a real, flagged research gap — the finding was Salesforce-specific and needs its own scope confirmed | ~30 min, Hard (needs a second connector's field-security setup) + written question |

## Section 4 — Confirming permission-change propagation isn't instant — Sr No 6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 6 | Permission changes at the source don't reflect in Glean instantly — there's a real, connector-dependent delay | 1. Revoke User B's record-level access to a test record they previously could see.<br>2. Immediately search as User B — note whether the record still appears.<br>3. Wait and re-check periodically until it disappears, timing how long it actually took. | You get a real measured delay before the permission revocation is reflected in Glean — confirming enforcement isn't instantaneous. | | | ~20 min active + wait for propagation, Hard |

## Section 5 — Framing the overall finding accurately — Sr No 7

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 7 | Row/document-level and field-level access control should be reported as two separate findings, not one blended answer | 1. Re-read your own Sr No 1-6 results together.<br>2. Draft a one-paragraph summary of this field for a client that correctly states: row/document-level = strong, field-level = a real documented gap requiring manual mitigation.<br>3. Have a colleague read it and confirm they come away understanding both halves distinctly. | Your colleague understands both the strength (row/document) and the specific limitation (field-level) as two separate facts, not blurred into one vague "access control works well" or "access control has issues" statement. | | Communication/write-up quality check | ~15 min, Easy |

## Section 6 — Confirming the Document lookup admin tool — Sr No 8

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 8 | The Document lookup tool directly answers "can user X see document Y," and can be used to spot-check the Salesforce FLS gap on a document-by-document basis | 1. Go to **Admin Console → Search → Document lookup** (or equivalent path).<br>2. Look up a document and a specific user, and confirm the four returned fields: Last crawled, Last indexed, Document visibility on Glean, Document access (for the selected user).<br>3. If you ran the FLS gap test in Section 2 (Sr No 2), use Document lookup on that same record/user pair and confirm it reports the access outcome consistently. | Document lookup returns all four documented fields correctly, and — if cross-checked against the Sr No 2 FLS test — reports an access outcome consistent with what you directly observed. | | Ties directly back to Section 2's FLS gap test | ~15 min, Easy |

## Section 7 — Confirming the bulk content-hiding mechanism — Sr No 9

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 9 | Glean's admin-UI content-hiding mechanism supports bulk CSV-based hiding (up to 500,000 documents) with three visibility modes and its own audit trail, and does not affect source permissions or federated live-fetch surfaces | 1. Go to the content-hiding admin area, prepare a small test CSV listing a handful of harmless test documents.<br>2. Apply one of the three modes (HIDE_ALL, HIDE_ALL_EXCEPT_OWNER, or HIDE_FROM_GROUPS) and confirm the hide takes effect (~1 hour) and appears in the "All Hidden Documents" audit tab.<br>3. Confirm the underlying source permissions are unchanged (the document is still fully accessible at the source system).<br>4. If your tenant uses a federated live-fetch source (e.g. Slack Real-Time Search), confirm hidden content still appears there, matching the documented scope limitation. | The hide takes effect in Glean search/AI answers, is logged in the audit tab, source permissions remain untouched, and (if tested) federated live-fetch results are unaffected by the hide — all matching documented behavior. | | Use only harmless test documents — this is a real content-visibility change | ~1 hr 15 min (includes propagation wait), Hard |

## Section 8 — Confirming the Super Admin permission ratchet — Sr No 10

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 10 | Admins cannot create, assign, or downgrade the Super Admin role, and first-time provisioning requires written CISO/security-officer authorization | 1. As a regular Admin (not Super Admin), attempt to assign or modify the Super Admin role for another user in **Admin Console → Identity → Roles**.<br>2. Confirm the action is blocked or unavailable to a non-Super-Admin.<br>3. Ask your Glean account team, in writing, to confirm the written-authorization requirement (CxO/VP-level approval, 1-2 business day turnaround) for first-time Super Admin provisioning at your organization. | The Admin-level attempt to modify Super Admin role assignment is blocked, and your account team confirms the written-authorization provisioning process in writing. | | Maps to HIPAA Security Rule Sec164.308 access-authorization expectations | ~20 min active + wait for account-team reply, Hard |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Access Control Granularity.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/V2/Access%20Control%20Granularity.md). Sr No 2-3 are the priority — a real, demonstrated instance of the gap (and its mitigation working) is the single most valuable output this guide can produce.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Row-level permissions baseline | 1 | | | | |
| 2. Field-level security gap demonstrated + mitigated | 3 | | | | |
| 3. Extension to other connectors checked | 1 | | | | |
| 4. Permission-change propagation delay measured | 1 | | | | |
| 5. Accurate write-up framing | 1 | | | | |
| 6. Document lookup admin tool | 1 | | | | |
| 7. Bulk content-hiding mechanism | 1 | | | | |
| 8. Super Admin permission ratchet | 1 | | | | |
