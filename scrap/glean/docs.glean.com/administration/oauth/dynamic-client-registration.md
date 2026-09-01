---
url: "https://docs.glean.com/administration/oauth/dynamic-client-registration"
canonical: "https://docs.glean.com/administration/oauth/dynamic-client-registration"
title: "Dynamic Client Registration"
description: "Control which MCP host applications can dynamically register with the Glean OAuth authorization server"
fetched_at: "2026-09-01T13:29:10.361Z"
---
On this page

The Glean OAuth Authorization Server supports Dynamic Client Registration (DCR). According to the [MCP Authorization specification](https://modelcontextprotocol.io/specification/2025-03-26/basic/authorization#dynamic-client-registration), DCR is the preferred approach for MCP host applications to connect to Glean.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Complete the following prerequisites:

-   Have the **Admin** role to access the **Admin Console**.
-   Enable the Glean OAuth Authorization Server. Follow [Enable the Glean OAuth Authorization Server](/administration/oauth/authorization-server#enable-the-glean-oauth-authorization-server).

Glean plug-in for coding hosts

The Glean plug-ins for Cursor, Claude Code, and Codex use OAuth and Dynamic Client Registration. Before users install a plug-in, configure DCR according to your organization's OAuth policy. If you use an approved-application list, confirm the required plug-in client with your Glean representative. See [Glean plug-in for coding hosts](/administration/platform/mcp/glean-plugin).

## Dynamic client registration options[​](#dynamic-client-registration-options "Direct link to Dynamic client registration options")

To view the dynamic client registration options, follow the steps below:

1.  Navigate to **Admin Console → Settings → Third‑party access (OAuth)**.
2.  In the **Dynamic Client Registration (DCR)** section, click **Manage settings** to open the **Dynamic client registration settings** window.

This window displays the following options:

| Option | Description |
| --- | --- |
| **Allow any application** | (Default setting) Users can register any application that supports DCR. |
| **Allow approved applications** | Users can register applications from approved lists. When you select this option, you can limit the redirect URIs that dynamically registered clients may use. |
| **Do not allow dynamic client registrations** | Users can only connect static OAuth clients that admins have created. |

### Allow approved applications[​](#allow-approved-applications "Direct link to Allow approved applications")

You can restrict DCR to only approved applications. When you select **Allow approved applications**, the approved list options are:

| Option | Description |
| --- | --- |
| **Glean-managed list** | Use a Glean-vetted list of clients, with optional additional redirect URIs for other applications. This list may change over time as Glean evaluates new clients. |
| **Custom list** | Use a list of redirect URI patterns that you maintain. You have complete control over which clients can register. |

The **Glean-managed list** and **Custom list** options are not mutually exclusive. You can use both options to allow Glean-vetted clients and add your own clients.

tip

Use the **Glean-managed list** if you want to automatically allow popular MCP host applications as Glean vets them. Use a **Custom list** if your security policy requires explicit approval of every client.

## Do not allow dynamic client registrations[​](#do-not-allow-dynamic-client-registrations "Direct link to Do not allow dynamic client registrations")

If your organization requires admin-created static OAuth clients for integrations, but does not allow dynamic client registration (for example, ad hoc MCP host registration), you can allow only static OAuth clients:

1.  In the **Dynamic client registration settings** window, select the **Do not allow dynamic client registrations** option.
2.  Click **Save**.

With this configuration, new dynamic client registration requests fail because redirect URIs cannot match an allowed pattern.

For integrations that require a stable `client_id`, redirect URIs, and scopes, use static OAuth clients instead. See [Manage static OAuth clients (Admin)](/administration/oauth/static-client-registration#manage-a-static-oauth-client).

## Configure the Glean-managed list[​](#configure-the-glean-managed-list "Direct link to Configure the Glean-managed list")

Configure the Glean-managed list to allow Glean-vetted clients and to optionally add your own clients:

1.  In the **Dynamic client registration settings window**, select the **Allow approved applications → Glean-managed list** option.
2.  (Optional) To add redirect URI patterns for other clients, select **Custom list**. See [About redirect URI patterns](#about-redirect-uri-patterns).
3.  Click **Save**.

This configuration allows Glean-vetted clients to register with the Glean OAuth Authorization Server, with the option to add your own clients.

## Configure your own custom list[​](#configure-your-own-custom-list "Direct link to Configure your own custom list")

Configure your own custom list for complete control over which clients can register:

1.  In the **Dynamic client registration settings** window, select the **Allow approved applications → Custom list** option. Leave the **Use Glean-managed List** option unselected.
2.  Use either of these methods to add clients:
    -   **Allow redirect URI patterns**: Add redirect URI patterns for any additional clients you want your users to connect with. See [About redirect URI patterns](#about-redirect-uri-patterns).
    -   **Add patterns by application**: Select an application to add its redirect URI pattern. Select the application name to view its redirect URI.
3.  Click **Save**.

To remove a redirect URI from the list, click the three dots icon next to a redirect URI or application name and select **Block new registrations**.

This configuration only allows clients with redirect URIs that match patterns you configure to register to the Glean OAuth Authorization Server.

### Allow only one gateway or service[​](#allow-only-one-gateway-or-service "Direct link to Allow only one gateway or service")

Here's how to allow exactly one hosted gateway or hosted service to register dynamically:

1.  In the **Dynamic client registration settings** window, select the **Allow approved applications → Custom list** option. Leave the **Use Glean-managed List** option unselected.
2.  In the **Allowed redirect URI patterns** field, add only that gateway's redirect URI patterns.
3.  Click **Save**.

With this configuration, users can register the allowed gateway or service. Glean denies other dynamically registering clients unless their redirect URIs match your configured list.

### About redirect URI patterns[​](#about-redirect-uri-patterns "Direct link to About redirect URI patterns")

Patterns can match redirect URIs exactly or use `*` as a wildcard to match characters within a single path segment.

note

The wildcard `*` does not match path separators (`/`) or traverse directory boundaries. This prevents overly broad patterns from inadvertently allowing unintended redirect URIs.

### Example[​](#example "Direct link to Example")

The redirect URI `https://my.example.com/oauth/callback` matches the following patterns:

| Pattern | Matches? | Reason |
| --- | --- | --- |
| `https://my.example.com/oauth/callback` | Yes | Exact match |
| `https://my.example.com/oauth/*` | Yes | Wildcard matches `callback` |
| `https://my.example.com/*/callback` | Yes | Wildcard matches `oauth` |
| `https://my.example.com/*` | No | Wildcard cannot match across path separators (`oauth/callback`) |

## Scopes for dynamic clients[​](#scopes-for-dynamic-clients "Direct link to Scopes for dynamic clients")

Dynamically registered clients use a configurable restricted scope set. Contact your Glean representative to adjust the allowed scopes for your tenant.

## See also[​](#see-also "Direct link to See also")

-   [Glean OAuth Authorization Server](/administration/oauth/authorization-server)
-   [OAuth Overview](/administration/oauth/oauth-overview)
-   [MCP Authorization (specification)](https://modelcontextprotocol.io/specification/2025-03-26/basic/authorization#dynamic-client-registration)
