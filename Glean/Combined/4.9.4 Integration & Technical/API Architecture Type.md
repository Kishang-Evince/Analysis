# Field 1: API Architecture Type

**Category:** 4.9.4 - Integration & Technical  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 8 fields drafted (Doc-Verified baseline) · Sandbox metrics Pending for API latency, webhook latency, SSO/SCIM live config  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Out of scope for this eval:** Salesforce, Slack, Jira, custom Indexing SDK production deploy, Customer Hosted bootstrap (unless contracted).  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [API Architecture Type.md](../../../test/Glean/4.9.4 Integration & Technical/API Architecture Type.md)

---

**Field definition:** Framework type of vendor APIs (REST, GraphQL, gRPC, SOAP).  
**Prerequisites / Licensing:** API token from Admin; Server URL from About Glean.  
**Architecture classification (Doc-Verified):** **REST only** — three API families; no Glean-native GraphQL, gRPC, or SOAP documented.  
**Confidence Level:** **Doc-Verified** · **Pending Sandbox** (live traffic capture)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Client API](https://developers.glean.com/api/client-api) · [Platform API getting started](https://developers.glean.com/api/platform-api/getting-started) · [Indexing API documents](https://developers.glean.com/api/indexing-api/documents-overview) · [API clients](https://developers.glean.com/libraries/api-clients)

### API family map

| API family | Base path | Primary use | Auth |
|---|---|---|---|
| **Client API** | `/rest/api/v1/` | Search, chat, agents, documents, collections, governance | Bearer token |
| **Platform API** | `/api/` | Search, chat, agents, skills, triggers (recommended for new integrations) | Bearer token |
| **Indexing API** | `/api/index/v1/` | Custom datasource document/people/permission ingest | Indexing token (no OAuth) |

### Engineering observation (Doc-Verified)

- SDK docs state: use Glean REST APIs with preferred HTTP library; official Python/TS SDKs wrap REST.
- Errors use RFC 7807 `ProblemDetail` with stable `code` values ([developers.glean.com/errors](https://developers.glean.com/errors)).
- Rate limits are token-bucket per endpoint ([rate-limits](https://developers.glean.com/get-started/rate-limits)) — documented in 4.9.1 Field 8.

### Verification steps / test case

1. `curl -X POST https://<instance>-be.glean.com/rest/api/v1/search` with bearer token — confirm JSON REST response.
2. Repeat on `/api/search` (Platform API) if enabled for tenant.
3. DevTools Network tab during Assistant use — confirm no GraphQL/gRPC to Glean backend.
4. Optional: Indexing API `POST /api/index/v1/indexdocument` on test datasource.

**Risk & Cost Impact:** Risk: Low | Cost: Native

---
