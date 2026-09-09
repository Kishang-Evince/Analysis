# 4.9.3 Admin Test Guide - Glean AI Architecture & Models

**Purpose:** Hands-on verification of all 12 fields under `4.9.3 AI Architecture & Models`.  
**Tenant entry:** `https://app.glean.com` → Admin → Platform → Models / Assistant / Protect  
**Companion eval log:** `Glean/Combined/4.9.3 AI Architecture & Models/Overview.md`  
**Knowledge base:** `scrap/glean/docs.glean.com/administration/llms`, `scrap/glean/docs.glean.com/administration/assistant/`, `scrap/glean/docs.glean.com/security/`

**Tenant test stack:** Notion, Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.

---

## 0. Pre-Flight

1. Admin A login; note deployment type (Hosted vs Cloud-Prem) from **About Glean**
2. Record key type: **Universal Model Key** vs **Customer Key (BYOK)**
3. Test artifacts: `Stratos_Connector_Test_Doc`, `Stratos_Connector_Test_Sheet`, Notion SLA page, private ACL file
4. User B (Member) for leakage tests
5. GCE log access (if granted) for Field 10

---

## Fields in this section

- [Field 1 - Foundation Models Used](Foundation Models Used.md)
- [Field 2 - Model Hosting Location](Model Hosting Location.md)
- [Field 3 - Private / Local Instance Support](Private - Local Instance Support.md)
- [Field 4 - Model Agnosticism](Model Agnosticism.md)
- [Field 5 - Fine-Tuning Capabilities](Fine-Tuning Capabilities.md)
- [Field 6 - RAG Implementation Quality](RAG Implementation Quality.md)
- [Field 7 - Prompt Engineering Access](Prompt Engineering Access.md)
- [Field 8 - Context Window & Memory](Context Window & Memory.md)
- [Field 9 - Hallucination Controls](Hallucination Controls.md)
- [Field 10 - Explainability & Decision Logs](Explainability & Decision Logs.md)
- [Field 11 - Data Leakage Protections](Data Leakage Protections.md)
- [Field 12 - Model Versioning Freeze](Model Versioning Freeze.md)

---

## Evidence → Eval Log Mapping

| Tests | Field |
|---|---|
| Model inventory | Field 1 Foundation Models |
| Deployment + region | Field 2 Hosting Location |
| Hosted/BYOK/Cloud-Prem | Field 3 Private Instance |
| Model swap matrix | Field 4 Model Agnosticism |
| No fine-tune UI | Field 5 Fine-Tuning |
| Citation table | Field 6 RAG Quality |
| Custom instructions | Field 7 Prompt Engineering |
| Context/memory tests | Field 8 Context Window |
| Hallucination battery | Field 9 Hallucination Controls |
| Debug + GCE logs | Field 10 Explainability |
| ACL + Protect tests | Field 11 Data Leakage |
| Deprecation baseline | Field 12 Version Freeze |

Update [`Glean/Combined/4.9.3 AI Architecture & Models/Pre-Flight.md`](../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/Pre-Flight.md) after each session.

---

## Safety

1. No real PHI in hallucination/injection tests - use synthetic doc content.
2. Custom org instructions - remove test instruction after Field 7.
3. Do not commit BYOK keys.
