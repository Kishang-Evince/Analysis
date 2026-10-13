---
url: "https://docs.glean.com/administration/protect/sensitive-findings/sensitive-data-search"
canonical: "https://docs.glean.com/administration/protect/sensitive-findings/sensitive-data-search"
title: "Content lookup"
description: "Locate sensitive information across indexed content, independent of standard document permissions."
fetched_at: "2026-10-13T08:49:30.312Z"
---
On this page

Glean Protect+

**Content lookup**, formerly called Sensitive data search or Admin Search, lets designated users find specific terms, customer names, or personally identifiable information (PII) across content indexed by Glean.

Unlike standard search, this feature operates independently of document permissions. It is designed specifically for security, privacy, and compliance teams to support incident response and data governance workflows.

important

Content lookup bypasses end-user document permissions for discovery purposes. While the search interface itself is designed for privileged administrators, results remain fully permission-enforced if a user attempts to open the document in its source application, such as Google Drive or Slack.

## Core principles[​](#core-principles "Direct link to Core principles")

-   Searches all indexed documents, excluding entities like people and teams, to identify data exposure across every configured connector.
-   To prevent unnecessary exposure, search results display high-level metadata only; document titles and content snippets are hidden.
-   A prominent UI banner alerts the user that they are performing an elevated search outside their default permissions.
-   This feature is disabled by default. Access is restricted to a small group of approved users, such as Incident Responders and Privacy Officers, and must be explicitly enabled by Glean.

## Enablement process[​](#enablement-process "Direct link to Enablement process")

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Complete the following prerequisites:

-   Have the Glean Admin role to request enablement.
-   Obtain internal approval from your organization's security or compliance leadership.

### Identify eligible users[​](#identify-eligible-users "Direct link to Identify eligible users")

Compile a list of email addresses for users who require this access. *Example: `security_lead@company.com`, `privacy_officer@company.com`*

### Enable access[​](#enable-access "Direct link to Enable access")

Access to this feature can be managed directly by a Glean Super Admin. Alternatively, you can contact your Glean account team or Glean Support with the following details:

1.  **Tenant name:** Your unique deployment identifier.
2.  **User list:** The approved list of email addresses.

### Verify propagation[​](#verify-propagation "Direct link to Verify propagation")

Once Glean confirms access, changes typically take a few minutes to propagate. Provisioned users can access **Content lookup** in the **Admin console**.

## Use Content lookup[​](#use-content-lookup "Direct link to Use Content lookup")

1.  Navigate to **Admin console → Content management → Content lookup**.
2.  Enter an exact word or phrase, such as a customer name, account number, or project codename.
3.  Run the search and review the matching results.

### Interpret results[​](#interpret-results "Direct link to Interpret results")

Glean returns a list of items with specific metadata to facilitate remediation:

-   **Source application:** The connector where Glean found the item, such as Google Drive, Slack, or Confluence
-   **Ownership:** The document owner, message author, or issue reporter.
-   **Timestamps:** When the item was created or last updated.

Use this metadata to contact the content owner and remediate potential data exposure, such as adjusting permissions or moving misplaced sensitive data.
