# Field 6: Coexistence Scenarios

**Category:** 4.9.9 - Competitive Positioning  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 7 fields drafted (Doc-Verified + prior eval synthesis) · Client-specific displacement map Pending  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Synthesis basis:** Fields 4.9.1–4.9.8 eval logs + Glean compare/perspective pages.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Coexistence Scenarios.md](../../../test/Glean/4.9.9 Competitive Positioning/Coexistence Scenarios.md)

---

**Field definition:** Standard enterprise tools this system operates alongside without duplicating value.  
**Prerequisites / Licensing:** Client architecture diagram.  
**Coexistence model (Doc-Verified):** Glean as **horizontal context layer**; suite AI, SoR systems, IDE copilots remain.  
**Confidence Level:** **Doc-Verified** · **High** (explicit in Glean marketing + eval)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Glean vs Copilot](https://www.glean.com/compare/glean-vs-copilot) · [Glean vs ChatGPT Enterprise](https://www.glean.com/compare/glean-vs-chatgpt-enterprise) · [Life sciences complement](https://www.glean.com/blog/ai-in-life-sciences) · [MCP blog](https://www.glean.com/blog/mcp-servers-septdrop-2025) · Cross-ref [4.9.1](../4.9.1%20Functional%20Capabilities/Overview.md), [4.9.4 Field 2](../4.9.4%20Integration%20&%20Technical/Overview.md)

### Coexistence boundary map (tenant stack)

| Tool | Role with Glean | Duplication risk | Boundary rule |
|---|---|---|---|
| **Microsoft Copilot** | In-app M365 creation; Glean cross-suite search | Medium if both sold as "the AI" | Copilot = create in Office; Glean = find + cite across apps |
| **ChatGPT Enterprise / Claude** | External chat UI; Glean via MCP/Model Hub | Low if positioned as context layer | Glean feeds grounded context; external UI for general tasks |
| **Teams** | Embedded Glean sidebar + indexed channels | Low | Teams = collaboration; Glean = search surface |
| **Outlook / Gmail** | Indexed mail + federated fetch; M365 email tools for agents | Low | Mail stays in mailbox; Glean reads |
| **Drive / OneDrive / Notion** | Index + optional write tools | Low | Source systems remain authoritative |
| **Cursor / GitHub Copilot** | IDE coding; Glean MCP for enterprise context | Low | Dev knowledge via MCP |
| **EHR / billing / CRM** | Out of scope - coexist as SoR | None in tenant eval | No writeback; no displacement claim |
| **IdP (Entra / Okta)** | SSO + SCIM; Glean consumes identity | None | Standard |

### Engineering observation (Doc-Verified)

- Glean life sciences blog: *"Glean complements those investments by acting as the system of context"* - explicit coexistence positioning.
- Connectors are **read-only** for indexing; writeback only via governed agent tools - reduces collision with source apps.
- Remote MCP (4.9.1) makes coexistence **technical**, not just commercial.

### Verification steps / test case

1. Draw client architecture: mark Glean box as "context + search + agents" not "replace Copilot."
2. Pilot messaging: train users when to use Teams Copilot vs Glean sidebar.
3. Confirm no duplicate license waste - client already has Copilot? Position Glean as cross-suite layer.
4. Document Perimeter coexistence: EHR stays SoR; Glean for internal knowledge (policies, ops docs, Teams/Drive).

**Risk & Cost Impact:** Risk: Low (clear boundaries prevent buyer remorse) | Cost: May mean dual AI spend

---
