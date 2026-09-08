# Field 7: Switching Cost Assessment

**Category:** 4.9.9 - Competitive Positioning  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 7 fields drafted (Doc-Verified + prior eval synthesis) · Client-specific displacement map Pending  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Synthesis basis:** Fields 4.9.1–4.9.8 eval logs + Glean compare/perspective pages.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Switching Cost Assessment.md](../../../test/Glean/4.9.9 Competitive Positioning/Switching Cost Assessment.md)

---

**Field definition:** Friction, re-architecting fees, and retraining required to migrate off this platform.  
**Prerequisites / Licensing:** Deployment depth assessment (pilot vs production).  
**Switching cost rating (Doc-Verified / synthesis):** **Moderate platform lock-in**; lower LLM lock-in than Copilot/ChatGPT.  
**Confidence Level:** **Doc-Verified**  
**Validation Date:** September 3, 2026  
**Source URLs:** [Adaptability vs Claude Enterprise](https://www.glean.com/perspectives/how-gleans-adaptability-stacks-up-against-claude-enterprise) · [Integrating OpenAI models](https://www.glean.com/perspectives/integrating-openai-models-with-enterprise-ai-a-comparison) · Cross-ref [4.9.2](../4.9.2%20Agent%20&%20Workflow%20Builder/Overview.md), [4.9.6](../4.9.6%20Adoption%20&%20Readiness/Overview.md), [4.9.7](../4.9.7%20Pricing%20&%20TCO/Overview.md)

### Switching **away from** Glean (exit friction)

| Asset locked in Glean | Migration difficulty | Notes |
|---|---|---|
| **Search index + Enterprise Graph** | **High** | Cannot export to competitor; rebuild connectors |
| **Published agents + workflows** | **High** | Rebuild in new platform or Copilot Studio |
| **Answers, Collections, Go Links** | **Medium** | Manual export or recreate |
| **Protect rules + Findings history** | **Medium** | Policy reconfiguration |
| **FlexCredit / contract commits** | **Medium–High** | Multi-year + overage sunk cost (4.9.7) |
| **User habits** (extension, Teams pin, OAuth) | **Medium** | Retraining (4.9.6) |
| **Custom connectors / Indexing SDK** | **High** | PS investment lost (4.9.4) |
| **Cloud-Prem deployment** | **Very High** | Infra teardown + data residency re-plan |

**Exit difficulty for Stratos tenant pilot:** **Low–Medium** (native connectors only, no custom SDK, limited agent library).

### Switching **to** Glean (adoption friction)

| Factor | Effort | Notes |
|---|---|---|
| **Connector setup (tenant stack)** | **Medium** (4–16h first deploy) | M365 cert + Notion share (4.9.1 Field 6) |
| **People data + SSO** | **Low–Medium** | Prerequisite |
| **Extension + Teams deploy** | **Medium** | Required for adoption (4.9.6) |
| **LLM migration from Copilot** | **Low** (model layer) | Model Hub swap; Glean claims "infrastructure update not migration" |
| **User retraining** | **Medium** | Prompting, OAuth, new search habits |
| **Contract / procurement** | **Medium** | Quote-based; marketplace path optional (4.9.8) |

### Lock-in paradox (honest)

- Glean **reduces LLM vendor lock-in** vs Copilot (Azure/OpenAI) or ChatGPT Enterprise (OpenAI-only) — Model Hub + BYOK (4.9.3).
- Glean **increases platform/context lock-in** — index, agents, credits, Protect are Glean-specific.
- Vendor claim "no lock-in" is **true for models**, **false for platform** at production depth.

### Verification steps / test case

1. Inventory Glean-specific assets in pilot: agent count, Go Links, Answers, custom configs.
2. Estimate rebuild hours if switching to Copilot Studio + Graph connectors in 24 months.
3. Contract review: renewal uplift, data export/portability clause, termination data deletion SLA.
4. Rate client exit difficulty: **Low** (pilot) / **Medium** (production + agents) / **High** (Cloud-Prem + custom SDK).

**Risk & Cost Impact:** Risk: Medium (3-year commits) | Cost: Exit = full re-implementation PS
