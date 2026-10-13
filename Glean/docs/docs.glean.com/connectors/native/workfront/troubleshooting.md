---
url: "https://docs.glean.com/connectors/native/workfront/troubleshooting"
canonical: "https://docs.glean.com/connectors/native/workfront/troubleshooting"
title: "Adobe Workfront troubleshooting and FAQs"
description: "Resolve common Adobe Workfront connector setup and content issues, and read answers to frequently asked questions."
fetched_at: "2026-10-13T08:50:24.439Z"
---
On this page

## Setup and authentication[​](#setup-and-authentication "Direct link to Setup and authentication")

### Error validating Adobe Workfront credentials during setup[​](#error-validating-adobe-workfront-credentials-during-setup "Direct link to Error validating Adobe Workfront credentials during setup")

**Symptoms:**

-   **Setup cannot complete:** The Glean **Admin console** reports an error when you click **Save**.
-   **Error messaging:** The error references authentication, credentials, or connector validation.

| Likely cause | Remediation |
| --- | --- |
| **Credential mismatch:** The **Client ID** or **Client Secret** in Glean does not match your Adobe Workfront OAuth2 application. | Copy the **Client ID** and **Client Secret** directly from your Adobe Workfront OAuth2 application and re-enter them in Glean. |
| **Incorrect Server Domain:** The domain entered in Glean does not match your Adobe Workfront instance. | Confirm the domain is correct (for example, `yourcompany.my.workfront.com`). |
| **Invalid credentials:** The key provided for JSON Web Token (JWT) signing is malformed or expired. | Verify the key is in a valid format and has not expired. Regenerate it if necessary. |
| **Incorrect Customer ID:** The Customer ID does not match your Adobe Workfront instance. | Verify your Adobe Workfront Customer ID with your Adobe Workfront administrator or Adobe support. |
| **Admin User ID mismatch:** The Admin User ID does not correspond to a valid System Administrator user. | Confirm the Admin User ID belongs to a user with **System Administrator** access level in Adobe Workfront. |

**Still not resolved?** Capture the error message and contact [Glean Support](https://support.glean.com).

## Permissions and access[​](#permissions-and-access "Direct link to Permissions and access")

### Some users do not see Adobe Workfront content they expect[​](#some-users-do-not-see-adobe-workfront-content-they-expect "Direct link to Some users do not see Adobe Workfront content they expect")

**Symptoms:**

-   Users cannot find Adobe Workfront content they expect to have access to.
-   Content from specific projects or object types does not appear in a user's search results.

| Likely cause | Remediation |
| --- | --- |
| **Insufficient user access level:** The affected users lack the required access level in Adobe Workfront for certain object types (for example, projects, tasks, or documents). | Grant the users the appropriate access level in Adobe Workfront. Glean does not show content a user cannot access in Adobe Workfront. |
| **Admin user limitations:** The Adobe Workfront admin user configured for the connector does not have access to certain projects or objects. | Confirm the admin user has **System Administrator** access and can view all content that should be indexed. |
| **Crawl incomplete:** The initial crawl has not finished, or incremental crawls are not running. | Confirm that the initial crawl has completed and that incremental crawls are running successfully in the Glean **Admin console**. |

## Content freshness[​](#content-freshness "Direct link to Content freshness")

### Stale data[​](#stale-data "Direct link to Stale data")

**Symptoms:**

-   Recently created or updated Adobe Workfront content does not appear in Glean.
-   Search results reflect an older version of Adobe Workfront records.

| Likely cause | Remediation |
| --- | --- |
| **Expected crawl latency:** Full and incremental crawls run on configurable schedules, so some updates may take time to appear. | Allow time for the next incremental or full crawl to pick up the changes. |
| **Event subscriptions not enabled:** Real-time updates are not configured. | Contact [Glean Support](https://support.glean.com) to verify whether event subscriptions are enabled for your connector. |
| **Urgent update needed:** Content must be refreshed sooner than the normal crawl schedule. | Trigger a manual crawl, or contact [Glean Support](https://support.glean.com) to review connector health. |

## FAQs[​](#faqs "Direct link to FAQs")

### What Adobe Workfront objects does the connector index?

The connector indexes projects, tasks, issues, documents (including document versions and content), portfolios, programs, and notes.

### How fresh is the data?

-   **Full crawls:** run periodically. The schedule varies by scope.
-   **Incremental crawls:** run periodically for most object types. The schedule varies by scope.
-   **Event subscriptions:** when enabled, provide near-real-time updates. Contact [Glean Support](https://support.glean.com) to enable.

### How are permissions enforced?

Glean maps Adobe Workfront **access levels**, **group memberships**, and **role assignments** to its own permission system. At query time, Adobe Workfront permissions determine which items a user can see.

### Who should set up the connector?

Setup requires an Adobe Workfront **System Administrator** and a **Glean admin**. One person can fill both roles if they have the necessary permissions in both systems.

### Does the connector index document content?

Yes. The Adobe Workfront connector indexes document metadata and extracts text content from document versions for search.
