---
url: "https://docs.glean.com/connectors/native/vitally/troubleshooting"
canonical: "https://docs.glean.com/connectors/native/vitally/troubleshooting"
title: "Troubleshooting and FAQs"
description: "Common issues and questions for the Vitally connector."
fetched_at: "2026-10-13T08:50:22.679Z"
---
On this page

This page covers common Vitally connector setup, authentication, permission, and content-freshness issues for the Representational State Transfer (REST) API. For setup steps, see the [Vitally setup guide](/connectors/native/vitally/setup).

## Setup and authentication[​](#setup-and-authentication "Direct link to Setup and authentication")

### The Vitally connector cannot connect[​](#the-vitally-connector-cannot-connect "Direct link to The Vitally connector cannot connect")

**Symptoms:**

-   Connector setup fails after you enter the Secret Token or API base URL.
-   The connector cannot authenticate with Vitally.

| Cause | Fix |
| --- | --- |
| **REST API integration is disabled:** The workspace does not have the Vitally REST API integration enabled. | In Vitally, select your account logo in the top-left, then go to **Settings → Connectors → Integrations → Vitally REST API** and enable the integration. Create a workspace-level Secret Token and enter it in the Glean Admin console. |
| **Invalid Secret Token:** You may have entered an incorrect token, or Vitally may have revoked it. | Create a new workspace-level Secret Token in Vitally and replace the value in **Admin console → Connectors → Vitally**. Never include the token in a support request or screenshot. |
| **Incorrect API base URL:** The URL does not match the Vitally workspace region. | Use `https://<subdomain>.rest.vitally.io` for US workspaces or `https://rest.vitally-eu.io` for EU workspaces. See [Vitally setup](/connectors/native/vitally/setup#add-the-connector-in-glean). |
| **API path included in the URL:** The configured value includes `/resources` or another path. | Enter the API base URL with `https://` and omit the path. Glean adds `/resources` when it calls the Vitally API. |

**Still not resolved?** Contact Glean Support with the connector instance name, workspace region, and exact error text. Never send the Secret Token.

## Missing content[​](#missing-content "Direct link to Missing content")

### A known Vitally record is missing from search[​](#a-known-vitally-record-is-missing-from-search "Direct link to A known Vitally record is missing from search")

**Symptoms:**

-   A user cannot find an account, organization, note, task, project, or conversation that exists in Vitally.
-   Other records from the Vitally connector are searchable.

| Cause | Fix |
| --- | --- |
| **Unsupported object:** The record belongs to a Vitally object that is outside the connector's current scope. | Confirm that the record is an account, organization, note, task, project, or conversation. See [Supported objects](/connectors/native/vitally/about#supported-objects). |
| **Crawl has not processed the record:** Vitally created or updated the record after the most recent relevant crawl. | Check the connector status in the Glean Admin console and allow the relevant full or incremental crawl to run. See [Crawling and update frequency](/connectors/native/vitally/about#crawling-and-update-frequency). |
| **Status changed in Vitally:** A churned or archived status change does not guarantee immediate removal from Glean. | Allow the applicable crawl for the record type, or a full crawl, to complete. If the record remains after the crawl, contact Glean Support. |

**Still not resolved?** Contact Glean Support with the Vitally record URL, object type, connector instance name, and approximate time of the most recent crawl.

### A conversation is missing its message thread[​](#a-conversation-is-missing-its-message-thread "Direct link to A conversation is missing its message thread")

**Symptoms:**

-   A conversation appears in Glean, but its messages are not available.
-   The conversation subject or metadata is present without the expected thread.

| Cause | Fix |
| --- | --- |
| **Conversation detail is unavailable:** Glean retrieves conversation messages through a separate conversation-detail request, and Vitally did not return the detail successfully. | Check the connector status and allow the next conversation crawl to run. If the issue continues, contact Glean Support with the conversation URL. |
| **No message content was returned:** The conversation-detail request succeeded, but Vitally did not provide messages for the conversation. | The connector can index the conversation metadata that Vitally returns, but it cannot create message content that is absent from the Vitally response. |

Limitation

Conversation message content depends on Vitally returning the conversation detail and its `messages` data. A conversation can therefore appear without a message thread.

## Permissions and access[​](#permissions-and-access "Direct link to Permissions and access")

### A user cannot see a Vitally record[​](#a-user-cannot-see-a-vitally-record "Direct link to A user cannot see a Vitally record")

**Symptoms:**

-   A user can find some Vitally records but not a specific account, organization, note, task, project, or conversation.
-   The user can access the record in Vitally but not in Glean.

| Cause | Fix |
| --- | --- |
| **User is not in the record's ownership group:** The user does not have the Admin role in Vitally and is not a key-role owner for the account or organization. | Confirm the user's Vitally identity and ownership assignment. Accounts and organizations use their key-role owners for permissions. |
| **Account-linked child record:** A note, task, or project with a parent account inherits permissions from that account. | Confirm that the user has access to the parent account through the connector's ownership model. |
| **Conversation is linked to a different account:** Conversation access is granted through the conversation's linked accounts. | Confirm that the user has access to at least one account linked to the conversation. |
| **Vitally Access Group is being used:** The connector does not read Vitally Access Groups when it builds document permissions. | Grant access through the Vitally user roles and ownership relationships supported by the connector. See [Vitally permissions](/connectors/native/vitally/about#permissions). |

Limitation

Vitally Access Groups are not included in the connector's permission model. Access granted only through a Vitally Access Group is not automatically granted in Glean.

**Still not resolved?** Contact Glean Support with the affected user's work email, Vitally record URL, object type, and the user's relevant Vitally ownership or role information. Do not send the Secret Token.

## User identity[​](#user-identity "Direct link to User identity")

### A Vitally administrator is missing from Glean[​](#a-vitally-administrator-is-missing-from-glean "Direct link to A Vitally administrator is missing from Glean")

**Symptoms:**

-   A Vitally administrator is not available as a user in Glean.
-   The administrator cannot be matched to the corresponding Glean identity.

| Cause | Fix |
| --- | --- |
| **Email address is missing:** The Vitally administrator response does not contain an email address. | Add an email address to the administrator's Vitally account. The connector skips administrator accounts without an email address. |
| **Identity crawl has not run:** Vitally added or changed the administrator after the most recent identity crawl. | Wait for the next full identity crawl, then check the user's status in Glean. The identity crawl runs daily by default. |

**Still not resolved?** Contact Glean Support with the administrator's Vitally email address, Glean work email, connector instance name, and approximate time of the most recent identity crawl.

## Crawl behavior and freshness[​](#crawl-behavior-and-freshness "Direct link to Crawl behavior and freshness")

### Changes in Vitally are not appearing in Glean[​](#changes-in-vitally-are-not-appearing-in-glean "Direct link to Changes in Vitally are not appearing in Glean")

**Symptoms:**

-   A recently created or updated record is not searchable.
-   A changed record still shows older information.

| Cause | Fix |
| --- | --- |
| **Scheduled polling delay:** This connector uses polling crawls rather than webhooks or real-time updates. | Check the connector status and allow the next incremental or full crawl to complete. See [Crawling and update frequency](/connectors/native/vitally/about#crawling-and-update-frequency) for the default schedule. |
| **Record timestamp is not newer than the crawl watermark:** Incremental crawls use the record's `updatedAt` value to select changes. | Confirm that Vitally updated the record and that its `updatedAt` value changed. If the record remains missing after the next relevant crawl, contact Glean Support. |
| **Crawl has not processed the status change:** A churned or archived status may be processed by the applicable incremental crawl or by full-crawl reconciliation. | Allow the next relevant incremental crawl or full crawl to complete. See [Archived or churned records are missing](#archived-or-churned-records-are-missing). |

**Still not resolved?** Contact Glean Support with the record URL, object type, connector instance name, and approximate time of the most recent crawl.

### Archived or churned records are missing[​](#archived-or-churned-records-are-missing "Direct link to Archived or churned records are missing")

**Symptoms:**

-   An account or organization marked as churned may no longer appear in Glean after a subsequent crawl.
-   An archived note, task, or project may no longer appear in Glean after a subsequent crawl.

| Cause | Fix |
| --- | --- |
| **Record is no longer returned by Vitally:** A full crawl can remove records that Vitally no longer returns. | Allow a full crawl to complete. |
| **Record was changed recently:** The relevant incremental crawl has not processed the state change yet. | Check the connector status and allow the relevant incremental crawl to run. A full crawl also reconciles records that Vitally no longer returns. |

Limitation

A churned or archived status change does not guarantee immediate removal from Glean. The applicable crawl for the record type or a full crawl must complete before Glean can reconcile the record.

**Still not resolved?** Contact Glean Support with the record URL, object type, connector instance name, and the time the record was archived or marked as churned.

## FAQs[​](#faqs "Direct link to FAQs")

### What content does the Vitally connector index?

The connector indexes accounts, organizations, notes, tasks, projects, and conversations. See [Vitally overview](/connectors/native/vitally/about#supported-objects) for the indexed fields and content behavior.

### Does the connector modify data in Vitally?

No. The connector uses the Vitally REST API to read data for indexing. The connector doesn't support write operations.

### Does the connector support Vitally Access Groups?

No. The connector doesn't include Vitally Access Groups in its permission model. Glean uses the Vitally user roles and ownership relationships described in the [permissions section](/connectors/native/vitally/about#permissions).

### How often does the connector sync with Vitally?

The connector uses full and incremental polling crawls for content. The default crawl periods vary by content type. See [Crawling and update frequency](/connectors/native/vitally/about#crawling-and-update-frequency) for the complete schedule.

## See also[​](#see-also "Direct link to See also")

-   [Vitally overview](/connectors/native/vitally/about)
-   [Vitally setup](/connectors/native/vitally/setup)
