# Field 11: Data Leakage Protections

**Category:** 4.9.3 - AI Architecture & Models  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 12 fields drafted (Doc-Verified baseline) · Sandbox metrics Pending for Model Hub inventory, context limits, Protect+ triggers  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Out of scope for this eval:** Salesforce, Slack, Jira, Snowflake/BigQuery, custom fine-tuning, on-prem appliance.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Data Leakage Protections.md](../../../test/Glean/4.9.3 AI Architecture & Models/Data Leakage Protections.md)

---

**Field definition:** Privacy controls preventing tenant data from entering general vendor model training loops.  
**Prerequisites / Licensing:** Glean Protect; BYOK with ZDR if contractual hard requirement.  
**Leakage protection rating (Doc-Verified):** **Strong** — ACL mirroring, Protect scanning, Universal Key ZDR, BYOK no-training provider statements.  
**Confidence Level:** **Doc-Verified** · **Pending Sandbox** (User A/B ACL re-test)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Security principles](https://docs.glean.com/security/security-principles) · [Secure configuration](https://docs.glean.com/security/secure-configuration) · [Protect+ intro](https://docs.glean.com/administration/protect/ai-security/introduction) · [OpenAI BYOK setup](https://docs.glean.com/administration/management/models/provider-setup/open-ai-setup)

### Protection layers

| Layer | Mechanism | Tenant test |
|---|---|---|
| Retrieval ACL | Mirror Drive/OneDrive/Gmail/Notion permissions | User B cannot cite private file |
| Citation enforcement | Snippets respect source ACL | Share chat with mixed-permission user |
| Protect | Sensitive content scan, autohide, connector allow/deny | Scan OneDrive/Notion connectors |
| Protect+ | Injection on **retrieved** data | Malicious doc in Drive |
| Universal Model Key | ZDR; no training on enterprise data (vendor claim) | Contract + trust center |
| BYOK | Data via your provider agreement | Enable OpenAI ZDR / Vertex no-training |
| Waldo | Trained on Glean internal data only; not customer data | Doc statement |
| Memory | User-isolated; no cross-user sharing | Per-user scope |

### Engineering observation (Doc-Verified)

- Sharing Assistant chat: recipients see only sources **they** can access — partial answer masking.
- Certifications claimed in 4.9.1: ISO 27001, SOC 2 Type II, HIPAA alignment, GDPR, ISO 42001 — formal validation in 4.9.5.

### Verification steps / test case

1. User A queries private Drive doc; User B same query — zero leak (re-use 4.9.1 E1).
2. Share chat transcript with User B — confirm source masking.
3. Upload doc with fake "ignore instructions" in Drive — query via Assistant; check Protect+.
4. If BYOK: confirm ZDR flag in provider console.

**Risk & Cost Impact:** Risk: Low (with Protect enabled) | Cost: Protect+ add-on possible

---
