# Field 2: License Structure Details

**Category:** 4.9.7 - Pricing & TCO  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 5 fields drafted (pricing mechanics Doc-Verified) · Dollar amounts Pending Contract / quote  
**Baseline model:** 100-seat enterprise deploy, tenant stack only (Notion, Teams, Outlook, OneDrive, Gmail, Drive/Docs/Sheets).  
**Important:** Glean publishes **pricing mechanics**, not public list prices. All dollar figures below are **Pending Contract** unless marked Vendor-Stated.
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [License Structure Details.md](../../../test/Glean/4.9.7 Pricing & TCO/License Structure Details.md)

---

**Field definition:** SaaS license models (per-seat, volume consumption, hybrid flex-credits).  
**Prerequisites / Licensing:** Know which commercial model on contract — **Enterprise Flex** vs **Core Suite + Model Hub**.  
**License model (Doc-Verified):** **Hybrid** — per-user/month seats + pooled consumption (FlexCredits or Model Hub tokens).  
**Confidence Level:** **Doc-Verified**  
**Validation Date:** September 3, 2026  
**Source URLs:** [Enterprise Flex pricing](https://docs.glean.com/glean-enterprise-flex-pricing) · [Core Suite pricing](https://docs.glean.com/glean-core-suite-pricing) · [FlexCredits dashboard](https://docs.glean.com/administration/management/usage/flexcredits-dashboard) · [Core Suite usage dashboard](https://docs.glean.com/administration/management/usage/gleancoresuite-dashboard) · [Usage limits and alerts](https://docs.glean.com/administration/management/usage/set-usage-limits-and-alerts)

### Model A — Enterprise Flex (primary AI-heavy path)

| Component | Structure | Included in seat |
|---|---|---|
| **Enterprise Flex Seat** | Per-user, per-month | Fast Mode unlimited; Thinking/Adaptive Standard up to **100/user/week**; Collections, Go Links, Agent Builder, Platform/Indexing APIs |
| **FlexCredits** | Org-level pooled credits; base pool in agreement + purchasable packs | Premium models, agents, deep research, slides, meeting notes, Client APIs, MCP |
| **FlexCredit rate card** | Published consumption units (not $/credit) | Agent Run typical **~7** median, **~114** p90 FlexCredits per run |
| **Site-wide annual add-ons** | Not per-seat | **Protect+**, **Premium Support** |

### Model B — Core Suite + Model Hub

| Component | Structure | Notes |
|---|---|---|
| **Core Suite Seat** | Per-user, per-month | Search, connectors, base Protect, Search API, surfaces |
| **Model Hub Usage** | Upfront commit; pass-through token rates per model (published $/M tokens for 50+ models) | Powers Thinking/Adaptive/Agents/LLM-backed APIs |
| **Flexible Model Management** | % of total LLM usage | Percentage **not published** |
| **API caveat** | Human-scale included | Machine-scale without seat coverage = additional fees |

### Engineering observation (Doc-Verified)

- Two models may coexist during migration — confirm which applies to Stratos tenant.
- Auto model selector can silently consume FlexCredits when Premium models selected — admins can disable Premium models.
- Thinking queries consuming **>30 FlexCredits** count as multiple queries against weekly included allowance.
- Assistant queries routing to agents consume FlexCredits on the agent run.

### Verification steps / test case

1. Contract review: Flex vs Core Suite designation.
2. Admin → Usage dashboard — confirm FlexCredits vs Model Hub dollars view.
3. Run 10 agent runs — record FlexCredit burn against rate card medians.
4. Set usage alerts at 80% of pooled credits (Admin → Usage limits).

**Risk & Cost Impact:** Risk: Medium (consumption surprise on agent-heavy rollout) | Cost: Metered beyond included pool

---
