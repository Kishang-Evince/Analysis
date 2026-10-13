---
url: "https://docs.glean.com/troubleshooting/error-codes/hubspot/hubspot-2"
canonical: "https://docs.glean.com/troubleshooting/error-codes/hubspot/hubspot-2"
title: "HUBSPOT_2"
description: "HUBSPOT_2 Error Code"
fetched_at: "2026-10-13T08:51:07.947Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

The HubSpot private app doesn't include all the scopes that the Glean connector requires.

## Resolution[​](#resolution "Direct link to Resolution")

1.  Grant these scopes to the HubSpot private app:
    -   `crm.objects.users.read`
    -   `crm.objects.owners.read`
    -   `crm.objects.contacts.read`
    -   `crm.objects.deals.read`
    -   `crm.objects.companies.read`
2.  For ticket access, grant one of these supported configurations:
    -   `tickets` for an existing app that uses the legacy scope
    -   Both `crm.objects.tickets.read` and `crm.schemas.tickets.read` for an app that uses granular scopes
3.  Save the app changes, then run connector validation again.

For HubSpot's migration and backward compatibility details, see [Update your app to use granular scopes (Beta)](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/migrate-an-app/update-your-app-to-granular-scopes).

For additional assistance, contact [Glean Support](https://support.glean.com).
