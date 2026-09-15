# 4.9.5 Financial Services Readiness - Independent Research Test Guide

**Purpose:** Hands-on tenant verification of every claim in the companion research doc.
**Tenant entry:** `www.glean.com/platform/security` (public page, no login needed) · your organization's Glean account team (for the direct question this field ultimately needs)
**Companion research doc:** [V2/Financial Services Readiness.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/V2/Financial%20Services%20Readiness.md)
**Sr No mapping:** Sr No 1-5 below map 1:1 to the same Sr No in the companion research doc.
**How to record a result:** Pass/Fail/Partial/Blocked + Notes.
**Effort column:** time estimate + Easy/Hard tag.

---

## Section 1 - Confirming the absence findings (PCI-DSS, FINRA, SEC 17a-4) - Sr No 1-4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | SOC 2 Type II is already confirmed elsewhere - no new test needed here, just cross-check | 1. Open the companion [Certifications Validated V2 test guide](Certifications%20Validated.md) and confirm Sr No 1 has a recorded result. | The certification is already verified there; nothing new to do in this row. | | Pure cross-reference row | ~2 min, Easy |
| 2 | PCI-DSS is not named anywhere on Glean's public security page | 1. Open `www.glean.com/platform/security` yourself.<br>2. Read the full list of named certifications/standards.<br>3. Confirm PCI-DSS does not appear anywhere on the page (use browser find/Ctrl-F for "PCI"). | You confirm PCI-DSS is absent from the page, matching the research doc. | | | ~5 min, Easy |
| 3 | FINRA is not addressed anywhere in Glean's own published material | 1. Search online for "Glean FINRA" and "site:glean.com FINRA".<br>2. Check whether any Glean-authored (glean.com or docs.glean.com) page mentions FINRA. | You find no Glean-authored page mentioning FINRA - only third-party commentary, if anything. | | | ~10 min, Easy |
| 4 | SEC Rule 17a-4 is not addressed anywhere in Glean's own published material | 1. Search online for "Glean 17a-4" and "site:glean.com SEC".<br>2. Check whether any Glean-authored page addresses SEC recordkeeping/WORM retention. | You find no Glean-authored page addressing 17a-4, confirming the absence. | | | ~10 min, Easy |

---

## Section 2 - Closing the gap with a direct question - Sr No 5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | Glean's account team can give a direct answer on PCI-DSS/FINRA/SEC 17a-4 posture that public documentation does not provide | 1. Via your Glean account team or sales/solutions engineer contact, ask directly: "Does Glean hold or pursue PCI-DSS certification? Has Glean been evaluated against FINRA 4511 or SEC 17a-4 requirements for broker-dealer customers?"<br>2. Record the verbatim answer, or note if no answer is provided. | You get a clear, quotable answer (even "we don't pursue this") that resolves the ambiguity documentation alone couldn't. | | Since Perimeter Healthcare is not a financial-services client, this row is lower priority - complete opportunistically rather than blocking the evaluation on it | ~15 min (email/call), Hard (depends on account team responsiveness) |

---

## Result Rollup

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Absence findings confirmed (PCI-DSS/FINRA/SEC) | 4 | | | | |
| 2. Direct question to account team | 1 | | | | |
