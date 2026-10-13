---
url: "https://docs.glean.com/connectors/native/loopio/requirements"
canonical: "https://docs.glean.com/connectors/native/loopio/requirements"
title: "Loopio requirements"
description: "The technical, credential, and permission prerequisites to complete before you connect Loopio to Glean."
fetched_at: "2026-10-13T08:50:03.125Z"
---
On this page

Complete these prerequisites before you connect Loopio to Glean. They cover the hosting and connectivity constraints, the credentials Glean needs, and the permissions required to create them.

## Technical requirements[​](#technical-requirements "Direct link to Technical requirements")

-   Access to the Glean Admin console to add and configure the connector.
-   A Loopio tenant hosted in the **United States**. Other regions, including the EU, are not supported today.
-   Loopio credentials only work against the region they were created in, so the OAuth app and the region you select in Glean must match where your Loopio tenant is hosted.

## Credential requirements[​](#credential-requirements "Direct link to Credential requirements")

-   A Loopio **Administrator** account. Creating an OAuth app is restricted to administrators in Loopio, so a standard user can't complete setup.
-   An OAuth app created in Loopio, granting all five read-only scopes:
    -   `project:read`
    -   `project.participant:read`
    -   `user:read`
    -   `role:read`
    -   `mergeVariable:read`
-   The app's **Client ID** and **Client Secret**.
-   Your Loopio **subdomain**, taken from the URL you use to reach Loopio (`https://<your-subdomain>.loopio.com`).

Scopes are fixed when the app is created

Loopio fixes an app's scopes at creation and they can't be changed afterward. If a scope is missing, the only fix is to delete the app and create a new one, which means new credentials and repeating setup. Select all five scopes even if you're not sure you need one of them.

## Permission requirements[​](#permission-requirements "Direct link to Permission requirements")

-   The Loopio Administrator role is required to create the OAuth app and obtain its credentials.
-   Glean enforces Loopio's native access model at query time: project access mirrors Loopio's participant list, and teams map to Glean groups.
-   Because Loopio's API exposes no per-role permissions, Glean honors only the immutable **Full Access** role. Users with custom roles see only the projects they participate in.
-   **Guest** users are excluded and won't see Loopio content in Glean.
-   All access is read-only. Glean never writes to Loopio.

## See also[​](#see-also "Direct link to See also")

-   [Loopio setup](/connectors/native/loopio/setup)
-   [Loopio overview](/connectors/native/loopio/overview)
