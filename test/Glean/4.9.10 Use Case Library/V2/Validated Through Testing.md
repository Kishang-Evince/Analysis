# 4.9.10 Validated Through Testing — Independent Research Test Guide

**Purpose:** This field's actual status is entirely dependent on running the eight UC10-T0x sandbox tests — no web research can substitute. This guide is the actual test protocol, incorporating the companion research doc [V2/Validated Through Testing.md](../../../../Glean/Combined/4.9.10%20Use%20Case%20Library/V2/Validated%20Through%20Testing.md)'s one correction: UC-05's test should specifically try Agent Identity as a fix for the `tools_unauthorized` edge case, not just document it as a known limitation.

**Tenant entry:** Glean sandbox (`app.glean.com`), Admin Console, Agent Builder
**Companion research doc:** [V2/Validated Through Testing.md](../../../../Glean/Combined/4.9.10%20Use%20Case%20Library/V2/Validated%20Through%20Testing.md)
**Base field doc (untouched, original):** [../Validated Through Testing.md](../../../../Glean/Combined/4.9.10%20Use%20Case%20Library/Validated%20Through%20Testing.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):** All dependencies from Field 9 green per use case; sandbox/admin access.

**Sr No mapping:** Sr No 1-4 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Validated Through Testing.md](../../../../Glean/Combined/4.9.10%20Use%20Case%20Library/V2/Validated%20Through%20Testing.md#claims-sr-no-1-4-mapped-to-test-guide) — same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each UC10-T0x test, record YES / PARTIAL / NO plus evidence and gaps — this replaces the usual Pass/Fail convention.

---

## Section 1 — Running the actual sandbox tests, prioritized by likely effort — Sr No 4

| Priority | UC | Test | Why prioritized here |
|---|---|---|---|
| 1 (likely quick) | UC-03 | UC10-T03 Onboarding Collection | Capability confirmed elsewhere — just needs content built |
| 1 (likely quick) | UC-06 | UC10-T06 Go Link + Answer | Capability confirmed elsewhere — just needs FAQs authored |
| 1 (likely quick) | UC-07 | UC10-T07 Email thread prep | Capability confirmed elsewhere — just needs timing test run |
| 2 (needs a prior decision) | UC-08 | UC10-T08 Compliance doc retrieval | Blocked on a real compliance decision (Live Mode vs. standard indexing) before testing makes sense |

## Section 2 — Re-running UC-05 with the Agent Identity correction — Sr No 2

| Sr No | Test | Step-by-step test | Expected result | Result | Notes |
|---|---|---|---|---|---|
| 2 | UC10-T05 Auto agent summarize, with Agent Identity | Configure the summarization agent using Agent Identity instead of a personal OAuth token, then test whether the `tools_unauthorized` edge case still occurs. | Either the edge case is resolved (upgrading this gap), or it's confirmed to persist even with Agent Identity (a real, harder limitation). | | This is the corrected version of the original UC10-T05 test |

## Section 3 — Distinguishing capability evidence from end-to-end validation — Sr No 1, 3

| Sr No | Note | Action |
|---|---|---|
| 1 | Don't inflate status based on adjacent evidence | Keep the 2-Partial/6-Pending status honest until each UC10-T0x test is actually run — do not mark additional use cases YES based on capability tests from other fields alone. |
| 3 | Capability confirmed ≠ use case validated | For UC-01/02/08, run the actual end-to-end UC10-T0x test even though the underlying capability (ACL enforcement, citations) is already confirmed elsewhere — the specific configured workflow still needs its own test. |

---

## Result Rollup

| UC | Validated? (update after real test) | Evidence | Gaps / blockers |
|---|---|---|---|
| UC-01 | | | |
| UC-02 | | | |
| UC-03 | | | |
| UC-04 | | | |
| UC-05 | | | Test with Agent Identity per Sr No 2 |
| UC-06 | | | |
| UC-07 | | | |
| UC-08 | | | Blocked on compliance decision |
