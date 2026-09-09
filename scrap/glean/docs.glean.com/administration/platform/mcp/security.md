---
url: "https://docs.glean.com/administration/platform/mcp/security"
canonical: "https://docs.glean.com/administration/platform/mcp/security"
title: "MCP Security, Data Flow, and Permissions"
description: "Security architecture, identity, permissions, and data flow for Glean MCP server"
fetched_at: "2026-09-01T13:29:13.243Z"
---
On this page

This document describes how the Glean MCP server is deployed, how it handles identity and permissions, and how customer data flows when MCP-compatible hosts (for example, ChatGPT, Claude, Copilot Studio, IDEs) connect to Glean.

Use this information as a reference for security, architecture, and compliance to evaluate Glean's remote MCP deployment.

* * *

Glean plug-in for coding hosts

Requests made through the Glean plug-ins for Cursor, Claude Code, and Codex pass through the same authentication, authorization, source permissions, and policy controls described on this page. See [Manage Glean plug-in access and security](/administration/platform/mcp/manage-glean-plugin).

## 1\. The Glean MCP server[​](#1-the-glean-mcp-server "Direct link to 1. The Glean MCP server")

The Glean MCP server is a managed, remote implementation of the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) that exposes Glean's permission-aware enterprise context as standard MCP tools (for example, `search`, `chat`, `read_document`, and selected agents).

Instead of building and operating your own MCP servers, you point MCP-compatible hosts at Glean-managed endpoints such as:

```
https://{your-backend-domain}/mcp/{server_name}
```

Find your backend domain at [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean) under **Server instance (QE)**. It typically follows the pattern `company-be.glean.com`, but may be different if your organization uses a custom domain.

Each endpoint runs inside your Glean tenant and follows the same security, privacy, and permission model as the rest of the Glean platform.

* * *

## 2\. Deployment and hosting model[​](#2-deployment-and-hosting-model "Direct link to 2. Deployment and hosting model")

### 2.1 Customer-isolated tenants[​](#21-customer-isolated-tenants "Direct link to 2.1 Customer-isolated tenants")

The Glean remote MCP server:

-   Deploys as a dedicated tenant per customer in its own cloud project or VPC. All standard ingestion, indexing, and query processing takes place inside that tenant.
-   Reuses the same infrastructure and security boundaries (networking, encryption, IAM, auditing) as Glean search and assistant
-   Presents one or more per-server URLs (for example, `…/mcp/default`, `…/mcp/chatgpt`, `…/mcp/eng`) that admins can create and configure using the Glean Admin Console

### 2.2 Remote MCP: The recommended production deployment[​](#22-remote-mcp-the-recommended-production-deployment "Direct link to 2.2 Remote MCP: The recommended production deployment")

Glean recommends the Glean remote MCP server as the supported deployment model for all production use cases, accessed over HTTPS from MCP hosts (ChatGPT, Claude, VS Code, etc.) and officially supported by Glean for major MCP hosts.

info

For information about development-only local MCP servers, see [Appendix: Local MCP Servers](#appendix-local-mcp-servers) at the end of this document.

### 2.3 Network access controls[​](#23-network-access-controls "Direct link to 2.3 Network access controls")

Glean enforces IP greenlisting at multiple layers:

-   Tenant-wide IP greenlists enforced at the VPC firewall.
-   Some endpoints, such as webhook delivery and OAuth metadata discovery, may be exempt from those tenant-wide VPC firewall rules. MCP endpoints enforce IP greenlisting at the application layer.
-   Glean also applies additional application-level IP greenlisting for relevant API traffic, including MCP access.

This layered model lets you combine network-level controls with application-level enforcement when you want tighter control over which systems can reach your MCP servers.

* * *

## 3\. Identity, Authentication, and Authorization[​](#3-identity-authentication-and-authorization "Direct link to 3. Identity, Authentication, and Authorization")

The Glean MCP server never bypasses Glean's native identity or permission model. It acts as a thin protocol adapter that:

1.  Authenticates the end user or client via Glean OAuth or API tokens
2.  Maps that identity to a Glean user in the customer's tenant
3.  Executes MCP tool calls as that user via Glean's APIs and Knowledge Graph

### 3.1 Supported authentication methods[​](#31-supported-authentication-methods "Direct link to 3.1 Supported authentication methods")

MCP servers support the following authentication methods, in order of preference:

1

Glean OAuth Authorization Server (Recommended)

OAuth 2.0 with Dynamic Client Registration (DCR) where supported by the host. See [Glean OAuth Authorization Server](/administration/oauth/authorization-server) and [Dynamic Client Registration](/administration/oauth/dynamic-client-registration) for more information.

MCP hosts initiate a standard OAuth authorization grant flow: Users sign in to Glean normally with your existing SSO/IdP, and Glean then issues short-lived OAuth tokens scoped to Glean APIs (SEARCH, CHAT, DOCUMENTS, TOOLS, etc.).

2

IdP-based OAuth

Customers configure MCP hosts to obtain OAuth tokens directly from their corporate identity provider (IdP), and Glean validates those tokens for MCP access.

3

User-scoped Glean API Tokens (Fallback)

Client API tokens tied to a specific user and tenant, with explicit scopes: `MCP`, `AGENT`, `SEARCH`, `CHAT`, `DOCUMENTS`, `TOOLS`, `ENTITIES`.

Intended for hosts that **cannot yet support OAuth** or for development and troubleshooting.

### 3.2 Authorization and permission enforcement[​](#32-authorization-and-permission-enforcement "Direct link to 3.2 Authorization and permission enforcement")

Once authenticated, the MCP server executes all tools as that specific user, with enforcement at multiple layers:

### Knowledge Graph-level ACLs

Every search, chat, and document retrieval call enforces per-document and per-object permissions based on Glean's Knowledge Graph (connector\-sourced ACLs, groups, roles, sharing settings).

### Scope-based API Access

The MCP server constrains tokens to the minimal set of scopes required (e.g., read-only tools vs. write tools), and the MCP server validates scopes before accessing any data or performing any tool.

### No Cross-tenant Access

The MCP server bounds tokens to a single customer tenant. Routing and back end services reject cross-instance access.

warning

If a user cannot see or access something in Glean, then they cannot see or access it through MCP regardless of which host application they use.

* * *

## 4\. Data flow and residency[​](#4-data-flow-and-residency "Direct link to 4. Data flow and residency")

### 4.1 High-level data flow[​](#41-high-level-data-flow "Direct link to 4.1 High-level data flow")

The following describes the data flow for a remote MCP request, such as Claude asking Glean to `read_document`:

1

MCP Host → Glean MCP Endpoint

The host's MCP client opens a streaming HTTP/SSE connection to `https://{your-backend-domain}/mcp/{server}` using TLS 1.2+.

The request includes an OAuth token or API token bound to a user in the customer tenant.

2

Within the Customer's Glean Tenant

The MCP server validates the token, resolves the tenant, and routes the request to the appropriate MCP handler for that server.

The handler invokes Glean's internal services (`search`, `chat`, `read_document`, etc.) exactly as if the user had called Glean directly via API or UI.

3

Response Back to Host

The MCP handler streams structured responses back to the MCP host over the same TLS connection (search results, snippets, answers, tool outputs).

The host's LLM uses this context to answer the user; any further data handling by the host is governed by **that host's** privacy and security controls.

### 4.2 Where customer data lives[​](#42-where-customer-data-lives "Direct link to 4.2 Where customer data lives")

All indexed content, permissions, embeddings, and query processing occur inside the customer's Glean tenant (their cloud project or VPC). The remote MCP server runs within that same environment, so tool invocations and intermediate results also remain inside the tenant boundary.

### 4.3 Data sent to MCP hosts[​](#43-data-sent-to-mcp-hosts "Direct link to 4.3 Data sent to MCP hosts")

The MCP server only sends data that the user is already allowed to see and only in response to explicit tool calls from the MCP host. Example data includes snippets, metadata, and full documents via `read_document`.

Once data reaches the host, it is subject to that host's own data processing and retention policies. From a data handling perspective, connecting an MCP host to Glean is equivalent to any application that consumes Glean's APIs.

* * *

## 5\. Permissions and tool behavior[​](#5-permissions-and-tool-behavior "Direct link to 5. Permissions and tool behavior")

### 5.1 Permission-aware tools[​](#51-permission-aware-tools "Direct link to 5.1 Permission-aware tools")

Each MCP tool enforces permissions per the model in [Section 3.2](#32-authorization-and-permission-enforcement):

| Tool | Permission Behavior |
| --- | --- |
| `search` | Returns only items the user can already access in Glean |
| `read_document` | Can only fetch documents the user may open directly |
| People, org, and code tools | Respect underlying directory, HR, and repo permissions |

### 5.2 Scope and least privilege[​](#52-scope-and-least-privilege "Direct link to 5.2 Scope and least privilege")

Admins can choose which tools to expose on each MCP server. Access from MCP hosts is controlled via OAuth client configuration (including client IDs, secrets, and redirect URI restrictions) at the tenant level, and applies across all servers rather than being configured per server.

Admins can manage allowed scopes for **static OAuth clients** directly in the Admin Console. For **dynamically registered clients**, Glean applies a configurable restricted scope set. Contact your Glean representative if you need to change that set for your tenant.

See [Static OAuth clients](/administration/oauth/static-client-registration) more information how to create and manage static OAuth clients.

Typical patterns:

### General-purpose Server

A server (for example, `/mcp/default`) with read-heavy tools like search and document retrieval.

### Persona-specific Servers

Servers (for example, `/mcp/eng`, `/mcp/sales`) with tools tailored to a team's workflows.

Each server is configured with only the tools and scopes it needs, supporting a least-privilege posture for each integration.

* * *

## 6\. Compliance, privacy, and data protection[​](#6-compliance-privacy-and-data-protection "Direct link to 6. Compliance, privacy, and data protection")

Remote MCP servers inherit Glean's platform-level guarantees:

-   Coverage under Glean's Data Processing Addendum (DPA) and standard contractual controls
-   Built on top of the same infrastructure that underpins Glean's [SOC-aligned security program](https://trust.glean.com/) and regional data residency posture
-   Subject to the same user session management capabilities (for example, admins can sign users out of all sessions, including MCP-originated sessions, via the Glean Admin UI)
-   Enterprise features such as regional data residency, multi-region HA, and OAuth / IdP integration apply uniformly to MCP endpoints

* * *

## 7\. Client Identity Binding[​](#client-identity-binding "Direct link to 7. Client Identity Binding")

To restrict which client applications can access Glean's MCP servers, Glean provides two mechanisms: redirect URI restrictions on Dynamic Client Registration (DCR) and static OAuth clients.

### 7.1 Static clients vs. dynamic clients[​](#71-static-clients-vs-dynamic-clients "Direct link to 7.1 Static clients vs. dynamic clients")

|  | Static client | Dynamic client (DCR) |
| --- | --- | --- |
| Created by | Admin in the Admin Console | Host application, at runtime via the `/oauth/register` endpoint |
| Client credentials | Admin controls `client_id` and secret, and distributes only to approved integrations | Host self-registers and receives credentials automatically |
| Best for | Binding access to a single known deployment (for example, ChatGPT Enterprise managed by your org) | Broad compatibility with many MCP hosts |
| Revocation | Admin deletes or disables the client | Admin revokes the client and optionally prevents future registrations by removing its redirect URI pattern from the allowlist |

### 7.2 Restricting or Disabling dynamic client registration[​](#72-restricting-or-disabling-dynamic-client-registration "Direct link to 7.2 Restricting or Disabling dynamic client registration")

To restrict which applications can register dynamically, see [Dynamic Client Registration](/administration/oauth/dynamic-client-registration) for more information. If your organization requires admin-created static OAuth clients only, select **Do not allow dynamic client registrations**.

### 7.3 Confidential vs. public clients[​](#73-confidential-vs-public-clients "Direct link to 7.3 Confidential vs. public clients")

info

Confidential web clients such as ChatGPT and Claude.ai run server-side and can securely store a client secret. Client identity for these applications can be cryptographically verified.

Public locally installed applications such as VS Code, Cursor, and Claude Code cannot securely store a client secret because the secret would reside on the user's local machine.

This distinction is inherent to OAuth for native and desktop applications ([RFC 8252](https://datatracker.ietf.org/doc/html/rfc8252)), not a Glean-specific limitation.

### 7.4 Restricting access to enterprise-managed deployments[​](#74-restricting-access-to-enterprise-managed-deployments "Direct link to 7.4 Restricting access to enterprise-managed deployments")

For hosted enterprise applications such as ChatGPT Enterprise or Claude Enterprise, you can restrict access so users connect only through your managed deployment rather than through their personal ChatGPT or Claude accounts.

To restrict access to enterprise-managed sessions, see [Do not allow dynamic client registrations](/administration/oauth/dynamic-client-registration#do-not-allow-dynamic-client-registrations) to learn how to disable dynamic client registration. Instead, see [Static OAuth clients](/administration/oauth/static-client-registration) to configure a static OAuth Client ID and secret.

info

When these clients use Dynamic Client Registration, the MCP host does not distinguish between enterprise-managed sessions and personal sessions. This is why restricting access to managed deployments requires statically configured OAuth clients.

### 7.5 Hosted services vs. local applications[​](#75-hosted-services-vs-local-applications "Direct link to 7.5 Hosted services vs. local applications")

If you want to limit MCP access to approved applications, the configuration depends on whether the application is a hosted service or a local application.

-   **Hosted services**: If the service supports admin-configured client IDs and secrets, create a static OAuth client and distribute those credentials only to your approved deployment. This method keeps users on enterprise-managed hosted services rather than personal accounts. See [Static OAuth clients](/administration/oauth/static-client-registration).
-   **Single gateway approval**: If you want to allow exactly one hosted gateway or hosted service to register dynamically, configure redirect URI restrictions with a custom allowlist that includes only that gateway's redirect URIs. See [Approve only one gateway](/administration/oauth/dynamic-client-registration#allow-only-one-gateway-or-service) for more information.
-   **Local applications**: Public clients such as desktop IDEs cannot securely keep a client secret. For these applications, use your existing endpoint management, device trust, and software distribution controls to ensure only approved software runs on user machines.

* * *

## 8\. Loopback redirect URI security model[​](#loopback-redirect-uri-security-model "Direct link to 8. Loopback redirect URI security model")

This section covers loopback redirect URIs used in OAuth flows by locally installed applications (VS Code, Cursor, Claude Code).

note

The loopback redirect URI security model is distinct from [local MCP servers](#appendix-local-mcp-servers) (stdio transport).

### 8.1 How loopback redirects work[​](#81-how-loopback-redirects-work "Direct link to 8.1 How loopback redirects work")

When a locally installed MCP host initiates an OAuth authorization flow, it starts a temporary HTTP listener on a loopback interface. After the user signs in and grants consent, the authorization server redirects the browser to that loopback URI to deliver the authorization code. This is standard OAuth behavior for native applications per [RFC 8252](https://datatracker.ietf.org/doc/html/rfc8252).

### 8.2 Threat model[​](#82-threat-model "Direct link to 8.2 Threat model")

Redirect URI restrictions mitigate the following threats:

| Threat | Mitigated by redirect URI restrictions? | Explanation |
| --- | --- | --- |
| Remote phishing (for example, `evil.com` attempts to intercept the OAuth flow) | Yes | Redirect URI restrictions prevent authorization codes from being sent to redirect URIs not in the allowed list. |
| Malicious software on the user's machine | No | Any process on the same machine can bind to loopback ports. A compromised device can intercept the authorization code regardless of redirect URI restrictions. |

info

Redirect URI restrictions that include loopback URIs are a governance control that prevents casual misuse and blocks unauthorized remote clients. They are not a defense against a fully compromised endpoint. For compromised-device scenarios, rely on endpoint security (EDR), device trust policies in your IdP, and Conditional Access.

* * *

## 9\. MCP Disablement and token lifecycle[​](#mcp-disablement-and-token-lifecycle "Direct link to 9. MCP Disablement and token lifecycle")

You can restrict or disable MCP access through several paths. All configuration changes propagate within approximately 5–10 minutes.

### 9.1 Token behavior by authentication model[​](#91-token-behavior-by-authentication-model "Direct link to 9.1 Token behavior by authentication model")

### IdP-based OAuth

Your identity provider issues and manages access and refresh tokens. Token issuance, expiry, refresh, storage, and revocation follow your IdP's policies.

### Glean OAuth Authorization Server

Glean issues signed JWT access tokens and does not store them. Access tokens last 7 days by default, and admins can configure a different TTL.

Glean stores refresh tokens securely in your tenant's instance. Refresh tokens last 180 days by default, and admins can configure a different TTL.

For Glean-issued tokens, when a user signs out, Glean invalidates that user's tokens until they sign back in. Admins can do the same from the Glean Admin Console by signing users out of all sessions for a user. Revocation caches refresh every 10 minutes by default.

### Disabling the MCP server entirely

Once the configuration change has propagated (~5–10 minutes), no new MCP connections are accepted, including tool listings and tool calls.

### Changing the redirect URI allow list

Changes take effect after propagation (~5–10 minutes) and apply to new client registrations only. Existing dynamically registered clients that were previously granted access continue to work until explicitly revoked.

### Revoking a specific OAuth client (Admin Console)

Revoking a dynamic or static client affects existing connections. The revocation takes effect after configuration propagation (~5–10 minutes), after which the client can no longer authenticate or make tool calls.

### Signing out users from all sessions

Admins can sign users out of all sessions - including MCP-originated sessions - via the Glean Admin Console. This invalidates the user's Glean-issued tokens across all MCP hosts. After revocation caches refresh (10 minutes by default), MCP hosts must re-authenticate the user before they can connect again.

* * *

## 10\. Monitoring and Audit[​](#monitoring-and-audit "Direct link to 10. Monitoring and Audit")

### 10.1 Admin audit logs[​](#101-admin-audit-logs "Direct link to 10.1 Admin audit logs")

Administrative configuration changes to MCP servers and OAuth settings (enabling/disabling servers, modifying redirect URI restrictions, creating or revoking clients) are captured in Glean's admin audit logs. See [Admin Audit Logs](/administration/management/audit-logs/admin-audit-logs) for details on searching, filtering, and exporting these logs.

### 10.2 MCP activity logs[​](#102-mcp-activity-logs "Direct link to 10.2 MCP activity logs")

MCP activity logs capture tool usage events for each MCP server. These logs can be filtered by MCP server, tool, user, and date range. OAuth client metadata (such as client name and registration type) is included in activity log entries, providing visibility into which applications are accessing MCP and how they are being used.

For confidential applications that use static client IDs and secrets, host attribution is reliable. For other client types, host attribution is best effort and depends on the metadata the client provides.

### 10.3 Insights dashboard[​](#103-insights-dashboard "Direct link to 10.3 Insights dashboard")

Glean collects analytical data regarding the usage and performance of Agents within Glean and displays it in the insights dashboard. This data includes metrics related to user engagement, agent effectiveness, and overall quality of interaction. See [Overview](/administration/insights/overview) for more information.

note

MCP connection and usage insights are available in the [MCP insights](/administration/insights/mcp-insights) dashboard, which reports MCP calls and active users with breakdowns by host application, tool, and server. For other tracking methods such as audit logs and activity logs, see [MCP usage tracking and analytics](/administration/platform/mcp/analytics).

* * *

## 11\. FAQ for Security / Architecture Reviews[​](#11-faq-for-security--architecture-reviews "Direct link to 11. FAQ for Security / Architecture Reviews")

### Q1. Does confidential data leave our cloud boundary when using the Glean remote MCP server?

The Glean remote MCP server runs inside your Glean tenant (your dedicated cloud project/VPC). All indexing, query processing, and MCP tool execution occur within that environment. Tool responses are returned to the MCP host over TLS - the same data flow as any application consuming Glean's APIs. Once data reaches the host, it is subject to that host's data handling policies.

### Q2. Does Glean MCP introduce any new permission model?

No. The MCP server is built on top of Glean's existing APIs and Knowledge Graph. All access is user-scoped and permission-aware, enforcing the same ACLs, group memberships, and sharing rules as the Glean UI and APIs.

### Q3. How is the user authenticated from ChatGPT/Claude/VS Code into Glean?

The host uses either:

-   OAuth, often with Dynamic Client Registration (preferred), or
-   User-scoped Client API tokens (fallback where OAuth is not yet supported)

Tokens are scoped to MCP-specific APIs and are validated by the Glean MCP gateway before each tool invocation.

### Q4. Can the MCP server access or exfiltrate data the user isn't allowed to see?

No. The MCP server cannot elevate privileges beyond the underlying Glean user identity. Every search, chat, or document access call is permission-checked by Glean's Knowledge Graph, the same as if the user had performed the action directly in Glean.

### Q5. Should we prefer remote or local MCP from a security standpoint?

Glean strongly recommends remote MCP for all production workloads. Local MCP servers carry additional security risks and should only be used for development. See [Appendix: Local MCP Servers](#appendix-local-mcp-servers) for details.

### Q6. Can we restrict access to enterprise-managed ChatGPT Enterprise or Claude Enterprise deployments only?

Yes. For hosted enterprise applications such as ChatGPT Enterprise or Claude Enterprise, you can restrict access so employees connect only through your managed deployment rather than through personal ChatGPT or Claude accounts.

To restrict access to enterprise-managed sessions, follow the steps at [Do not allow dynamic client registrations](/administration/oauth/dynamic-client-registration#do-not-allow-dynamic-client-registrations) to disable Dynamic Client Registration. Then, see [Static OAuth clients](/administration/oauth/static-client-registration) to configure a static OAuth Client ID and secret.

info

When these clients use Dynamic Client Registration, the MCP host does **not** distinguish between enterprise-managed sessions and personal sessions. This is why restricting access to managed deployments requires statically configured OAuth clients.

### Q7. What happens when I disable MCP or revoke a client?

Configuration changes propagate within approximately 5–10 minutes. Disabling MCP blocks all new connections. Revoking a client invalidates existing sessions. Changing the redirect URI allow list only affects new registrations. See [MCP Disablement and Token Lifecycle](#mcp-disablement-and-token-lifecycle) for the full breakdown.

* * *

## See also[​](#see-also "Direct link to See also")

For additional detail, see:

-   [About Glean MCP server](/administration/platform/mcp/about) – Product overview, supported hosts, authentication, and high-level security notes
-   [Data Flow](/security/architecture/data-flow) – Full platform data flow, ingestion, and processing model
-   [Glean OAuth Authorization Server](/administration/oauth/authorization-server) – Detailed review of Glean OAuth Authorization Server
-   [Admin Audit Logs](/administration/management/audit-logs/admin-audit-logs) – Administrative change logging

* * *

## Appendix: Local MCP Servers[​](#appendix-local-mcp-servers "Direct link to Appendix: Local MCP Servers")

warning

**Development-only; not recommended for production use**

This section is provided for completeness. Glean's remote MCP server is the recommended and supported deployment model for all production use cases.

### What is local MCP?[​](#what-is-local-mcp "Direct link to What is local MCP?")

Some MCP implementations use the `stdio` transport, which runs an MCP server locally on a user's machine. This is typically done by dynamically invoking a package using `npx`, which downloads, installs, and executes the MCP Node package's degit fault binary.

### Security concerns with local MCP[​](#security-concerns-with-local-mcp "Direct link to Security concerns with local MCP")

Local MCP servers introduce security risks that do not apply to Glean's remote MCP:

| Risk | Description |
| --- | --- |
| **Supply chain vulnerabilities** | npm packages are subject to attacks such as **package jacking**, where a threat actor takes control of a legitimate package to distribute malicious code. |
| **Full local privileges** | The MCP server inherits the full privileges of the local OS, including file system access, network access, and stored credentials. |
| **No centralized controls** | Local servers operate outside of Glean's authentication, authorization, monitoring, and compliance controls. |

### Glean's guidance[​](#gleans-guidance "Direct link to Glean's guidance")

-   **Always prefer remote MCP** for production workloads and when connecting SaaS hosts like ChatGPT or Claude
-   **Treat local MCP as development-only**, and only when there is no remote MCP server available and additional local security controls are in place
-   **Note**: Some SaaS hosts (e.g., ChatGPT) cannot reliably use local MCP at all
