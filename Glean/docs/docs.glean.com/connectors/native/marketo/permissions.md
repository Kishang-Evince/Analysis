---
url: "https://docs.glean.com/connectors/native/marketo/permissions"
canonical: "https://docs.glean.com/connectors/native/marketo/permissions"
title: "Marketo permissions and security"
description: "Learn how the Marketo connector maps workspaces, roles, and capabilities to access in Glean"
fetched_at: "2026-10-13T08:50:04.205Z"
---
On this page

The Marketo connector reconstructs source access from Marketo workspaces, roles, users, and an administrator-provided roles and permissions workbook. Setup uses the Marketo Representational State Transfer (REST) API endpoint for the connected subscription.

## How permissions work[​](#how-permissions-work "Direct link to How permissions work")

For each Marketo workspace and supported capability, Glean creates a synthetic permission group. An asset's permission requirements depend on:

-   The workspace that contains the asset
-   The Marketo capability required for that asset type
-   Whether the asset is inside a program

During the full identity crawl, Glean reads the Marketo workspace and role catalogs, maps exported role permissions to capabilities, crawls active human users, and adds each user to the groups allowed by their role and workspace assignments.

## Asset permission mapping[​](#asset-permission-mapping "Direct link to Asset permission mapping")

The following table lists the capability required for each asset type:

| Indexed asset | Required Marketo capability |
| --- | --- |
| Program | **Access Marketing Activities** |
| Smart campaign | **Access Marketing Activities** |
| Email | **Access Email** |
| Landing page | **Access Landing Page** |
| Form | **Access Form** |
| Snippet | **Access Snippet** |
| Email template | **Access Email Template** |
| Landing page template | **Access Landing Page Template** |
| Static list | **Access Database** |

A user can find an asset in Glean only when the user's active Marketo role and workspace assignments meet all permission requirements for that asset.

note

For assets inside a program, users also need **Access Marketing Activities** in the same workspace.

## Roles workbook[​](#roles-workbook "Direct link to Roles workbook")

Marketo's role-list API does not return the complete permission tree needed for this mapping. The connector therefore combines live role data with the roles and permissions `.xlsx` workbook uploaded during setup.

Keep the workbook synchronized with Marketo:

-   Export it from the same subscription as the connected REST API endpoint.
-   Upload it without changing its structure or contents.
-   Upload a new export after adding, renaming, or deleting a Marketo role, or changing its permissions.
-   Run or wait for a full identity crawl after replacing it.

If a live Marketo role is absent from the workbook, Glean cannot map that role to capabilities. This can cause the identity crawl to fail when an active user holds the unmapped role.

## User handling[​](#user-handling "Direct link to User handling")

The connector:

-   Indexes active human Marketo users as permission principals.
-   Uses each user's email address for identity resolution.
-   Excludes API-only users from Glean permission membership.
-   Excludes locked users and users whose Marketo access has expired.
-   Expands an **AllZones** assignment across every workspace returned by Marketo.
-   Removes stale users and memberships through full identity crawls.

Glean skips users without a resolvable email address.

## Security guidance[​](#security-guidance "Direct link to Security guidance")

-   Use a dedicated API-only user and LaunchPoint custom service for Glean.
-   Grant only the permissions listed in [Set up Marketo](/connectors/native/marketo/setup#create-the-api-only-role-and-user).
-   Store the client secret only in the connector configuration.
-   Keep the roles workbook private because it contains role and permission details.
-   Export and upload a new roles workbook whenever a role's permissions change. A stale workbook can retain access that Marketo no longer allows. Run or wait for a full identity crawl after the upload.
-   Reauthorize the connector after rotating the client ID or client secret.
-   Verify access with users from different workspaces and roles before broad rollout.
