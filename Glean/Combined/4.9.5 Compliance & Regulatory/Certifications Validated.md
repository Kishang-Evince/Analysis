# Field 1: Certifications Validated

**Category:** 4.9.5 - Compliance & Regulatory  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 9 fields drafted (Doc-Verified baseline) · Contract artifacts Pending (Trust Portal, BAA, DPA PDFs, SOC 2 scope)  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Certifications Validated.md](../../../test/Glean/4.9.5 Compliance & Regulatory/Certifications Validated.md)

---

**Field definition:** Verified third-party security audits (SOC 2 Type II, ISO 27001, ISO 42001, etc.).  
**Prerequisites / Licensing:** Trust Portal NDA access via Glean account team.  
**Certification claims (Doc-Verified / Vendor-Stated):** SOC 2 Type II, ISO/IEC 27001, ISO/IEC 42001:2023, HIPAA alignment, GDPR, TX-RAMP Level 2.  
**Reports obtained (Pending Sandbox):** _TBD — download from trust.glean.com_  
**Confidence Level:** **Vendor-Stated** (claims) · **Pending Sandbox** (report scope validation)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Glean legal / certifications](https://www.glean.com/legal) · [Security index](https://docs.glean.com/security/) · [Protect overview](https://docs.glean.com/administration/protect/overview) · [Agent Sandbox PTC](https://docs.glean.com/security/agent-sandbox-ptc) · [Trust Portal](https://trust.glean.com)

### Claimed certification inventory

| Certification | Claimed | Report access | Notes |
|---|---|---|---|
| SOC 2 Type II | Yes | Trust Portal / NDA | SDLC doc references pen test + SOC 2 under NDA |
| ISO/IEC 27001 | Yes | Trust Portal / NDA | |
| ISO/IEC 42001:2023 | Yes | Trust Portal / NDA | AI management systems |
| HIPAA | Yes (alignment) | BAA separate | See Field 2 |
| GDPR | Yes | DPA separate | See Field 8 |
| TX-RAMP Level 2 | Yes | Verify if required | Public sector use case |

### Engineering observation (Doc-Verified)

- Product docs direct customers to **trust.glean.com** for SOC 2 reports and certifications — not embedded in scrap.
- Agent Sandbox PTC lists compliance bundle: SOC 2, ISO 27001, ISO 42001, HIPAA, GDPR, TX-RAMP Level 2.
- **Validate scope** covers your deployment model (Glean Hosted vs Customer Hosted) and connected apps in audit period.

### Verification steps / test case

1. Request Trust Portal access from Glean account team.
2. Download SOC 2 Type II, ISO 27001, ISO 42001 reports.
3. Cross-check report scope: deployment type, sub-services (Assistant, Agents, MCP), connector data flows.
4. Record report dates and any qualified exceptions in eval log.

**Risk & Cost Impact:** Risk: Low (claims common) / Medium if scope gap | Cost: Native

---
