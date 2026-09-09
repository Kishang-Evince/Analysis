# 4.9.5 Admin Test Guide - Glean Compliance & Regulatory

**Purpose:** Verify all 9 fields under `4.9.5 Compliance & Regulatory`.  
**Companion eval log:** `Glean/Combined/4.9.5 Compliance & Regulatory/Overview.md`  
**Knowledge base:** `scrap/glean/docs.glean.com/security/`, `scrap/glean/www.glean.com/legal.md`

**Tenant stack:** Notion, Teams, Outlook, OneDrive, Gmail, Drive/Docs/Sheets.  
**No real PHI in sandbox** - synthetic test content only.

---

## 0. Pre-Flight

1. Legal contact for BAA, DPA, Trust Portal access
2. Admin A + User B for ACL tests
3. Private test file: `FY27_Exec_Compensation.xlsx` (Drive or OneDrive, no share to User B)
4. Confirm Protect vs Protect+ license in Admin
5. GCE log export access (if provisioned)

---

## Fields in this section

- [Field 1 - Certifications Validated](Certifications Validated.md)
- [Field 2 - HIPAA Readiness & BAAs](HIPAA Readiness & BAAs.md)
- [Field 3 - Audit Trail Completeness](Audit Trail Completeness.md)
- [Field 4 - Data Retention & Disposal](Data Retention & Disposal.md)
- [Field 5 - Data Encryption Standards](Data Encryption Standards.md)
- [Field 6 - Access Control Granularity](Access Control Granularity.md)
- [Field 7 - Incident Response & Notification](Incident Response & Notification.md)
- [Field 8 - Data Processing Agreements](Data Processing Agreements.md)
- [Field 9 - AI-Specific Governance](AI-Specific Governance.md)

---

## Evidence → Eval Log Mapping

| Tests | Field |
|---|---|
| Trust Portal reports | Field 1 Certifications |
| BAA + PHI policy | Field 2 HIPAA |
| Log matrix | Field 3 Audit Trail |
| Retention/disposal tests | Field 4 Data Retention |
| TLS + BYOK | Field 5 Encryption |
| ACL battery + Notion gap | Field 6 Access Control |
| Status page + SLA | Field 7 Incident Response |
| DPA + subprocessors | Field 8 DPA |
| Protect+ injection tests | Field 9 AI Governance |

Update [`Glean/Combined/4.9.5 Compliance & Regulatory/Pre-Flight.md`](../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/Pre-Flight.md) after each session.

---

## Safety

1. No real PHI/PII in injection tests.
2. BAA before any clinical content.
3. Notion: never share clinical pages with integration without segmentation review.
4. Protect+ Block mode - test on disposable users first.
