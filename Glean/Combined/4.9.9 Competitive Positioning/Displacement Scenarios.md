# Field 5: Displacement Scenarios

**Category:** 4.9.9 - Competitive Positioning  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 7 fields drafted (Doc-Verified + prior eval synthesis) · Client-specific displacement map Pending  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Synthesis basis:** Fields 4.9.1–4.9.8 eval logs + Glean compare/perspective pages.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Displacement Scenarios.md](../../../test/Glean/4.9.9 Competitive Positioning/Displacement Scenarios.md)

---

**Field definition:** Legacy tools, siloed indexes, or manual pipelines this platform directly replaces.  
**Prerequisites / Licensing:** Client current-state architecture interview.  
**Displacement map (Doc-Verified / synthesis):** Federated search, shadow ChatGPT uploads, per-app search bars — **not** full Copilot/EHR/CRM replacement.  
**Client displacement list (Pending):** _TBD — name legacy tools in each prospect environment_  
**Confidence Level:** **Medium** (pattern strong; client-specific tools TBD)  
**Validation Date:** September 3, 2026  
**Source URLs:** [M365 vs native comparison](https://www.glean.com/perspectives/how-does-enterprise-ai-software-compare-to-microsoft-copilot-or-googles-native) · [Compliance vs ChatGPT Enterprise](https://www.glean.com/perspectives/understanding-gleans-compliance-features-compared-to-chatgpt-enterprise) · [Life sciences complement blog](https://www.glean.com/blog/ai-in-life-sciences) · Cross-ref [4.9.1 Field 7](../4.9.1%20Functional%20Capabilities/Overview.md) (Go Links/Answers)

### Likely displacement targets

| Legacy pattern | What Glean replaces | Caveat |
|---|---|---|
| **Per-app search bars** (Drive search, Outlook search, Notion search separately) | Unified search + Assistant | Crawl lag on some sources |
| **Intranet / portal keyword search** | Enterprise Graph + semantic search | Needs connector coverage |
| **Manual "where is the doc?" Slack/Teams pings** | Self-serve cited answers | Adoption required (4.9.6) |
| **Shadow ChatGPT file uploads** | Governed indexed RAG with ACL | Protect+ for injection (4.9.5) |
| **Static wiki search (Confluence/Notion-only)** | Cross-app Answers + Collections | Notion share model |
| **Ad-hoc grep/scripts across repos** | Agent + company search | Dev teams may keep IDE tools |
| **Go Links spreadsheets / bookmark chaos** | Native Go Links (4.9.1 Field 1) | Extension deploy needed |

### Does NOT displace

| System | Relationship |
|---|---|
| **Microsoft Copilot** (Teams/Outlook/Office authoring) | Coexist — Glean searches, Copilot drafts in-app |
| **EHR / CRM / ERP** | System of record — Glean retrieves, does not replace |
| **Notion / Drive as authoring tools** | Content stays in source; Glean indexes |
| **ITSM / ticketing** | Out of tenant stack; may coexist via future connectors |

### Verification steps / test case

1. Client workshop: list current search tools — map each to Displace / Coexist / Keep.
2. Quantify time spent "hunting" across apps (baseline for ROI).
3. Identify one legacy search tool to retire in pilot — measure post-Glean usage.
4. Document named displacement for Perimeter (e.g., intranet search, shared drive hunt).

**Risk & Cost Impact:** Risk: Low | Cost: Retire legacy = license savings offset

---
