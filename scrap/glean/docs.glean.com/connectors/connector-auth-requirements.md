---
url: "https://docs.glean.com/connectors/connector-auth-requirements"
canonical: "https://docs.glean.com/connectors/connector-auth-requirements"
title: "Connector authentication requirements"
description: "Which native connectors require individual user authentication in addition to admin-level setup, and what that unlocks."
fetched_at: "2026-09-01T13:29:17.659Z"
---
On this page

Every native connector uses an **admin-level credential** (an OAuth app, service account, or API token configured by a Glean admin) to crawl and index content. For most connectors, that single credential is enough.

A smaller set of connectors also support or require **individual user authentication**, where each end user connects their own account. This is separate from admin setup and unlocks one of the following:

-   **Real-time access** to content that hasn't been indexed yet (for example, OneDrive, SharePoint, Salesforce, and Notion)
-   **Access to private or restricted content** that the admin credential can't see on its own (for example, Affinity Opportunities and Lists, Slack private channels and DMs)
-   **Identity mapping** required before any results from that source appear for a user at all (for example, GitHub, Intercom, Ironclad, Miro, Tableau)

**Every connector is permission-aware.** Glean carries each document's source permissions over during the admin crawl, so users only ever see what they can already see in the source. The groups below show only whether users must also authenticate individually. That's separate from permission enforcement and never changes what a user is allowed to see.

note

Some sources offer both an indexed connector and a separate MCP integration with its own per-user OAuth (for example, NetSuite, Klue, and Sigma). This table shows each connector's own authentication. The MCP layer authenticates separately.

important

This page reflects the authentication model described in each connector's current setup documentation. Behavior varies between connector versions, and some connectors support more than one deployment mode (for example, indexed versus real-time access, or cloud versus Server editions), each with its own requirements. Always confirm current behavior against the linked connector documentation, and check **Admin console → Platform → Connectors** for your deployment's configuration.

Within each group, connectors are listed alphabetically. Click a connector name to open its setup documentation.

### Connectors that require individual user authentication[​](#connectors-that-require-individual-user-authentication "Direct link to Connectors that require individual user authentication")

Without this step, affected users see no content from the source (or only its public content). Complete the admin setup, then have each user authenticate individually.

| Connector | Admin authentication | What user authentication unlocks |
| --- | --- | --- |
| [ClickUp](/connectors/native/clickup) | OAuth app (admin registers MCP server) | Live, federated access to the user's own permissioned ClickUp tasks and docs. No access without it |
| [DocuSign](/connectors/native/docusign) | OAuth app (integration key and secret) | Live fetch of DocuSign document and envelope content in chat, with individual user authorization |
| [GitHub](/connectors/native/github/setup) | GitHub App installed by org admin (read-only scopes) | Maps the user's GitHub alias to their email. Until completed, the user sees no GitHub content, public or private |
| [GitHub Enterprise Server](/connectors/native/github-enterprise-server/setup) | GitHub App and admin-issued classic PAT | Maps the user's GitHub alias to their email. Until completed, no GitHub content appears in their results |
| [GitHub Server](/connectors/native/github-server/setup) | GitHub App created on the instance | Syncs the user's GitHub alias. Until completed, the user can't see content in private repositories |
| [Intercom](/connectors/native/intercom) | OAuth 2.0 private app (admin-configured) | Lets Glean show the user only the conversations, tickets, and draft articles their Intercom account can access. Without it, they see none of these (published Help Center articles stay visible to everyone) |
| [Ironclad](/connectors/native/ironclad) | OAuth app (admin-authorized, two-layer OAuth) | Required for a user to see any Ironclad content at all. Results then mirror that user's real Ironclad access |
| [Miro](/connectors/native/miro/setup) | OAuth 2.0 app credentials (installed by a Company and Content Admin) | Only boards visible to users who have completed their own OAuth authorization are crawled |
| [Tableau](/connectors/native/tableau/setup) | Personal Access Token (admin) | Each user must connect their own Personal Access Token, or they see no Tableau results |

### Connectors where individual user authentication is optional[​](#connectors-where-individual-user-authentication-is-optional "Direct link to Connectors where individual user authentication is optional")

Indexed search works with the admin credential alone. Individual authentication unlocks the extra access described below.

| Connector | Admin authentication | What user authentication unlocks |
| --- | --- | --- |
| [Affinity](/connectors/native/affinity) | OAuth app (central Glean OAuth app, greenlisted per workspace) | Access to the user's own Opportunities and Lists (List-level permissions). Admin auth alone covers People and Companies |
| [Confluence (Cloud)](/connectors/native/confluence) | OAuth app (Forge app installed by admin) | Access to restricted pages, via per-user OAuth authorization |
| [Granola](/connectors/native/granola) | Workspace Enterprise API key (admin-set) | Connecting a personal API key indexes the user's own private "My Notes" content |
| [Highspot](/connectors/native/highspot) | API client key and secret (dedicated API user) | Enabling API impersonation turns on Spot-level permission enforcement. By default, all content is visible to all users |
| [Klue](/connectors/native/klue) | Admin API key (content:read and scim:read scopes) | The separate Klue MCP integration uses per-user OAuth (via Dynamic Client Registration) for live, permission-aware access to Klue tools in Glean Assistant and Agents at query time |
| [Monday](/connectors/native/monday) | OAuth app installed and authorized by an admin | Indexes private boards, shareable boards, and public boards in closed workspaces the user can access, beyond the default public content |
| [NetSuite](/connectors/native/netsuite/connector) | M2M OAuth 2.0 with X.509 certificate (NetSuite Administrator) | The separate NetSuite MCP integration uses per-user OAuth for live, permission-aware access to NetSuite records at query time |
| [Notion](/connectors/native/notion/setup) | Internal integration Bearer token (Workspace Admin-created) | Per-user OAuth ("Live Mode") fetches fresh, permission-aware content at query time, including private or very recent pages |
| [OneDrive](/connectors/native/onedrive/real-time-access) | Certificate-based app-only authentication (inherited from Microsoft 365) | Enables the real-time access add-on, fetching live OneDrive content scoped to the user's own permissions |
| [Salesforce](/connectors/native/salesforce/setup) | OAuth via a dedicated integration user or service account | "Connect Salesforce account" enables live, permission-aware data fetching (Live Mode) and Salesforce write tools at query time |
| [SharePoint](/connectors/native/sharepoint/real-time-access) | Certificate-based app permissions (Microsoft 365 parent) | Enables real-time access to SharePoint content not yet indexed, scoped to the user's own permissions |
| [Sigma](/connectors/native/sigma/connector) | API client credentials | Enables Sigma in Assistant for natural-language queries |
| [Slack](/connectors/native/slack/setup/slack-connector) | Admin-authorized Slack app | Unlocks private channel, DM, and group DM results for that user |
| [Smartsheet](/connectors/native/smartsheet) | OAuth 2.0 (admin-authorized) | Indexes the user's own private Smartsheet documents |

### Connectors that use admin authentication only[​](#connectors-that-use-admin-authentication-only "Direct link to Connectors that use admin authentication only")

A single admin-level credential covers indexing and permissions. Users don't authenticate individually.

| Connector | Admin authentication |
| --- | --- |
| [15Five](/connectors/native/15five) | API token (admin-generated) |
| [Aha!](/connectors/native/aha) | API token (personal access token) |
| [Airtable](/connectors/native/airtable) | API token (personal access token) |
| [Asana](/connectors/native/asana/setup) | API token (service account or admin PAT) |
| [Autodesk Construction Cloud](/connectors/native/autodesk-construction-cloud/setup) | OAuth app (Autodesk Platform Services, admin-granted) |
| [Azure DevOps](/connectors/native/azure-devops) | Service account (Azure app registration or service principal with client secret) |
| [BambooHR](/connectors/native/bamboohr) | API token (admin-generated) |
| [Bitbucket](/connectors/native/bitbucket/setup) | OAuth consumer and API token (admin or bot account) |
| [Bitbucket Server](/connectors/native/bitbucket-server) | API token (HTTP access token, admin) |
| [Box](/connectors/native/box/setup) | OAuth app (admin-authorized) |
| [Canva](/connectors/native/canva) | OAuth app (org-wide admin authorization) |
| [Coda](/connectors/native/coda) | API token (Organization Admin service account) |
| [Confluence Data Center](/connectors/native/confluence-onprem) | Service account credentials, webhook, and plugin |
| [Crayon](/connectors/native/crayon) | API key (Admin or Integrator role) |
| [Databricks](/connectors/native/databricks) | Service account (M2M OAuth, service principal) |
| [Docebo](/connectors/native/docebo) | OAuth app (OAuth 2.0 or JWT Bearer, admin-authorized) |
| [Dropbox](/connectors/native/dropbox) | OAuth app (admin-authorized) |
| [Egnyte](/connectors/native/egnyte) | OAuth app (admin-authorized, multiple admin accounts supported for throughput) |
| [Freshdesk](/connectors/native/freshdesk) | API token (admin or agent API key) |
| [Freshservice](/connectors/native/freshservice) | API key (Admin, Account Admin, or Workspace Admin-scoped) |
| [Gainsight](/connectors/native/gainsight) | Machine-to-machine OAuth client (client ID and secret) |
| [GitLab Cloud](/connectors/native/gitlab) | Personal access token (admin-scoped) and webhook secret |
| [GitLab Server](/connectors/native/gitlab-onprem) | Personal access token (admin or non-admin) |
| [Gmail](/connectors/native/gmail/setup) | Service account with domain-wide delegation |
| [Gmail (Federated)](/connectors/native/gmail-federated) | Service account with domain-wide delegation (expanded scopes) |
| [Gong](/connectors/native/gong) | OAuth 2.0 authorized by a Gong admin |
| [Google Calendar](/connectors/native/gcal/setup) | Service account with domain-wide delegation |
| [Google Chat](/connectors/native/gchat/setup) | Service account with domain-wide delegation |
| [Google Drive](/connectors/native/gdrive/setup) | Service account with domain-wide delegation |
| [Google Groups](/connectors/native/ggroups/setup) | Service account with domain-wide delegation and Google Vault |
| [Google Sites](/connectors/native/gsites/setup) | Service account with domain-wide delegation and Google Vault |
| [Greenhouse](/connectors/native/greenhouse) | Basic Auth via Harvest API key (site admin-provisioned) |
| [Guru](/connectors/native/guru) | User Access Token from a Guru team admin |
| [HubSpot](/connectors/native/hubspot) | Private app access token and client secret (super admin-created) |
| [Jira Cloud](/connectors/native/jira/setup) | Forge Crawler App installed by a Jira admin |
| [Jira Data Center](/connectors/native/jira-onprem) | Service account (Basic Auth) |
| [Lessonly](/connectors/native/lessonly) | API token (admin-generated) |
| [Linear](/connectors/native/linear) | OAuth 2.0 (admin-authorized custom app) |
| [Looker](/connectors/native/looker) | API3 key (client ID and secret, admin account) |
| [LumApps](/connectors/native/lumapps) | OAuth 2.0 (admin-authorized) |
| [Microsoft 365](/connectors/native/microsoft365/setup) | Certificate-based app-only authentication (shared parent connector for SharePoint and OneDrive) |
| [Microsoft Dynamics 365](/connectors/native/microsoft/microsoft-dynamics-365-connector) | App registration with a client secret, added as a read-only application user |
| [Microsoft Outlook](/connectors/native/outlook/setup) | Certificate-based app-only authentication (indexing and optional real-time access) |
| [Microsoft Teams](/connectors/native/teams/setup) | Azure app registration (certificate or secret) |
| [Microsoft Viva Engage](/connectors/native/viva-engage/setup) | OAuth 2.0 delegated (Verified Administrator) |
| [Okta](/connectors/native/okta/setup) | OAuth 2.0 Client Credentials with signed JWT (bootstrapped via temporary super admin token) |
| [PagerDuty](/connectors/native/pagerduty) | Read-only REST API access key (admin-generated) |
| [Panopto](/connectors/native/panopto) | OAuth 2.0 client credentials (admin-created API client) |
| [Perforce](/connectors/native/perforce) | MCP server deployed jointly with Glean (no self-serve admin flow) |
| [Pingboard](/connectors/native/pingboard) | Service account (client ID and secret) |
| [Procore](/connectors/native/procore/setup) | OAuth app with a Developer Managed Service Account |
| [Quip](/connectors/native/quip) | OAuth 2.0 via Quip Admin API (dedicated service-style user) |
| [S3](/connectors/native/s3) | IAM role (federated web identity or cross-account trust) |
| [Salesloft Conversation Intelligence](/connectors/native/salesloft-conversation-intelligence) | API key and API password |
| [Seismic](/connectors/native/seismic) | OAuth 2.0 authorization code flow (admin-authorized) |
| [ServiceNow](/connectors/native/servicenow/setup) | Dedicated service account and OAuth application |
| [SharePoint On-Prem](/connectors/native/sharepoint-onprem/setup) | NTLM service account and Entra App Proxy |
| [Shortcut](/connectors/native/shortcut) | API token (workspace-level) and webhook secret |
| [Simpplr](/connectors/native/simpplr) | OAuth 2.0 client credentials |
| [Stack Overflow](/connectors/native/stackoverflow/setup) | Admin-configured credentials (mode-dependent) |
| [Trello](/connectors/native/trello/setup) | API key and access token (admin) |
| [Veeva Vault](/connectors/native/veeva-vault/setup) | Username and password, or OAuth 2.0 Client Credentials |
| [Website](/connectors/native/website/setup) | Admin-configured site credentials |
| [Windchill](/connectors/native/windchill) | Service account (Basic Auth) |
| [WordPress](/connectors/native/wordpress) | HTTP Basic Auth (application password) |
| [Workday](/connectors/native/workday) | OAuth 2.0 (Integration System User) |
| [Zendesk](/connectors/native/zendesk) | API token (service account) |
| [Zoom](/connectors/native/zoom/setup) | OAuth 2.0 app authorization (Admin or Owner) |

## See also[​](#see-also "Direct link to See also")

-   [About connectors](/connectors/about) - how Glean's data access modes (indexed, live, and hybrid) relate to authentication
-   [Crawl and index connectors](/connectors/crawling-indexing) - how connectors crawl and refresh content
-   [Manage connectors](/connectors/monitoring) - monitor connector status and health after setup
