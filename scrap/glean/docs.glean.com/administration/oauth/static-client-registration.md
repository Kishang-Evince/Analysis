---
url: "https://docs.glean.com/administration/oauth/static-client-registration"
canonical: "https://docs.glean.com/administration/oauth/static-client-registration"
title: "Static OAuth clients"
description: "Create and manage static OAuth clients in the Admin Console"
fetched_at: "2026-09-01T13:29:10.545Z"
---
On this page

Admins can create static OAuth clients in the **Admin Console**. Static clients are best for:

-   Partner integrations that need a stable `client_id`, redirect URIs, and controlled scopes.
-   Customer‑built internal applications or services that call the Client API.

tip

If your organization's policy requires static OAuth clients and does not allow dynamic client registration, see [Do not allow dynamic client registrations](/administration/oauth/dynamic-client-registration#do-not-allow-dynamic-client-registrations).

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Complete the following prerequisites:

-   Have the **Admin** role to access the **Admin Console**.
-   Enable the Glean OAuth Authorization Server. Follow [Enable the Glean OAuth Authorization Server](/administration/oauth/authorization-server#enable-the-glean-oauth-authorization-server).

## Create a static OAuth client[​](#create-a-static-oauth-client "Direct link to Create a static OAuth client")

1.  Navigate to **Admin Console → Users & permissions → Third‑party access (OAuth)**.
2.  Next to **Static clients**, click **Create client**.
3.  Provide the required details:
    -   **Client name**
    -   **Redirect URIs**: one or more exact, case‑sensitive URIs
    -   **Scopes**: the operations this client can request
4.  Click **Create** to save the client. The window displays the client details, including the client secret.
5.  Store the secret securely. You cannot retrieve the secret again.

Once created, your integration can use the client to obtain OAuth tokens from the Glean OAuth Authorization Server.

For a step-by-step example, see [Use a static OAuth client to get tokens](/administration/oauth/static-client-token-example).

important

If you lose the secret, you must rotate and distribute a new secret to any applications that use this client. See **Rotating client secrets** below.

## Manage a static OAuth client[​](#manage-a-static-oauth-client "Direct link to Manage a static OAuth client")

Here's how to manage a static OAuth client.

### Edit a static OAuth client

1.  In the **Admin Console**, on the **Users & permissions → Third‑party access (OAuth)** page, click the three dots icon next to a static client name.
    
2.  Click **Edit client** to update the following:
    
    -   **Client name**
    -   **Redirect URIs**
    -   **Scopes**
    
    You can also view additional information about the client, such as PKCE (Proof Key for Code Exchange) requirement setting and the authentication method.
    
3.  Click **Save** to save the changes.
    

### View a static OAuth client's users

1.  In the **Admin Console**, on the **Users & permissions → Third‑party access (OAuth)** page, click the three dots icon next to a static client name.
2.  Click **View users** to view the users who have authorized access to Glean using this client.

### Delete a static OAuth client

1.  In the **Admin Console**, on the **Users & permissions → Third‑party access (OAuth)** page, click the three dots icon next to a static client name.
2.  Click **Delete client**.
3.  Click **Delete client** to confirm the deletion.

Users who were previously authorized to use this client immediately lose access.

### Rotating client secrets

Rotate a new secret when credentials rotate or if you suspect the secret is compromised. When you rotate a new secret, the old secret is immediately invalid. Distribute the new secret to any applications that use this client.

1.  In the **Admin Console**, on the **Users & permissions → Third‑party access (OAuth)** page, click the three dots icon next to a static client name.
2.  Click **Edit client**.
3.  Click **Rotate secret**.
4.  Click **Confirm** to confirm the secret rotation.

The new secret and secret creation time displays in the **Edit a static client** window. Store the secret securely. You cannot retrieve the secret again.

## See also[​](#see-also "Direct link to See also")

-   [Use a static OAuth client to get tokens](/administration/oauth/static-client-token-example)
-   [Dynamic Client Registration](/administration/oauth/dynamic-client-registration)
-   [Glean OAuth Authorization Server](/administration/oauth/authorization-server)
-   [OAuth Overview](/administration/oauth/oauth-overview)
-   [MCP Authorization (specification)](https://modelcontextprotocol.io/specification/2025-03-26/basic/authorization#dynamic-client-registration)
