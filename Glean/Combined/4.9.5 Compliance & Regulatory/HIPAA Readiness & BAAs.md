# Field 2: HIPAA Readiness & BAAs

**Category:** 4.9.5 - Compliance & Regulatory  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 9 fields drafted (Doc-Verified baseline) · Contract artifacts Pending (Trust Portal, BAA, DPA PDFs, SOC 2 scope)  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [HIPAA Readiness & BAAs.md](../../../test/Glean/4.9.5 Compliance & Regulatory/HIPAA Readiness & BAAs.md)

---

**Field definition:** BAA execution capability and HIPAA data encryption controls.  
**Prerequisites / Licensing:** Legal review; BAA execution before PHI in production.  
**HIPAA posture (Doc-Verified / Vendor-Stated):** **HIPAA compliant** claimed; **BAA available** via DocuSign self-serve at `glean.com/legal/baa`.  
**BAA executed (Pending Sandbox):** _TBD — legal team_  
**Confidence Level:** **Vendor-Stated** · **Pending Sandbox** (BAA scope + PHI control mapping)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Legal / BAA](https://glean.com/legal/baa) · [Healthcare solutions](https://www.glean.com/solutions/industries/healthcare) · [Agent Sandbox PTC](https://docs.glean.com/security/agent-sandbox-ptc) · [Secure configuration](https://docs.glean.com/security/secure-configuration)

### HIPAA readiness checklist (doc-backed)

| Control area | Doc evidence | Tenant gap |
|---|---|---|
| BAA availability | Self-serve DocuSign link on legal page | Execute before PHI |
| Encryption at rest/transit | AES-256, TLS 1.2+ (Field 5) | Verify in BAA |
| Access controls | ACL mirroring (Field 6) | **Notion index not ACL-aware** |
| Audit logging | Admin audit + GCE logs (Field 3) | 30-day admin default |
| AI/LLM PHI path | Universal Key ZDR; BYOK contractual | Map LLM subprocessors |
| Training on customer data | No training claim (4.9.3 Field 11) | Contractual |

### Engineering observation (Doc-Verified)

- No detailed HIPAA technical control matrix in product docs — operational PHI handling is **contractual (BAA) + Trust Portal**, not step-by-step in Admin UI.
- Healthcare marketing: *"built-in permissions and HIPAA compliant"* for connected applications — still requires connector-level ACL validation (Notion exception).
- Stratos eval tenant should **not** load real PHI until BAA executed and Notion segmentation strategy defined.

### Verification steps / test case

1. Legal executes BAA via `https://glean.com/legal/baa`.
2. Map BAA scope to Assistant, Agents, and all tenant connectors.
3. Protect+ sensitive infotypes — enable PHI-related policies if licensed.
4. Confirm chat retention + audit log retention meet HIPAA audit policy (may need extended retention via account team).

**Risk & Cost Impact:** Risk: **High** if Notion used for clinical notes without Live Mode/segmentation | Cost: Protect+ add-on

---
