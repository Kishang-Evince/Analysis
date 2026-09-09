# 4.9.1 Admin Test Guide - Glean (`app.glean.com`)

**Purpose:** Hands-on verification of all 8 fields under `4.9.1 Functional Capabilities` using Glean Admin credentials.  
**Tenant entry:** `https://app.glean.com` → Admin Console  
**Companion eval log:** `Glean/Combined/4.9.1 Functional Capabilities/Overview.md` (analysis deliverable - not in this folder)  
**Knowledge base:** `scrap/glean/glean_docs.md`  

**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Out of scope:** Salesforce, Slack, Jira, Confluence, Snowflake/BigQuery, GitHub, etc.

---

## 0. Pre-Flight (do once)

### 0.1 Confirm Admin access
1. Login `https://app.glean.com`
2. Open **Admin Console** (left nav / gear)
3. Confirm you see roughly: **Platform** (Connectors / Apps), **Assistant**, **Users & permissions**, **Glean Protect**, **Management / Usage**, **About Glean**
4. Copy **Server instance (QE)** from **Admin Console → About Glean** → full URL like `https://<instance>-be.glean.com` (need for API tests)

Note: Docs sidebar label **Identity** = product nav **Users & permissions** (renamed). No separate "Identity" tab.

### 0.2 Prepare test identities (Users & permissions)
Glean does **not** invent local users. Identities come from IdP / SSO / invites. You assign roles in Admin.

**Where:**
- Roles / invite: [Admin Console → Users & permissions → User roles](https://app.glean.com/admin/teammates)
- SSO: [Admin Console → Users & permissions → Single sign-on (SSO)](https://app.glean.com/admin/setup/auth)
- Directory sync: **Admin Console → Users & permissions → People data**
- OAuth / MCP hosts: **Admin Console → Users & permissions → Third-party access (OAuth)**

**Steps:**
1. Open **User roles** (`/admin/teammates`)
2. Confirm **Admin A** (you) has Admin or Super Admin
3. **Invite teammates** (top-right) → invite **User B** / **User C** via Email or Teams (must already exist in company IdP/email)
4. After signup: ⋮ → **Edit roles** → set User B = **Member** (restricted), User C = Member/power as needed
5. For ACL tests: restrict User B in **source app** (Google Drive / OneDrive ACL) - Glean mirrors source permissions; Admin role alone does not grant file access

| Alias | Glean role (User roles page) | Purpose |
|---|---|---|
| **Admin A** | Admin / Super Admin | Connectors, Model Hub, agent create |
| **User B** | Member | Permission / ACL negative tests |
| **User C** | Member (optional) | Multiplayer concurrency |

### 0.3 Create test content pack
Prepare before Field 1:
- Private OneDrive or Google Drive file (no share): `FY27_Exec_Compensation.xlsx` (Admin A / owner only)
- Shared Drive folder: Google Doc `Stratos_Connector_Test_Doc`, Sheet `Stratos_Connector_Test_Sheet`, PDF `Exhibit_A_SOW_Stratos.pdf`
- Notion page with same project name - **share page with Glean Notion integration**
- Gmail + Outlook messages with subject containing project name
- Teams channel message referencing project name
- Twin file on OneDrive (private owner-only for ACL; optional shared copy for multi-source search)
- 1 HTML page with content inside `<iframe>` (Field 2 iframe test - optional)

### 0.4 Scorecard (use every test)
For each feature record:
```
Pass | Fail | Partial | Blocked
Latency (ms / subjective)
Screenshot / query ID / trace ID
Notes → paste into eval log
```

---

## Fields in this section

- [Field 1 - Features Confirmed](Features Confirmed.md)
- [Field 2 - Features Not Confirmed](Features Not Confirmed.md)
- [Field 3 - Undocumented Features](Undocumented Features.md)
- [Field 4 - Feature Maturity](Feature Maturity.md)
- [Field 5 - UI/UX Quality](UI-UX Quality.md)
- [Field 6 - Configuration Complexity](Configuration Complexity.md)
- [Field 7 - Error Handling & Recovery](Error Handling & Recovery.md)
- [Field 8 - Performance Under Load](Performance Under Load.md)

---

## Suggested 2-Day Schedule

### Day 1 (Admin A) - Confirm + Config
| Block | Focus |
|---|---|
| AM | Pre-flight + F1.1–F1.5 |
| PM | F1.6–F1.10 + Field 6 timing log |

### Day 2 - Negative + Scale + UX
| Block | Focus |
|---|---|
| AM | Field 2 negative tests + Field 3 API/SDK |
| Mid | Field 4 maturity audit + Field 5 UX walkthrough |
| PM | Field 7 error battery + Field 8 light load |

---

## Evidence → Eval Log Mapping

| Test IDs | Write into |
|---|---|
| F1.* Pass | Field 1 Features Confirmed |
| F1 fail / F2.* | Field 2 Features Not Confirmed |
| F3.* + surprise Admin finds | Field 3 Undocumented Features |
| Maturity table | Field 4 Feature Maturity |
| UX scores | Field 5 UI/UX Quality |
| Hours + Low/Med/High | Field 6 Configuration Complexity |
| E1–E8 | Field 7 Error Handling & Recovery |
| Latency curve + verdict | Field 8 Performance Under Load |

After each day: append findings to [`Glean/Combined/4.9.1 Functional Capabilities/Pre-Flight.md`](../../../Glean/Combined/4.9.1%20Functional%20Capabilities/Pre-Flight.md) under matching `## Field N` (same-file rule).

---

## Quick Admin URL Cheat Sheet

| Area | Path |
|---|---|
| Connectors | `/admin/setup/apps` (Platform → Connectors) |
| About / Server URL | `/admin/about-glean` |
| User roles / invites | `/admin/teammates` (**Users & permissions → User roles**) |
| SSO | `/admin/setup/auth` (**Users & permissions → SSO**) |
| People data | **Users & permissions → People data** |
| Third-party OAuth | **Users & permissions → Third-party access (OAuth)** |
| Model Hub / LLMs | Admin → Platform → Models / Configure LLMs |
| Protect | Admin → Glean Protect |
| MCP | Admin → Platform → MCP / Glean MCP servers |
| Usage | Admin → Management → Usage |
| Agents | App → Agents / Agent Builder |
| Search / Chat | App home |

Exact sub-nav labels vary by tenant version - if missing, search Admin sidebar.

---

## Safety Rules

1. Do not share private ACL test files (OneDrive/Drive) beyond test owners - that breaks the negative test.
2. Do not blast load tests past first sustained `429`.
3. Restricted-file tests: confirm User B has **no** Drive/OneDrive share before querying.
4. Store API tokens in secrets manager - never commit.
5. `X-Glean-ActAs` = privileged - treat like break-glass admin.
6. Notion: only share intended test pages with Glean integration (avoid over-sharing personal Notion).
