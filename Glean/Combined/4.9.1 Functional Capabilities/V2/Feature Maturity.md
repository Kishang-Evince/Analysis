**Glean Tier 3 Advanced Evaluation**
**Feature Maturity — Independent Fresh Research (V2)**

*Independent research, fresh 2026-09-10, sourced against `developers.glean.com/changelog` and this session's own prior findings. Field definition: "Assessment of the platform's stability (Enterprise Production-ready, Public Beta, Early Access, Developer Sandbox)."*

**Sr No mapping:** rows 1-6 map 1:1 to [test/V2/Feature Maturity.md](../../../../test/Glean/4.9.1%20Functional%20Capabilities/V2/Feature%20Maturity.md).

## Claims

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | Very active, frequent release cadence | [developers.glean.com/changelog](https://developers.glean.com/changelog) | Multiple entries per day observed (e.g. 4 API client releases on a single date, Sept 9 2026), spanning API clients, Agent Toolkit, and platform features. |
| 2 | "Experimental" labeling is used explicitly and sparingly, not as a blanket hedge | [developers.glean.com/changelog](https://developers.glean.com/changelog) | Platform Triggers API specifically marked *"documented as an experimental release"* (Aug 20, 2026) — one of very few items so labeled; overwhelming majority of entries are stable/GA. |
| 3 | Breaking changes are explicitly flagged in the changelog, not silently shipped | [developers.glean.com/changelog](https://developers.glean.com/changelog) | Example: *"api-client-typescript v0.20.0 includes 1 breaking removal, 1 change"* — labeled breaking/action-required. |
| 4 | At least two customer-facing capabilities remain officially beta despite being in active use | Cross-session findings: [developers.glean.com/guides/chat/deep-linked-citations](https://developers.glean.com/guides/chat/deep-linked-citations) ; [pypi.org/project/glean-api-client](https://pypi.org/project/glean-api-client) | Deep-linked citations: *"REST API support is currently in Beta."* Python SDK: version `0.17.5` explicitly labeled beta, *"breaking changes without a major version bump."* |
| 5 | A major product surface (Skills) launched in 2026 explicitly framed as beta at launch | Cross-session finding, [docs.glean.com/user-guide/assistant/skills](https://docs.glean.com/user-guide/assistant/skills) | Skills shipped as *"currently in beta, admin-enableable per user/group"* — a headline feature, not a minor toggle, still carrying a beta label. |
| 6 | No published SLA or uptime-history document was found this pass | Absence checked via targeted search | No first-party page found stating historical uptime/SLA commitment numbers — maturity claims rest on release-process discipline (claims 1-3), not a disclosed reliability track record. |

## Confidence
**Doc-Verified**, 3 first-party sources + 2 cross-session findings, 2026-09-10.
