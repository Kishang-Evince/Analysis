---
url: "https://docs.glean.com/connectors/native/affinity/setup"
canonical: "https://docs.glean.com/connectors/native/affinity/setup"
title: "Affinity setup"
description: "Authorize the Glean OAuth client for your Affinity workspace, add the connector in the Glean Admin Console, and complete per-user OAuth for Opportunities and Lists."
fetched_at: "2026-09-01T13:29:21.622Z"
---
On this page

This page describes how to install and configure the Affinity connector. Setup takes place in both Affinity and the Glean Admin Console, and it has two parts: a one-time workspace authorization performed by an admin, and a per-user authorization completed by each end user.

To set up the Affinity connector:

-   Confirm the [requirements](#requirements).
-   Complete [admin setup (workspace authorization)](#step-1-admin-setup-workspace-authorization).
-   Have each user complete [per-user OAuth](#step-2-per-user-oauth-end-user-authorization).

## Requirements[​](#requirements "Direct link to Requirements")

To use the Affinity connector, you need the following:

-   A Glean deployment where the Affinity connector has been enabled.
-   Access to the **Glean Admin Console** with permission to add new connectors.
-   An Affinity workspace where:
    -   Affinity Support has **greenlisted the central Glean OAuth client** for your workspace.
    -   At least one admin user who can complete workspace‑level OAuth with Glean.
    -   End users can complete per‑user OAuth as needed for opportunities and lists.

## Step 1: Admin setup (workspace authorization)[​](#step-1-admin-setup-workspace-authorization "Direct link to Step 1: Admin setup (workspace authorization)")

Workspace‑level setup is performed by a Glean admin.

1.  In the **Glean Admin Console**, go to **Connectors** > **Add connector** and select **Affinity**.
2.  Enter your Affinity workspace details as prompted.
3.  Click **Authorize** and complete the Affinity OAuth flow using an appropriate admin account. This grants Glean access to workspace‑wide **Contacts (People)** and **Companies (Organizations)**.
4.  Save the connector configuration.

After this step, Affinity Contacts and Companies will begin crawling based on the configured crawl schedule.

## Step 2: Per-user OAuth (end-user authorization)[​](#step-2-per-user-oauth-end-user-authorization "Direct link to Step 2: Per-user OAuth (end-user authorization)")

For Opportunities and Lists, each Affinity user who needs access must complete an additional OAuth step:

-   Each user authenticates with Affinity via the Glean interface (per‑user OAuth flow).
-   Once a user has completed this OAuth flow:
    -   Glean enqueues crawls for that user’s **Opportunities** and **Lists**.
    -   Those items become visible to that user in Glean, subject to Affinity’s list‑based permissions.

> Admin setup alone is sufficient for Contacts and Companies; per‑user OAuth is specifically required for private or user‑scoped Opportunities and Lists.

## Advanced configuration (by Glean)[​](#advanced-configuration-by-glean "Direct link to Advanced configuration (by Glean)")

The following advanced configurations can be performed by Glean:

### Crawl frequency tuning[​](#crawl-frequency-tuning "Direct link to Crawl frequency tuning")

Glean can tune the full crawl frequency for each Affinity object type (People, Companies/Organizations, Lists, Opportunities, schemas, and token refresh) via internal configuration, expressed in seconds.

This allows, for example, more frequent crawls of Opportunities relative to Lists or People if needed for deal workflows.

### Field selection and custom fields[​](#field-selection-and-custom-fields "Direct link to Field selection and custom fields")

For supported objects, the connector distinguishes between:

-   **Basic fields** – the default set of fields that are always fetched for the object (for example, name, email, title, and location for People).
-   **Additional fields** – supplemental fields that can be added per customer (for example, custom properties on Contacts, Companies, or Lists).

Key behaviors:

-   Field lists are defined using the **exact field names** from the customer’s Affinity instance (including spaces and case), and are case‑sensitive.
-   By default, only the predefined basic fields are enabled; the additional‑fields list starts empty.
-   To add custom fields, customers must work with Glean (Solutions Architects / Support). There is currently **no self‑serve UI** for adding new Affinity fields directly.

## FAQs[​](#faqs "Direct link to FAQs")

### Why can’t a user see Opportunities or Lists from Affinity in Glean?

Confirm that the user has completed the **per‑user OAuth** step for the Affinity connector in Glean. Without this additional OAuth, Glean will not enqueue crawls for that user’s Lists and Opportunities, and those records will not appear in Glean search for that user.

### Why is OAuth failing when I try to set up the Affinity connector?

If OAuth fails during initial connector setup:

-   Verify that **Glean’s OAuth client has been greenlisted** for your Affinity workspace.
-   Work with **Affinity Support** to ensure the central Glean app is approved for your tenant.
-   Only after greenlisting is complete should you retry OAuth from Glean Admin Console.

### Why aren’t Notes searchable?

Notes are exposed as separate objects in the Affinity API and are currently excluded from the connector due to evolving API support and complex permissions. For now, Glean indexes only People, Organizations, Opportunities, and Lists.

### How do I add custom fields from Affinity?

If you want Glean to index additional custom fields beyond the defaults:

-   Contact your Glean Solutions Architect or Account team with a list of the exact field names from your Affinity instance.
-   Glean can configure these fields on the backend as either basic or additional fields for the supported objects (People, Companies, Lists), using the exact, case‑sensitive field names.

List‑specific properties for Contacts and Companies remain unsupported at this time.

### How long do changes in Affinity take to show up in Glean?

The connector uses **full crawls only**, changes in Affinity (such as new opportunities, updated fields, or new relationships) can take up to the configured full‑crawl interval—by default, about **one hour**—to appear in Glean search. This interval can be adjusted by Glean on a per‑object basis if needed.

## See also[​](#see-also "Direct link to See also")

-   [Affinity overview](/connectors/native/affinity/about)
