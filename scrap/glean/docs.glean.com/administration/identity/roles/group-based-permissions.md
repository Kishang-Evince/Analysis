---
url: "https://docs.glean.com/administration/identity/roles/group-based-permissions"
canonical: "https://docs.glean.com/administration/identity/roles/group-based-permissions"
title: "Group-based permissions"
description: "Manage roles and feature access at scale using identity provider groups."
fetched_at: "2026-09-01T13:29:07.562Z"
---
On this page

Glean supports assigning roles and feature access to identity provider (IdP) groups. Instead of configuring individual user roles, you can map IdP groups to Glean roles to enable automatic permission inheritance based on group membership.

Group-based permissions allow you to:

-   **Assign roles to IdP groups**: Manage Glean roles collectively rather than per individual user.
-   **Manage permissions at scale**: Leverage existing identity provider groups.
-   **Control feature access**: Use groups in feature greenlists, such as access to Glean and connector test groups.
-   **Automate inheritance**: Ensure users automatically receive or lose permissions as their IdP group memberships change.

warning

Group-based permissions control **Glean roles and feature access only**. This feature does not change or override connector permissions. Glean continues to honor all source system ACLs exactly as configured in your connectors.

## Supported identity providers[​](#supported-identity-providers "Direct link to Supported identity providers")

Glean supports group-based permissions for the following identity providers:

| Identity Provider | Group Support | Notes |
| --- | --- | --- |
| Azure AD (Microsoft 365) | ✓ | Groups synced via the O365 connector |
| Google Groups (Google Workspace) | ✓ | Groups synced via the Google Workspace connector |
| Okta | ✓ | Groups synced via the Okta connector |

note

Glean only reads group membership information from your identity provider. It does not sync, modify, or enforce IdP permission rules.

## Group-to-Role Mapping[​](#group-to-role-mapping "Direct link to Group-to-Role Mapping")

### Groups as principals[​](#groups-as-principals "Direct link to Groups as principals")

In Glean's role-based access control (RBAC) model, groups are treated as principals alongside individual users. This means a group can be assigned:

-   **One primary role** (Member, Setup Admin, Admin, or Super Admin)
-   **Multiple secondary roles** (such as Agent Creator, Answers Moderator, Insights Moderator, or Sensitive Content Moderator)

### Effective permission calculation[​](#effective-permission-calculation "Direct link to Effective permission calculation")

When a user belongs to one or more groups with assigned roles, Glean calculates effective permissions by merging:

1.  Roles assigned directly to the user
2.  Roles inherited from all groups the user belongs to

Glean applies the following rules during the merge:

-   **Primary role**: The highest-precedence role takes effect. Precedence follows this order: **Super Admin → Admin → Setup Admin → Member**.
-   **Secondary roles**: All secondary roles from the user's direct assignments and group memberships are combined (union).

### Example: Effective permission calculation

Consider a user with the following role assignments:

| Source | Primary Role | Secondary Roles |
| --- | --- | --- |
| Direct assignment | Admin | — |
| Group: IT-Admins | Setup Admin | API Token Creator |
| Group: Content-Team | Member | Answers Moderator |

**Effective result:**

-   **Primary role**: Admin (highest precedence wins)
-   **Secondary roles**: API Token Creator + Answers Moderator (union of all)

## Configure Group-to-Role mappings[​](#configure-group-to-role-mappings "Direct link to Configure Group-to-Role mappings")

Admins can map IdP groups to Glean roles from the **User Roles** page in the **Admin console**.

note

Only users with the **Admin** or **Super Admin** role can configure group-based permissions.

### Steps to Configure[​](#steps-to-configure "Direct link to Steps to Configure")

1

Access User Group Permissions

 [Admin Console → Users & permissions → User roles](https://app.glean.com/admin/teammates)

Click the **Default Member permissions** button, then navigate to the **User group permissions** section.

2

Select Identity Provider

Choose the identity provider that contains your groups (for example, Microsoft 365, Google Workspace, or Okta).

3

Add Group Mappings

Click **Add mapping** to create a new group-to-role mapping:

1.  Search and select a group by name or email.
2.  Assign a **primary role** for the group.
3.  Optionally assign one or more **secondary roles**.
4.  Repeat for additional groups as needed.

4

Save Changes

Click **Save changes** to apply your group mappings.

note

Before mapping groups, configure the identity connector that supplies the groups and memberships, then complete an identity crawl:

-   [Microsoft 365 setup](/connectors/native/microsoft365/setup)
-   [Google Workspace setup](/connectors/native/gdrive/setup)
-   [Okta setup, including native group requirements](/connectors/native/okta/setup/)

### Limits and sync behavior[​](#limits-and-sync-behavior "Direct link to Limits and sync behavior")

-   You can assign roles to a maximum of 1,000 groups.
-   Glean automatically syncs group membership changes from your IdP. The synchronization frequency depends on your integration type:
    -   **SAML/SCIM integrations**: Changes sync in near real-time.
    -   **OIDC integrations**: Changes may take up to three hours to sync.
-   An **on-demand sync** control is available to refresh group membership immediately.

## Use groups for feature access[​](#use-groups-for-feature-access "Direct link to Use groups for feature access")

For Okta, group-based permissions currently apply to group-to-role mappings.

Group-based permissions integrate with Glean's greenlist-style provisioning for features such as:

-   **Glean access**: Grant Glean access to entire groups instead of adding users individually.
-   **Feature rollouts**: Use groups to control access to beta features or phased rollouts.
-   **Connector test groups**: Include groups when configuring which users can see results from a connector during testing.

When configuring these features, you can now select groups as principals in addition to individual users.

## Privacy and Security[​](#privacy-and-security "Direct link to Privacy and Security")

### Group information visibility[​](#group-information-visibility "Direct link to Group information visibility")

Only Admins and Super Admins can view group names, descriptions, and membership information within the Admin Console. Regular users cannot view their group memberships or identify how the system derives their permissions.

note

For organizations with sensitive group structures (such as executive or M&A-related groups), contact Glean support to discuss options for limiting group name visibility.

### Manage group-derived roles[​](#manage-group-derived-roles "Direct link to Manage group-derived roles")

Glean treats roles inherited through group membership as read-only. To modify these inherited roles, you must perform one of the following:

-   Add or remove the user from the relevant group in your identity provider.
-   Modify the role mapping for the group in Glean Admin console.

You cannot directly remove a group-derived role from an individual user in the Glean Admin console.

### Safety rails[​](#safety-rails "Direct link to Safety rails")

The following guardrails apply to group-based permissions:

-   Admins cannot remove the last user or group from any role.
-   Admins cannot downgrade or remove Super Admin permissions from users or groups.
-   Only Super Admins can assign the Super Admin role to groups.

## Limitations[​](#limitations "Direct link to Limitations")

The following limitations apply to group-based permissions:

| Limitation | Details |
| --- | --- |
| **Okta groups** | Supported for group-based role mappings after the native groups crawl completes. |
| **Group membership latency** | OIDC-based integrations may have up to 3 hours of sync delay for membership changes. |
| **Custom roles** | Group-based permissions work with Glean's existing role structure. Custom role definitions are not currently supported. |
| **Feature flag** | Group-based permissions are controlled by a feature flag. If the feature is disabled, group-derived roles are ignored and only direct user role assignments apply. |

## Examples[​](#examples "Direct link to Examples")

### Example 1: IT administrators group[​](#example-1-it-administrators-group "Direct link to Example 1: IT administrators group")

Map your IT Admins group to the Admin role so that all IT team members automatically receive Glean Admin permissions:

| Group | Primary Role | Secondary Roles |
| --- | --- | --- |
| [IT-Admins@company.com](mailto:IT-Admins@company.com) | Admin | — |

### Example 2: Glean Pilot Group[​](#example-2-glean-pilot-group "Direct link to Example 2: Glean Pilot Group")

Grant Glean access to a pilot group of early adopters:

| Group | Primary Role | Secondary Roles |
| --- | --- | --- |
| [Glean-Pilot@company.com](mailto:Glean-Pilot@company.com) | Member | — |

Then configure Glean access to include this group in the test group settings.

### Example 3: Content Moderators[​](#example-3-content-moderators "Direct link to Example 3: Content Moderators")

Assign content moderation permissions to your knowledge management team:

| Group | Primary Role | Secondary Roles |
| --- | --- | --- |
| [Knowledge-Team@company.com](mailto:Knowledge-Team@company.com) | Member | Answers Moderator, Collections Moderator |

## See also[​](#see-also "Direct link to See also")

-   [About Role Based Access Control (RBAC)](/administration/identity/roles/about)
-   [Administrator Roles](/administration/identity/roles/admin-roles)
-   [User Roles](/administration/identity/roles/user-roles)
-   [Managing Users](/administration/identity/roles/manage-users)
-   [Content hiding](/administration/search/hiding-content)
