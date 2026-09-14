**Glean Tier 3 Advanced Evaluation**
**Features Not Confirmed — Independent Fresh Research (V2)**

*Independent research, sources picked and read fresh this pass, cross-checked 2026-09-10 against `docs.glean.com` and third-party sources. Field definition: "Features advertised by the vendor that failed to execute, were missing, or underperformed during testing." Base file at [`../Features Not Confirmed.md`](../Features%20Not%20Confirmed.md) left untouched — this replaces the prior V2 pass with a fresh, independently-sourced one.*

**Sr No mapping:** rows 1-9 below map 1:1 to the same Sr No in the companion test guide [test/V2/Features Not Confirmed.md](../../../../test/Glean/4.9.1%20Functional%20Capabilities/V2/Features%20Not%20Confirmed.md) — same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

Two items in this pass are corrections against a prior pass's more favorable read: **ABAC is not a real, self-referential Glean capability** (no Glean-specific doc exists, and the term is entirely absent from Glean's own security-principles page), and **"RBAC" itself is also not a term Glean's own docs badge their access model with** — the page instead names "permission mirroring and least privilege." One genuine positive correction also surfaced: secrets management, previously assumed opaque, is actually reasonably well documented with real per-connector rotation guidance.

## Claims (Sr No 1-9, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | ABAC (attribute-based access control) is not a confirmed Glean capability — no Glean-specific documentation exists for it | Absence checked via targeted search + [docs.glean.com/security/security-principles](https://docs.glean.com/security/security-principles) | No Glean-specific page found describing ABAC. Direct check of the security-principles page confirms *"no mention of it anywhere."* |
| 2 | Correction: Glean's own docs don't badge their access model as "RBAC" either — the named model is "permission mirroring and least privilege" | [docs.glean.com/security/security-principles](https://docs.glean.com/security/security-principles) | Verbatim section heading: *"Permission mirroring and least privilege."* Core statement: *"Glean mirrors the access controls of every connected source system."* Role assignments exist in the Admin console (functionally RBAC-like), but the page never uses the term "RBAC" as a named framework — a prior pass's "RBAC explicitly confirmed" framing overstates the vendor's own branding. |
| 3 | OCR/multimodal document processing has two hard, non-bypassable size ceilings | [docs.glean.com/connectors/crawler-and-indexing-limits](https://docs.glean.com/connectors/crawler-and-indexing-limits) | Pre-download cutoff: *"If the size is GREATER than 64 MB, the crawler WILL NOT download the item contents."* Post-conversion indexing ceiling: content over **16.875 MB** gets truncated to the first 16.875 MB before indexing. Critically: *"Even with OCR enabled, the initial size limit of 64 MB still applies"* — OCR does not lift either ceiling. |
| 4 | Which specific connectors get OCR enabled by default is not disclosed | [docs.glean.com/connectors/crawler-and-indexing-limits](https://docs.glean.com/connectors/crawler-and-indexing-limits) | Page states only *"It is possible to turn on OCR... for certain connectors"* without naming which ones — a real, standing documentation gap. |
| 5 | Correction: secrets management is more documented than previously assumed — real per-connector rotation guidance exists | [docs.glean.com/administration/agent-identity/google-workspace](https://docs.glean.com/administration/agent-identity/google-workspace) ; [docs.glean.com/administration/agent-identity/salesforce](https://docs.glean.com/administration/agent-identity/salesforce) | Credentials are managed server-side: *"the agent never sees the raw client secret"*; credentials stored encrypted. Google Workspace has a documented rotation procedure (generate new JSON key → update Glean credential → verify → delete old key); Salesforce docs recommend regular client-secret rotation. This should be upgraded from "internals undisclosed" to "documented at the per-connector level," though the underlying storage architecture (e.g. which secrets vault/HSM) remains unconfirmed. |
| 6 | Server-side caching architecture internals remain genuinely undisclosed | Absence re-checked this pass; consistent with [developers.glean.com/guides/search/overview](https://developers.glean.com/guides/search/overview) | Only a client-side SDK example (an application-level cache wrapper pattern) was found in this pass, same as before — no internal server-side caching architecture disclosed anywhere. |
| 7 | No official Glean-published throughput or concurrent-user benchmark exists | Absence checked via targeted search across `docs.glean.com` and `glean.com` | Search surfaced only adoption stats (customer counts, department penetration) and general "elastic" marketing language — no first-party numeric throughput/concurrency benchmark found. |
| 8 | A third-party (non-Glean, potentially competitor-affiliated) source makes a concrete but unverified cost/scale claim that contradicts the "elastic" marketing framing | Third-party, [gosearch.ai/blog/glean-infrastructure-cost-breakdown](https://www.gosearch.ai/blog/glean-infrastructure-cost-breakdown/) | Claims a 20-user proof-of-concept on a bring-your-own-cloud (GCP) deployment required **26 high-memory compute nodes** and **$10,000+/month** in infrastructure cost. **This is a third-party claim from a source that appears to be a competing vendor** — not independently verified against any first-party Glean documentation, and should be treated as an unconfirmed, potentially biased data point worth a direct question to Glean's account team, not a settled fact. |
| 9 | Non-technical user experience quality cannot be resolved from documentation alone — it genuinely requires a live usability test | Absence checked; inherent to the claim type | No amount of documentation review can confirm or deny how an actual non-technical employee experiences the product day to day — this item stays open pending hands-on testing by design, not due to a research gap. |

## Independent read

- Claims 1-2 together are the field's sharpest correction: a prior pass treated RBAC as a clean "Confirmed" item and left ABAC as a simple "Not Confirmed." Fresh reading shows neither term is actually used by Glean to badge its own access-control model — the real, named model is "permission mirroring and least privilege," which is functionally RBAC-adjacent but should not be cited as "Glean confirms RBAC" without that caveat.
- Claim 5 is a genuine upgrade — don't carry forward "secrets management internals undisclosed" as a blanket statement; the per-connector rotation process is real and documented, even if the deeper storage/HSM architecture isn't.
- Claim 8 needs careful handling in any client-facing writeup: it's a specific, alarming-sounding number, but it comes from a source with an obvious potential conflict of interest (a competing search/AI vendor's own blog). Report it as "a claim to verify directly with Glean," not as an established fact.

## Confidence

**Doc-Verified** for claims 1-4, 6-7, 9; **Doc-Verified (correction)** for claim 5; **Unverified, third-party, flagged for bias** for claim 8. 6 independent sources, validation date 2026-09-10. Tenant verification tracked in the companion test guide.

**Correction note, added 2026-09-14:** if a "Glean has no persistent memory" framing has been used anywhere in client-facing summaries drawing on this project's research, it needs correcting — Glean has a real, persistent, cross-session user-level memory/personalization system (`docs.glean.com/user-guide/assistant/memory-personalization`), distinct from the 2-hour agent-step memory this project documented in `4.9.3/V2/Context Window & Memory.md` claims 1-4. See that file's claims 10-14 for the full finding. Source: full-corpus sweep of this project's local Glean documentation crawl, tracked in `scrap/GLEAN_RESEARCH_MEMORY.md`.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| ABAC | Not confirmed — no Glean-specific documentation | 1 |
| RBAC branding | Correction — Glean doesn't use the term; names "permission mirroring and least privilege" instead | 2 |
| OCR/multimodal ceilings | 64 MB pre-download, 16.875 MB post-conversion, OCR doesn't lift either | 3 |
| OCR connector coverage | Undisclosed which connectors get it by default | 4 |
| Secrets management | Correction — more documented than assumed, real rotation guidance exists | 5 |
| Server-side caching | Still undisclosed | 6 |
| Official throughput benchmark | Not found | 7 |
| Third-party cost/scale claim | Unverified, competitor-sourced, needs direct follow-up | 8 |
| Non-technical UX quality | Requires live testing, not doc-resolvable | 9 |
