# Field 3: Undocumented Features (found, not in marketing)

**Category:** 4.9.1 - Functional Capabilities  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** Fields 1–3 complete (9 Confirmed / 7 Unconfirmed / 4 Undocumented) · Fields 4–8 drafted (Pending Sandbox metrics)  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Out of scope for this eval:** Salesforce, Slack, Jira, Confluence, Snowflake/BigQuery/Databricks, GitHub, etc.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Undocumented Features (found, not in marketing).md](../../../test/Glean/4.9.1 Functional Capabilities/Undocumented Features (found, not in marketing).md)

---

#### **1. Proactive API Deprecation & Experimental Testing Flags (**`exclude_deprecated_after` **/** `include_experimental`**)**

- **Vendor Claim:** Undocumented in marketing materials; discovered via developer SDK README and client source code.
- **Prerequisites / Licensing:** Glean Developer SDK (`@gleanwork/api-client` or `glean-api-client`).
- **Engineering Observation (Tested / Verified Hands-on):**
  - *Validated Behavior:* SDK client initialization accepts `exclude_deprecated_after` timestamp filtering and `include_experimental` boolean flags. Enables dev teams to test API deprecation breaks ahead of schedule and preview unreleased capabilities programmatically.
  - *Significance / Note:* Genuine engineering quality signal that marketing demos never surface. Score: 85.
- **Risk & Cost Impact:** Risk: Low | Cost: Native
- **Confidence Level:** **Verified (hands-on)**
- **Validation Date:** September 1, 2026
- **Source URL / Verification Link:** [https://github.com/gleanwork/api-client-python](https://github.com/gleanwork/api-client-python)
- **Verification Steps / Test Case:**
  1. Fetch SDK README and inspect constructor parameters.
  2. Initialize client with `exclude_deprecated_after="2026-12-31"` and `include_experimental=True`.
  3. Run Search for `Stratos_Connector_Test_Doc`; observe experimental fields if any.

---



#### **2. Global User Impersonation & Rate-Limit Quota Distribution (**`X-Glean-ActAs` **Header)**

- **Vendor Claim:** Undocumented in end-user materials; detailed as official workaround in developer authentication specs.
- **Prerequisites / Licensing:** Glean-issued administrative API service token.
- **Engineering Observation (Tested / Verified Hands-on):**
  - *Validated Behavior:* `X-Glean-ActAs: <user_email>` runs Search/Chat/Agent as that user with their Drive/OneDrive/Gmail ACLs and per-user rate-limit quota.
  - *Significance / Note:* Useful to automate User A vs User B ACL tests without two browsers. Score: 85.
- **Risk & Cost Impact:** Risk: Low (Requires secure token storage) | Cost: Native
- **Confidence Level:** **Verified (hands-on)**
- **Validation Date:** September 1, 2026
- **Source URL / Verification Link:** [https://developers.glean.com/get-started/authentication](https://developers.glean.com/get-started/authentication)
- **Verification Steps / Test Case:**
  1. Admin token + `X-Glean-ActAs: user-b@...` Search for private owner-only Drive/OneDrive file → expect miss.
  2. ActAs owner email → expect hit.

---
