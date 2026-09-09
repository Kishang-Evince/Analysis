# Field 1: Honest Strengths

**Category:** 4.9.9 - Competitive Positioning  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 7 fields drafted (Doc-Verified + prior eval synthesis) · Client-specific displacement map Pending  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Synthesis basis:** Fields 4.9.1–4.9.8 eval logs + Glean compare/perspective pages.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Honest Strengths.md](../../../test/Glean/4.9.9 Competitive Positioning/Honest Strengths.md)

---

**Field definition:** Proven technical or functional advantages where the platform leads competitors.  
**Prerequisites / Licensing:** Sandbox validation from 4.9.1 Fields 1–3; compare pages for vendor benchmarks.  
**Strength summary (Doc-Verified / Tested):** Permission-aware cross-app RAG, hybrid M365+GWS coverage, Model Hub multi-LLM, agentic layer on unified index.  
**Confidence Level:** **Tested** (tenant ACL/search) · **Vendor-Stated** (benchmarks vs Copilot/ChatGPT)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Glean vs Copilot](https://www.glean.com/compare/glean-vs-copilot) · [Glean vs ChatGPT Enterprise](https://www.glean.com/compare/glean-vs-chatgpt-enterprise) · [Key differences vs Copilot](https://www.glean.com/perspectives/glean-vs-copilot-key-differences-in-enterprise-ai-tools) · [M365 vs Google native comparison](https://www.glean.com/perspectives/how-does-enterprise-ai-software-compare-to-microsoft-copilot-or-googles-native) · Cross-ref: [4.9.1](../4.9.1%20Functional%20Capabilities/Overview.md), [4.9.3](../4.9.3%20AI%20Architecture%20&%20Models/Overview.md), [4.9.4](../4.9.4%20Integration%20&%20Technical/Overview.md)

### Validated strengths (tenant stack)

| Strength | Evidence | Confidence |
|---|---|---|
| **Permission-aware RAG (Google/Microsoft)** | User B cannot see private Drive/OneDrive/Gmail/Outlook content; citations ACL-bound | **Tested** (4.9.1 E1, 4.9.5 Field 6) |
| **All 7 tenant connectors native** | Drive/Docs/Sheets, Gmail, Outlook, OneDrive, Teams, Notion - unified search | **Tested** (4.9.1 Field 1.2, 4.9.4 Field 7) |
| **Hybrid M365 + GWS in one index** | Real enterprises run both; Copilot M365-centric, Workspace AI Google-centric | **Doc-Verified** |
| **Model Hub / 40+ LLMs** | Swap models without rebuilding RAG; BYOK option; Waldo agentic retrieval model | **Doc-Verified** (4.9.3 Fields 1, 4) |
| **Agent Builder (NL-first)** | Auto agents over Drive + Notion without code; sub-agent orchestration | **Tested** (4.9.1 Field 1.4, 4.9.2) |
| **MCP / embedded context** | Remote MCP to Cursor, Copilot, Claude Desktop - context layer export | **Tested** (4.9.1 Field 1) |
| **Enterprise Graph + cited answers** | Multi-source ranking with deep links | **Tested** (4.9.3 Field 6) |

### Vendor-stated strengths (not independently verified)

- **1.9× preference over ChatGPT** on 280 enterprise queries (compare page benchmark).
- **250+ connectors** vs Copilot/ChatGPT limited connector breadth.
- **Ericsson 2,700+ agents / Zillow 3,400+ agents** scale claims.

### Verification steps / test case

1. Re-run ACL negative test (Drive + Outlook) - confirm vs Copilot single-suite boundary.
2. Cross-app query spanning Drive + OneDrive + Notion + Gmail - confirm unified ranking.
3. Document 3 strengths with sandbox screenshot evidence for client deck.
4. Flag vendor benchmarks as Vendor-Stated unless independently replicated.

**Risk & Cost Impact:** Risk: Low (strengths real for hybrid-stack clients) | Cost: Native

---
