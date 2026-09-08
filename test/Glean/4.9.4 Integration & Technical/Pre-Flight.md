# 4.9.4 Admin Test Guide — Glean Integration & Technical

**Purpose:** Hands-on verification of all 8 fields under `4.9.4 Integration & Technical`.  
**Tenant entry:** `https://app.glean.com` → Admin Console + API  
**Companion eval log:** `Glean/Combined/4.9.4 Integration & Technical/Overview.md`  
**Knowledge base:** `scrap/glean/developers.glean.com/`, `scrap/glean/docs.glean.com/connectors/`, `scrap/glean/docs.glean.com/administration/identity/`

**Tenant stack:** Notion, Teams, Outlook, OneDrive, Gmail, Drive/Docs/Sheets.

---

## 0. Pre-Flight

1. Copy **Server URL** from About Glean: `https://<instance>-be.glean.com`
2. Issue **API token** (Admin → API tokens) — store in secrets manager
3. Confirm deployment type: Hosted vs Customer Hosted
4. IdP admin access for SSO/SCIM tests (Field 6)
5. `curl` or Python SDK (`glean-api-client`) for API tests

---

## Fields in this section

- [Field 1 — API Architecture Type](API Architecture Type.md)
- [Field 2 — API Depth & Writeback](API Depth & Writeback.md)
- [Field 3 — Webhook Support Quality](Webhook Support Quality.md)
- [Field 4 — Tenancy Model](Tenancy Model.md)
- [Field 5 — Data Residency Validation](Data Residency Validation.md)
- [Field 6 — Identity & SSO Integrations](Identity & SSO Integrations.md)
- [Field 7 — Native Connectors](Native Connectors.md)
- [Field 8 — Infrastructure Requirements](Infrastructure Requirements.md)

---

## Evidence → Eval Log Mapping

| Tests | Field |
|---|---|
| REST curl + network | Field 1 API Architecture |
| Read connector + write tools + Indexing API | Field 2 API Depth & Writeback |
| Freshness table + Platform Trigger | Field 3 Webhook Quality |
| Backend domain + Entra app | Field 4 Tenancy |
| Region + IP audit | Field 5 Data Residency |
| SSO/SCIM battery | Field 6 Identity & SSO |
| Connector inventory | Field 7 Native Connectors |
| Hosted vs infra checklist | Field 8 Infrastructure |

Update [`Glean/Combined/4.9.4 Integration & Technical/Pre-Flight.md`](../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/Pre-Flight.md) after each session.

---

## Safety

1. API tokens never in git.
2. SCIM deactivate only on disposable test users.
3. Writeback tests use test mailboxes/docs only.
4. Platform Triggers experimental — off-hours testing.
