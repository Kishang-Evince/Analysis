---
url: "https://docs.glean.com/connectors/native/okta/overview"
canonical: "https://docs.glean.com/connectors/native/okta/overview"
title: "Okta overview"
description: "Learn how the Okta connector works with Glean."
fetched_at: "2026-09-01T13:29:36.345Z"
---
On this page

Okta is a cloud-based identity and access management platform that provides single sign-on, multi-factor authentication, and lifecycle management for enterprise applications. Organizations use Okta as a canonical source of employee identity, organizational hierarchy, and application access.

This page covers Okta as a people connector. To use Okta for single sign-on, see [Okta single sign-on configuration](/administration/identity/sso/configuration/okta-oidc). To set up Okta as a people connector, optionally also enable native groups for group-based role mapping, Okta-managed apps, and activity-based features by granting additional API scopes.

The Okta connector crawls user profiles, Okta-managed applications, system activity logs, and, when enabled, native groups and memberships into Glean. This powers people cards, org charts, directory search, app discovery, and group-based role mapping. Employees can use Glean to find colleagues, understand reporting structures, access tools, and inherit Glean permissions from identity-provider groups.

[

### Crawl

Review crawl strategy and configure restrictions for Okta users.







](/connectors/native/okta/restrictions)[

### Setup

Configure Okta API access and connect the connector in Glean.







](/connectors/native/okta/setup)[

### Troubleshooting

Resolve common setup, crawl, permissions, and data freshness issues.







](/connectors/native/okta/troubleshooting)

## Who can use this integration[​](#who-can-use-this-integration "Direct link to Who can use this integration")

-   **IT admins:** Manage people data ingestion and ensure org chart accuracy across Glean.
-   **People operations:** Verify that employee profiles, departments, and reporting lines are reflected in Glean's directory and org chart.
-   **Employees:** Search for colleagues by name, title, department, or location, and discover Okta-managed apps.
-   **System admins:** Configure and maintain the Okta connector to keep identity data synchronized with Glean.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

The connector crawls identity, application, and activity data from Okta.

-   **Users**
    -   Full user profile data including name, email, title, department, manager, location, and phone number.
    -   Employee type classification (full-time, contractor, service account).
    -   Custom field support for manager, department, title, hire date, and other profile attributes.
-   **Apps**
    -   Okta-managed applications including app name, status, logo, sign-on mode, and visibility settings.
    -   User-to-app assignments for app-based access control in Glean.
    -   Nested app link support for apps that provide multiple destinations.
-   **Groups and memberships (optional)**
    -   Native Okta groups and their memberships for group-based role mapping in Glean.
    -   Requires the `okta.groups.read` scope and native groups configuration.
-   **Activity logs**
    -   System log events for user authentication (`user.authentication.sso`), session start (`user.session.start`), and sign-on policy evaluation (`policy.evaluate_sign_on`).

## Supported API endpoints[​](#supported-api-endpoints "Direct link to Supported API endpoints")

The connector uses the Okta API to fetch identity and activity data. The following table summarizes how Glean uses these endpoints.

| Purpose | Endpoint | Method | Notes |
| --- | --- | --- | --- |
| List users | `/api/v1/users` | GET | Retrieves all user profiles with pagination. Batch size is configurable. |
| List apps | `/api/v1/apps` | GET | Retrieves Okta-managed applications. Requires the `okta.apps.read` scope. |
| List app members | `/api/v1/apps/{appId}/users` | GET | Retrieves users assigned to a specific app for group membership mapping. |
| List groups | `/api/v1/groups` | GET | Retrieves native Okta groups. Requires the `okta.groups.read` scope. |
| List group members | `/api/v1/groups/{groupId}/users` | GET | Retrieves members of a native Okta group. Requires the `okta.groups.read` scope. |
| System logs | `/api/v1/logs` | GET | Retrieves system log events filtered by event type and time window. Requires the `okta.logs.read` scope. |
| OAuth token | `/oauth2/v1/token` | POST | Exchanges a signed token for a temporary access token using the Client Credentials flow. |

## Content scope and behavior[​](#content-scope-and-behavior "Direct link to Content scope and behavior")

The Okta connector focuses on identity and application data rather than document content. This section describes what is indexed and how access is handled.

### Indexed content[​](#indexed-content "Direct link to Indexed content")

The connector indexes people data, native groups, and application metadata to power Glean features:

-   **User profiles:** Name, email, title, department, manager, location, phone number, and employee type are indexed to populate people cards, directory, and org chart.
-   **Application metadata:** App name, logo, sign-on mode, and status are indexed so employees can discover and access Okta-managed apps through Glean search.
-   **Activity data:** Authentication and session events are indexed to surface app usage analytics for IT admins and improve search personalization for employees.

### Security and access control[​](#security-and-access-control "Direct link to Security and access control")

The connector uses restricted API scopes and secure authentication:

-   **Read-only access:** The connector only reads data from Okta. No data is written or modified.
-   **Scoped permissions:** The Glean Connector app is assigned a Read-only Administrator role and granted only the specific API scopes needed (`okta.users.read`, and optionally `okta.apps.read`, `okta.logs.read`, and `okta.groups.read`).
-   **Client Credentials flow:** Authentication uses the OAuth 2.0 Client Credentials flow with signed JSON Web Tokens and JSON Web Key Sets. Tokens are temporary (10-minute lifetime) and scoped to specific API operations.
-   **Temporary setup token:** The super admin API token used during initial setup is only needed to create the connector apps and should be deleted immediately after.

### Coverage boundaries[​](#coverage-boundaries "Direct link to Coverage boundaries")

-   **Identity only:** This connector crawls people data, native groups, and apps. It does not crawl content from other Okta modules or external systems.
-   **Native groups are optional:** Native Okta groups and memberships are crawled for group-based role mapping when enabled. Legacy `App_*` pseudo-groups and other unsupported Okta group types are not included.
-   **Active users:** By default, only users with an active status are crawled. Configurable status filters can include additional statuses such as `PASSWORD_EXPIRED`, `RECOVERY`, and `LOCKED_OUT`.
-   **Custom fields:** Profile fields such as manager, department, and title can be mapped to custom Okta profile attributes. You can configure these mappings in the Glean admin console.

## Results display[​](#results-display "Direct link to Results display")

In Glean, Okta data appears across several features:

-   **People cards:** Employee name, title, department, manager, location, email, and phone number.
-   **Org chart:** Reporting hierarchy based on manager relationships from Okta profiles.
-   **Directory search:** Search for colleagues by name, title, department, team, or location.
-   **App search:** Okta-managed apps appear as search results with app name, logo, and a deep link back to the app (requires the `okta.apps.read` scope).
-   **Group-based role mapping:** Native Okta groups are selected as principals for Glean roles after enabling native groups, and an identity crawl completes. See [Group-based permissions](/administration/identity/roles/group-based-permissions).

## See also[​](#see-also "Direct link to See also")

-   [Crawl](/connectors/native/okta/restrictions)
-   [Troubleshooting](/connectors/native/okta/troubleshooting)
-   [Group-based permissions](/administration/identity/roles/group-based-permissions)
-   [Set up Okta people connector](/connectors/native/okta/setup/)
