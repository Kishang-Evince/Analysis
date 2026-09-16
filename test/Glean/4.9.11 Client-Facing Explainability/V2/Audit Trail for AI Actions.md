# 4.9.11 Audit Trail for AI Actions - Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Audit Trail for AI Actions.md](../../../../Glean/Combined/4.9.11%20Client-Facing%20Explainability/V2/Audit%20Trail%20for%20AI%20Actions.md). The key finding resolves a tension flagged repeatedly in this project's 4.9.9 research: Glean's marketing claims about "audit trail for every query" are only true if GCE export is actively provisioned - the internal Security Principles documentation is honest about this precondition, but customer-facing marketing omits it. This guide's job is to confirm your own tenant's actual GCE provisioning status and test the admin-audit-log/retention mechanics directly. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** Glean Admin Console → Audit Log, GCE export settings
**Companion research doc:** [V2/Audit Trail for AI Actions.md](../../../../Glean/Combined/4.9.11%20Client-Facing%20Explainability/V2/Audit%20Trail%20for%20AI%20Actions.md)
**Base field doc (untouched, original):** [../Audit Trail for AI Actions.md](../../../../Glean/Combined/4.9.11%20Client-Facing%20Explainability/Audit%20Trail%20for%20AI%20Actions.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):** Admin access.

**Sr No mapping:** Sr No 1-6 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Audit Trail for AI Actions.md](../../../../Glean/Combined/4.9.11%20Client-Facing%20Explainability/V2/Audit%20Trail%20for%20AI%20Actions.md#claims-sr-no-1-6-mapped-to-test-guide) - same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes.

---

## Section 1 - Confirming the two-tier system and the resolved marketing tension - Sr No 1-4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Admin audit log exclusions match research | Make an admin config change and confirm it appears in the Admin Audit Log; separately confirm crawl telemetry/rate-limit events do NOT appear there. | Confirmed. | | | ~20 min, Easy |
| 2 | 30-day retention, extendable via Account Manager | Confirm your tenant's actual retention setting, and if you need longer, ask your Account Manager directly. | Confirmed. | | | ~15 min, Easy |
| 3 | GCE (Customer event logs) genuinely captures user-facing events when provisioned | Confirm whether GCE export is actually provisioned for your tenant, and if so, run a test query and confirm it appears in the export. | Confirmed. | | This directly tests the field's central finding | ~30 min, Hard |
| 4 | Confirm this precondition (GCE provisioning) with your account team, since marketing pages omit it | Ask directly: *"Is GCE export on by default, or does it require us to actively request and configure it? If a query isn't logged today, what specifically needs to happen for it to be?"* | You get a clear, first-party answer closing this exact gap. | | This is the single most important row in this guide | ~10 min active + wait for reply, Hard |

## Section 2 - Reconfirming the documented absences - Sr No 5-6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | No immutability/chain-of-custody feature exists | Ask your account team directly whether any tamper-evidence or immutability control exists for either log type. | Confirmed absent (or discover a real feature not yet documented). | | | ~10 min active + wait for reply, Easy |
| 6 | Full LLM prompts are not captured in standard logs | Attempt to retrieve a full system-prompt body from either log type and confirm only metadata is available. | Confirmed. | | | ~15 min, Easy |

---

## Result Rollup

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Two-tier system + marketing tension resolved | 4 | | | | |
| 2. Documented absences reconfirmed | 2 | | | | |
