# 4.9.1 Performance Under Load — Independent Research Test Guide

**Purpose:** Hands-on verification of every claim in the companion research doc [V2/Performance Under Load.md](../../../../Glean/Combined/4.9.1%20Functional%20Capabilities/V2/Performance%20Under%20Load.md), using the tenant's real test stack to generate load.

**Tenant entry:** `https://app.glean.com` (Search) + a terminal with a Glean API token
**Companion research doc:** [V2/Performance Under Load.md](../../../../Glean/Combined/4.9.1%20Functional%20Capabilities/V2/Performance%20Under%20Load.md)
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.
**Out of scope:** Salesforce, Slack, Jira, Confluence, Snowflake/BigQuery, GitHub, etc.

**Prerequisites:**
- Complete [Pre-Flight](../Pre-Flight.md): `Stratos_Connector_Test_Doc` and `Stratos_Connector_Test_Sheet` in Google Drive must be indexed and searchable.
- A Glean API token and terminal for Sr No 2.
- Access to your Glean account team for Sr No 1, 3, 5.
- Knowledge of which cloud (GCP/AWS) and, if GCP, which region your tenant runs in — ask your account team if unsure.

**Sr No mapping:** Sr No 1-5 map 1:1 to the research doc's claims table.
**How to record a result:** `Pass`/`Fail`/`Partial`/`Blocked` in Result, plus one line in Notes on exactly what you observed.
**Effort column:** minutes + `Easy`/`Hard` difficulty tag.

---

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | No official throughput/concurrency benchmark is published | 1. Ask your Glean account team, in writing: *"Can you share a first-party throughput or concurrent-user benchmark document for a deployment our size?"* | They provide none, or only generic marketing language ("elastic," "scales with your org") rather than a number. | | | ~10 min active + wait for reply, Easy |
| 2 | The documented rate-limit quota needs fresh, direct confirmation | 1. In a script, fire Search API requests against `Stratos_Connector_Test_Doc` in a tight loop, counting how many succeed before you get a `429`.<br>2. Record that count as your tenant's real, current quota. | You obtain a real, current number for your own tenant rather than relying on a possibly-outdated figure from documentation. | | Stop once you've confirmed the quota — don't sustain the burst | ~20 min, Hard |
| 3 | The third-party infrastructure-cost claim (26 nodes, $10k+/month for 20 users) needs direct verification, not acceptance | 1. Ask your Glean account team, in writing: *"A third-party blog claims a 20-user Customer Hosted POC required 26 high-memory nodes and $10K+/month — can you confirm or refute this for a comparable deployment?"* | You get a direct, comparable answer from Glean, confirming, refuting, or contextualizing the number. | | Same question as the Features Not Confirmed guide Sr No 8 — reuse if already asked | ~10 min active + wait for reply, Easy (or ~0 min if reused) |
| 4 | Marketing's "sub-second response" claim holds up under a real, timed test | 1. In Search, run 10 different queries against `Stratos_Connector_Test_Doc` and `Stratos_Connector_Test_Sheet` (mix of exact-title and paraphrased queries), timing each with a stopwatch or your browser's network tab.<br>2. Calculate the median response time across the 10 queries. | Median response time is under 1 second — or, if not, you have a real number to report instead of accepting the marketing claim. | | | ~20 min, Easy |
| 5 | GCP region choice has a documented, real hardware/performance consequence | 1. Confirm your tenant's cloud provider and, if GCP, its region (ask your account team if not visible in Admin Console → About Glean).<br>2. Compare it against the 3 "preferred" (TPU) regions found in research: `us-central1` (Iowa), `asia-east1` (Taiwan), `europe-west4` (Netherlands).<br>3. If your region differs, ask your account team to confirm whether the higher non-preferred/GPU cost tier applies to your tenant. | Either you're in a preferred region (TPU), or your account team confirms the higher-cost GPU tier applies — matching the documented pattern. | | Same test as the Model Hosting Location guide Sr No 5 — reuse if already run | ~15 min, Hard (or ~0 min if reused) |

---

## Result Rollup

| Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|
| 5 | | | | |

Copy results back into [V2/Performance Under Load.md](../../../../Glean/Combined/4.9.1%20Functional%20Capabilities/V2/Performance%20Under%20Load.md).
