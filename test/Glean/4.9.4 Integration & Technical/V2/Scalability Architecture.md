# 4.9.4 Scalability Architecture - Independent Research Test Guide

**Purpose:** Hands-on verification of every claim in the companion research doc [V2/Scalability Architecture.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Scalability%20Architecture.md). The core finding there is that Glean publishes no hard tenant-size ceiling (max users, max documents, max query volume), but does publish a concrete numeric API rate-limit schedule and some real-world scale signals. This guide's job is to confirm those published numbers hold against this tenant's actual Admin Console, and to get Perimeter Healthcare's own tenant-specific limits directly from Glean, since no public source states them. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** Admin Console → Platform (for usage/quota visibility) · Admin Console → Analytics/Usage (if available)
**Companion research doc:** [V2/Scalability Architecture.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Scalability%20Architecture.md)

**Prerequisites (what you need before starting):**
- Admin access to the Glean Admin Console.
- Your Glean Account Executive (AE) or Customer Success/Support contact's email or ticketing channel - several rows here require asking Glean directly, since no public source discloses tenant-specific limits.
- Perimeter Healthcare's projected user count and data volume (approximate number of licensed users, and rough document/data-source volume) to hand to your AE when asking about limits.
- Admin/API access sufficient to generate an API token, if testing rate limits directly (optional, Sr No 4).

**Sr No mapping:** Sr No 1-8 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Scalability Architecture.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Scalability%20Architecture.md#claims-sr-no-1-8-mapped-to-test-guide) - same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you observed. "Pass" means you personally saw it happen - not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag - `Easy` (routine console check or an email to Glean) or `Hard` (needs a real load/usage test, or waiting on a vendor response).

---

## Section 1 - Confirming no hard tenant-size ceiling exists, and getting Perimeter's real numbers from Glean - Sr No 1

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | No public documentation states a maximum users/documents/query-volume ceiling - ask Glean directly what (if any) limits or soft-caps apply to this specific tenant given Perimeter Healthcare's projected scale | 1. Check Admin Console → Platform (and any Usage/Analytics section) for any visible quota, cap, or "approaching limit" warning.<br>2. Email/ticket your Glean AE or Support with Perimeter's projected user count and approximate data volume (number of connectors, rough document count), and ask explicitly: "Are there any documented or soft limits on users, indexed documents, or query volume for our tenant size?"<br>3. Record their answer verbatim, even if the answer is "no hard limit, infrastructure scales with your plan." | Either the Admin Console shows a visible quota/cap, or Glean's AE/Support gives a concrete, written answer (even if that answer is "no hard limit") - closing the field's core evaluation question with a real, tenant-specific response instead of an absence. | | This is the single most important row in this guide - it directly closes the field's own "observed or documented limits" question for this tenant | ~30-45 min (Console check) + vendor response time, Easy but Blocked-pending-vendor |

## Section 2 - Confirming the published API rate-limit schedule - Sr No 2-4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 2 | Deployment-wide (8,000 req/min), per-IP (100 req/s), and per-user-token (30 req/s) rate limits apply as documented | 1. Check Admin Console for any API/developer settings page listing rate limits for this tenant.<br>2. If available, ask your Glean AE/Support to confirm whether these published limits (8,000/min deployment-wide; 100/s per IP; 30/s per token) apply as-is to this tenant, or whether Perimeter's contract/plan has different negotiated limits. | You get written confirmation that either the published limits apply as-is, or Perimeter has different (likely higher, for an Enterprise/regulated-industry plan) negotiated limits - either answer closes the gap. | | | ~20 min, Easy |
| 3 | Generative endpoints (chat, agent runs, summarize) are throttled far more tightly (0.5 req/s) than search/read endpoints (5-10 req/s) | 1. If your team has any automation or integration planned against Glean's Chat or Agents API, review the planned request volume against the documented 0.5 req/s ceiling.<br>2. Flag to your technical team whether any planned use case (e.g. bulk agent runs, batch summarization) would exceed this ceiling and require the `X-Glean-ActAs` global-token workaround (Sr No 4) or a different design. | Your team has a documented answer on whether any planned integration would hit the 0.5 req/s generative-endpoint ceiling, and what mitigation (if any) is needed. | | Directly relevant if Perimeter plans any high-volume agent automation (e.g. bulk clinical-document summarization) | ~20 min, Easy |
| 4 | The `X-Glean-ActAs` global-token mechanism genuinely distributes load across per-user quotas rather than hitting one shared ceiling | 1. If your team has API/admin access, review Glean's developer documentation for the `X-Glean-ActAs` header and global-token setup.<br>2. If a real integration is planned, ask your Glean AE/Support or solutions engineer to confirm this mechanism is available and supported for Perimeter's plan tier, and get written guidance on how to configure it. | You get confirmation (from docs or from Glean directly) that this load-distribution mechanism is available and usable for Perimeter's planned integration volume. | | Optional/lower-priority unless Perimeter has a specific high-volume integration planned | ~15 min, Easy (or Blocked if no integration is planned yet - mark N/A) |

## Section 3 - Confirming real-world scale signals and the Customer-Hosted compute-cost concern - Sr No 5-7

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | Glean's published aggregate platform scale (27B+ documents, 20T tokens/year, 700+ customers) is current and Glean can speak to where a healthcare-sized deployment like Perimeter's would fall within that range | 1. Ask your Glean AE whether these public figures are still current.<br>2. Ask them to characterize, even roughly, where a deployment of Perimeter's size (approximate user count, connector count) would typically fall relative to Glean's customer base (e.g. "small," "mid-market," "enterprise") - useful context for what support/scaling tier to expect. | You get a qualitative or quantitative answer positioning Perimeter's expected deployment size within Glean's customer base. | | Informational/context-setting, not a hard requirement | ~15 min, Easy |
| 6 | Glean has real named customers operating at large single-tenant scale (e.g. Booking.com at 14,000 employees) - ask whether any comparable healthcare/regulated-industry reference customer exists at a scale near Perimeter's | 1. Ask your Glean AE for a reference customer (ideally healthcare or another regulated industry) operating at a user scale comparable to Perimeter's projected deployment.<br>2. If offered, request a reference call or case study specific to that comparable deployment. | You get either a named comparable reference customer, or an explicit "no directly comparable reference available" answer - either closes the gap honestly. | | | ~20 min, Easy (interview/request-based) |
| 7 | The third-party (competitor-published) claim of 26 compute nodes / ~$10K+/month for a 20-user Customer-Hosted POC should be checked against Glean's own guidance if Perimeter is considering the Customer-Hosted (BYO-cloud) path rather than standard SaaS | 1. If Perimeter is evaluating Customer-Hosted/BYO-cloud deployment (per `Infrastructure Requirements.md` in this project), ask your Glean deployment engineer directly for realistic compute-node counts and estimated cloud spend for a pilot/POC at Perimeter's expected initial user count.<br>2. Compare their answer against the third-party claim (26 nodes, ~$10K+/month for 20 users) - note whether Glean's own guidance is in the same range, materially lower, or they decline to give a number. | You get a real, Glean-sourced compute/cost estimate to compare against the third-party claim, closing this as either corroborated, contradicted, or still-unknown. | | Skip/mark `N/A (SaaS-hosted, not Customer-Hosted)` if Perimeter is not evaluating the BYO-cloud path | ~30 min, Medium (vendor-response-dependent) |

## Section 4 - Monitoring for real rate-limit or scaling issues during a usage-spike period - Sr No 8

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 8 | No auto-scaling/multi-region mechanics are disclosed publicly - confirm whether this tenant experiences any rate-limit errors (HTTP 429) or degraded performance during a real usage spike, and ask Glean what scaling mechanism (if any) responds to it | 1. Identify or create a real usage-spike period (e.g. a training/rollout day with many new users onboarding, or a planned bulk-indexing/connector-sync event).<br>2. During that period, monitor Admin Console logs and any integration logs for HTTP 429 responses or reported slowdowns.<br>3. Separately, ask your Glean AE/Support what auto-scaling or failover mechanism (if any) applies to this tenant's dedicated infrastructure under load, since no public doc states this. | Either no rate-limit errors/degradation are observed during the spike (a positive result), or specific 429s/slowdowns are captured with timestamps for follow-up with Glean; and Glean provides a written answer (even "not disclosed") on the underlying scaling mechanism. | | This is the field's most direct real-world test of "how the platform handles growth" | ~1-2 hrs active monitoring during a real spike event, Hard |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Scalability Architecture.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Scalability%20Architecture.md), and specifically add Perimeter Healthcare's actual tenant-specific limits/answers from Sr No 1 and 7 - those close the field's most explicitly-requested gaps ("observed or documented limits").

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Hard ceiling confirmation (vendor ask) | 1 | | | | |
| 2. API rate-limit schedule confirmation | 3 | | | | |
| 3. Scale signals & Customer-Hosted compute-cost check | 3 | | | | |
| 4. Real usage-spike monitoring | 1 | | | | |
