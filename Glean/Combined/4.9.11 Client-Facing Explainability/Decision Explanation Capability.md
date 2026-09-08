# Field 1: Decision Explanation Capability

**Category:** 4.9.11 - Client-Facing Explainability  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 6 fields drafted (Doc-Verified baseline) · Sandbox scores Pending for Field 3 UX ratings, Field 4 API probe, Field 5 correction latency  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Synthesis basis:** Fields 4.9.1, 4.9.3 Field 10, 4.9.5 Field 3/9 + docs corpus.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Decision Explanation Capability.md](../../../test/Glean/4.9.11 Client-Facing Explainability/Decision Explanation Capability.md)

---

**Field definition:** Platform capability to explain prompt selections and routing choices made by AI agents.  
**Prerequisites / Licensing:** Assistant + Agents enabled; Thinking/Adaptive mode for best citation coverage.  
**Explanation rating (Doc-Verified):** **Strong on source attribution** (citations, deep links) · **Weak on routing transparency** (Waldo/retrieval plan not shown to end users).  
**Confidence Level:** **Doc-Verified** · **Partial Tested** (citations in 4.9.1 F1.3)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Glean citations](https://docs.glean.com/user-guide/assistant/glean-chat/glean-chat-citations/glean-citations) · [Deep-linked citations](https://docs.glean.com/user-guide/assistant/glean-chat/glean-chat-citations/deep-linked-citations) · [Adaptive reasoning / Waldo](https://docs.glean.com/administration/assistant/features/adaptive-reasoning) · [Debug agent](https://docs.glean.com/agents/create-agents/debug-agent) · Cross-ref [4.9.3 Field 6](../4.9.3%20AI%20Architecture%20&%20Models/Overview.md), [4.9.3 Field 10](../4.9.3%20AI%20Architecture%20&%20Models/Overview.md)

### What Glean explains to clients/users

| Surface | User-visible explanation | Routing/model logic exposed? |
|---|---|---|
| **Assistant Chat** | Inline citation markers; **View sources** panel; hover preview; deep-linked passage when enabled | **No** — Waldo retrieval plan hidden |
| **Search** | Ranked results with snippets; verified badge | **No** — ranking opaque |
| **Answers** | Curated human-authored card pinned when match confident | **No** score shown |
| **Agents (runtime)** | Step output text + citations in response | **No** — unless builder uses Debug in Preview |
| **Agents (Debug mode)** | Step list, spans, I/O, model metadata | **Yes** — builder/admin only; not Azure-hosted |
| **Deep Research** | Multi-page report with linked citations | **No** intermediate reasoning chain to user |

### Engineering observation (Doc-Verified)

- Citations **never grant new access** — explanation is permission-bound; User B sees masked sources in shared chats.
- Fast mode may skip retrieval — answer without citations; docs say absence of citations ≠ hallucination.
- Adaptive reasoning: Waldo plans searches **before** frontier model; user sees final answer only.
- For client-facing explainability: **"show your work" = citations**, not **"show your routing"**.

### Verification steps / test case

1. Assistant query on `Stratos_Connector_Test_Doc` — confirm inline citation + deep link opens correct passage.
2. Same query in Fast vs Thinking — compare citation count (Thinking should be richer).
3. Turn off **Use company sources** — confirm uncited general-knowledge response; document disclaimer behavior.
4. Agent Preview with Debug — export step trace for Drive→Notion workflow; confirm not visible to end user in published agent.
5. Ask *"Why did you choose these sources?"* — note whether Assistant explains retrieval vs deflects.

**Risk & Cost Impact:** Risk: Medium (users trust uncited Fast answers) | Cost: Native

---
