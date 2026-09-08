# 4.9.11 Admin Test Guide — Glean Client-Facing Explainability

**Purpose:** Validate all 6 explainability fields — citations, audit, readability, confidence gap, correction paths, compliance exports.  
**Companion eval log:** `Glean/Combined/4.9.11 Client-Facing Explainability/Overview.md`  
**Depends on:** 4.9.1 (`Stratos_Connector_Test_*`), 4.9.5 (audit/Protect), 4.9.3 Field 10.

**Tenant stack:** Notion, Teams, Outlook, OneDrive, Gmail, Drive/Docs/Sheets.

---

## 0. Pre-Flight

1. Admin A + User B accounts
2. `Stratos_Connector_Test_Doc` indexed in Drive; Notion page shared to integration
3. Assistant Thinking/Adaptive mode available
4. Note tenant host type (Azure = no Agent Debug)
5. Protect+ license status: Yes / No / Unknown
6. GCE log export: Provisioned / Not provisioned

---

## Fields in this section

- [Field 1 — Decision Explanation Capability](Decision Explanation Capability.md)
- [Field 2 — Audit Trail for AI Actions](Audit Trail for AI Actions.md)
- [Field 3 — Human-Readable Output](Human-Readable Output.md)
- [Field 4 — Confidence Scoring](Confidence Scoring.md)
- [Field 5 — Override & Correction Mechanism](Override & Correction Mechanism.md)
- [Field 6 — Compliance Reporting](Compliance Reporting.md)

---

## Evidence → Eval Log mapping

| Work product | Field |
|---|---|
| Citation + Debug screenshots | Field 1 Decision Explanation |
| Audit/GCE export samples | Field 2 Audit Trail |
| User B clarity scores | Field 3 Human-Readable Output |
| API JSON + UI confidence probe | Field 4 Confidence Scoring |
| Correction latency table | Field 5 Override & Correction |
| Dashboard/export inventory | Field 6 Compliance Reporting |

Update [`Glean/Combined/4.9.11 Client-Facing Explainability/Pre-Flight.md`](../../../Glean/Combined/4.9.11%20Client-Facing%20Explainability/Pre-Flight.md).

---

## Safety

1. No real PHI in injection or compliance tests.
2. GCE exports may contain metadata — handle GUARDED.
3. Azure-hosted: skip Agent Debug expectation.
4. Do not claim numeric confidence scores in client deck — not product feature.
