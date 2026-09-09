# Field 4: Confidence Scoring

**Category:** 4.9.11 - Client-Facing Explainability  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 6 fields drafted (Doc-Verified baseline) · Sandbox scores Pending for Field 3 UX ratings, Field 4 API probe, Field 5 correction latency  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Synthesis basis:** Fields 4.9.1, 4.9.3 Field 10, 4.9.5 Field 3/9 + docs corpus.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Confidence Scoring.md](../../../test/Glean/4.9.11 Client-Facing Explainability/Confidence Scoring.md)

---

**Field definition:** Numerical confidence scores or truth indicators attached to AI-generated answers.  
**Prerequisites / Licensing:** Client API access for response inspection; Protect+ for policy confidence (admin).  
**Confidence scoring rating (Doc-Verified):** **Not available** for end-user Assistant answers · **Internal only** for Protect+ policies and Answer ranking.  
**Confidence Level:** **Doc-Verified** (absence confirmed in product docs + API corpus)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Answers confidence language](https://docs.glean.com/user-guide/knowledge/answers/what-are-answers-and-how-do-they-work) · [Protect+ policies](https://docs.glean.com/administration/protect/ai-security/policies-and-examples) · [Guardrails Insights release](https://docs.glean.com/release-notes/releases/2026-08-18-august-release) · [Client API chat basic usage](https://developers.glean.com/api-info/client/getting-started/basic-usage) · Cross-ref [4.9.3 Field 9](../4.9.3%20AI%20Architecture%20&%20Models/Overview.md)

### Confidence signal inventory

| Signal | Visible to end user? | Numerical score? | Notes |
|---|---|---|---|
| Assistant answer quality | Thumbs up/down only | **No** | Qualitative feedback |
| Answer ranking ("highly confident") | Answers pinned to top | **No** numeric | Internal ranking only |
| Citations present/absent | Yes | **No** | Proxy for grounding, not confidence % |
| Verified document badge | Green badge on search hit | **No** | Human verification, not AI score |
| Protect+ harmful content | Block/warn in UI | **Yes** - per-category thresholds | Admin/policy layer; not answer truth |
| Guardrails Insights dashboard | Admin only | Policy confidence trends | Protect+ licensed |
| Client API `chat.create` response | Developer | **No** `confidence` field in standard schema | Citations + fragments only |
| MCP support prompts | Example text only | Suggests "confidence level" in prompt | **Not** platform feature |

### Engineering observation (Doc-Verified)

- Glean marketing/perspective pages discuss confidence scores in **generic AI industry** context - **not** shipped as user-facing Assistant feature in tenant eval corpus.
- Healthcare/compliance buyers often expect **% confidence or "needs review" flag** - Glean relies on **citations + human verification** instead.
- Protect+ confidence is for **safety categories** (toxic/injection), not factual accuracy.

### Verification steps / test case

1. `client.chat.create()` - inspect JSON response for `confidence`, `score`, `similarity` fields - document **absent**.
2. Assistant UI - confirm no % or truth meter on cited answer.
3. Protect+ admin - confirm per-category scores on test injection (if licensed).
4. Compare to client requirement: if numeric confidence mandatory, flag as **gap**.

**Risk & Cost Impact:** Risk: **Medium** for regulated RFP workflows expecting scores | Cost: Workaround = Answers + human review queue

---
