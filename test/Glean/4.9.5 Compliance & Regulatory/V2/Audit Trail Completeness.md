# 4.9.5 Audit Trail Completeness — Independent Research Test Guide

**Purpose:** Hands-on verification of every claim in the companion research doc [V2/Audit Trail Completeness.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/V2/Audit%20Trail%20Completeness.md). The core finding there is that "audit trail" is actually three separate logging systems, and the one most people mean by "audit log" (the Admin Audit Log) explicitly does not capture user search queries — those live in a separate system that isn't even enabled by default. This guide's job is to confirm that split in your own tenant and directly test whether logs can be tampered with. Written so someone with no prior context on this project can pick it up and run it — no developer access needed for most rows.

**Tenant entry:** Admin Console → Users & permissions → Audit logs
**Companion research doc:** [V2/Audit Trail Completeness.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/V2/Audit%20Trail%20Completeness.md)
**Base field doc (untouched, original):** [../Audit Trail Completeness.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/Audit%20Trail%20Completeness.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- Admin access to the Glean Admin Console.
- For Sr No 6-7 only: whether your organization has GCE (Glean Customer Event) log export configured — if not, those rows become a "would we even see this" question for your admin/data team rather than a live check. Ask them if unsure.

**Sr No mapping:** Sr No 1-7 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Audit Trail Completeness.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/V2/Audit%20Trail%20Completeness.md#claims-sr-no-1-7-mapped-to-test-guide) — same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you observed. "Pass" means you personally saw it happen — not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag — `Easy` (routine console check, quick to judge) or `Hard` (needs a real tamper-attempt test, or GCE log export access) — so you can plan which rows to tackle first.

---

## Section 1 — Confirming the three-system split, and the query-logging gap specifically — Sr No 1-2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Your tenant genuinely has (or could have) three separate logging surfaces, not one unified "audit log" | 1. Go to **Admin Console → Users & permissions → Audit logs** and note what it covers.<br>2. Separately, ask your admin/data team whether GCE log export is configured, and whether agent trace export (OTLP) is connected.<br>3. Confirm these are three distinct settings/systems, not one. | You confirm three distinct systems (or their absence) rather than one combined log. | | | ~15 min, Easy |
| 2 | If you search the Admin Audit Log for a specific search query you ran, you will NOT find it there — user queries are excluded by design | 1. As a regular user, run a distinctive, unique search query (something you'll recognize) in Glean.<br>2. As Admin, open the Audit Log and search/filter for any trace of that query. | You confirm the query does **not** appear in the Admin Audit Log — proving the documented exclusion is real, not just a documentation claim. | | This is the field's most important, most surprising finding — confirm it directly rather than assuming | ~15 min, Easy |

## Section 2 — Confirming role/permission changes ARE captured — Sr No 3

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | Changing a test user's role/permission level does get captured in the Admin Audit Log | 1. Change a test user's role or permission level (something low-risk and reversible).<br>2. Check the Audit Log for an entry recording this specific change, including who made it and when. | You find a clear audit entry for the role/permission change, with actor and timestamp. | | | ~15 min, Easy |

## Section 3 — Confirming retention, export, and the immutability gap — Sr No 4-5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 4 | Your tenant's audit log retention matches the documented 30-day default (or a custom retention if you've requested one), and CSV export works as described | 1. Check the Audit Log settings for the retention period configured for your tenant.<br>2. Try exporting a CSV of recent audit log entries via the self-serve export button. | You confirm the retention period, and successfully export a CSV without needing to contact Glean support. | | | ~15 min, Easy |
| 5 | No admin (even a Super Admin) can edit or delete an existing audit log entry — test this directly if your tenant/role allows | 1. As Admin, locate a specific audit log entry.<br>2. Look for any edit or delete control on that entry.<br>3. If you have Super Admin access, specifically check whether even that highest privilege level has any modify/delete capability for log entries. | You find no way to edit or delete an existing log entry, for any admin role — closing the field's flagged immutability gap with a real answer (even if the answer is "no explicit guarantee found, but no edit/delete UI exists either"). | | This directly tests the field's own core definition (log immutability) — the documentation doesn't say either way, so your observation is the real answer | ~15 min, Easy |

## Section 4 — Confirming the GCE log's unfiltered export and real detail level — Sr No 6-7

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 6 | GCE (user-activity) log export is not on by default, and once enabled it delivers as one unfiltered stream | 1. Ask your admin/data team whether GCE log export is currently configured for your tenant.<br>2. If it is, ask whether they can filter by event type/user/connector at the export/delivery layer, or whether everything arrives as one combined stream requiring downstream filtering (e.g. in BigQuery). | You confirm whether GCE export is on by default (expected: no) and confirm the single-stream, no-export-filtering behavior if it's configured. | | If not configured, mark `Blocked (GCE export not set up)` for the filtering-behavior half, but still confirm the "not on by default" half | ~15 min, Easy (or Blocked if not configured) |
| 7 | If GCE logs are accessible, individual entries are genuinely detailed — e.g. an LLM call entry shows token usage/model/provider, and an agent workflow entry shows the full conversation | 1. If you have access to actual GCE log data (via your data team), find one `LLM_CALL` event and confirm it includes token usage, model, and provider details.<br>2. Find one `WORKFLOW_CONVERSATION` event and confirm it includes the full conversation history. | You confirm both examples show the documented level of detail. | | If GCE logs aren't accessible to you, mark `Blocked (no GCE log access)` | ~15 min, Hard (needs GCE log access via data team) |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Audit Trail Completeness.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/V2/Audit%20Trail%20Completeness.md), and specifically record your Sr No 2 and Sr No 5 findings — those are the field's two most consequential, directly-testable claims.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Three-system split + query exclusion confirmed | 2 | | | | |
| 2. Role/permission changes captured | 1 | | | | |
| 3. Retention/export + immutability gap | 2 | | | | |
| 4. GCE export behavior + detail level | 2 | | | | |
