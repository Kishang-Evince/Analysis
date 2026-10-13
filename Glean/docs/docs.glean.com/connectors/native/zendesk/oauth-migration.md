---
url: "https://docs.glean.com/connectors/native/zendesk/oauth-migration"
canonical: "https://docs.glean.com/connectors/native/zendesk/oauth-migration"
title: "Migrate Zendesk authentication to OAuth"
description: "Reauthorize an existing Zendesk connector with OAuth before Zendesk API tokens stop working"
fetched_at: "2026-10-13T08:50:24.668Z"
---
On this page

Reauthorize your Zendesk connector with OAuth to maintain uninterrupted content syncing in Glean. When you update your authentication, Glean preserves your connector configuration and indexed data so you don't need to re-index.

## Zendesk API token deprecation[​](#zendesk-api-token-deprecation "Direct link to Zendesk API token deprecation")

Zendesk is deprecating Support API tokens according to the following schedule:

-   October 27, 2026: Zendesk blocks creation of new API tokens
-   April 30, 2027: Zendesk deactivates all remaining API tokens

OAuth replaces long-lived API tokens with scoped credentials that expire and rotate automatically. For complete details, see Zendesk's [Announcing the removal of API tokens as an authentication method for API requests](https://support.zendesk.com/hc/en-us/articles/10851263566234-Announcing-the-removal-of-API-tokens-as-an-authentication-method-for-API-requests).

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before you reauthorize the connector, make sure you have:

-   **Glean admin access:** Permission to edit connectors in the Glean **Admin Console**.
-   **Zendesk admin access:** A Zendesk **Administrator** account for the Zendesk domain connected to Glean.

## Reauthorize the connector[​](#reauthorize-the-connector "Direct link to Reauthorize the connector")

1.  In the migration banner, click **Redo Zendesk setup**. You can also go to **Admin console → Platform → Connectors**, select the existing Zendesk connector, and open **Setup**.
2.  Review the Zendesk domain and content selections, then click **Save**.
3.  Click **Authorize**.
4.  Sign in to Zendesk with a Zendesk Administrator account, then approve the access Glean requests.
5.  Return to the **Setup** page and confirm that authorization succeeded.

Success

The existing connector resumes syncing with OAuth. You don't need to create a new connector or start a new crawl.

## Frequently asked questions[​](#frequently-asked-questions "Direct link to Frequently asked questions")

### Will reauthorization remove indexed data?

No. Reauthorization changes how Glean connects to Zendesk. It doesn't delete content that Glean has already indexed.

### Will the connector settings change?

No. The Zendesk domain and crawl selections remain on the existing connector. Review them before you click **Save**.

### What happens if I don't migrate?

The connector can continue using an active API token until Zendesk deactivates it. After the token stops working, Glean can't sync new or updated Zendesk content until you reauthorize with OAuth. Zendesk will deactivate all remaining API tokens on April 30, 2027.

### How can I confirm that the migration succeeded?

The **Setup** page shows a successful authorization message. Subsequent connector crawls should complete without authentication errors.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

-   If authorization fails, confirm that you signed in with a Zendesk Administrator account and approved every requested permission. Then click **Authorize** again.
-   If the domain is incorrect, enter the Zendesk subdomain connected to this connector. Glean accepts the subdomain, hostname, or full URL.

If you still can't authorize the connector, contact [Glean Support](https://support.glean.com).
