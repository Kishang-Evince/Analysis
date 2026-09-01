---
url: "https://docs.glean.com/security/deployment-best-practices"
canonical: "https://docs.glean.com/security/deployment-best-practices"
title: "Deployment best practices"
description: "Security-focused best practices for pre-deployment, deployment, and post-deployment phases of a Glean rollout."
fetched_at: "2026-09-01T13:29:58.435Z"
---
On this page

Glean mirrors and enforces your enterprise access controls, but a successful rollout also requires thoughtful planning and ongoing governance. This guide walks through security best practices for each deployment phase, from initial setup through long-term operations.

## Pre-deployment[​](#pre-deployment "Direct link to Pre-deployment")

### Establish a formal ownership model[​](#establish-a-formal-ownership-model "Direct link to Establish a formal ownership model")

Assign the following roles before rollout:

-   **Executive Sponsor:** Owns business outcomes and ROI
-   **Product Owner:** Owns KPIs and the operating model
-   **Glean Admin:** Handles configuration, connectors, and tier-1 support
-   **Security and Compliance Lead:** Oversees policies, audit logs, and role reviews
-   **Line-of-business champions:** Represent functional teams and drive adoption

> See [About RBAC](/administration/identity/roles/about) and [Administrator roles](/administration/identity/roles/admin-roles).

### Integrate identity securely[​](#integrate-identity-securely "Direct link to Integrate identity securely")

-   Configure SSO (OIDC or SAML) and SCIM for automatic deprovisioning
-   Enforce conditional access where possible to restrict service account activity to trusted IPs

> See [Entra ID (OIDC)](/administration/identity/sso/configuration/entra-id-oidc) and [Managing users](/administration/identity/roles/manage-users).

### Plan sensitivity scans with Glean Protect[​](#plan-sensitivity-scans-with-glean-protect "Direct link to Plan sensitivity scans with Glean Protect")

-   Create a test user group for any new connectors so you can validate crawl configuration and run sensitivity scans before expanding access to all users.
-   After indexing completes for the test group, run Glean Protect scans with auto-hide enabled to catch overexposed documents (for example, PII shared with "Everyone") before broader rollout.

> See [Manage policies](/administration/protect/sensitive-findings/manage-policies) and [About sensitive findings](/administration/protect/sensitive-findings/about).

## Deployment phase[​](#deployment-phase "Direct link to Deployment phase")

### Controlled launch[​](#controlled-launch "Direct link to Controlled launch")

-   Onboard users in stages
-   Validate mirrored permissions in a small, monitored environment

> See [Connectors](/connectors/) and [Excluding content](/connectors/excluding-content).

### Lock down administrative functions[​](#lock-down-administrative-functions "Direct link to Lock down administrative functions")

-   Monitor access to powerful features in audit logs

> See [Audit logs](/administration/management/audit-logs/admin-audit-logs).

### Security gates at expansion[​](#security-gates-at-expansion "Direct link to Security gates at expansion")

-   Before expanding access to new user cohorts, review Glean Protect scan results and confirm that auto-hide has addressed any policy violations
-   For new connectors, onboard to a test group first, allow indexing to complete, and run Glean Protect scans before expanding access

> See [Manage policies](/administration/protect/sensitive-findings/manage-policies) and [View sensitive findings flagged by policies](/administration/protect/sensitive-findings/view-policy-findings).

### Validate permissions and audit logs[​](#validate-permissions-and-audit-logs "Direct link to Validate permissions and audit logs")

-   Confirm that permission mirroring reflects source system changes, especially during offboarding
-   Stream logs to your SIEM (for example, Splunk or Chronicle) for anomaly detection

> See [Audit logs](/administration/management/audit-logs/admin-audit-logs) and [Troubleshooting search](/administration/search/troubleshooting#administrative-verification).

### Test governance enforcement[​](#test-governance-enforcement "Direct link to Test governance enforcement")

-   Simulate edge cases (for example, revoked access in SharePoint) and confirm that changes are reflected in Glean

## Post-deployment and remediation[​](#post-deployment-and-remediation "Direct link to Post-deployment and remediation")

### Enable auto-hiding with Glean Protect[​](#enable-auto-hiding-with-glean-protect "Direct link to Enable auto-hiding with Glean Protect")

-   Instantly hide documents that violate policies (for example, PII in public folders)
-   This reduces the blast radius while you remediate the source data

> See [Managing result visibility](/administration/search/hiding-content).

### Schedule recurring scans[​](#schedule-recurring-scans "Direct link to Schedule recurring scans")

-   Run sensitivity scans quarterly or more frequently to surface new exposures across evolving content

> See [Guide to sensitive findings](/administration/protect/sensitive-findings/guide).

### Protect+ for threat defense[​](#protect-for-threat-defense "Direct link to Protect+ for threat defense")

-   Detect and block prompt injection and jailbreak attempts
-   Enforce context-only LLM access via RAG to prevent output leakage

> See [Protect+ quickstart](/administration/protect/plus-quickstart).

### Periodic access and privilege reviews[​](#periodic-access-and-privilege-reviews "Direct link to Periodic access and privilege reviews")

-   Validate RBAC assignments and Super Admin role justifications
-   Audit who has access to sensitive moderation tools

> See [About RBAC](/administration/identity/roles/about) and [Administrator roles](/administration/identity/roles/admin-roles).

### Formal change management for new sources[​](#formal-change-management-for-new-sources "Direct link to Formal change management for new sources")

Before expanding a new connector to all users, complete the following:

1.  Onboard the connector to a test group and allow indexing to complete
2.  Run Glean Protect scans with auto-hide enabled and review findings
3.  Complete a security review
4.  Obtain Admin sign-off

### Integrate with Microsoft Purview[​](#integrate-with-microsoft-purview "Direct link to Integrate with Microsoft Purview")

-   Use Microsoft Purview to enforce label-based indexing restrictions
-   Validate API behavior independently through the Purview Compliance Portal

> See [Permission and security controls for SharePoint](/connectors/native/sharepoint/security/controls#monitoring-via-microsoft-purview).

## Key tools and controls[​](#key-tools-and-controls "Direct link to Key tools and controls")

| Tool | Purpose |
| --- | --- |
| Glean Protect | Sensitive content detection, auto-remediation, and centralized dashboard |
| Auto-hiding | Prevents policy-violating content from appearing in search and AI before the root cause is resolved |
| RBAC | Enforces strict access separation and least privilege |
| SIEM integration | Enables alerting and investigation through enterprise monitoring tools |
| Conditional access | Restricts connector credentials to trusted IPs to mitigate broad permissions |
| SCIM | Ensures near-real-time user deprovisioning for dynamic access management |

## Roles and responsibilities[​](#roles-and-responsibilities "Direct link to Roles and responsibilities")

| Role | Key responsibilities |
| --- | --- |
| Executive Sponsor | Aligns Glean to ROI, secures resourcing |
| Product Owner | Owns internal roadmap, KPIs, connectors, adoption |
| Glean Admin | Daily configuration: connectors, test groups, visibility, roles, features |
| Super Admin | Assigns sensitive content roles; access restricted by policy |
| Sensitive Content Moderator | Builds policies, triages findings, auto-hides, partners on remediation |
| Agent Creator | Builds agents |
| Agent Moderator | Approves agent sharing, enforces guardrails |
| Security and Compliance Lead | Reviews audit logs, SIEM pipelines, alerts |
| Connector owners | Manage credentials, redlists/greenlists, and permission alignment |
| DevSecOps / Platform | Monitor configuration drift, audit logs, WAF/IDS, support SIEM and IP controls |

## See also[​](#see-also "Direct link to See also")

-   [Core security principles](/security/security-principles)
-   [Secure configuration best practices](/security/secure-configuration)
-   [Shared responsibility model](/security/architecture/shared-responsibility)
-   [Security best practices for scheduled triggers agents](/security/agents/background-agents)
-   [Manage policies](/administration/protect/sensitive-findings/manage-policies)
-   [Audit logs](/administration/management/audit-logs/admin-audit-logs)
