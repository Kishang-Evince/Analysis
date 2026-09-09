# Field 5: Data Encryption Standards

**Category:** 4.9.5 - Compliance & Regulatory  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 9 fields drafted (Doc-Verified baseline) · Contract artifacts Pending (Trust Portal, BAA, DPA PDFs, SOC 2 scope)  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Data Encryption Standards.md](../../../test/Glean/4.9.5 Compliance & Regulatory/Data Encryption Standards.md)

---

**Field definition:** Cryptographic standards for data-at-rest and in-transit; BYOK options.  
**Prerequisites / Licensing:** Know deployment cloud (GCP vs AWS); BYOK if Customer Key mode.  
**Encryption standard (Doc-Verified):** **AES-256 at rest**, **TLS 1.2+ in transit**; FIPS 140-2 validated crypto module claimed on legal page.  
**Confidence Level:** **Doc-Verified**  
**Validation Date:** September 3, 2026  
**Source URLs:** [About deployment encryption](https://docs.glean.com/get-started/prepare/about-deployment) · [Legal / security](https://www.glean.com/legal) · [Configure LLMs / BYOK](https://docs.glean.com/administration/configure-llms) · [Secure configuration](https://docs.glean.com/security/secure-configuration) · [SSL certificates](https://docs.glean.com/security/networking/ssl-certificates)

### Encryption inventory

| Layer | Standard (doc) | Key rotation |
|---|---|---|
| Data at rest | AES-256 | 30 days (GCP) / 90 days (AWS) per deployment doc |
| Data in transit | TLS 1.2+ | Standard cert rotation |
| LLM Universal Key | ZDR; no training on enterprise data | Glean-managed |
| LLM BYOK | Encrypted transit to provider | Customer-managed provider keys |
| Customer Hosted | KMS in customer AWS/GCP account | Per cloud-prem docs |

### Engineering observation (Doc-Verified)

- BYOK routes LLM traffic through **your** Azure OpenAI / Vertex / Bedrock / Anthropic contracts - strongest control for model-layer encryption and residency.
- Infrastructure-layer customer-managed KMS documented for Customer Hosted - not same as BYOK for all tenant data stores on Glean Hosted.
- TLS inspection proxy: upload internal CA certs via Admin SSL Certificates tab.

### Verification steps / test case

1. Admin → Models - confirm Universal Key vs Customer Key mode.
2. `openssl s_client -connect <instance>-be.glean.com:443` - verify TLS 1.2+.
3. If BYOK: add provider key - verify Insights → LLM dashboard (BYOK only).
4. Trust Portal / legal page - confirm FIPS 140-2 claim for regulated clients.

**Risk & Cost Impact:** Risk: Low | Cost: BYOK / Cloud-Prem uplift

---
