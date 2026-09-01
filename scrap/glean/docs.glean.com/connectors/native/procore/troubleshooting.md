---
url: "https://docs.glean.com/connectors/native/procore/troubleshooting"
canonical: "https://docs.glean.com/connectors/native/procore/troubleshooting"
title: "Procore troubleshooting and FAQs"
description: "Resolve common Procore connector setup and content issues, and read answers to frequently asked questions."
fetched_at: "2026-09-01T13:29:39.171Z"
---
On this page

## Setup and installation[​](#setup-and-installation "Direct link to Setup and installation")

### Error validating Procore credentials during setup[​](#error-validating-procore-credentials-during-setup "Direct link to Error validating Procore credentials during setup")

**Symptoms:**

-   **Setup cannot complete:** The Glean Admin console reports an error when you click **Save**.
-   **Error messaging:** The error references credentials, company configuration, or connector validation.

| Likely cause | Remediation |
| --- | --- |
| **Credential mismatch:** The **Client ID** or **Client Secret** in Glean does not match your Procore Developer App's OAuth credentials. | Copy the **Client ID** and **Client Secret** directly from your Procore Developer App's OAuth credentials (after resetting the secret) and re-enter them in Glean. |
| **Incorrect Company ID:** The **Company ID** entered in Glean is wrong. | Confirm the **Company ID** is the numeric ID immediately after `https://app.procore.com/` in your Procore URL. |
| **App not promoted or installed:** The Developer App has not been promoted to **Production**, or it is not installed in the correct Procore company. | Promote the Developer App to **Production** and install it into the correct Procore company using the **Production App Version Key** via the App Management tool. |
| **Missing component permissions:** The app's Data Connector component is missing a required authentication type or permission. | Enable both **User Level Authentication** and **Service Account Authentication** on the Data Connector component, with **Company Directory Admin** permission. |

**Still not resolved?** Capture the error message and contact [Glean Support](https://support.glean.com).

## Permissions and access[​](#permissions-and-access "Direct link to Permissions and access")

### Some users do not see Procore content they expect[​](#some-users-do-not-see-procore-content-they-expect "Direct link to Some users do not see Procore content they expect")

**Symptoms:**

-   Users can't find Procore content they expect to have access to.
-   Content from specific projects or tools does not appear in a user's search results.

| Likely cause | Remediation |
| --- | --- |
| **Insufficient user permissions:** The affected users lack the required **project and tool permissions** in Procore (for example, RFI, Submittals, or Daily Logs access). | Grant the users the appropriate project and tool permissions in Procore. Glean will not show content a user cannot access in Procore. |
| **App user missing from projects:** The Procore app user (Developer Managed Service Account) has not been added to the relevant projects with the required tool permissions. | Add the app user to the relevant projects with the required tool permissions. Glean cannot index projects where this app user does not have access. |
| **Custom permissions not enabled:** Your organization relies on non‑template, ad‑hoc permissions that are not being honored. | Verify whether the **Read access for custom permissions** toggle is configured as desired in the connector setup. |
| **Crawl incomplete:** The initial crawl has not finished, or incremental crawls are not running. | Confirm that the initial crawl has completed and that incremental crawls are running successfully in the Glean Admin console. |

## Content freshness[​](#content-freshness "Direct link to Content freshness")

### Stale data[​](#stale-data "Direct link to Stale data")

**Symptoms:**

-   Recently created or updated Procore content does not appear in Glean.
-   Search results reflect an older version of Procore records.

| Likely cause | Remediation |
| --- | --- |
| **Expected crawl latency:** Full crawls run roughly **weekly** and incremental crawls run roughly **every 6 hours**, so some updates take up to several hours to appear. | Allow time for the next incremental or full crawl to pick up the changes. |
| **Urgent update needed:** Content must be refreshed sooner than the normal crawl schedule. | Trigger a manual crawl, or contact [Glean Support](https://support.glean.com) to review connector health. |

## FAQs[​](#faqs "Direct link to FAQs")

### Does the connector index attachments?

Yes. The Procore connector indexes attachments on RFIs, Submittals, and Daily Logs, as well as specification revision PDFs where available. Attachments become searchable in Glean (subject to permissions).

### How fresh is the data?

-   **Full crawls:** approximately every **7 days**.
-   **Incremental crawls:** approximately every **6 hours**.

### How are permissions enforced?

Glean maps Procore’s **project‑centric permission model** and **permission templates** to its own permission system. At query time, Procore permissions determine which items a user can see. Ad‑hoc, non‑template permissions can be accounted for using the **Read access for custom permissions** toggle during setup.

### Who should set up the connector?

A Procore company admin (with authority to create Developer Apps and install them via App Management) and a Glean admin should collaborate. The same person can fill both roles if they have the requisite permissions in both systems.
