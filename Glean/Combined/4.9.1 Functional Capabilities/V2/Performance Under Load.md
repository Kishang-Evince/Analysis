**Glean Tier 3 Advanced Evaluation**
**Performance Under Load — Independent Fresh Research (V2)**

*Independent research, fresh 2026-09-10, combining new checks with this session's own prior cross-field findings. Field definition: "System latency, concurrency, and compute consumption when handling concurrent tasks."*

**Sr No mapping:** rows 1-5 map 1:1 to [test/V2/Performance Under Load.md](../../../../test/Glean/4.9.1%20Functional%20Capabilities/V2/Performance%20Under%20Load.md).

## Claims

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | No official first-party throughput/concurrency benchmark is published | Absence checked via targeted search, 2026-09-10 | Search across `docs.glean.com`/`glean.com` surfaced only adoption stats and general "elastic" marketing language — no numeric benchmark found. |
| 2 | Documented rate-limit behavior exists, but the exact quota figure was not independently re-verified this pass | [developers.glean.com/guides/search/overview](https://developers.glean.com/guides/search/overview) | A documented `429` retry pattern exists (see Error Handling & Recovery field); the specific qpm token-bucket number cited in earlier research was not re-confirmed live this pass and should be treated as inherited, not freshly verified. |
| 3 | An unverified third-party claim suggests meaningfully higher infrastructure requirements than "elastic" marketing framing implies | Third-party, [gosearch.ai/blog/glean-infrastructure-cost-breakdown](https://www.gosearch.ai/blog/glean-infrastructure-cost-breakdown/) | Same claim as Features Not Confirmed Sr No 8: a 20-user Customer Hosted POC allegedly required 26 high-memory nodes and $10k+/month. Source has a likely competitive conflict of interest — flag for direct verification with Glean, don't accept as fact. |
| 4 | Marketing claims sub-second response times, not independently timed this pass | [developers.glean.com/guides/search/overview](https://developers.glean.com/guides/search/overview) | *"Fast search with sub-second response times"* — a stated claim, not a measurement made during this research pass. |
| 5 | GCP region choice has a documented, real hardware/performance consequence under load | Cross-session finding (Model Hosting Location field), [docs.glean.com/get-started/prepare/self-hosted-deployment/gcp/supported-gcp-regions](https://docs.glean.com/get-started/prepare/self-hosted-deployment/gcp/supported-gcp-regions) | Only 3 "preferred" GCP regions get TPU-backed inference; every other supported region falls back to GPU, at higher cost — a real, documented performance/cost tradeoff tied directly to deployment choice. |

## Confidence
**Doc-Verified** for claims 1, 2, 4-5; **Unverified, third-party, flagged for bias** for claim 3. 2026-09-10.
