---
url: "https://docs.glean.com/troubleshooting/error-codes/hubspot/hubspot-2"
canonical: "https://docs.glean.com/troubleshooting/error-codes/hubspot/hubspot-2"
title: "HUBSPOT_2"
description: "HUBSPOT_2 Error Code"
fetched_at: "2026-09-01T13:30:22.765Z"
---
On this page

## Issue:[​](#issue "Direct link to Issue:")

\-The Glean crawler app created does not have all the required scopes.

## Resolution:[​](#resolution "Direct link to Resolution:")

-   The Glean crawler app needs the following scopes to crawl objects correctly:
    -   **crm.objects.users.read**
    -   **crm.objects.owners.read**
    -   **crm.objects.contacts.read**
    -   **crm.objects.deals.read**
    -   **crm.objects.companies.read**
    -   **tickets**
-   Provide the app with these scopes to resolve the issue.

If you are still having difficulty please reach out to us: [https://support.glean.com](https://support.glean.com)
