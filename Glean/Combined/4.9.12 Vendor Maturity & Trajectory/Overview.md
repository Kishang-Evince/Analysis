# 4.9.12 - Vendor Maturity & Trajectory

### **Evaluation Field Log (V2)**

**Category:** 4.9.12 - Vendor Maturity & Trajectory
**Vendor:** Glean
**Evaluator:** Stratos Engineering
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*
**Evaluation Date:** September 14, 2026
**Overall Section Status:** All 5 fields drafted (Doc-Verified + Search-corroborated + Absence-check, honestly mixed) · Net-new section, built 2026-09-14 to close a gap against the contracted SOW (see `scrap/GLEAN_RESEARCH_MEMORY.md`) - the SOW defines this section as Tier 3, same as 4.9.1-4.9.11, but it was never built until now.

**Section scope note:** Several of this section's 5 fields evaluate vendor company trajectory rather than in-tenant product behavior, and are accordingly **not hands-on-testable in a Glean sandbox** - their companion test guides substitute public-source re-verification (release notes, review platforms, funding/press coverage) for UI walkthroughs where that's the honest form the check actually takes.

**Synthesis basis:** Fresh docs.glean.com/glean.com research this pass, plus cross-referenced findings already confirmed in this project's 4.9.1, 4.9.3, 4.9.4, 4.9.9, and 4.9.10 V2 field docs.
**Companion test guides:** [test/Glean/4.9.12 Vendor Maturity & Trajectory/V2/](../../../test/Glean/4.9.12%20Vendor%20Maturity%20%26%20Trajectory/V2/)

---

## Fields in this section

- [Field 1: Product Release Velocity](V2/Product%20Release%20Velocity.md) - cadence and substance of shipped updates (Doc-Verified)
- [Field 2: Roadmap Visibility](V2/Roadmap%20Visibility.md) - public forward-looking product transparency (Absence-check - no public roadmap found)
- [Field 3: Customer Retention Signals](V2/Customer%20Retention%20Signals.md) - G2/Gartner review data, NPS, churn/expansion signals (mixed: reviews found, NPS/churn not)
- [Field 4: Platform vs. Point Solution](V2/Platform%20vs.%20Point%20Solution.md) - platform-expansion trajectory, synthesized from this project's own prior corpus (Doc-Verified)
- [Field 5: Dependency Risk](V2/Dependency%20Risk.md) - model/cloud-provider and vendor-durability dependency assessment (Doc-Verified + Search-corroborated)

## Headline across the section

Glean's shipped-product trajectory is strong and independently verifiable - a ~2.7-release-per-month cadence over the trailing 12 months, real platform-expansion evidence (Memory, Projects, Agent Identity, MCP/A2A, AI Gateway) corroborated from this project's own prior research, and consistently positive third-party review data (4.4-4.5 stars across three distinct Gartner Peer Insights markets, 162 G2 reviews). Two genuine gaps surfaced and are reported honestly rather than papered over: no public product roadmap exists anywhere (Field 2), and no published NPS or churn/retention percentage exists anywhere (Field 3, partial). Field 5 (Dependency Risk) is the field with the most direct pre-pilot actionability - it identifies a real, dated precedent (the April 2026 Claude Sonnet context-window retirement breaking workflows) and a real structural gap (no tooling to detect which agents are at risk before a provider-forced change lands).
