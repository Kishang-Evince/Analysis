# Field 6: Compliance Reporting

**Category:** 4.9.11 - Client-Facing Explainability  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 6 fields drafted (Doc-Verified baseline) · Sandbox scores Pending for Field 3 UX ratings, Field 4 API probe, Field 5 correction latency  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Synthesis basis:** Fields 4.9.1, 4.9.3 Field 10, 4.9.5 Field 3/9 + docs corpus.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Compliance Reporting.md](../../../test/Glean/4.9.11 Client-Facing Explainability/Compliance Reporting.md)

---

**Field definition:** Pre-packaged compliance dashboards for security, model safety, and alignment.  
**Prerequisites / Licensing:** Protect+ for AI security dashboards; GCE export for custom reporting; Trust Portal for certifications.  
**Compliance reporting rating (Doc-Verified):** **Moderate** - **fragmented** dashboards; **no** single client-exportable "AI compliance pack" documented.  
**Confidence Level:** **Doc-Verified** · **Pending Sandbox** (Protect+ + GCE access)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Protect overview](https://docs.glean.com/administration/protect/overview) · [Guardrails Insights](https://docs.glean.com/release-notes/releases/2026-08-18-august-release) · [GCE data dictionary](https://docs.glean.com/administration/gce-logs/data-dictionary) · [Admin audit logs](https://docs.glean.com/administration/management/audit-logs/admin-audit-logs) · [Trust Portal](https://trust.glean.com) · Cross-ref [4.9.5](../4.9.5%20Compliance%20&%20Regulatory/Overview.md)

### Reporting inventory

| Report / dashboard | Contents | Audience | Export |
|---|---|---|---|
| **Protect+ Sensitive Findings** | Overshared PII/PHI patterns, severity | Super Admin, SCM | CSV, API, dashboard |
| **Guardrails Insights** | Injection/toxic trends, policy confidence, high-risk users | Security/governance | Protect+ dashboard |
| **Admin audit logs** | Config/agent/connector changes | Admin | CSV (30d) |
| **GCE logs** | CHAT, citations, LLM_CALL, WORKFLOW_RUN | Analytics/security | BigQuery, S3, SIEM |
| **Assistant Insights** | Adoption, upvote/downvote, AI answer rate | Moderator | In-console |
| **Insights (Coverage/Activity)** | Usage adoption | Leadership | In-console |
| **Trust Portal** | SOC2, ISO certs, subprocessors | Legal/procurement | External portal |
| **Access verification** | Permission test utility | Admin | In-console |

### Gaps vs "compliance reporting" expectation

| Client expectation | Glean reality |
|---|---|
| Single HIPAA AI usage report | **Not pre-packaged** - assemble from GCE + Protect+ |
| Per-user prompt/response audit export | **Metadata only** by default |
| Model safety alignment scorecard | Guardrails Insights (Protect+ add-on) |
| Permission inheritance report | Access verification tool; Notion gap remains |

### Verification steps / test case

1. Admin → Protect → export Sensitive Findings CSV (if licensed).
2. Open Guardrails Insights - screenshot trends panel.
3. Export Admin audit log CSV - confirm 30-day window + field set.
4. Request GCE sample export from account team - validate `CHAT_CITATIONS` schema.
5. Trust Portal - download SOC2 excerpt; map to 4.9.5 Field 1.
6. Document **client-facing compliance pack** assembly steps for Perimeter (BAA + Protect+ + GCE).

**Risk & Cost Impact:** Risk: **High** if buyer expects turnkey compliance PDF | Cost: Protect+ + SIEM integration PS
