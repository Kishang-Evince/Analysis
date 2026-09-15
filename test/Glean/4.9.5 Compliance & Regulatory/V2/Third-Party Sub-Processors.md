# 4.9.5 Third-Party Sub-Processors - Independent Research Test Guide

**Purpose:** Hands-on tenant verification of every claim in the companion research doc.
**Tenant entry:** `www.glean.com/legal/subprocessors` (public page, no login needed) · the Glean DPA PDF · your organization's Glean account team
**Companion research doc:** [V2/Third-Party Sub-Processors.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/V2/Third-Party%20Sub-Processors.md)
**Sr No mapping:** Sr No 1-6 below map 1:1 to the same Sr No in the companion research doc.
**How to record a result:** Pass/Fail/Partial/Blocked + Notes.
**Effort column:** time estimate + Easy/Hard tag.

---

## Section 1 - Confirming the public sub-processor list - Sr No 1-4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | The sub-processor list is publicly published, no login/NDA needed | 1. Open `www.glean.com/legal/subprocessors` in a private/incognito browser window (no Glean login).<br>2. Confirm the full list loads without any login prompt or access request. | The page loads fully with no authentication barrier. | | | ~5 min, Easy |
| 2 | 19 named sub-processors are listed, covering cloud/LLM, support, and communications categories | 1. On the same page, count the entries in the main sub-processor table.<br>2. Spot-check a few names (e.g., Anthropic, OpenAI, Salesforce) against the research doc's list. | You count approximately 19 entries and the names match. | | | ~10 min, Easy |
| 3 | A separate "Affiliate" entry discloses Glean's own India-based support-access entity | 1. Look for a section separate from the main sub-processor table, likely labeled "Affiliate."<br>2. Confirm it names "Glean Search Technologies India Private Limited" with a remote-access-for-support description. | You find this entry and confirm it is presented separately from the third-party list. | | This is the most client-relevant finding in this field - flag for the client | ~5 min, Easy |
| 4 | AWS/Google/Microsoft entries note customer discretion over location | 1. Look at the AWS, Google, and Microsoft rows.<br>2. Check for an asterisk or footnote about customer location discretion. | You find the discretion note attached to these three entries. | | | ~5 min, Easy |

---

## Section 2 - List maintenance and the notification-mechanism gap - Sr No 5-6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | The list carries a "Last Updated" date and has a traceable change history via the DPA | 1. Confirm the "Last Updated" date shown on the subprocessors page.<br>2. Open the Glean DPA PDF (search "Glean DPA subprocessors" or use the link in the research doc) and check Annex III / Exhibit A for the current subprocessor list and any change-log language. | You confirm a visible update date and can cross-reference the DPA's subprocessor annex. | | | ~15 min, Easy |
| 6 | No formal customer-notification mechanism for new sub-processors is stated on the public page - check the full DPA text to see if it's addressed there instead | 1. Read the full DPA PDF (not just search snippets) for any clause describing advance notice, objection rights, or notification method (email, portal, RSS) for sub-processor changes.<br>2. Record exactly what the DPA says, or confirm it's silent on this too. | You find and quote the actual notification clause, closing this gap - or confirm it's genuinely absent even from the full legal text. | | This is the one open item in this field - worth resolving directly since it affects contract risk assessment | ~20 min, Easy-Hard (depends on DPA length/clarity) |

---

## Result Rollup

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Public sub-processor list confirmed | 4 | | | | |
| 2. List maintenance + notification-mechanism check | 2 | | | | |
