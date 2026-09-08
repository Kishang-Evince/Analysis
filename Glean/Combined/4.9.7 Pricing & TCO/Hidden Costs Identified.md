# Field 4: Hidden Costs Identified

**Category:** 4.9.7 - Pricing & TCO  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 5 fields drafted (pricing mechanics Doc-Verified) · Dollar amounts Pending Contract / quote  
**Baseline model:** 100-seat enterprise deploy, tenant stack only (Notion, Teams, Outlook, OneDrive, Gmail, Drive/Docs/Sheets).  
**Important:** Glean publishes **pricing mechanics**, not public list prices. All dollar figures below are **Pending Contract** unless marked Vendor-Stated.
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Hidden Costs Identified.md](../../../test/Glean/4.9.7 Pricing & TCO/Hidden Costs Identified.md)

---

**Field definition:** Unpublicized fees, mandatory support tier overheads, API overage, connector dev, hardware.  
**Prerequisites / Licensing:** Full contract + order form review; Admin usage dashboards.  
**Hidden cost catalog (Doc-Verified):** Categories documented; magnitudes **Pending Contract**.  
**Confidence Level:** **Doc-Verified** (categories) · **Pending Contract** (fees)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Enterprise Flex pricing](https://docs.glean.com/glean-enterprise-flex-pricing) · [Core Suite pricing](https://docs.glean.com/glean-core-suite-pricing) · [MCP about pricing](https://docs.glean.com/administration/platform/mcp/about) · [Protect overview](https://docs.glean.com/administration/protect/overview) · [Usage limits](https://docs.glean.com/administration/management/usage/set-usage-limits-and-alerts) · [Website terms](https://www.glean.com/website-terms) · [Cloud-prem cost controls](https://docs.glean.com/security/cloud-prem/aws/cost-controls)

### Hidden / add-on cost inventory

| Cost item | Billing model | Doc evidence | Stratos relevance |
|---|---|---|---|
| **Protect+** | Site-wide **annual fee** | Flex pricing table; not in base seat | Required for AI security guardrails (4.9.5 Field 9) |
| **Premium Support** | Site-wide **annual fee**; 24×7, 1-hr critical SLA | Flex pricing; legacy sample **+12% of license** for premium vs business support | Enterprise clients often mandatory |
| **FlexCredit overage** | Packs beyond base pool | Rate card adjusts periodically; in-flight queries may complete past hard cap | Agent-heavy tenants |
| **Model Hub overage** | Beyond upfront commit | Core Suite token pass-through | If on Core Suite model |
| **Flexible Model Management fee** | % of LLM usage | Rate unpublished | Core Suite only |
| **Client API / MCP** | FlexCredits (Flex) or Model Hub tokens (Core) | MCP Gateway may be usage-based (2026 release notes) | Cursor/SDK integration |
| **Machine-scale API** | Additional fees without seat coverage | Core Suite pricing caveat | Automation at scale |
| **Custom connector PS** | Paid SOW | Website terms Exhibit A | Out of scope unless needed |
| **Customer Hosted infra** | Customer AWS/GCP bill | EKS, RDS, S3, etc. | Only if Cloud-Prem |
| **BYOK provider costs** | Direct to OpenAI/Vertex/Bedrock | Separate from Glean license | If Customer Key mode |
| **Third-party LLM training** | N/A if ZDR/BYOK | Contractual | Universal Key ZDR claim |

### Engineering observation (Doc-Verified)

- Base **Glean Protect** included in seat; **Protect+** is separate — common "hidden" upsell for regulated clients.
- FlexCredit rate card publishes **units per feature**, not dollars — must map credits to $ via contract.
- Usage dashboards support alerts at thresholds — operational control, not cost elimination.

### Verification steps / test case

1. Contract line-item review: Protect+, Premium Support, base FlexCredit pool size, overage $/credit.
2. Admin → Usage — 30-day burn rate extrapolated to annual overage.
3. Confirm MCP and Client API consumption appearing in FlexCredits dashboard.
4. Compare Premium Support flat fee vs 12% legacy sample — whichever applies.

**Risk & Cost Impact:** Risk: **High** (Protect+ + Premium Support + overage stack) | Cost: Often +15–30% above seat line (estimate until quote)

---
