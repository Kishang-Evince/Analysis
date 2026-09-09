# Field 2: Honest Weaknesses

**Category:** 4.9.9 - Competitive Positioning  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 7 fields drafted (Doc-Verified + prior eval synthesis) · Client-specific displacement map Pending  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Synthesis basis:** Fields 4.9.1–4.9.8 eval logs + Glean compare/perspective pages.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Honest Weaknesses.md](../../../test/Glean/4.9.9 Competitive Positioning/Honest Weaknesses.md)

---

**Field definition:** Validated system limitations, missing features, and necessary workarounds.  
**Prerequisites / Licensing:** Prior eval Fields 2–4 across 4.9.1–4.9.7.  
**Weakness summary (Doc-Verified / Tested):** Notion ACL gap, crawl lag, pricing opacity, OAuth friction, no air-gap, consumption surprise risk.  
**Confidence Level:** **Tested** / **Doc-Verified** (not marketing spin)  
**Validation Date:** September 3, 2026  
**Source URLs:** Cross-ref [4.9.1 Field 2](../4.9.1%20Functional%20Capabilities/Overview.md), [4.9.4 Field 3](../4.9.4%20Integration%20&%20Technical/Overview.md), [4.9.5 Field 6](../4.9.5%20Compliance%20&%20Regulatory/Overview.md), [4.9.7](../4.9.7%20Pricing%20&%20TCO/Overview.md) · [Notion permissions](https://docs.glean.com/connectors/native/notion/about)

### Validated weaknesses (honest catalog)

| Weakness | Severity | Evidence |
|---|---|---|
| **Notion indexed corpus NOT ACL-aware** | **High** | Anything shared with integration visible org-wide; Live Mode only fix (4.9.5 Field 6) |
| **Crawl lag / green ≠ indexed** | **Medium** | Notion ~6h; OneDrive ~hourly; Gmail polling not webhooks (4.9.4 Field 3) |
| **Per-user OAuth for agent tools** | **Medium** | `tools_unauthorized` until Google/Microsoft/Notion OAuth (4.9.1, 4.9.2) |
| **No public pricing / FlexCredit opacity** | **Medium** | TCO not computable from docs; Protect+ add-on (4.9.7) |
| **Notion/Teams absent as content triggers** | **Medium** | Limits proactive automation on tenant stack (4.9.2 Field 10) |
| **No true on-prem / air-gap** | **High** (for some buyers) | Cloud-Prem only; no appliance (4.9.3 Field 3) |
| **Protect+ not in base seat** | **Medium** | AI security guardrails are add-on (4.9.5 Field 9) |
| **Admin audit ≠ user activity log** | **Low–Medium** | Fragmented observability (4.9.5 Field 3) |
| **Personal Notion path immature** | **Medium** | Workspace-admin + share model (4.9.1 Field 2) |
| **No customer LLM fine-tuning** | **Low** (most buyers) | RAG-only quality path (4.9.3 Field 5) |

### Marketing vs eval honesty check

| Glean marketing claim | Eval counter-evidence |
|---|---|
| "Permissions enforced across all connectors" | Notion indexed path breaks per-user ACL |
| "Near real-time sync" | Notion 6h, OneDrive hourly |
| "Simple day-one deploy" | Medium config complexity; OAuth + Notion share (4.9.1 Field 6) |
| "Flexible predictable pricing" | No list price; FlexCredit surprise risk (4.9.7) |
| "Avoids lock-in" | Platform index + agents create exit cost (Field 7 below) |

### Verification steps / test case

1. Notion ACL gap test - share page with integration, confirm all connector users see it.
2. Time OneDrive upload to search hit - document lag vs Drive webhook speed.
3. List weaknesses in client-facing advisory with severity tags - no spin.
4. Compare weakness list to Glean compare pages - note omissions.

**Risk & Cost Impact:** Risk: **High** if weaknesses not disclosed pre-sale (Notion/healthcare) | Cost: Mitigation = connector segmentation + Live Mode

---
