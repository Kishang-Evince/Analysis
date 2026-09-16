# 4.9.10 Dependencies & Prerequisites - Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Dependencies & Prerequisites.md](../../../../Glean/Combined/4.9.10%20Use%20Case%20Library/V2/Dependencies%20&%20Prerequisites.md). The key finding is an unresolved discrepancy: a third-party (competing) vendor claims Glean lacks SCIM provisioning, contradicting this project's own earlier, more directly-sourced finding about real SAML+SCIM sync. This guide's job is to resolve that directly with Glean. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** Your Glean account/implementation team · Admin Console SSO/People Data settings
**Companion research doc:** [V2/Dependencies & Prerequisites.md](../../../../Glean/Combined/4.9.10%20Use%20Case%20Library/V2/Dependencies%20&%20Prerequisites.md)
**Base field doc (untouched, original):** [../Dependencies & Prerequisites.md](../../../../Glean/Combined/4.9.10%20Use%20Case%20Library/Dependencies%20&%20Prerequisites.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):** None special.

**Sr No mapping:** Sr No 1-4 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Dependencies & Prerequisites.md](../../../../Glean/Combined/4.9.10%20Use%20Case%20Library/V2/Dependencies%20&%20Prerequisites.md#claims-sr-no-1-4-mapped-to-test-guide) - same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes.

---

## Section 1 - Resolving the SCIM discrepancy directly - Sr No 2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 2 | Does Glean actually support SCIM provisioning? | Ask your Glean account/implementation team directly: *"Do you support SCIM-based user provisioning/deprovisioning, and if so, with which identity providers?"* | You get a clear, authoritative, current answer resolving the discrepancy. | | This is the field's most important row | ~10 min active + wait for reply, Hard [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

## Section 2 - Confirming the remaining dependencies - Sr No 1, 3-4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | People data requires its own enablement even when using the same IdP for SSO | In Admin Console, confirm whether the people connector needed a separate enable step beyond SSO configuration. | Confirmed. | | | ~10 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 3 | SSO is mandatory, OIDC primary, SAML fallback | Confirm your own tenant's SSO configuration matches this pattern. | Confirmed. | | | ~10 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 4 | Remaining cross-cutting dependencies are accurate | Spot-check 2-3 against your own tenant setup. | Confirmed. | | | ~15 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

---

## Result Rollup

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. SCIM discrepancy resolved | 1 | | | | |
| 2. Remaining dependencies confirmed | 3 | | | | |
