---
url: "https://docs.glean.com/connectors/native/hubspot/setup"
canonical: "https://docs.glean.com/connectors/native/hubspot/setup"
title: "HubSpot setup"
description: "Requirements and step-by-step instructions for configuring the HubSpot connector in Glean."
fetched_at: "2026-09-01T13:29:32.676Z"
---
On this page

For an overview of what the HubSpot connector indexes and how permissions are enforced, see [Overview](/connectors/native/hubspot/about).

## Requirements[​](#requirements "Direct link to Requirements")

### Technical requirements[​](#technical-requirements "Direct link to Technical requirements")

-   An active HubSpot account (works on both GCP and AWS deployments).
-   Access to the Glean admin console.

### Credential requirements[​](#credential-requirements "Direct link to Credential requirements")

-   A HubSpot private app Access Token and Client Secret.
-   Your HubSpot account (portal) ID.
-   These credentials must be entered securely in the Glean admin console.

### Permission requirements[​](#permission-requirements "Direct link to Permission requirements")

A HubSpot super admin must create the integration (private app). The private app requires the following scopes:

-   `crm.objects.users.read`
-   `crm.objects.owners.read`
-   `crm.objects.contacts.read`
-   `crm.objects.deals.read`
-   `crm.objects.companies.read`
-   `tickets`

These scopes allow the connector to read the CRM objects and owner/user data needed to enforce permissions during search.

Before you save the connector in Glean, complete the HubSpot private app steps in [Configuration and Setup](#configuration-and-setup) (app creation, scopes, webhooks, and credentials).

## Configuration and setup[​](#configuration-and-setup "Direct link to Configuration and setup")

Configuring the HubSpot connector involves creating a private app in HubSpot, granting it the required scopes, setting up webhook subscriptions, and then entering the resulting credentials in Glean.

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Access to the Glean admin console.
-   You must be a HubSpot super admin. See [HubSpot's documentation](https://knowledge.hubspot.com/user-management/hubspot-permissions-guide) for details on permissions.

### Create a private app[​](#create-a-private-app "Direct link to Create a private app")

#### Initial steps[​](#initial-steps "Direct link to Initial steps")

1.  In HubSpot, click the settings icon in the main navigation bar.
2.  Navigate to **Integrations** > **Private Apps**.
3.  Click **Create a private app**.
4.  On the **Basic Info** tab, enter a name, logo, and description for the app.

#### Grant scopes[​](#grant-scopes "Direct link to Grant scopes")

1.  Go to the **Scopes** tab.
2.  Click to add scopes.
3.  Search for and select each of the following required scopes:
    -   `crm.objects.users.read`
    -   `crm.objects.owners.read`
    -   `crm.objects.contacts.read`
    -   `crm.objects.deals.read`
    -   `crm.objects.companies.read`
    -   `tickets`
4.  Click **Create app**, then confirm creation.

note

If you previously set up the HubSpot connector using a private app, you must add the `crm.objects.owners.read` scope to your existing app. HubSpot preserves the access token when scopes are edited, so no token rotation or Secret Manager update is required.

#### Webhook subscriptions[​](#webhook-subscriptions "Direct link to Webhook subscriptions")

1.  In the private app, go to the **Webhooks** tab.
2.  Click **Create subscription**.
3.  Select the object type to subscribe to:
    -   Contact
    -   Company
    -   Deal
    -   Ticket
4.  Select the event type(s) to subscribe to:
    -   Created
    -   Deleted
    -   Restored
    -   Association changed
5.  Repeat for each object type and event type combination you want to keep in sync in real time.
6.  Save the webhook subscriptions.
7.  Confirm the target URL and subscription settings are active.

### Enter the app credentials in Glean[​](#enter-the-app-credentials-in-glean "Direct link to Enter the app credentials in Glean")

1.  In the Glean admin console, enter your HubSpot Account ID.
2.  Enter the private app's Access Token and Client Secret.
3.  Save the connector configuration.

## See also[​](#see-also "Direct link to See also")

-   [HubSpot overview](/connectors/native/hubspot/about)
