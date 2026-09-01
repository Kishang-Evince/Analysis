---
url: "https://docs.glean.com/security/secure-configuration"
canonical: "https://docs.glean.com/security/secure-configuration"
title: "Secure configuration best practices"
description: "Best practices for configuring identity, connectors, assistant, agents, logging, and sensitive data governance in Glean."
fetched_at: "2026-09-01T13:29:58.559Z"
---
On this page

Use these recommendations to harden your Glean deployment across identity, connectors, assistant, agents, logging, and sensitive data. Each section summarizes what to configure and links to the detailed setup guide.

These practices build on Glean's [core security principles](/security/security-principles) and complement the [shared responsibility model](/security/architecture/shared-responsibility), which defines what your organization manages versus what Glean manages.

## Identity and access management[​](#identity-and-access-management "Direct link to Identity and access management")

-   **SSO and MFA:** Enforce single sign-on with multi-factor authentication and SCIM deprovisioning through your identity provider. Restrict access to intended users only, and remove terminated users immediately.
-   **Role-based access control (RBAC):** Apply least-privilege RBAC. Use Setup Admin for SSO and connector configuration, Admin for platform configuration and user permissions, and reserve Super Admin for security-only workflows. Review assigned roles periodically.
-   **IP allowlisting:** If needed, restrict access to Glean to specific IP address ranges

tip

Glean technical owners should review assigned roles periodically to confirm they still match each administrator's responsibilities.

> See [About RBAC](/administration/identity/roles/about), [Entra ID (OIDC)](/administration/identity/sso/configuration/entra-id-oidc), and [Administrator roles](/administration/identity/roles/admin-roles).

## Connector integration[​](#connector-integration "Direct link to Connector integration")

-   **Phased rollout:** Roll out new connectors in phases. Start with a small test group (which you can define in the **Admin console**), validate indexing and permission mirroring, and then expand to end users.
-   **Pre-launch sensitivity scans:** Create sensitive findings policies using infotypes, terms, or regex patterns. Triage results and optionally autohide violations to prevent exposure in Search and Glean. You can run reports for any specific connector before making its content visible to everyone.
-   **Greenlist and redlist controls:** Include or exclude repositories, folders, and individual items from crawling to reduce exposure when needed
-   **Microsoft Purview integration:** For Microsoft ecosystems, use Purview integration to independently monitor connector API activity and optionally exclude content with specific sensitivity labels

> See [Connectors](/connectors/), [Managing connectors](/connectors/monitoring), and [Excluding content](/connectors/excluding-content).

## Assistant setup[​](#assistant-setup "Direct link to Assistant setup")

-   **LLM selection:** The Glean Universal Model Key provides LLM access with zero-day data retention and no training on enterprise data. Models are preconfigured and managed by Glean, and deprecated models are automatically replaced with newer versions
-   **Assistant policies:** Glean respects existing access control lists (ACLs) for all signed-in users, ensuring information exposure aligns with current permissions. You can also configure additional instructions, exclusion rules, and disclaimers to meet your specific policy requirements. Consider adding a concise disclaimer to display under Glean.
-   **Feedback routing:** Route up/downvotes and comments to a monitored email alias to triage quality and safety signals
-   **Custom help message:** Set a custom message that appears when users click **Get help** from any page in Glean, with a link to a monitored channel or email alias

> See [Set up LLMs using the Model Hub](/administration/llms), [Set up Glean Assistant](/get-started/golive/setup-glean-assistant), and [Receive user feedback](/troubleshooting/user-feedback).

## Agent governance[​](#agent-governance "Direct link to Agent governance")

-   **Hybrid creation and publishing model:** Allow broad agent creation but gate publishing through Agent Moderators. Default Member permissions set "Can create agents" to On and "Can publish agents" to Off
-   **Role assignments:** Admin and Super Admin govern platform-wide settings; Agent Moderator can create, edit, and share any agent; Agent Creator can build their own agents; default Member follows organization defaults

For security practices specific to agents that run on a schedule without manual approval, see [Security best practices for scheduled triggers agents](/security/agents/background-agents).

> See [Managing agent access](/administration/managing-agents/agent-access).

## Logging[​](#logging "Direct link to Logging")

-   **Centralized audit monitoring:** Admin audit logs are on by default and can be exported to SIEM for detection and investigations

> See [Audit logs](/administration/management/audit-logs/admin-audit-logs).

## Sensitive data governance[​](#sensitive-data-governance "Direct link to Sensitive data governance")

### Policy management with Glean Protect[​](#policy-management-with-glean-protect "Direct link to Policy management with Glean Protect")

Scan connectors for sensitive content using infotypes (PII, PCI, credentials, and more). Use sensitive content reports to find overshared documents that contain specific words (such as project names) or match regex patterns. Policies can run continuously or weekly, and you can autohide flagged content to prevent it from appearing in Search or Glean while you remediate at the source.

> See [Manage policies](/administration/protect/sensitive-findings/manage-policies), [Protect+ quickstart](/administration/protect/plus-quickstart), and [About sensitive findings](/administration/protect/sensitive-findings/about).

### Indexing and visibility controls[​](#indexing-and-visibility-controls "Direct link to Indexing and visibility controls")

Glean supports flexible indexing policies by application and connector. You can hide documents for all users, all but the owner, or all but explicit sharers. In addition to specifying individual document IDs in the UI, admins can upload a list of documents via CSV to scale the hiding policy.

> See [Managing result visibility](/administration/search/hiding-content).

### Access verification and audit[​](#access-verification-and-audit "Direct link to Access verification and audit")

Use **Verify access** in the **Admin console** to confirm that a document's permissioned visibility matches your expectations. Audit document-level actions and export logs to your SIEM.

> See [Troubleshooting search](/administration/search/troubleshooting#administrative-verification).

### Redlisting and greenlisting[​](#redlisting-and-greenlisting "Direct link to Redlisting and greenlisting")

Configure redlists and greenlists on a per-application basis to include or exclude specific content from crawling.

> See [Excluding content](/connectors/excluding-content).

### Microsoft Purview integration[​](#microsoft-purview-integration "Direct link to Microsoft Purview integration")

Glean integrates with Microsoft Purview in two ways:

-   **Independent monitoring:** Security teams can use the Purview Compliance Portal to independently monitor the API activity of Glean's SharePoint connector. This lets you cross-reference Glean's behavior against Purview's native logs and verify that the connector performs only read-only operations.
-   **Sensitivity labels:** Glean can recognize and honor sensitivity labels from Microsoft Purview Information Protection. You can create rules to restrict indexing of Office 365 content based on these labels.

> See [Permission and security controls for SharePoint](/connectors/native/sharepoint/security/controls#monitoring-via-microsoft-purview).
