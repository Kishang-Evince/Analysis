# Field 3: Best-Fit Client Profile

**Category:** 4.9.9 - Competitive Positioning  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 7 fields drafted (Doc-Verified + prior eval synthesis) · Client-specific displacement map Pending  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Synthesis basis:** Fields 4.9.1–4.9.8 eval logs + Glean compare/perspective pages.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Best-Fit Client Profile.md](../../../test/Glean/4.9.9 Competitive Positioning/Best-Fit Client Profile.md)

---

**Field definition:** Ideal enterprise customer size, security posture, and existing software stack.  
**Prerequisites / Licensing:** Client discovery questionnaire aligned to eval findings.  
**Best-fit profile (Doc-Verified / synthesis):** Hybrid M365+GWS mid-market to enterprise with IT capacity for connector governance.  
**Confidence Level:** **Doc-Verified** · **Pending** (client-specific fit score)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Glean vs Copilot key differences](https://www.glean.com/perspectives/glean-vs-copilot-key-differences-in-enterprise-ai-tools) · [Life sciences AI blog](https://www.glean.com/blog/ai-in-life-sciences) · [Healthcare solutions](https://www.glean.com/solutions/industries/healthcare) · Cross-ref [4.9.6](../4.9.6%20Adoption%20&%20Readiness/Overview.md), [4.9.5](../4.9.5%20Compliance%20&%20Regulatory/Overview.md)

### Ideal client attributes

| Dimension | Best fit | Why Glean wins |
|---|---|---|
| **Size** | 500–10,000+ employees | Connector ROI scales with app sprawl |
| **Stack** | **Hybrid M365 + Google Workspace** + wiki (Notion/Confluence) | Single-suite shops should use native AI |
| **Knowledge pain** | 50–200+ apps; employees search 10+ systems daily | Unified index + RAG core value prop |
| **Security posture** | SSO, ACL-aware sources (Drive/OneDrive), willing to execute BAA | Glean Protect + HIPAA path (4.9.5) |
| **IT maturity** | Admin can manage connectors, people data, extension deploy | Adoption success requires it (4.9.6) |
| **AI strategy** | Wants context layer **alongside** Copilot/ChatGPT, not instead of | Coexistence is designed (Field 6) |
| **Agent ambition** | NL agent builder for ops automation over Drive/Notion/Gmail | 4.9.2 strength |
| **Notion use** | Workspace-admin controlled; sensitive pages segmented or Live Mode only | Mitigates ACL gap |

### Stratos tenant-stack pilot profile

- **Valid pilot:** Notion (governed) + M365 + GWS, ACL-sensitive content in Drive/OneDrive, agents for doc triage/summarization.
- **Stretch:** Healthcare PHI in Notion without segmentation — **not best fit** without remediation.

### Verification steps / test case

1. Score prospect against attribute table (0–2 per row; ≥12/16 = strong fit).
2. Confirm hybrid stack in discovery — single-suite = redirect to Copilot/Workspace AI.
3. Verify BAA + Protect+ budget for regulated prospects.
4. Document best-fit narrative for Perimeter Healthcare-type clients (knowledge layer, EHR remains SoR).

**Risk & Cost Impact:** Risk: Low (good match = faster ROI) | Cost: Native

---
