# 4.9.5 FedRAMP Status - Independent Research Test Guide

**Purpose:** Hands-on tenant verification of every claim in the companion research doc.
**Tenant entry:** `www.glean.com/platform/security` (public page, no login needed) · `marketplace.fedramp.gov` · your organization's Glean account team
**Companion research doc:** [V2/FedRAMP Status.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/V2/FedRAMP%20Status.md)
**Sr No mapping:** Sr No 1-5 below map 1:1 to the same Sr No in the companion research doc.
**How to record a result:** Pass/Fail/Partial/Blocked + Notes.
**Effort column:** time estimate + Easy/Hard tag.

---

## Section 1 - Confirming the absence findings - Sr No 1-4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Glean is not FedRAMP High authorized per third-party analysis | 1. Search online for "Glean FedRAMP" and review the top results.<br>2. Check whether any source claims Glean holds FedRAMP High authorization. | You find no credible claim that Glean holds FedRAMP High authorization. | | | ~10 min, Easy |
| 2 | Glean's own security page names TX-RAMP Level 2 but no FedRAMP status | 1. Open `www.glean.com/platform/security`.<br>2. Read the full certifications list.<br>3. Confirm TX-RAMP Level 2 is listed and FedRAMP is not mentioned at all (use Ctrl-F for "FedRAMP" and "TX-RAMP"). | You independently confirm both: TX-RAMP present, FedRAMP absent. | | | ~5 min, Easy |
| 3 | No FedRAMP Marketplace listing exists for Glean | 1. Go to `marketplace.fedramp.gov`.<br>2. Search for "Glean" in the marketplace product search.<br>3. Confirm no listing matches the enterprise AI company (glean.com). | You find no matching marketplace listing. | | Watch for unrelated products with similar names | ~10 min, Easy |
| 4 | No StateRAMP or DoD Impact Level authorization exists for Glean beyond TX-RAMP | 1. Search online for "Glean StateRAMP" and "Glean DoD Impact Level".<br>2. Check for any Glean-specific results. | You find no Glean-specific StateRAMP or DoD IL claim. | | | ~10 min, Easy |

---

## Section 2 - Closing the gap with a direct question - Sr No 5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | Impact Level question is moot without authorization, but should be confirmed directly with Glean's account team along with roadmap intent | 1. Ask your Glean account team directly: "Does Glean hold, or plan to pursue, FedRAMP authorization at any impact level? Any StateRAMP beyond TX-RAMP, or DoD IL equivalents?"<br>2. Record the verbatim answer. | You get a clear, quotable statement of Glean's FedRAMP posture and any roadmap plans. | | Low priority for Perimeter Healthcare specifically (not a federal contractor) - complete opportunistically | ~15 min (email/call), Hard (depends on account team responsiveness) |

---

## Result Rollup

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Absence findings confirmed | 4 | | | | |
| 2. Direct question to account team | 1 | | | | |
